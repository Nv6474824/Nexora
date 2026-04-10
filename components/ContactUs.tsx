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

      <div className="grid grid-cols-1 gap-12 max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
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
      </div>
    </div>
  );
}
