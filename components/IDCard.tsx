'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Role } from './Sidebar';
import { Fingerprint, ShieldAlert, Activity, CreditCard } from 'lucide-react';

export function IDCard({ role }: { role: Role }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const userName = role === 'Student' ? 'Alex Carter' : role === 'Faculty' ? 'Dr. Sarah Chen' : 'Admin Marcus';
  const idNumber = role === 'Student' ? 'STU-2024-8921' : role === 'Faculty' ? 'FAC-2018-042' : 'ADM-001';

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] perspective-1000">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white tracking-tight">Digital ID Card</h2>
        <p className="text-gray-400 mt-1">Tap card to flip and view details.</p>
      </div>

      <div 
        className="relative w-full max-w-md h-[250px] cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: '1000px' }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          className="w-full h-full relative preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of Card */}
          <div 
            className="absolute inset-0 w-full h-full backface-hidden glass-card rounded-3xl p-6 border-white/20 overflow-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink-glow/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-purple/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Nexora<span className="text-brand-pink-glow">Campus</span></h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Smart ID</p>
                </div>
                <CreditCard className="text-white/50" size={24} />
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-brand-gold mb-1 font-medium">{role}</p>
                  <h4 className="text-2xl font-bold text-white mb-1">{userName}</h4>
                  <p className="text-sm font-mono text-gray-400">{idNumber}</p>
                </div>
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-purple to-brand-pink-glow p-0.5">
                  <div className="w-full h-full bg-black/50 rounded-[10px] flex items-center justify-center backdrop-blur-sm">
                    <Fingerprint className="text-white/80" size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back of Card */}
          <div 
            className="absolute inset-0 w-full h-full backface-hidden glass-card rounded-3xl p-6 border-white/20 overflow-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="w-full h-12 bg-black/80 absolute top-6 left-0" />
            
            <div className="mt-20 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <ShieldAlert size={16} className="text-brand-gold" />
                  <span className="text-sm text-gray-300">Access Level</span>
                </div>
                <span className="text-sm font-bold text-white">Tier {role === 'Admin' ? '1' : role === 'Faculty' ? '2' : '3'}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                <div className="flex items-center gap-3">
                  <Activity size={16} className="text-green-400" />
                  <span className="text-sm text-gray-300">Status</span>
                </div>
                <span className="text-sm font-bold text-green-400">Active</span>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-0 w-full text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Property of Nexora Campus</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
