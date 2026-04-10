'use client';

import React, { useState } from 'react';
import { Sidebar, Role } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { Dashboard } from '@/components/Dashboard';
import { BookingSystem } from '@/components/BookingSystem';
import { CampusMap } from '@/components/CampusMap';
import { History } from '@/components/History';
import { MyPass } from '@/components/MyPass';
import { IDCard } from '@/components/IDCard';
import { AboutUs } from '@/components/AboutUs';
import { ContactUs } from '@/components/ContactUs';
import { QuerySystem } from '@/components/QuerySystem';
import { Login } from '@/components/Login';
import { AdminPanel } from '@/components/AdminPanel';
import { FacultyClasses } from '@/components/FacultyClasses';
import { Announcements } from '@/components/Announcements';
import { Settings } from '@/components/Settings';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<Role>('Student');
  const [username, setUsername] = useState('Alex Carter');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLightMode, setIsLightMode] = useState(false);

  const handleLogin = (selectedRole: Role, loggedInUsername: string) => {
    setRole(selectedRole);
    setUsername(loggedInUsername);
    setActiveTab('dashboard');
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard role={role} setActiveTab={setActiveTab} username={username} />;
      case 'announcements':
        return <Announcements />;
      case 'admin-requests':
        return <AdminPanel />;
      case 'faculty-classes':
        return <FacultyClasses />;
      case 'gym':
      case 'labs':
      case 'library':
      case 'auditorium':
      case 'equipment':
        return <BookingSystem role={role} resourceType={activeTab} username={username} />;
      case 'history':
        return <History />;
      case 'idcard':
        return <IDCard role={role} username={username} />;
      case 'about':
        return <AboutUs />;
      case 'contact':
        return <ContactUs />;
      case 'query':
        return <QuerySystem username={username} />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="p-8 flex items-center justify-center h-[calc(100vh-80px)]">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-4xl">🚧</span>
              </div>
              <h2 className="text-2xl font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                This module is currently under development. Check back later for the full futuristic experience.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen bg-background text-foreground flex ${isLightMode ? 'light-mode' : ''}`}>
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-purple/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-pink-glow/10 blur-[120px]" />
      </div>

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        role={role} 
        isLightMode={isLightMode}
        toggleTheme={() => setIsLightMode(!isLightMode)}
      />
      
      <div className="flex-1 flex flex-col relative z-10">
        <Topbar role={role} username={username} />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar ml-64">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
