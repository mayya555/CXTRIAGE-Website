import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  Activity, LayoutDashboard, Camera, FileText, History,
  Users, AlertCircle, Brain, ClipboardList, LogOut,
  Bell, Search, ChevronRight, User, Menu,
  TrendingUp, X, Clock, CheckCircle, Settings
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
}

const technicianNav: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/technician/dashboard' },
  { label: 'New Scan', icon: Camera, path: '/technician/patient-registration' },
  { label: 'Scan History', icon: History, path: '/technician/scan-history' },
];

const doctorNav: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/doctor/dashboard' },
  { label: 'Case Queue', icon: FileText, path: '/doctor/new-cases', badge: 8 },
  { label: 'Critical Alerts', icon: AlertCircle, path: '/doctor/critical-alerts', badge: 3 },
  { label: 'Patient History', icon: Users, path: '/doctor/patient-history' },
  { label: 'Reports', icon: ClipboardList, path: '/doctor/patient-history' },
];

import { getNotifications } from '../../lib/api';

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface WebAppLayoutProps {
  children: React.ReactNode;
  role: 'technician' | 'doctor';
  title?: string;
  subtitle?: string;
  breadcrumbs?: { label: string; path?: string }[];
}

export function WebAppLayout({ children, role, title, subtitle, breadcrumbs }: WebAppLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notifRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n: any) => !n.read).length;

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const id = parseInt(localStorage.getItem(role === 'technician' ? 'technicianId' : 'doctorId') || '1');
        const data = await getNotifications(id, role);
        setNotifications(data);
      } catch (err) {
        console.error('Failed to fetch notifications', err);
      }
    };
    fetchNotifs();
    const interval = setInterval(fetchNotifs, 5000); // 5s poll for real-time
    return () => clearInterval(interval);
  }, [role]);

  const navItems = role === 'technician' ? technicianNav : doctorNav;
  const storedName = role === 'technician' ? localStorage.getItem('technicianName') : localStorage.getItem('doctorName');
  const storedRole = role === 'technician' ? localStorage.getItem('technicianRole') : localStorage.getItem('doctorSpecialization');
  
  const userName = storedName || (role === 'technician' ? 'Sarah Williams' : 'Dr. Michael Chen');
  const userRole = storedRole || (role === 'technician' ? 'Senior Radiographer' : 'Radiologist');
  const userPhoto = role === 'technician' ? localStorage.getItem('technicianPhoto') : localStorage.getItem('doctorPhoto');
  const initials = userName.split(' ').map(n => n[0]).join('');
  const profilePath = role === 'technician' ? '/technician/profile' : '/doctor/profile';
  const settingsPath = role === 'technician' ? '/technician/settings' : '/doctor/settings';

  const handleLogout = () => navigate('/login');

  // Close notifications on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isNavActive = (path: string) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path + '/'));
  };

  const handleNotificationClick = (n: any) => {
    setShowNotifications(false);
    if (n.case_id) {
       navigate(`/doctor/report-generation/${n.case_id}`);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-[#0f172a] text-white transition-all duration-300 flex-shrink-0 ${
          sidebarOpen ? 'w-[220px]' : 'w-16'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-700/50 flex-shrink-0">
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-900/40">
            <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="font-bold text-sm text-white leading-tight tracking-tight">CXRT AI</p>
              <p className="text-[10px] text-blue-400 leading-tight capitalize">{role} Portal</p>
            </div>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isNavActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                title={!sidebarOpen ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-md shadow-blue-900/30'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="bg-red-500 text-white text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {!sidebarOpen && item.badge && (
                  <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Divider + Secondary Nav */}
        <div className="px-2 pb-2 space-y-0.5">
          <button
            onClick={() => navigate(profilePath)}
            title={!sidebarOpen ? 'Profile' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              location.pathname.includes('/profile')
                ? 'bg-slate-700 text-white'
                : 'text-slate-500 hover:bg-slate-800/60 hover:text-slate-300'
            }`}
          >
            <User className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Profile</span>}
          </button>
          <button
            onClick={() => navigate(settingsPath)}
            title={!sidebarOpen ? 'Settings' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              location.pathname.includes('/settings')
                ? 'bg-slate-700 text-white'
                : 'text-slate-500 hover:bg-slate-800/60 hover:text-slate-300'
            }`}
          >
            <Settings className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Settings</span>}
          </button>
        </div>

        {/* User Section */}
        <div className="border-t border-slate-700/50 p-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate(profilePath)}
              className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 hover:ring-2 hover:ring-blue-500/50 transition-all overflow-hidden shadow-inner"
            >
              {userPhoto ? (
                <img src={userPhoto} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[11px] font-bold text-white">{initials}</span>
              )}
            </button>
            {sidebarOpen && (
              <>
                <div className="flex-1 overflow-hidden min-w-0">
                  <p className="text-xs font-semibold text-white truncate leading-tight">{userName}</p>
                  <p className="text-[10px] text-slate-400 truncate leading-tight">{userRole}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors flex-shrink-0"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-5 py-3 flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1">
              {breadcrumbs.map((crumb, i) => (
                <div key={i} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="w-3 h-3 text-slate-300" />}
                  {crumb.path ? (
                    <button
                      onClick={() => navigate(crumb.path!)}
                      className="text-xs text-[#2563EB] hover:underline font-medium"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className="text-xs text-slate-500 font-medium">{crumb.label}</span>
                  )}
                </div>
              ))}
            </nav>
          )}

          <div className="flex-1" />

          {/* Search */}
          <div className="relative hidden lg:flex items-center">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patients, cases..."
              className="pl-8 pr-4 py-1.5 bg-slate-100 border-0 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white w-52 transition-all text-slate-600 placeholder-slate-400"
            />
          </div>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-500 hover:text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-xl shadow-slate-200/80 z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800">Notifications</p>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <span className="text-[10px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded-full">{unreadCount} new</span>
                    )}
                    <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                  {notifications.length === 0 && (
                    <div className="p-6 text-center text-slate-400 text-xs">
                      No new notifications
                    </div>
                  )}
                  {notifications.map((n: any) => (
                    <div
                      key={n.id}
                      onClick={() => handleNotificationClick(n)}
                      className={`px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors ${!n.read ? 'bg-blue-50/40' : ''}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${
                          n.type === 'critical' ? 'bg-red-500' : n.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                          <p className="text-xs text-slate-500 mt-0.5 truncate">{n.message}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                        </div>
                        {!n.read && <div className="w-1.5 h-1.5 bg-[#2563EB] rounded-full flex-shrink-0 mt-1" />}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-slate-100 text-center">
                  <button className="text-xs text-[#2563EB] font-medium hover:underline">View all notifications</button>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <button
            onClick={() => navigate(profilePath)}
            className="flex items-center gap-2.5 pl-2 hover:bg-slate-50 rounded-lg pr-2 py-1.5 transition-colors group"
          >
            <div className="w-7 h-7 bg-gradient-to-br from-[#2563EB] to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden shadow-inner ring-1 ring-slate-200">
              {userPhoto ? (
                <img src={userPhoto} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] font-bold text-white">{initials}</span>
              )}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-tight">{userName}</p>
              <p className="text-[10px] text-slate-500 leading-tight">{userRole}</p>
            </div>
          </button>
        </header>

        {/* Page Header */}
        {(title || subtitle) && (
          <div className="bg-white border-b border-slate-100 px-6 py-3.5 flex-shrink-0">
            {title && <h1 className="text-slate-900">{title}</h1>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}