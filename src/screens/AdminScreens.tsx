import React, { useState, useEffect } from 'react';
import { Button, Input, Card, Badge, Switch } from '../components/ui/Material';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Icons, MOCK_USERS } from '../lib/data';
import { WebLayout } from '../components/layout/WebLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Search, Plus, Filter, ChevronRight, Activity, Users, Settings, FileText, Brain, Shield, Lock, Trash2, Key, Edit, AlertTriangle, CheckCircle2, AlertCircle, RefreshCw, Mail, Download, Check, LogOut, Camera, Server, HardDrive, Cpu, Wifi } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';

// ... (Mock Data) ...
const SYSTEM_PERFORMANCE = [
  { time: '00:00', cpu: 30, mem: 40 },
  { time: '04:00', cpu: 25, mem: 35 },
  { time: '08:00', cpu: 65, mem: 70 },
  { time: '12:00', cpu: 85, mem: 80 },
  { time: '16:00', cpu: 75, mem: 75 },
  { time: '20:00', cpu: 45, mem: 50 },
];

const ACCURACY_TREND = [
  { day: 'Mon', acc: 92 },
  { day: 'Tue', acc: 93 },
  { day: 'Wed', acc: 91 },
  { day: 'Thu', acc: 94 },
  { day: 'Fri', acc: 95 },
  { day: 'Sat', acc: 94 },
  { day: 'Sun', acc: 96 },
];

const LOGS_LOGIN = [
  { id: 1, user: 'Dr. Sarah Bennett', time: '10:42 AM', date: 'Feb 11', ip: '192.168.1.12', status: 'Success' },
  { id: 2, user: 'Tech. James Chen', time: '10:15 AM', date: 'Feb 11', ip: '192.168.1.45', status: 'Failed' },
  { id: 3, user: 'Admin User', time: '09:00 AM', date: 'Feb 11', ip: '10.0.0.5', status: 'Success' },
  { id: 4, user: 'Dr. Emily Wong', time: '08:30 AM', date: 'Feb 11', ip: '192.168.1.18', status: 'Success' },
  { id: 5, user: 'Tech. Mike Ross', time: '08:15 AM', date: 'Feb 11', ip: '192.168.1.42', status: 'Success' },
  { id: 6, user: 'Dr. Sarah Bennett', time: '08:00 AM', date: 'Feb 11', ip: '192.168.1.12', status: 'Success' },
];

const LOGS_SCAN = [
  { id: 101, patient: 'P-1024', result: 'Pneumonia', severity: 'High', time: '10:30 AM', audit: true },
  { id: 102, patient: 'P-1025', result: 'Normal', severity: 'Low', time: '10:15 AM', audit: true },
  { id: 103, patient: 'P-1026', result: 'Tuberculosis', severity: 'Critical', time: '09:45 AM', audit: true },
];

