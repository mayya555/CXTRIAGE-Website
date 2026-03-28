import React, { useState } from 'react';
import { 
  ArrowLeft, Menu, Bell, User, LogOut, Settings, 
  Home, Activity, FileText, Users, BarChart3, 
  MessageSquare, HelpCircle, ChevronLeft, X,
  Stethoscope, Scan, ClipboardList, History
} from 'lucide-react';
import { Button } from '../ui/button';

interface WebLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  role?: 'admin' | 'technician' | 'doctor';
  currentScreen?: number;
  showSidebar?: boolean;
  onNavigate?: (screen: number) => void;
  onLogout?: () => void;
}

export const WebLayout = ({ 
  children, 
  title, 
  showBack, 
  onBack, 
  actions,
  role,
  currentScreen,
  showSidebar = true,
  onNavigate,
  onLogout
}: WebLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const roleColors = {
    admin: {
      primary: 'bg-slate-900',
      hover: 'hover:bg-slate-800',
      active: 'bg-slate-800',
      text: 'text-slate-900'
    },
    technician: {
      primary: 'bg-[#2563EB]',
      hover: 'hover:bg-[#1d4ed8]',
      active: 'bg-[#1d4ed8]',
      text: 'text-[#2563EB]'
    },
    doctor: {
      primary: 'bg-[#2563EB]',
      hover: 'hover:bg-[#1d4ed8]',
      active: 'bg-[#1d4ed8]',
      text: 'text-[#2563EB]'
    },
  };

  const colors = role ? roleColors[role] : roleColors.doctor;

  // Navigation items based on role
  const getNavItems = () => {
    if (role === 'doctor') {
      return [
        { icon: Home, label: 'Dashboard', screen: 36 },
        { icon: Activity, label: 'Active Cases', screen: 38 },
        { icon: History, label: 'History', screen: 48 },
        { icon: MessageSquare, label: 'AI Assistant', screen: 85 },
        { icon: Settings, label: 'Settings', screen: 62 },
      ];
    } else if (role === 'technician') {
      return [
        { icon: Home, label: 'Dashboard', screen: 23 },
        { icon: Scan, label: 'Scan X-Ray', screen: 25 },
        { icon: ClipboardList, label: 'Patient Queue', screen: 27 },
        { icon: History, label: 'History', screen: 33 },
        { icon: Settings, label: 'Settings', screen: 61 },
      ];
    } else if (role === 'admin') {
      return [
        { icon: Home, label: 'Dashboard', screen: 8 },
        { icon: Users, label: 'Users', screen: 9 },
        { icon: BarChart3, label: 'Analytics', screen: 13 },
        { icon: FileText, label: 'Reports', screen: 14 },
        { icon: Settings, label: 'Settings', screen: 60 },
      ];
    }
    return [];
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen w-full bg-slate-50 flex font-sans">
      {/* Sidebar - Desktop */}
      {showSidebar && role && (
        <>
          {/* Desktop Sidebar */}
          <aside 
            className={`hidden lg:flex flex-col ${sidebarCollapsed ? 'w-20' : 'w-64'} ${colors.primary} text-white transition-all duration-300 shrink-0`}
          >
            {/* Logo Section */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
              {!sidebarCollapsed && (
                <div className="flex items-center gap-2">
                  <Activity className="w-6 h-6" />
                  <span className="font-bold text-lg">CXRT AI</span>
                </div>
              )}
              {sidebarCollapsed && <Activity className="w-6 h-6 mx-auto" />}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ChevronLeft className={`w-5 h-5 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.screen;
                return (
                  <button
                    key={item.screen}
                    onClick={() => onNavigate?.(item.screen)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive ? 'bg-white/20' : 'hover:bg-white/10'
                    } ${sidebarCollapsed ? 'justify-center' : ''}`}
                    title={sidebarCollapsed ? item.label : ''}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
                  </button>
                );
              })}
            </nav>

            {/* User Section */}
            <div className="border-t border-white/10 p-3">
              {!sidebarCollapsed ? (
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {role === 'doctor' ? 'Dr. Smith' : role === 'technician' ? 'Tech User' : 'Admin'}
                    </p>
                    <p className="text-xs text-white/70 truncate capitalize">{role}</p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onLogout}
                  className="w-full p-2.5 hover:bg-white/10 rounded-lg transition-colors flex justify-center"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              )}
            </div>
          </aside>

          {/* Mobile Sidebar Overlay */}
          {mobileSidebarOpen && (
            <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setMobileSidebarOpen(false)}>
              <aside 
                className={`w-64 h-full ${colors.primary} text-white flex flex-col`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Logo Section */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Activity className="w-6 h-6" />
                    <span className="font-bold text-lg">CXRT AI</span>
                  </div>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentScreen === item.screen;
                    return (
                      <button
                        key={item.screen}
                        onClick={() => {
                          onNavigate?.(item.screen);
                          setMobileSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          isActive ? 'bg-white/20' : 'hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* User Section */}
                <div className="border-t border-white/10 p-3">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        {role === 'doctor' ? 'Dr. Smith' : role === 'technician' ? 'Tech User' : 'Admin'}
                      </p>
                      <p className="text-xs text-white/70 truncate capitalize">{role}</p>
                    </div>
                    <button
                      onClick={onLogout}
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                      title="Sign Out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        {(title || showBack || actions || (showSidebar && role)) && (
          <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 shrink-0 sticky top-0 z-40">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              {showSidebar && role && (
                <button
                  onClick={() => setMobileSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              
              {showBack && (
                <button 
                  onClick={onBack} 
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              {title && <h1 className="text-xl font-semibold text-slate-900">{title}</h1>}
            </div>
            <div className="flex items-center gap-2">
              {actions}
            </div>
          </header>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
};
