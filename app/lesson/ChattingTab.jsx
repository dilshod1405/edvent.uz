import { useState, useEffect, useRef } from 'react';
import SendIcon from '@mui/icons-material/Send';

export default function ChattingTab() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Demo initial messages
  useEffect(() => {
    setMessages([
      { sender: 'teacher', text: "Welcome! Feel free to ask any questions.", time: '10:00 AM' }
    ]);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      sender: 'student',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate teacher reply after 2s
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          sender: 'teacher',
          text: "Thanks for your question! I'll answer it soon.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    }, 2000);

    setInput('');
  };

  return (
    <div className="flex flex-col h-[400px] bg-[#17202A] overflow-y-auto rounded-md p-4 text-white">
      {/* Messages */}
      <div className="flex-1 pr-2 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-md ${
              msg.sender === 'student'
                ? 'bg-[#4F39F6] text-white rounded-br-none'
                : 'bg-black text-white rounded-bl-none'
            }`}>
              <div>{msg.text}</div>
              <div className="mt-1 text-xs text-right text-gray-400">{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-[#1C2833] border border-[#4F39F6] text-white px-4 py-2 rounded-l-md focus:outline-none"
          placeholder="Savolingizni yozing..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
          maxLength={200}
        />
        <button
          onClick={handleSend}
          className="bg-[#4F39F6] px-4 rounded-r-md text-white hover:bg-[#3a2fd9]"
        >
            <SendIcon />
        </button>
      </div>
    </div>
  );
}
