// components/ChatMessage.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function ChatMessage({ msg, isUser }) {
  const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
