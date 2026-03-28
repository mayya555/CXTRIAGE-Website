import React, { useState, useEffect } from 'react';
import { 
  Users, Activity, FileText, Settings, Shield, 
  Upload, Camera, Clock, CheckCircle, AlertTriangle,
  Home, FolderOpen, Bell, Menu, Search, Filter, X
} from 'lucide-react';

export const AdminNav = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (t: string) => void }) => (
  <div className="h-20 bg-surface-container-low border-t border-outline-variant grid grid-cols-4 items-center pb-4">
    <NavBtn icon={<Home />} label="Dash" active={activeTab === 'dashboard'} onClick={() => onTabChange('dashboard')} />
    <NavBtn icon={<Users />} label="Users" active={activeTab === 'users'} onClick={() => onTabChange('users')} />
    <NavBtn icon={<Activity />} label="System" active={activeTab === 'system'} onClick={() => onTabChange('system')} />
    <NavBtn icon={<FileText />} label="Logs" active={activeTab === 'logs'} onClick={() => onTabChange('logs')} />
  </div>
);

export const TechNav = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (t: string) => void }) => (
  <div className="h-20 bg-surface-container-low border-t border-outline-variant grid grid-cols-4 items-center pb-4">
    <NavBtn icon={<Home />} label="Home" active={activeTab === 'dashboard'} onClick={() => onTabChange('dashboard')} />
    <NavBtn icon={<Camera />} label="Scan" active={activeTab === 'scan'} onClick={() => onTabChange('scan')} />
    <NavBtn icon={<Clock />} label="History" active={activeTab === 'history'} onClick={() => onTabChange('history')} />
    <NavBtn icon={<Settings />} label="Settings" active={activeTab === 'settings'} onClick={() => onTabChange('settings')} />
  </div>
);

export const DocNav = ({ activeTab, onTabChange }: { activeTab: string, onTabChange: (t: string) => void }) => (
  <div className="h-20 bg-surface-container-low border-t border-outline-variant grid grid-cols-4 items-center pb-4">
    <NavBtn icon={<Home />} label="Home" active={activeTab === 'dashboard'} onClick={() => onTabChange('dashboard')} />
    <NavBtn icon={<FolderOpen />} label="Cases" active={activeTab === 'cases'} onClick={() => onTabChange('cases')} />
    <NavBtn icon={<Bell />} label="Alerts" active={activeTab === 'alerts'} onClick={() => onTabChange('alerts')} />
    <NavBtn icon={<Clock />} label="History" active={activeTab === 'history'} onClick={() => onTabChange('history')} />
  </div>
);

const NavBtn = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className="flex flex-col items-center justify-center gap-1 w-full h-full">
    <div className={`p-1 px-4 rounded-full transition-colors ${active ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant'}`}>
      {React.cloneElement(icon as React.ReactElement, { size: 24 })}
    </div>
    <span className={`text-xs font-medium ${active ? 'text-on-surface' : 'text-on-surface-variant'}`}>{label}</span>
  </button>
);
