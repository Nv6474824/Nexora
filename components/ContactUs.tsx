'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

export function ContactUs() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto py-12">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-white tracking-tight">Get in Touch</h2>
        <p className="text-gray-400 mt-2 text-lg">We're here to help with any questions about Nexora Campus.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="glass-card rounded-3xl p-8 space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-2xl bg-white/5 text-brand-pink-glow">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Main Office</h4>
                <p className="text-gray-400 mt-1">Knowledge Park 3<br/>Greater Noida, 201306</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-2xl bg-white/5 text-brand-purple">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Email Support</h4>
                <p className="text-gray-400 mt-1">support@nexoracampus.edu<br/>admin@nexoracampus.edu</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-4 rounded-2xl bg-white/5 text-brand-gold">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Phone</h4>
                <p className="text-gray-400 mt-1">+91 80000500001<br/>Mon-Fri, 9am-5pm</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink-glow/50 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink-glow/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink-glow/50 transition-colors resize-none"
                  placeholder="How can we help you?"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-brand-purple to-brand-pink-glow shadow-[0_0_20px_rgba(255,0,127,0.3)] hover:shadow-[0_0_30px_rgba(255,0,127,0.5)] transition-all flex items-center justify-center gap-2"
            >
              {isSubmitted ? 'Message Sent!' : (
                <>Send Message <Send size={18} /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
