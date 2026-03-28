import React from 'react';
import { ArrowLeft, Menu, Bell, User, LogOut, Settings } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  role?: 'admin' | 'technician' | 'doctor';
  currentScreen?: number;
}

export const MobileFrame = ({ 
  children, 
  title, 
  showBack, 
  onBack, 
  actions,
  role,
  currentScreen
}: MobileFrameProps) => {
  const roleColors = {
    admin: 'bg-slate-900',
    technician: 'bg-[#2563EB]',
    doctor: 'bg-[#2563EB]',
  };

  return (
    // Updated to be responsive for web - removes mobile frame on larger screens
    <div className="min-h-screen w-full bg-slate-50 font-sans">
      <div className="w-full h-full min-h-screen bg-white flex flex-col relative">
        
        {/* Dynamic Top Bar - Now responsive */}
        {(title || showBack || actions) && (
          <header className={cn("h-16 flex items-center justify-between px-4 lg:px-6 text-white shadow-sm shrink-0 z-10 transition-colors sticky top-0", role ? roleColors[role] : 'bg-primary')}>
            <div className="flex items-center gap-3">
              {showBack && (
                <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <h1 className="text-lg lg:text-xl font-semibold tracking-tight">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              {actions}
            </div>
          </header>
        )}

        {/* Main Scrollable Content - Responsive */}
        <main className="flex-1 overflow-y-auto bg-slate-50 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

// Helper for conditional classes
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}
