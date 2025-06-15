'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import jwtDecode from 'jwt-decode';
import SendIcon from '@mui/icons-material/Send';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { io } from 'socket.io-client';
import ChatMessage from './ChatMessage';

export default function ChattingTab({ lessonId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const endRef = useRef(null);
  const audioRef = useRef(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;

  const userId = useMemo(() => {
  if (!token) return null;
  try {
    const decodedToken = jwtDecode(token);
    console.log('Decoded token:', decodedToken);
    return decodedToken.user_id;
  } catch {
    return null;
  }
}, [token]);

  // Load notification sound
  useEffect(() => {
    audioRef.current = new Audio('/sounds/message.mp3');
  }, []);

  // Load chat history
  useEffect(() => {
    if (!lessonId || !token) return;
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chat/messages`, {
      params: { lesson: lessonId },
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setMessages(res.data))
      .catch(err => console.error('❌ Load messages error:', err));
  }, [lessonId, token]);

  // Handle Socket.IO connection
  useEffect(() => {
    if (!lessonId || !token || !userId) {
      console.warn('❌ token, lessonId yoki userId yo‘q', { token, lessonId, userId });
      return;
    }

    const socket = io(process.env.NEXT_PUBLIC_API_SOCKET_URL, {
      auth: { token, lessonId },
      transports: ['websocket']
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
    });

    socket.on('joined', () => {
      console.log('🔒 Room joined');
      setIsConnected(true);
    });

    socket.on('new_message', (data) => {
      if (Number(data.senderId) !== Number(userId)) {
        audioRef.current?.play();
      }
      setMessages(prev => [...prev, data]);
    });

    socket.on('connect_error', err => {
      console.error('❌ Socket connection error:', err.message);
      setIsConnected(false);
    });

    return () => {
      if (socketRef.current?.connected) {
        socketRef.current.disconnect();
      }
    };
  }, [lessonId, token, userId]);

  // Auto scroll to last message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !isConnected || !socketRef.current?.connected) return;

    // Optimistic UI
    const msgData = {
      content: input,
      senderId: userId,
      lessonId,
      receiverId: null, // Backend fills this
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, msgData]);
    socketRef.current.emit('send_message', { content: input });
    setInput('');
  };

  return (
    <div className="flex flex-col h-[400px] bg-[#17202A] rounded-md p-4 text-white">
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <ChatMessage
              key={msg._id || idx}
              msg={msg}
              isUser={Number(msg.senderId) === Number(userId)}
            />
          ))}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          placeholder="Savolingizni yozing..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          disabled={!isConnected}
          className="flex-1 bg-[#1C2833] border border-[#4F39F6] px-4 py-2 rounded-l-md text-white focus:outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!isConnected}
          className={`px-4 rounded-r-md flex items-center text-white ${
            isConnected ? 'bg-[#4F39F6] hover:bg-[#3a2fd9]' : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          <SendIcon />
        </button>
      </div>

      {!isConnected && (
        <p className="text-red-400 text-sm mt-2">
          Ulanishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.
        </p>
      )}
    </div>
  );
}
