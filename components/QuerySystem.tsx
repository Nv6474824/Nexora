'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Bot, User, Send } from 'lucide-react';

export function QuerySystem({ username }: { username: string }) {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! I am the Nexora AI Assistant. How can I help you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const newMsg = { id: Date.now(), type: 'user', text: query };
    setMessages(prev => [...prev, newMsg]);
    setQuery('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        type: 'bot', 
        text: 'I have received your query regarding "' + newMsg.text + '". An admin will review this shortly, or I can provide automated assistance if it is a common issue.' 
      }]);
    }, 1500);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white tracking-tight">Query System</h2>
        <p className="text-gray-400 mt-1">Ask questions or report issues to the admin team.</p>
      </div>

      <div className="flex-1 glass-card rounded-3xl overflow-hidden flex flex-col border-white/10">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  msg.type === 'user' 
                    ? 'bg-gradient-to-br from-brand-purple to-brand-pink-glow' 
                    : 'bg-white/10 text-brand-pink-glow'
                }`}>
                  {msg.type === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.type === 'user'
                    ? 'bg-brand-purple/20 border border-brand-purple/30 text-white rounded-tr-none'
                    : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 text-brand-pink-glow flex items-center justify-center shrink-0">
                  <Bot size={20} />
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4 bg-black/40 border-t border-white/10">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink-glow/50 transition-colors"
            />
            <button
              type="submit"
              disabled={!query.trim() || isTyping}
              className="px-6 py-3 rounded-xl bg-brand-pink-glow text-white font-medium hover:bg-brand-pink-glow/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send size={18} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
