'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Info } from 'lucide-react';

export function CampusMap() {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const zones = [
    { id: 'library', name: 'Central Library', x: 20, y: 30, status: 'busy', color: 'bg-brand-pink-glow' },
    { id: 'gym', name: 'Sports Complex', x: 70, y: 20, status: 'moderate', color: 'bg-brand-gold' },
    { id: 'labs', name: 'Innovation Labs', x: 40, y: 60, status: 'free', color: 'bg-green-400' },
    { id: 'auditorium', name: 'Main Auditorium', x: 80, y: 70, status: 'closed', color: 'bg-gray-500' },
  ];

  return (
    <div className="p-8 space-y-8 h-full flex flex-col">
      <div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Campus Map</h2>
        <p className="text-gray-400 mt-1">Interactive live view of campus zones and availability.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-[500px]">
        <div className="lg:col-span-3 glass-card rounded-3xl relative overflow-hidden border-white/10 group">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(126,34,206,0.15)_0,transparent_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
          
          {zones.map((zone) => (
            <motion.div
              key={zone.id}
              className="absolute cursor-pointer z-10"
              style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
              whileHover={{ scale: 1.2 }}
              onClick={() => setActiveZone(zone.id)}
            >
              <div className="relative">
                <div className={`w-6 h-6 rounded-full ${zone.color} shadow-[0_0_15px_currentColor] flex items-center justify-center relative z-10`}>
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                {/* Pulse effect */}
                {zone.status !== 'closed' && (
                  <div className={`absolute inset-0 rounded-full ${zone.color} animate-ping opacity-50`} />
                )}
                
                <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {zone.name}
                </div>
              </div>
            </motion.div>
          ))}

          <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
            <button className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white hover:bg-white/10 transition-colors">
              +
            </button>
            <button className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white hover:bg-white/10 transition-colors">
              -
            </button>
            <button className="w-10 h-10 rounded-xl glass flex items-center justify-center text-brand-pink-glow hover:bg-white/10 transition-colors mt-2">
              <Navigation size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Zone Details</h3>
            
            {activeZone ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {zones.filter(z => z.id === activeZone).map(zone => (
                  <div key={zone.id}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${zone.color} shadow-[0_0_10px_currentColor]`} />
                      <h4 className="font-bold text-white text-lg">{zone.name}</h4>
                    </div>
                    <p className="text-sm text-gray-400 capitalize mb-4">Status: {zone.status}</p>
                    
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300">
                      <p className="flex items-center gap-2 mb-2"><MapPin size={14} className="text-brand-pink-glow"/> 1.2 km away</p>
                      <p className="flex items-center gap-2"><Info size={14} className="text-brand-purple"/> Tap to view resources</p>
                    </div>
                    
                    <button className="w-full mt-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors text-sm">
                      Navigate Here
                    </button>
                  </div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <MapPin size={32} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">Select a zone on the map to view details</p>
              </div>
            )}
          </div>

          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider text-gray-400">Legend</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]" /> Free
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-3 h-3 rounded-full bg-brand-gold shadow-[0_0_8px_rgba(251,191,36,0.5)]" /> Moderate
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-3 h-3 rounded-full bg-brand-pink-glow shadow-[0_0_8px_rgba(255,0,127,0.5)]" /> Busy
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