export const AdminScreens = ({ screenId, navigate, setRole }: any) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userFilter, setUserFilter] = useState('All');
  const [logFilter, setLogFilter] = useState('All');
  
  // Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState('System Admin');
  const [profileEmail, setProfileEmail] = useState('admin@hospital.org');
  
  // User Create State
  const [newUser, setNewUser] = useState({ 
    name: '', email: '', phone: '', role: 'Doctor', pass: '', confirm: '', 
    dept: 'Radiology', staffId: '' 
  });

  // Settings State
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [settings, setSettings] = useState({
    adminName: 'System Administrator',
    hospitalName: 'General Hospital',
    contactNumber: '+1 (555) 012-3456',
    sensitivity: 85,
    autoFlag: true,
    aiSuggestions: true,
    priorityColor: 'Standard',
    defaultPriority: 'Normal',
    scanLimit: '500',
    autoLogout: '30 mins',
    twoFactor: true,
    ipRestriction: false,
    sessionTimeout: '30 mins',
    retention: '5 Years',
    backupFreq: 'Daily'
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings({...settings, [key]: value});
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    setHasUnsavedChanges(false);
    toast.success("Settings saved successfully");
  };

  const handleCancelSettings = () => {
    setHasUnsavedChanges(false);
    toast.info("Changes discarded");
  };

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
    setIsEditingProfile(false);
  };

  const handleCreateUser = () => {
    if (newUser.pass !== newUser.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("User created successfully. Login credentials sent to email.");
    navigate(10);
  };

  const NavWrapper = ({ children, title, back = false, actions, tab, className = "", customHeader = false }: any) => (
    <MobileFrame 
      title={title} 
      showBack={back} 
      onBack={() => navigate(back === true ? 8 : back || 8)} 
      role="admin"
      transparentHeader={customHeader}
      actions={
        actions || 
        <div className="flex gap-1">
           <button className="p-2 hover:bg-white/10 rounded-full text-white/80" onClick={() => navigate(60)}>
             <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold border border-white/20">SA</div>
           </button>
        </div>
      }
    >
      <div className={`flex flex-col min-h-full ${className || 'bg-slate-50'}`}>
        {!customHeader && <div className="h-4" />} 
        <div className="flex-1 pb-4">
          {children}
        </div>
        {!back && <div className="sticky bottom-0 w-full z-10 bg-white border-t border-slate-200">
          <AdminNav activeTab={tab || activeTab} onTabChange={(t) => {
             setActiveTab(t);
             if (t === 'dashboard') navigate(8);
             if (t === 'users') navigate(10);
             if (t === 'system') navigate(15);
             if (t === 'logs') navigate(19);
          }} />
        </div>}
      </div>
    </MobileFrame>
  );

  switch (screenId) {
    // --- 8. ADMIN DASHBOARD ---
    case 8: 
      return (
        <div className="flex flex-col h-full bg-slate-50 font-sans">
           <div className="bg-[#0B1120] text-white p-4 pt-12 flex justify-between items-center shrink-0">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold border border-white/10" onClick={() => navigate(60)}>SA</div>
           </div>

           <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
              <div className="grid grid-cols-2 gap-3">
                 <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Daily Throughput</span>
                    <span className="text-3xl font-bold text-slate-900">1,024</span>
                    <div className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold mt-1">Target Met</div>
                 </div>
                 <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-1">
                    <span className="text-xs text-slate-500 font-medium">Avg AI Time</span>
                    <span className="text-3xl font-bold text-slate-900">2.4s</span>
                    <span className="text-[10px] text-green-600 font-bold flex items-center mt-1">↓ 0.2s vs yesterday</span>
                 </div>
              </div>

              <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                 <h3 className="font-bold text-slate-900 text-base mb-4">System Overview</h3>
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                       <div className="text-xs text-slate-500 mb-1">Active Users</div>
                       <div className="text-2xl font-bold text-slate-900">124</div>
                       <div className="text-xs text-blue-600 font-bold mt-1">18 Doctors</div>
                    </div>
                    <div>
                       <div className="text-xs text-slate-500 mb-1">Pending Scans</div>
                       <div className="text-2xl font-bold text-slate-900">7</div>
                       <div className="text-xs text-orange-600 font-bold mt-1">3 Critical Alerts</div>
                    </div>
                 </div>
              </div>

              <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                 <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-slate-900 text-base">AI Model Status</h3>
                    <Badge className="bg-green-100 text-green-700 border-none font-bold">Active</Badge>
                 </div>
                 <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                       <span className="text-slate-500">Model Version</span>
                       <span className="font-mono font-bold text-slate-900">v2.3.1</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-slate-50 pb-3">
                       <span className="text-slate-500">Last Updated</span>
                       <span className="font-bold text-slate-900">2 days ago</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                       <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-sm"/>
                       <span className="text-sm font-bold text-green-600">Running Normally</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <button className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-3 items-center justify-center hover:bg-slate-50 transition-colors h-32" onClick={() => navigate(10)}>
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                       <Users className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm">User Mgmt</span>
                 </button>
                 <button className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-3 items-center justify-center hover:bg-slate-50 transition-colors h-32" onClick={() => navigate(60)}>
                    <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                       <Settings className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm">Settings</span>
                 </button>
                 <button className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-3 items-center justify-center hover:bg-slate-50 transition-colors h-32" onClick={() => navigate(15)}>
                    <div className="w-10 h-10 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                       <Activity className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm">System</span>
                 </button>
                 <button className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-3 items-center justify-center hover:bg-slate-50 transition-colors h-32" onClick={() => navigate(19)}>
                    <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                       <FileText className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm">Logs</span>
                 </button>
              </div>
           </div>
           
           <div className="sticky bottom-0 w-full z-10 bg-white border-t border-slate-200">
              <AdminNav activeTab="dashboard" onTabChange={(t) => {
                 setActiveTab(t);
                 if (t === 'dashboard') navigate(8);
                 if (t === 'users') navigate(10);
                 if (t === 'system') navigate(15);
                 if (t === 'logs') navigate(19);
              }} />
           </div>
        </div>
      );

    // --- 10. USER MANAGEMENT ---
    case 10:
      const filteredUsers = userFilter === 'All' 
        ? MOCK_USERS 
        : MOCK_USERS.filter(u => u.role === userFilter);

      return (
        <div className="flex flex-col h-full bg-slate-50 font-sans relative">
           <div className="bg-[#0B1120] text-white p-4 pt-12 flex justify-between items-center shrink-0">
              <h1 className="text-xl font-bold">User Management</h1>
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold border border-white/10" onClick={() => navigate(60)}>SA</div>
           </div>

           <div className="bg-white p-4 pb-2 sticky top-0 z-10 space-y-4 shadow-sm">
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search users..." 
                   className="w-full h-12 bg-slate-50 rounded-xl pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-slate-200 transition-all border-none" 
                 />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {['All', 'Doctor', 'Technician', 'Admin'].map(filter => (
                      <button 
                        key={filter} 
                        onClick={() => setUserFilter(filter)} 
                        className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                           userFilter === filter 
                           ? 'bg-[#0B1120] text-white border-[#0B1120]' 
                           : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {filter}
                      </button>
                  ))}
              </div>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24 bg-slate-50">
             {filteredUsers.map(user => (
               <div key={user.id} className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-slate-100 hover:border-slate-300 transition-all cursor-pointer group" onClick={() => navigate(12)}>
                  <div className="flex items-center gap-4">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                        user.role === 'Doctor' ? 'bg-blue-100 text-blue-600' : 
                        user.role === 'Technician' ? 'bg-teal-100 text-teal-600' : 'bg-purple-100 text-purple-600'
                     }`}>
                       {user.name.charAt(0)}
                     </div>
                     <div>
                       <h3 className="font-bold text-slate-900">{user.name}</h3>
                       <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                             user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                          }`}>{user.status}</span>
                          <span className="text-xs text-slate-500">{user.role}</span>
                       </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500" />
               </div>
             ))}
           </div>

           <div className="absolute bottom-24 right-6 z-20">
              <button 
                 className="w-14 h-14 rounded-full bg-[#0d9488] shadow-xl shadow-teal-900/20 flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-all"
                 onClick={() => navigate(11)}
              >
                 <Plus className="w-8 h-8" />
              </button>
           </div>

           <div className="sticky bottom-0 w-full z-10 bg-white border-t border-slate-200">
              <AdminNav activeTab="users" onTabChange={(t) => {
                 setActiveTab(t);
                 if (t === 'dashboard') navigate(8);
                 if (t === 'users') navigate(10);
                 if (t === 'system') navigate(15);
                 if (t === 'logs') navigate(19);
              }} />
           </div>
        </div>
      );

    // --- 11. CREATE USER ---
    case 11:
      return (
        <NavWrapper title="Add New User" back={10} tab="users">
          <div className="p-4 space-y-6">
             <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Account Details</h3>
                <Input label="Full Name" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} placeholder="e.g. John Doe" />
                <div className="space-y-1">
                   <Input label="Hospital Email" type="email" value={newUser.email} onChange={e => setNewUser({...newUser, email: e.target.value})} placeholder="email@hospital.org" icon={<Mail className="w-4 h-4"/>} />
                   <p className="text-[10px] text-slate-400 font-medium ml-1">Used for secure login access</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                   <Input label="Password" type="password" value={newUser.pass} onChange={e => setNewUser({...newUser, pass: e.target.value})} icon={<Lock className="w-4 h-4"/>} />
                   <Input label="Confirm Pass" type="password" value={newUser.confirm} onChange={e => setNewUser({...newUser, confirm: e.target.value})} icon={<Lock className="w-4 h-4"/>} />
                </div>
             </div>

             <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Role Assignment</h3>
                <div className="space-y-3">
                   {['Doctor', 'Technician', 'Admin'].map(r => (
                      <label key={r} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${newUser.role === r ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-200 hover:bg-slate-50'}`}>
                         <input type="radio" name="role" className="w-5 h-5 text-indigo-600 accent-indigo-600" checked={newUser.role === r} onChange={() => setNewUser({...newUser, role: r})} />
                         <div>
                            <span className="font-bold text-slate-900 text-base block">{r}</span>
                            <span className="text-xs text-slate-500 font-medium">
                               {r === 'Doctor' ? 'Clinical Access & Reports' : r === 'Technician' ? 'Scan Upload & Queue' : 'Full System Control'}
                            </span>
                         </div>
                      </label>
                   ))}
                </div>
             </div>

             <div className="flex gap-4 pt-2">
                <Button variant="outlined" onClick={() => navigate(10)} className="flex-1 h-14 border-slate-300 text-slate-600 rounded-xl font-bold">Cancel</Button>
                <Button onClick={handleCreateUser} className="flex-[2] bg-indigo-600 h-14 rounded-xl font-bold shadow-lg shadow-indigo-200 text-lg">Create Account</Button>
             </div>
          </div>
        </NavWrapper>
      );

    // --- 15. SYSTEM HEALTH DASHBOARD ---
    case 15:
       return (
        <NavWrapper title="System Monitoring" back={8} tab="system">
          <div className="p-4 space-y-6">
             {/* AI Model Status Card */}
             <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
                 <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-slate-900 text-base">AI Model Health</h3>
                    <Badge className="bg-green-100 text-green-700 border-none font-bold">Operational</Badge>
                 </div>
                 <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                       <span className="text-slate-500">Model Version</span>
                       <span className="font-mono font-bold text-slate-900">v2.3.1 (Stable)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                       <span className="text-slate-500">Avg. Process Time</span>
                       <span className="font-bold text-slate-900">2.4 sec/scan</span>
                    </div>
                 </div>
              </div>

             {/* Accuracy Trend Chart */}
             <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                   <Activity className="w-4 h-4 text-slate-400" /> AI Accuracy Metrics
                </h3>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={ACCURACY_TREND}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                      <YAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                      <Tooltip />
                      <Line type="monotone" dataKey="acc" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981'}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="text-center mt-2 text-xs text-slate-400 font-medium">94.3% Avg Confidence Score (Last 7 Days)</div>
             </div>

             <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                   <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                      <Cpu className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-xs text-slate-500 font-medium">CPU Load</p>
                      <p className="text-lg font-bold text-slate-900">45%</p>
                   </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                   <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                      <HardDrive className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-xs text-slate-500 font-medium">Memory</p>
                      <p className="text-lg font-bold text-slate-900">2.4 GB</p>
                   </div>
                </div>
             </div>

             {/* Server Status */}
             <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                   <Server className="w-4 h-4 text-slate-400" /> Server Status
                </h3>
                {[
                   { name: 'Primary Database', status: 'Operational', ping: '24ms' },
                   { name: 'AI Inference Engine', status: 'Processing', ping: '120ms' },
                   { name: 'Image Storage (S3)', status: 'Operational', ping: '45ms' },
                   { name: 'Auth Server', status: 'Operational', ping: '18ms' }
                ].map((s, i) => (
                   <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                      <div>
                         <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                         <p className="text-[10px] text-slate-400 font-mono mt-0.5">Ping: {s.ping}</p>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className={`w-2 h-2 rounded-full ${s.status === 'Processing' ? 'bg-orange-500 animate-pulse' : 'bg-green-500'}`} />
                         <span className={`text-xs font-bold ${s.status === 'Processing' ? 'text-orange-600' : 'text-green-600'}`}>{s.status}</span>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </NavWrapper>
       );

    // --- 19. AUDIT LOGS ---
    case 19:
      return (
        <NavWrapper title="System Audit Logs" back={8} tab="logs">
           <div className="flex flex-col h-full">
              <div className="px-4 py-2 bg-slate-50 sticky top-0 z-10">
                 <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {['All', 'Logins', 'Scans', 'Errors'].map(filter => (
                        <button 
                          key={filter} 
                          onClick={() => setLogFilter(filter)} 
                          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
                             logFilter === filter 
                             ? 'bg-slate-800 text-white border-slate-800' 
                             : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {filter}
                        </button>
                    ))}
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                 {/* Combine all logs for demo, filtered by type logic would go here */}
                 {LOGS_LOGIN.map((log) => (
                    <div key={`login-${log.id}`} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-start">
                       <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center ${log.status === 'Success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          {log.status === 'Success' ? <Key className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-start">
                             <h4 className="font-bold text-slate-900 text-sm">Login Attempt</h4>
                             <span className="text-[10px] text-slate-400 font-mono">{log.time}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1"><span className="font-bold">{log.user}</span> via {log.ip}</p>
                          <div className="mt-2 flex items-center gap-2">
                             <Badge variant={log.status === 'Success' ? 'success' : 'destructive'} className="text-[10px] h-5 px-1.5">{log.status}</Badge>
                             <span className="text-[10px] text-slate-400">ID: LOG-{log.id}829</span>
                          </div>
                       </div>
                    </div>
                 ))}
                 
                 {LOGS_SCAN.map((log) => (
                    <div key={`scan-${log.id}`} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-start">
                       <div className="mt-1 w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                          <Activity className="w-4 h-4" />
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-start">
                             <h4 className="font-bold text-slate-900 text-sm">Scan Processed</h4>
                             <span className="text-[10px] text-slate-400 font-mono">{log.time}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">Patient <span className="font-bold">{log.patient}</span> - {log.result}</p>
                          <div className="mt-2 flex items-center gap-2">
                             <Badge className="bg-slate-100 text-slate-600 border-none text-[10px] h-5 px-1.5">AI Analysis</Badge>
                             <span className="text-[10px] text-slate-400">Sev: {log.severity}</span>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </NavWrapper>
      );
    
    // --- 60. SETTINGS (UPDATED) ---
    case 60:
       return (
        <NavWrapper title="Settings" back={8} tab="dashboard">
          <div className="p-4 space-y-6 relative min-h-[calc(100vh-140px)]">
            
            {/* Profile Section */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
               <div className="flex items-center gap-3 mb-2 border-b border-slate-100 pb-3">
                  <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><Icons.User className="w-5 h-5"/></div>
                  <div>
                    <h3 className="font-bold text-slate-900">Profile & Account</h3>
                    <p className="text-xs text-slate-500">Manage your details</p>
                  </div>
               </div>
               
               <div className="flex items-center gap-4 mb-2">
                  <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center relative overflow-hidden group cursor-pointer border-4 border-white shadow-sm">
                      {/* Placeholder for Profile Photo */}
                      <div className="bg-indigo-600 w-full h-full flex items-center justify-center text-white text-2xl font-bold">SA</div>
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                         <Camera className="w-6 h-6 text-white" />
                      </div>
                  </div>
                  <div>
                     <h4 className="font-bold text-slate-900 text-lg">{profileName}</h4>
                     <p className="text-xs text-slate-500 mb-2">System Administrator</p>
                     <Button size="sm" variant="outlined" className="h-8 text-xs border-slate-300" onClick={() => setIsEditingProfile(!isEditingProfile)}>
                        {isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}
                     </Button>
                  </div>
               </div>
               
               {isEditingProfile && (
                 <div className="space-y-3 animate-in fade-in slide-in-from-top-2 pt-2 border-t border-slate-50">
                    <Input 
                      label="Full Name" 
                      value={profileName} 
                      onChange={e => setProfileName(e.target.value)} 
                    />
                    <Input 
                      label="Email ID" 
                      value={profileEmail} 
                      onChange={e => setProfileEmail(e.target.value)} 
                    />
                    <Button fullWidth onClick={handleSaveProfile} className="bg-slate-900 h-10 mt-2">Save Profile Changes</Button>
                 </div>
               )}
            </div>

            {/* AI Configuration */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
               <div className="flex items-center gap-3 mb-2 border-b border-slate-100 pb-3">
                  <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><Brain className="w-5 h-5"/></div>
                  <div>
                    <h3 className="font-bold text-slate-900">AI Configuration</h3>
                    <p className="text-xs text-slate-500">Model sensitivity & flags</p>
                  </div>
               </div>
               
               <div className="space-y-4">
                   <div className="flex justify-between items-center">
                      <label className="text-sm font-bold text-slate-700">Sensitivity Threshold</label>
                      <span className="text-sm font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{settings.sensitivity}%</span>
                   </div>
                   <input 
                      type="range" 
                      min="50" max="99" 
                      value={settings.sensitivity} 
                      onChange={e => handleSettingChange('sensitivity', parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                   />
                   <p className="text-xs text-slate-400 italic">Adjusting this affects how aggressive the AI flags potential anomalies.</p>
               </div>

               <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-medium text-slate-700">Auto-Flag Critical Cases</span>
                  <Switch checked={settings.autoFlag} onCheckedChange={c => handleSettingChange('autoFlag', c)} />
               </div>
               
               <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Enable AI Suggestions</span>
                  <Switch checked={settings.aiSuggestions} onCheckedChange={c => handleSettingChange('aiSuggestions', c)} />
               </div>
            </div>
            
            {/* Notifications */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
               <div className="flex items-center gap-3 mb-2 border-b border-slate-100 pb-3">
                  <div className="p-2 bg-orange-50 rounded-xl text-orange-600"><AlertCircle className="w-5 h-5"/></div>
                  <h3 className="font-bold text-slate-900">System Notifications</h3>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Critical Alerts</span>
                  <Switch checked={true} />
               </div>
            </div>

            {/* Logout Button */}
            <div className="pt-4 pb-8">
               <button 
                  onClick={() => navigate(2)} // Navigate back to login
                  className="w-full h-14 bg-red-50 text-red-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors border border-red-100"
               >
                  <LogOut className="w-5 h-5" /> Sign Out
               </button>
               <p className="text-center text-[10px] text-slate-400 mt-4 font-mono">Session ID: 8821-ADMIN-SECURE</p>
            </div>

            {/* Action Bar for Settings Changes */}
            {hasUnsavedChanges && (
               <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-50 flex gap-3 animate-in slide-in-from-bottom-5">
                  <Button variant="outlined" onClick={handleCancelSettings} className="flex-1 h-12 border-slate-300 text-slate-700 font-bold">Discard</Button>
                  <Button onClick={handleSaveSettings} className="flex-[2] h-12 bg-slate-900 font-bold">Save Changes</Button>
               </div>
            )}
          </div>
        </NavWrapper>
       );

    default:
      return (
         <NavWrapper title="Section" back={8}>
            <div className="p-8 text-center text-slate-500">
               <p>Section {screenId} implementation preserved.</p>
               <Button onClick={() => navigate(8)} className="mt-4">Back to Dashboard</Button>
            </div>
         </NavWrapper>
      );
  }
};
