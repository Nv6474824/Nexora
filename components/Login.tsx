'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, GraduationCap, Shield, ArrowRight, Lock, Mail, ArrowLeft } from 'lucide-react';
import { Role } from './Sidebar';
import Image from 'next/image';

interface LoginProps {
  onLogin: (role: Role) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const roles: { id: Role; title: string; icon: any; desc: string; color: string }[] = [
    { 
      id: 'Student', 
      title: 'Student Portal', 
      icon: User, 
      desc: 'Access your classes, book resources, and view your digital ID.',
      color: 'from-brand-pink-glow to-purple-600'
    },
    { 
      id: 'Faculty', 
      title: 'Faculty Portal', 
      icon: GraduationCap, 
      desc: 'Manage your classes, priority bookings, and student requests.',
      color: 'from-brand-gold to-orange-600'
    },
    { 
      id: 'Admin', 
      title: 'Admin Portal', 
      icon: Shield, 
      desc: 'System control, resource management, and user oversight.',
      color: 'from-green-400 to-emerald-600'
    }
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    
    // Simple hardcoded credentials for demonstration
    const expectedUsername = selectedRole.toLowerCase();
    
    if (username === expectedUsername && password === 'password') {
      onLogin(selectedRole);
    } else {
      setError(`Invalid credentials. Try username: '${expectedUsername}' and password: 'password'`);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80" 
          alt="Tech Background" 
          fill 
          className="object-cover opacity-30 mix-blend-luminosity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/60 to-[#050505]" />
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-purple/20 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-pink-glow/10 blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-brand-pink-glow to-brand-purple flex items-center justify-center shadow-[0_0_30px_rgba(255,0,127,0.5)] mb-8"
          >
            <span className="font-bold text-white text-4xl tracking-tighter">N</span>
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white tracking-tighter"
          >
            Welcome to <span className="text-brand-pink-glow drop-shadow-[0_0_15px_rgba(255,0,127,0.8)]">Nexora</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Select your portal and login to access the Smart Campus Management System.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <motion.div 
              key="role-selection"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {roles.map((role, index) => {
                const Icon = role.icon;
                
                return (
                  <motion.button
                    key={role.id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onClick={() => {
                      setSelectedRole(role.id);
                      setError('');
                      setUsername('');
                      setPassword('');
                    }}
                    className="glass-card rounded-3xl p-8 text-left relative overflow-hidden group transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110`}>
                      <Icon size={32} className="text-gray-400 group-hover:text-white transition-colors" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">{role.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-8 h-20">{role.desc}</p>
                    
                    <div className="flex items-center text-sm font-bold text-white/50 group-hover:text-white transition-colors">
                      <span>Select Portal</span>
                      <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="login-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="max-w-md mx-auto"
            >
              <div className="glass-card rounded-3xl p-8 relative overflow-hidden border-brand-pink-glow/30">
                <button 
                  onClick={() => setSelectedRole(null)}
                  className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                
                <div className="mt-8 mb-8 text-center">
                  <h2 className="text-2xl font-bold text-white">{selectedRole} Login</h2>
                  <p className="text-gray-400 text-sm mt-2">Enter your credentials to continue</p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                      {error}
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                          type="text" 
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-pink-glow/50 transition-colors"
                          placeholder={`Try '${selectedRole.toLowerCase()}'`}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input 
                          type="password" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-pink-glow/50 transition-colors"
                          placeholder="Try 'password'"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-brand-purple to-brand-pink-glow shadow-[0_0_20px_rgba(255,0,127,0.3)] hover:shadow-[0_0_30px_rgba(255,0,127,0.5)] transition-all flex items-center justify-center gap-2"
                  >
                    Login to Portal <ArrowRight size={18} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
