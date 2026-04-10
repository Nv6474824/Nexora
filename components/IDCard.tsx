'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Role } from './Sidebar';
import { Fingerprint, ShieldAlert, Activity, CreditCard, QrCode } from 'lucide-react';

export function IDCard({ role, username }: { role: Role, username: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const idNumber = role === 'Student' ? 'STU-2024-8921' : role === 'Faculty' ? 'FAC-2018-042' : 'ADM-001';
  const expiryDate = 'Dec 2026';

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] perspective-1000">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white tracking-tight">Digital ID Card</h2>
        <p className="text-gray-400 mt-1">Tap card to flip and view details.</p>
      </div>

      <div 
        className="relative w-[320px] h-[500px] cursor-pointer group"
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
            className="absolute inset-0 w-full h-full backface-hidden glass-card rounded-3xl p-6 border-white/20 overflow-hidden flex flex-col"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-pink-glow/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-purple/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col h-full items-center text-center">
              <div className="w-full flex justify-between items-start mb-6">
                <CreditCard className="text-white/50" size={24} />
                <div className="text-right">
                  <h3 className="text-xl font-bold text-white tracking-tight">Nexora<span className="text-brand-pink-glow">Campus</span></h3>
                </div>
              </div>

              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink-glow p-1 mb-6">
                <div className="w-full h-full bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
                  <Fingerprint className="text-white/80" size={48} />
                </div>
              </div>

              <div className="space-y-1 mb-8">
                <h4 className="text-2xl font-bold text-white capitalize">{username}</h4>
                <p className="text-sm text-brand-gold font-medium uppercase tracking-widest">{role}</p>
              </div>

              <div className="w-full mt-auto space-y-4">
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-gray-400 uppercase">ID Number</span>
                  <span className="text-sm font-mono text-white font-bold">{idNumber}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-gray-400 uppercase">Valid Thru</span>
                  <span className="text-sm font-mono text-white font-bold">{expiryDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Back of Card */}
          <div 
            className="absolute inset-0 w-full h-full backface-hidden glass-card rounded-3xl p-6 border-white/20 overflow-hidden flex flex-col"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="w-full h-16 bg-black/80 absolute top-8 left-0" />
            
            <div className="mt-28 space-y-4 flex-1">
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

              <div className="flex justify-center mt-8">
                <div className="p-4 bg-white rounded-xl">
                  <QrCode size={100} className="text-black" />
                </div>
              </div>
            </div>
            
            <div className="mt-auto text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Property of Nexora Campus</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
