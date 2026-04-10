'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Role } from './Sidebar';
import { Calendar as CalendarIcon, Clock, MapPin, Star, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import Image from 'next/image';

interface BookingSystemProps {
  role: Role;
  resourceType: string; // 'gym', 'labs', 'library', 'auditorium', 'equipment'
}

export function BookingSystem({ role, resourceType }: BookingSystemProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    // Set a dynamic background image based on resource type using high-quality Unsplash photos
    const imageMap: Record<string, string> = {
      gym: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=80',
      labs: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80',
      library: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1920&q=80',
      auditorium: 'https://images.unsplash.com/photo-1507676184212-d0330a15233c?auto=format&fit=crop&w=1920&q=80',
      equipment: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1920&q=80'
    };
    setBgImage(imageMap[resourceType] || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80');
  }, [resourceType]);

  const slots = [
    { id: '1', time: '09:00 AM - 10:00 AM', status: 'available', demand: 'low' },
    { id: '2', time: '10:00 AM - 11:00 AM', status: 'available', demand: 'high', recommended: true },
    { id: '3', time: '11:00 AM - 12:00 PM', status: 'full', demand: 'high' },
    { id: '4', time: '01:00 PM - 02:00 PM', status: 'available', demand: 'medium' },
    { id: '5', time: '02:00 PM - 03:00 PM', status: 'available', demand: 'low' },
  ];

  const handleBook = () => {
    setShowConfirm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="relative min-h-[calc(100vh-80px)] p-8">
      {/* Dynamic Background Image */}
      {bgImage && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image 
            src={bgImage} 
            alt={resourceType} 
            fill 
            className="object-cover opacity-20 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        </div>
      )}

      <div className="relative z-10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white capitalize tracking-tight">{resourceType} Booking</h2>
            <p className="text-gray-400 mt-1">
              {role === 'Admin' ? 'Manage slots and resources' : 'Select a date and time slot to book'}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-3 border-white/10 relative">
              <CalendarIcon size={18} className="text-brand-pink-glow" />
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-white focus:outline-none text-sm font-medium cursor-pointer relative z-10 w-full"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            {role === 'Faculty' && (
              <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 border-brand-gold/30">
                <Star className="text-brand-gold" size={16} fill="currentColor" />
                <span className="text-sm font-medium text-brand-gold">Priority Access</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Available Slots for {new Date(selectedDate).toLocaleDateString()}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {slots.map((slot) => (
                  <motion.div
                    key={slot.id}
                    whileHover={{ scale: slot.status !== 'full' ? 1.02 : 1 }}
                    onClick={() => slot.status !== 'full' && setSelectedSlot(slot.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                      selectedSlot === slot.id 
                        ? 'bg-brand-pink-glow/20 border-brand-pink-glow shadow-[0_0_15px_rgba(255,0,127,0.3)]' 
                        : slot.status === 'full'
                          ? 'bg-white/5 border-white/5 opacity-50 cursor-not-allowed'
                          : 'bg-white/5 border-white/10 hover:border-brand-purple/50'
                    }`}
                  >
                    {slot.recommended && role === 'Student' && (
                      <div className="absolute top-0 right-0 bg-brand-purple text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg flex items-center gap-1">
                        <Zap size={10} /> RECOMMENDED
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3 mb-2">
                      <Clock size={18} className={selectedSlot === slot.id ? 'text-brand-pink-glow' : 'text-gray-400'} />
                      <span className="font-medium text-white">{slot.time}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className={`text-xs px-2 py-1 rounded-md ${
                        slot.status === 'full' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        {slot.status.toUpperCase()}
                      </span>
                      
                      {role === 'Admin' && (
                        <button className="text-xs text-brand-pink-glow hover:underline">
                          Manage
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {role !== 'Admin' && (
                <div className="mt-8 flex justify-end">
                  <button 
                    disabled={!selectedSlot}
                    onClick={() => setShowConfirm(true)}
                    className={`px-8 py-3 rounded-xl font-bold transition-all ${
                      selectedSlot 
                        ? 'bg-gradient-to-r from-brand-purple to-brand-pink-glow text-white shadow-[0_0_20px_rgba(255,0,127,0.4)] hover:shadow-[0_0_30px_rgba(255,0,127,0.6)] hover:scale-105' 
                        : 'bg-white/10 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Confirm Booking
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Resource Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-brand-pink-glow mt-1" />
                  <div>
                    <p className="font-medium text-white">Location</p>
                    <p className="text-sm text-gray-400">North Wing, Floor 2</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-brand-gold mt-1" />
                  <div>
                    <p className="font-medium text-white">Guidelines</p>
                    <p className="text-sm text-gray-400">Please arrive 5 mins early. ID card required for entry.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {role === 'Admin' && (
              <div className="glass-card rounded-2xl p-6 border-brand-pink-glow/30">
                <h3 className="text-lg font-bold text-white mb-4">Admin Controls</h3>
                <div className="space-y-3">
                  <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors">
                    Disable Resource
                  </button>
                  <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-white transition-colors">
                    Override Bookings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="glass-card w-full max-w-md rounded-2xl p-6 border-brand-pink-glow/30 shadow-[0_0_50px_rgba(255,0,127,0.15)]"
              >
                <h3 className="text-2xl font-bold text-white mb-2">Confirm Booking</h3>
                <p className="text-gray-400 mb-6">Are you sure you want to book this slot? This will affect your booking score if you cancel late.</p>
                
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-sm font-medium text-white">{new Date(selectedDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="text-sm font-medium text-white">{slots.find(s => s.id === selectedSlot)?.time}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowConfirm(false)}
                    className="flex-1 py-3 rounded-xl font-medium text-white bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleBook}
                    className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-brand-purple to-brand-pink-glow shadow-[0_0_15px_rgba(255,0,127,0.4)] hover:shadow-[0_0_25px_rgba(255,0,127,0.6)] transition-all"
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Success Popup */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: 50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 50, x: '-50%' }}
              className="fixed bottom-10 left-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-full glass-card border-green-500/30 shadow-[0_0_30px_rgba(74,222,128,0.2)]"
            >
              <CheckCircle2 className="text-green-400" size={24} />
              <span className="font-medium text-white">Booking confirmed successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
