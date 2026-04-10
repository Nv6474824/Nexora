'use client';

import React from 'react';
import { motion } from 'motion/react';
import { BellRing, Calendar, AlertTriangle, Info, Zap } from 'lucide-react';

export function Announcements() {
  const announcements = [
    {
      id: 1,
      title: 'Campus Maintenance Scheduled',
      date: 'Today, 10:00 AM',
      type: 'alert',
      content: 'The central library will be closed for maintenance from 2:00 PM to 4:00 PM today. Please plan your study sessions accordingly.',
      icon: AlertTriangle,
      color: 'text-brand-gold',
      bg: 'bg-brand-gold/10',
      border: 'border-brand-gold/30'
    },
    {
      id: 2,
      title: 'New AI Lab Equipment Available',
      date: 'Yesterday, 3:30 PM',
      type: 'info',
      content: 'We have just installed 10 new high-performance workstations in the Innovation Labs. Bookings are now open for all students.',
      icon: Zap,
      color: 'text-brand-pink-glow',
      bg: 'bg-brand-pink-glow/10',
      border: 'border-brand-pink-glow/30'
    },
    {
      id: 3,
      title: 'Upcoming Tech Symposium',
      date: 'Oct 24, 2026',
      type: 'event',
      content: 'Join us for the annual Nexora Campus Tech Symposium. Guest speakers from leading tech companies will be presenting in the Main Auditorium.',
      icon: Calendar,
      color: 'text-brand-purple',
      bg: 'bg-brand-purple/10',
      border: 'border-brand-purple/30'
    },
    {
      id: 4,
      title: 'System Update Completed',
      date: 'Oct 22, 2026',
      type: 'system',
      content: 'The Smart Campus Management System has been updated to version 2.4. Enjoy the new predictive crowd features and enhanced map.',
      icon: Info,
      color: 'text-green-400',
      bg: 'bg-green-400/10',
      border: 'border-green-400/30'
    }
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Announcements</h2>
        <p className="text-gray-400 mt-1">Stay updated with the latest news and events on campus.</p>
      </div>

      <div className="space-y-6 max-w-4xl">
        {announcements.map((announcement, index) => {
          const Icon = announcement.icon;
          return (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card rounded-2xl p-6 border ${announcement.border} relative overflow-hidden group`}
            >
              <div className={`absolute top-0 left-0 w-1 h-full ${announcement.bg.replace('/10', '')}`} />
              
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${announcement.bg} ${announcement.color}`}>
                  <Icon size={24} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{announcement.title}</h3>
                    <span className="text-sm text-gray-500">{announcement.date}</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{announcement.content}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
