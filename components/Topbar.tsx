'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Bell, Search, ChevronDown } from 'lucide-react';
import { Role } from './Sidebar';

interface TopbarProps {
  role: Role;
  username: string;
}

export function Topbar({ role, username }: TopbarProps) {
  const [showRoleDropdown, setShowRoleDropdown] = React.useState(false);

  const initial = username.charAt(0).toUpperCase();

  return (
    <div className="h-20 glass border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-30 ml-64">
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search resources, labs, people..." 
            className="w-full bg-black/40 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-pink-glow/50 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-pink-glow rounded-full shadow-[0_0_8px_rgba(255,0,127,0.8)]"></span>
        </button>

        <div className="h-8 w-px bg-white/10"></div>

        <div className="relative">
          <button 
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-xl transition-colors"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-white capitalize">{username}</p>
              <p className="text-xs text-brand-gold">{role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink-glow flex items-center justify-center border border-white/20 shadow-[0_0_10px_rgba(126,34,206,0.5)]">
              <span className="font-bold text-white">{initial}</span>
            </div>
            <ChevronDown size={16} className="text-gray-400" />
          </button>

          {showRoleDropdown && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl overflow-hidden border border-white/10 py-2"
            >
              <button
                onClick={() => window.location.reload()}
                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 transition-colors"
              >
                Log Out
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
