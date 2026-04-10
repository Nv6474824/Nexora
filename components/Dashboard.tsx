'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Role } from './Sidebar';
import { Activity, Users, Calendar, Zap, ArrowRight, Star, Map as MapIcon, Ticket } from 'lucide-react';

export function Dashboard({ role }: { role: Role }) {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Welcome to <span className="text-brand-pink-glow drop-shadow-[0_0_10px_rgba(255,0,127,0.8)]">Nexora Campus</span>, <span className="text-brand-gold">
              {role === 'Student' ? 'Alex' : role === 'Faculty' ? 'Dr. Sarah' : 'Marcus'}
            </span>
          </h2>
          <p className="text-gray-400 mt-1">Here's what's happening on campus today.</p>
        </div>
        
        {role === 'Student' && (
          <div className="glass-card px-6 py-3 rounded-full flex items-center gap-3">
            <Star className="text-brand-gold" size={20} fill="currentColor" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Booking Score</p>
              <p className="text-lg font-bold text-white">98<span className="text-sm text-gray-500">/100</span></p>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={role === 'Admin' ? 'Total Active Users' : 'Campus Activity'} 
          value={role === 'Admin' ? '2,451' : 'High'} 
          icon={Users} 
          trend="+12% today" 
          color="pink" 
        />
        <StatCard 
          title="Upcoming Bookings" 
          value={role === 'Student' ? '3' : role === 'Faculty' ? '5' : '142'} 
          icon={Calendar} 
          trend="Next in 2h" 
          color="purple" 
        />
        <StatCard 
          title="Resource Utilization" 
          value="78%" 
          icon={Activity} 
          trend="Optimal" 
          color="gold" 
        />
        <StatCard 
          title="System Status" 
          value="Online" 
          icon={Zap} 
          trend="All systems nominal" 
          color="green" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Smart Recommendations</h3>
              <button className="text-sm text-brand-pink-glow hover:text-white transition-colors flex items-center gap-1">
                View all <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <RecommendationCard 
                title="Advanced AI Lab" 
                time="Available 2:00 PM - 4:00 PM" 
                reason="Based on your recent ML project work"
                match="95%"
              />
              <RecommendationCard 
                title="Quiet Study Pod B" 
                time="Available Now" 
                reason="Low noise level detected in this zone"
                match="88%"
              />
            </div>
          </div>

          {role === 'Admin' && (
            <div className="glass-card rounded-2xl p-6 border-brand-pink-glow/30">
              <h3 className="text-xl font-bold text-white mb-4">Live UI Simulation (Booking Now)</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-sm text-gray-300">User_{Math.floor(Math.random() * 1000)} booking Gym Slot...</p>
                    </div>
                    <span className="text-xs text-gray-500">Just now</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Area */}
        <div className="space-y-8">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <ActionButton icon={Calendar} label="Book Slot" />
              <ActionButton icon={MapIcon} label="View Map" />
              <ActionButton icon={Ticket} label="My Pass" />
              <ActionButton icon={Activity} label="History" />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-brand-pink-glow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <h3 className="text-lg font-bold text-white mb-2 relative z-10">Predictive Crowd</h3>
            <p className="text-sm text-gray-400 mb-4 relative z-10">Library will reach 90% capacity in 45 mins.</p>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden relative z-10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-brand-purple to-brand-pink-glow"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, trend, color }: any) {
  const colorMap: Record<string, string> = {
    pink: 'text-brand-pink-glow shadow-[0_0_15px_rgba(255,0,127,0.3)] border-brand-pink-glow/30',
    purple: 'text-brand-purple shadow-[0_0_15px_rgba(126,34,206,0.3)] border-brand-purple/30',
    gold: 'text-brand-gold shadow-[0_0_15px_rgba(251,191,36,0.3)] border-brand-gold/30',
    green: 'text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.3)] border-green-400/30',
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden group"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-400 font-medium">{title}</p>
          <h4 className="text-3xl font-bold text-white mt-1">{value}</h4>
        </div>
        <div className={`p-3 rounded-xl bg-white/5 border ${colorMap[color]}`}>
          <Icon size={20} className="currentColor" />
        </div>
      </div>
      <p className="text-sm text-gray-500">{trend}</p>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
    </motion.div>
  );
}

function RecommendationCard({ title, time, reason, match }: any) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-brand-pink-glow/50 transition-colors group cursor-pointer relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-pink-glow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 flex justify-between items-center">
        <div>
          <h4 className="font-bold text-white text-lg">{title}</h4>
          <p className="text-sm text-brand-gold mt-1">{time}</p>
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
            <Zap size={12} className="text-brand-pink-glow" /> {reason}
          </p>
        </div>
        <div className="text-right">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-brand-purple text-brand-purple font-bold text-sm">
            {match}
          </div>
          <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Match</p>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label }: any) {
  return (
    <button className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-pink-glow/50 transition-all group">
      <Icon size={24} className="text-gray-400 group-hover:text-brand-pink-glow transition-colors" />
      <span className="text-sm font-medium text-gray-300 group-hover:text-white">{label}</span>
    </button>
  );
}
