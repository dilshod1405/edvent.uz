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
  const [supportId, setSupportId]     = useState(null);
  const socketRef = useRef(null);
  const endRef    = useRef(null);
  const audioRef  = useRef(null);

  // Token & userId
  const token  = typeof window !== 'undefined' ? localStorage.getItem('access') : null;
  const userId = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode(token).user_id;
    } catch {
      return null;
    }
  }, [token]);

  // Preload audio
  useEffect(() => {
    audioRef.current = new Audio('/sounds/message.mp3');
  }, []);

  // Load initial messages
  useEffect(() => {
    if (!lessonId || !token) return;
    axios.get(`${process.env.NEXT_PUBLIC_API_URL_SOCKET}/chat/messages`, {
      params: { lesson: lessonId },
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setMessages(res.data))
    .catch(err => console.error('❌ Load messages error:', err));
  }, [lessonId, token]);

  // Fetch supportId (for display if needed)
  useEffect(() => {
    if (!lessonId || !token) return;
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/education/lessons/${lessonId}/support/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setSupportId(res.data?.id))
    .catch(err => console.error('❌ Support fetch error:', err));
  }, [lessonId, token]);

  // WebSocket connect
  useEffect(() => {
    if (!lessonId || !token || !userId || !supportId) return;

    const socket = io(process.env.NEXT_PUBLIC_API_SOCKET_URL, {
      auth: { token, lessonId },
      transports: ['websocket']
    });
    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('new_message', data => {
      if (Number(data.senderId) !== Number(userId)) {
        audioRef.current?.play();
      }
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [lessonId, token, userId, supportId]);

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send handler
  const handleSend = () => {
    if (!input.trim() || !socketRef.current?.connected) return;
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
          className="flex-1 bg-[#1C2833] border border-[#4F39F6] text-white px-4 py-2 rounded-l-md focus:outline-none"
          type="text"
          placeholder="Savolingizni yozing..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          disabled={!isConnected}
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

// components/ChatMessage.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function ChatMessage({ msg, isUser }) {
  const time = new Date(msg.timestamp).toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[70%] p-3 rounded-lg ${
        isUser ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'
      }`}>
        <p className="text-sm">{msg.content}</p>
        <span className="block text-xs mt-1 text-gray-300">{time}</span>
      </div>
    </motion.div>
  );
}
