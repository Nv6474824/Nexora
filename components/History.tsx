'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

export function History() {
  const historyData = [
    { id: 1, resource: 'Advanced AI Lab', date: 'Today, 10:00 AM', status: 'completed', duration: '2h' },
    { id: 2, resource: 'Gym - Cardio Zone', date: 'Yesterday, 05:30 PM', status: 'completed', duration: '1.5h' },
    { id: 3, resource: 'Library Study Pod', date: 'Oct 12, 02:00 PM', status: 'cancelled', duration: '-' },
    { id: 4, resource: 'Main Auditorium', date: 'Oct 10, 09:00 AM', status: 'completed', duration: '3h' },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Booking History</h2>
        <p className="text-gray-400 mt-1">Review your past activities and rebook easily.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {historyData.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-5 flex items-center justify-between group hover:border-brand-purple/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${item.status === 'completed' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {item.status === 'completed' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{item.resource}</h4>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Clock size={14} /> {item.date}</span>
                    {item.duration !== '-' && <span>• {item.duration}</span>}
                  </div>
                </div>
              </div>
              
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-brand-purple/20 text-gray-300 hover:text-brand-pink-glow transition-all opacity-0 group-hover:opacity-100">
                <RotateCcw size={16} />
                <span className="text-sm font-medium">Rebook</span>
              </button>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Analytics Summary</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Completion Rate</span>
                  <span className="text-white font-bold">92%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-gradient-to-r from-brand-purple to-brand-pink-glow" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Most Visited</span>
                  <span className="text-white font-bold">Labs</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[60%] bg-brand-purple" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
