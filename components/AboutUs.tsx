'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Globe, Shield, Zap } from 'lucide-react';

export function AboutUs() {
  const features = [
    { icon: Cpu, title: 'AI-Powered', desc: 'Smart recommendations and predictive resource management.' },
    { icon: Zap, title: 'Real-time', desc: 'Live updates on campus availability and crowd density.' },
    { icon: Shield, title: 'Secure', desc: 'Enterprise-grade security with QR and biometric access.' },
    { icon: Globe, title: 'Connected', desc: 'Seamless integration across all campus facilities.' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-16 py-12">
      <div className="text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-white tracking-tighter"
        >
          The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink-glow">Campus Life</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto"
        >
          Nexora Campus is a revolutionary smart management system designed to optimize resources, enhance security, and elevate the educational experience.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            className="glass-card p-8 rounded-3xl group hover:border-brand-pink-glow/50 transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:bg-brand-purple/20 group-hover:text-brand-pink-glow text-gray-400">
              <feature.icon size={28} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-3xl p-12 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-brand-pink-glow/20 opacity-50" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to experience the future?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">Join thousands of students and faculty already using Nexora to navigate their daily campus life with unprecedented ease.</p>
          <button className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-brand-purple to-brand-pink-glow shadow-[0_0_30px_rgba(255,0,127,0.4)] hover:shadow-[0_0_50px_rgba(255,0,127,0.6)] hover:scale-105 transition-all">
            Explore Features
          </button>
        </div>
      </motion.div>
    </div>
  );
}
