import { Home, FileText, Settings, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

export function BottomNavTechnician() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/technician/dashboard' },
    { icon: FileText, label: 'History', path: '/technician/scan-history' },
    { icon: Settings, label: 'Settings', path: '/technician/profile' },
    { icon: User, label: 'Profile', path: '/technician/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-[428px] mx-auto px-4 py-2 flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-colors ${
                isActive ? 'text-[#2563EB]' : 'text-gray-500'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
