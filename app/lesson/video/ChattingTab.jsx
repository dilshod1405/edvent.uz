'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
import SendIcon from '@mui/icons-material/Send';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { io } from 'socket.io-client';
import ChatMessage from './ChatMessage';

export default function ChattingTab({ lessonId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const audioRef = useRef(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;

  const userId = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode(token).user_id;
    } catch (err) {
      console.error('Tokenni dekod qilishda xato:', err);
      return null;
    }
  }, [token]);

  useEffect(() => {
    audioRef.current = new Audio('/sounds/message.mp3');
  }, []);


  useEffect(() => {
  if (!lessonId || !token) return;

  axios.get(`${process.env.NEXT_PUBLIC_API_URL_SOCKET}/chat/messages`, {
    params: { lesson:lessonId },
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => {
      setMessages(res.data);
    })
    .catch(err => {
      console.error('Xabarlarni yuklashda xato:', err);
    });
}, [lessonId, token]);


useEffect(() => {
  if (!lessonId || !token || !userId) return;

  const socket = io(process.env.NEXT_PUBLIC_API_SOCKET_URL, {
    auth: { token, lessonId },
    transports: ['websocket'],
  });

  console.log('SOCKET INIT:', socket); // qo‘shib ko‘ring

  socketRef.current = socket;

  socket.on('connect', () => {
    console.log('✅ Socket.io ulandi');
    setIsConnected(true);
  });

  socket.on('connect_error', (err) => {
  console.error('❗ connect_error:', err.message);
  console.error('🔍 Full error:', err);
});


  const handleNewMessage = (data) => {
    console.log('🔔 Yangi xabar:', data);
    if (Number(data.senderId) !== Number(userId)) {
      audioRef.current?.play();
    }
    setMessages(prev => [...prev, data]);
  };

  socket.on('new_message', handleNewMessage);

  return () => {
    socket.off('connect');
    socket.off('disconnect');
    socket.off('new_message', handleNewMessage);
    socket.disconnect();
  };
}, [lessonId, token, userId]);



  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
  if (!input.trim()) return;

  const socket = socketRef.current;
  if (!socket || !socket.connected) {
    console.error('Socket ulangan emas');
    return;
  }

  socket.emit('send_message', {
    content: input,
  });

  setInput('');
};

  return (
    <div className="flex flex-col h-[400px] bg-[#17202A] rounded-md p-4 text-white">
      <div className="flex-1 pr-2 space-y-4 overflow-y-auto">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              msg={msg}
              isUser={Number(msg.senderId) === Number(userId)}
            />
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          disabled={!isConnected}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-[#1C2833] border border-[#4F39F6] text-white px-4 py-2 rounded-l-md focus:outline-none"
          placeholder="Savolingizni yozing..."
        />
        <button
          onClick={handleSend}
          disabled={!isConnected}
          className={`px-4 rounded-r-md flex items-center hover:cursor-pointer text-white ${
            isConnected ? 'bg-[#4F39F6] hover:bg-[#3a2fd9]' : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}
