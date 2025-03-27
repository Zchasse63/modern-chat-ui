'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus the input field when the component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  // Simple demo responses
  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello there! How can I help you today?';
    } else if (lowerMessage.includes('help')) {
      return 'I can answer questions, provide information, or just chat! What would you like to know?';
    } else if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else you'd like to chat about?";
    } else if (lowerMessage.includes('bye')) {
      return 'Goodbye! Feel free to come back anytime!';
    } else {
      const responses = [
        "That's interesting! Tell me more.",
        "I'm not sure I understand. Could you elaborate?",
        "Let me think about that for a moment...",
        "Great question! I'm still learning, but I'll try my best to help.",
        "I appreciate your patience as I continue to improve my responses!",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md mx-auto rounded-xl shadow-lg overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Chat header */}
      <div className="bg-gradient-to-r from-violet-500 to-indigo-600 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-white text-xl">🤖</span>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
          </div>
          <div>
            <h3 className="font-bold text-white">ChatBot</h3>
            <p className="text-xs text-indigo-100">Online</p>
          </div>
        </div>
        <button className="text-white opacity-80 hover:opacity-100 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto bg-transparent backdrop-blur-sm">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-tr-none'
                    : 'bg-white shadow-md rounded-tl-none'
                }`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex justify-start mb-4"
            >
              <div className="bg-white shadow-md rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <button
            type="button"
            className="flex-shrink-0 p-2 rounded-full text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className={`flex-shrink-0 p-2 rounded-full ${
              inputValue.trim()
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-200 text-gray-400'
            } transition-all duration-200`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
        <div className="mt-2 text-center">
          <p className="text-xs text-gray-500">Powered by NextJS & Framer Motion</p>
        </div>
      </div>
    </div>
  );
}