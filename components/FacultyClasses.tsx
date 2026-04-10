'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Calendar as CalendarIcon, Star, Plus } from 'lucide-react';

export function FacultyClasses() {
  const [classes] = useState([
    { id: 1, name: 'Advanced Machine Learning', time: 'Mon, Wed 10:00 AM', room: 'Innovation Lab 1', students: 45 },
    { id: 2, name: 'Data Structures', time: 'Tue, Thu 02:00 PM', room: 'Main Auditorium', students: 120 },
  ]);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">My Classes & Groups</h2>
          <p className="text-gray-400 mt-1">Manage your scheduled classes and priority bookings.</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-brand-purple hover:bg-brand-purple-dark text-white font-medium transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(126,34,206,0.5)]">
          <Plus size={18} /> New Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <motion.div 
            key={cls.id}
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-6 border-white/10 hover:border-brand-gold/50 transition-colors group"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{cls.name}</h3>
              <div className="p-2 rounded-lg bg-brand-gold/10 text-brand-gold">
                <Star size={18} />
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <CalendarIcon size={16} className="text-brand-purple" />
                <span>{cls.time}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Users size={16} className="text-brand-pink-glow" />
                <span>{cls.students} Students Enrolled</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors">
                Manage Roster
              </button>
              <button className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium text-white transition-colors">
                Book Resource
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
