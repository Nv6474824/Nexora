'use client';

import React from 'react';
import { motion } from 'motion/react';
import { QrCode, ShieldCheck, Clock, MapPin } from 'lucide-react';

export function MyPass() {
  return (
    <div className="p-8 space-y-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold text-white tracking-tight">Active Pass</h2>
        <p className="text-gray-400 mt-1">Scan this at any campus checkpoint.</p>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card rounded-3xl p-8 w-full max-w-md relative overflow-hidden border-brand-pink-glow/30 shadow-[0_0_50px_rgba(255,0,127,0.15)]"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-purple via-brand-pink-glow to-brand-gold" />
        
        <div className="flex justify-between items-start mb-8">
          <div>
            <h3 className="text-xl font-bold text-white">Alex Carter</h3>
            <p className="text-brand-gold text-sm font-medium">Student • Level 3 Access</p>
          </div>
          <div className="p-2 rounded-full bg-green-500/20 text-green-400">
            <ShieldCheck size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl flex items-center justify-center mb-8 relative group">
          <QrCode size={200} className="text-black" />
          {/* Scanning animation line */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-1 bg-brand-pink-glow shadow-[0_0_15px_rgba(255,0,127,1)] opacity-50"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 text-gray-300">
              <Clock size={18} className="text-brand-purple" />
              <span className="text-sm">Valid Until</span>
            </div>
            <span className="text-white font-medium">Today, 11:59 PM</span>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin size={18} className="text-brand-pink-glow" />
              <span className="text-sm">Current Zone</span>
            </div>
            <span className="text-white font-medium">North Campus</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
