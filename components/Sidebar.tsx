'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Dumbbell, 
  FlaskConical, 
  BookOpen, 
  Mic2, 
  Wrench, 
  Map as MapIcon, 
  History, 
  Ticket, 
  BadgeCheck,
  Info,
  Mail,
  MessageSquare,
  Shield,
  GraduationCap,
  BellRing,
  Settings
} from 'lucide-react';

export type Role = 'Student' | 'Faculty' | 'Admin';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: Role;
}

export function Sidebar({ activeTab, setActiveTab, role, isLightMode, toggleTheme }: SidebarProps & { isLightMode: boolean, toggleTheme: () => void }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Student', 'Faculty', 'Admin'] },
    { id: 'announcements', label: 'Announcements', icon: BellRing, roles: ['Student', 'Faculty', 'Admin'] },
    { id: 'admin-requests', label: 'Admin Panel', icon: Shield, roles: ['Admin'] },
    { id: 'faculty-classes', label: 'My Classes', icon: GraduationCap, roles: ['Faculty'] },
    { id: 'gym', label: 'Gym', icon: Dumbbell, roles: ['Student', 'Faculty'] },
    { id: 'labs', label: 'Labs', icon: FlaskConical, roles: ['Student', 'Faculty', 'Admin'] },
    { id: 'library', label: 'Library', icon: BookOpen, roles: ['Student', 'Faculty'] },
    { id: 'auditorium', label: 'Auditorium', icon: Mic2, roles: ['Faculty', 'Admin'] },
    { id: 'equipment', label: 'Equipment', icon: Wrench, roles: ['Student', 'Faculty', 'Admin'] },
    { id: 'history', label: 'History', icon: History, roles: ['Student', 'Faculty'] },
    { id: 'idcard', label: 'ID Card', icon: BadgeCheck, roles: ['Student', 'Faculty'] },
    { id: 'about', label: 'About Us', icon: Info, roles: ['Student', 'Faculty', 'Admin'] },
    { id: 'contact', label: 'Contact Us', icon: Mail, roles: ['Student', 'Faculty', 'Admin'] },
    { id: 'query', label: 'Query System', icon: MessageSquare, roles: ['Student', 'Faculty', 'Admin'] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: ['Student', 'Faculty', 'Admin'] },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(role));

  return (
    <div className="w-64 h-screen glass border-r border-white/5 flex flex-col fixed left-0 top-0 z-40">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-pink-glow to-brand-purple flex items-center justify-center shadow-[0_0_15px_rgba(255,0,127,0.5)]">
            <span className="font-bold text-white text-xl tracking-tighter">N</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Nexora<span className="text-brand-pink-glow">Campus</span>
          </h1>
        </div>
      </div>
      
      <div className="px-6 mb-4">
        <button 
          onClick={toggleTheme}
          className="w-full flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-xs font-bold uppercase tracking-wider">{isLightMode ? 'Light Mode' : 'Dark Mode'}</span>
          <div className={`w-8 h-4 rounded-full relative transition-colors ${isLightMode ? 'bg-brand-pink-glow' : 'bg-gray-700'}`}>
            <motion.div 
              layout
              className="w-3 h-3 rounded-full bg-white absolute top-0.5"
              initial={false}
              animate={{ left: isLightMode ? 'calc(100% - 14px)' : '2px' }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-2 space-y-1">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
                isActive 
                  ? 'text-white bg-white/10' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-brand-pink-glow/20 to-transparent rounded-xl border-l-2 border-brand-pink-glow"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon size={20} className={`relative z-10 ${isActive ? 'text-brand-pink-glow' : 'group-hover:text-brand-pink-glow transition-colors'}`} />
              <span className="relative z-10 font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
