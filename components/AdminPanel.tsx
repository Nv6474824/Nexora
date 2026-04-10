'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Clock, AlertTriangle, ShieldAlert } from 'lucide-react';

export function AdminPanel() {
  const [requests, setRequests] = useState([
    { id: 1, user: 'Alex Carter', type: 'Booking', detail: 'Main Auditorium (Oct 15)', status: 'pending', time: '10 mins ago' },
    { id: 2, user: 'Dr. Sarah Chen', type: 'Priority Override', detail: 'Advanced AI Lab', status: 'pending', time: '1 hour ago' },
    { id: 3, user: 'John Doe', type: 'Query', detail: 'ID Card Replacement', status: 'pending', time: '2 hours ago' },
  ]);

  const handleAction = (id: number, action: 'approve' | 'reject') => {
    setRequests(prev => prev.filter(req => req.id !== id));
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Admin Control Panel</h2>
        <p className="text-gray-400 mt-1">Manage system requests, overrides, and user queries.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldAlert className="text-brand-pink-glow" /> Pending Requests
            </h3>
            
            <div className="space-y-4">
              <AnimatePresence>
                {requests.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-center py-8 text-gray-500"
                  >
                    No pending requests.
                  </motion.div>
                ) : (
                  requests.map((req) => (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold px-2 py-1 rounded bg-white/10 text-brand-gold uppercase tracking-wider">
                            {req.type}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={12} /> {req.time}
                          </span>
                        </div>
                        <h4 className="font-bold text-white">{req.user}</h4>
                        <p className="text-sm text-gray-400">{req.detail}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleAction(req.id, 'reject')}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <XCircle size={20} />
                        </button>
                        <button 
                          onClick={() => handleAction(req.id, 'approve')}
                          className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                        >
                          <CheckCircle2 size={20} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border-red-500/30">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-400" /> System Alerts
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-sm font-medium text-red-400">High Server Load</p>
                <p className="text-xs text-gray-400 mt-1">Booking system experiencing 85% capacity.</p>
              </div>
              <div className="p-3 rounded-xl bg-brand-gold/10 border border-brand-gold/20">
                <p className="text-sm font-medium text-brand-gold">Maintenance Scheduled</p>
                <p className="text-xs text-gray-400 mt-1">Library network update at 02:00 AM.</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-left text-sm text-gray-300 transition-colors">
                Broadcast Message
              </button>
              <button className="w-full py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-left text-sm text-gray-300 transition-colors">
                Lockdown Resource
              </button>
              <button className="w-full py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-left text-sm text-gray-300 transition-colors">
                Generate Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
