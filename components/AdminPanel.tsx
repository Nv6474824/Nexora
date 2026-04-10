'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Clock, AlertTriangle, ShieldAlert, Check } from 'lucide-react';
import { getBookings, updateBookingStatus, Booking } from '@/lib/bookings';
import { getQueries, resolveQuery, markQueryPending, Query } from '@/lib/queries';

export function AdminPanel() {
  const [pendingBookings, setPendingBookings] = useState<Booking[]>([]);
  const [allQueries, setAllQueries] = useState<Query[]>([]);

  useEffect(() => {
    setPendingBookings(getBookings().filter(b => b.status === 'pending'));
    setAllQueries(getQueries());
  }, []);

  const handleBookingAction = (id: string, action: 'approved' | 'rejected') => {
    updateBookingStatus(id, action);
    setPendingBookings(getBookings().filter(b => b.status === 'pending'));
  };

  const handleQueryAction = (id: string, action: 'resolve' | 'pending') => {
    if (action === 'resolve') {
      resolveQuery(id);
    } else {
      markQueryPending(id);
    }
    setAllQueries(getQueries());
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
              <ShieldAlert className="text-brand-pink-glow" /> Pending Booking Requests
            </h3>
            
            <div className="space-y-4">
              <AnimatePresence>
                {pendingBookings.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-center py-8 text-gray-500"
                  >
                    No pending booking requests.
                  </motion.div>
                ) : (
                  pendingBookings.map((req) => (
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
                            Booking
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={12} /> {req.date} • {req.time}
                          </span>
                        </div>
                        <h4 className="font-bold text-white">{req.userId}</h4>
                        <p className="text-sm text-gray-400">{req.resource}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleBookingAction(req.id, 'rejected')}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                          <XCircle size={20} />
                        </button>
                        <button 
                          onClick={() => handleBookingAction(req.id, 'approved')}
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

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="text-brand-purple" /> User Queries
            </h3>
            
            <div className="space-y-4">
              <AnimatePresence>
                {allQueries.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-center py-8 text-gray-500"
                  >
                    No queries found.
                  </motion.div>
                ) : (
                  allQueries.map((req) => (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                        req.status === 'resolved' 
                          ? 'bg-green-500/5 border-green-500/20' 
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${
                            req.status === 'resolved' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-brand-purple'
                          }`}>
                            {req.status}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock size={12} /> {req.time}
                          </span>
                        </div>
                        <h4 className="font-bold text-white">{req.user}</h4>
                        <p className="text-sm text-gray-400">{req.text}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {req.status === 'pending' ? (
                          <button 
                            onClick={() => handleQueryAction(req.id, 'resolve')}
                            className="px-4 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors text-sm font-bold flex items-center gap-2"
                          >
                            <Check size={16} /> Mark Solved
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleQueryAction(req.id, 'pending')}
                            className="px-4 py-2 rounded-lg bg-brand-gold/10 text-brand-gold hover:bg-brand-gold/20 transition-colors text-sm font-bold flex items-center gap-2"
                          >
                            <Clock size={16} /> Mark Pending
                          </button>
                        )}
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
