'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Bell, Lock, Eye, Monitor, Smartphone, Shield } from 'lucide-react';

export function Settings() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Settings</h2>
        <p className="text-gray-400 mt-1">Manage your account preferences and system settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Notifications */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-brand-pink-glow/20 text-brand-pink-glow">
                <Bell size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <ToggleSetting title="Push Notifications" description="Receive alerts on your device" defaultChecked={true} />
              <ToggleSetting title="Email Updates" description="Daily summary of campus activities" defaultChecked={false} />
              <ToggleSetting title="Booking Reminders" description="Get notified 30 mins before your slot" defaultChecked={true} />
            </div>
          </div>

          {/* Privacy */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-brand-purple/20 text-brand-purple">
                <Shield size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Privacy & Security</h3>
            </div>
            
            <div className="space-y-4">
              <ToggleSetting title="Location Services" description="Allow app to show your location on map" defaultChecked={true} />
              <ToggleSetting title="Public Profile" description="Let others see your basic info" defaultChecked={false} />
              
              <div className="pt-4 mt-4 border-t border-white/10">
                <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-colors">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-brand-gold/20 text-brand-gold">
                <Eye size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">Appearance</h3>
            </div>
            
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/10 border border-brand-pink-glow/50 text-white">
                <div className="flex items-center gap-3">
                  <Monitor size={18} className="text-brand-pink-glow" />
                  <span>Dark Mode</span>
                </div>
                <div className="w-4 h-4 rounded-full bg-brand-pink-glow" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Smartphone size={18} />
                  <span>System Default</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleSetting({ title, description, defaultChecked }: { title: string, description: string, defaultChecked: boolean }) {
  const [checked, setChecked] = React.useState(defaultChecked);
  
  return (
    <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
      <div>
        <h4 className="text-white font-medium">{title}</h4>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
      <button 
        onClick={() => setChecked(!checked)}
        className={`w-12 h-6 rounded-full relative transition-colors ${checked ? 'bg-brand-pink-glow' : 'bg-gray-700'}`}
      >
        <motion.div 
          layout
          className="w-4 h-4 rounded-full bg-white absolute top-1"
          initial={false}
          animate={{ left: checked ? 'calc(100% - 20px)' : '4px' }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}
