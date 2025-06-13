// components/ChattingTab.jsx
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
  const [input, setInput]     = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const endRef    = useRef(null);
  const audioRef  = useRef(null);

  // Token & userId
  const token  = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
  const userId = useMemo(() => {
    if (!token) return null;
    try { return jwtDecode(token).user_id; } catch { return null; }
  }, [token]);

  // Preload audio
  useEffect(() => {
    audioRef.current = new Audio('/sounds/message.mp3');
  }, []);

  // Load initial messages via REST API
  useEffect(() => {
    if (!lessonId || !token) return;
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/chat/messages`, {
      params: { lesson: lessonId },
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMessages(res.data))
    .catch(err => console.error('❌ Load messages error:', err));
  }, [lessonId, token]);

  // WebSocket connect & join room
  useEffect(() => {
    if (!lessonId || !token || !userId) return;

    const socket = io(process.env.NEXT_PUBLIC_API_SOCKET_URL, {
      auth: { token, lessonId },
      transports: ['websocket']
    });
    socketRef.current = socket;

    // After server acknowledges join
    socket.on('joined', () => setIsConnected(true));

    socket.on('new_message', data => {
      if (Number(data.senderId) !== Number(userId)) {
        audioRef.current?.play();
      }
      setMessages(prev => [...prev, data]);
    });

    return () => { socket.disconnect(); };
  }, [lessonId, token, userId]);

  // Auto-scroll on new messages
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message
  const handleSend = () => {
    if (!input.trim() || !socketRef.current?.connected || !isConnected) return;
    socketRef.current.emit('send_message', { content: input });
    setInput('');
  };

  return (
    <div className="flex flex-col h-[400px] bg-[#17202A] rounded-md p-4 text-white">
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        <AnimatePresence>
          {messages.map((msg, idx) => (
            <ChatMessage
              key={idx}
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
    </div>
  );
}
