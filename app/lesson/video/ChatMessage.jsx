import { motion } from 'framer-motion';

export default function ChatMessage({ msg, isUser }) {
  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className={`p-3 rounded-lg max-w-[70%] ${isUser ? 'bg-blue-600' : 'bg-gray-700'}`}>
        {msg.content}
      </div>
    </motion.div>
  );
}
