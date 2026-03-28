import React, { useState, useEffect } from 'react';
import { 
  Activity, Upload, FileText, Settings, Bell, Search, 
  Menu, X, Grid, List, ChevronRight, ChevronDown, 
  User, LogOut, AlertTriangle, CheckCircle, Clock, 
  Calendar, BarChart2, Shield, Eye, Database, Share2, 
  Download, Printer, AlertCircle, ArrowLeft, ZoomIn, 
  ZoomOut, Move, Sun, Layers, Brain, Flag
} from 'lucide-react';
import { Icons, IMAGES, MOCK_PATIENTS } from '../lib/data';

// --- Desktop Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick, count }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg mb-1 ${
      active 
        ? 'bg-blue-50 text-blue-700' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
    <span className="flex-1 text-left">{label}</span>
    {count && (
      <span className={`px-2 py-0.5 text-xs rounded-full ${
        active ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
      }`}>
        {count}
      </span>
    )}
  </button>
);

const StatCard = ({ title, value, trend, trendUp, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className={`flex items-center text-xs font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
        {trend} {trendUp ? '↑' : '↓'}
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const styles: any = {
    'Critical': 'bg-red-50 text-red-700 border-red-100',
    'Urgent': 'bg-orange-50 text-orange-700 border-orange-100',
    'Routine': 'bg-blue-50 text-blue-700 border-blue-100',
    'Normal': 'bg-green-50 text-green-700 border-green-100',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${styles[status] || 'bg-slate-100'}`}>
      {status}
    </span>
  );
};

// --- Screens ---

const DesktopLogin = ({ onLogin }: any) => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex">
      {/* Left: Brand */}
      <div className="w-1/2 bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 100 C 20 0 50 0 100 100 Z" fill="url(#grad)" />
               <defs>
                 <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#3b82f6" />
                   <stop offset="100%" stopColor="#8b5cf6" />
                 </linearGradient>
               </defs>
             </svg>
        </div>
        <div className="relative z-10">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                 <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">MediScan AI</span>
           </div>
           <h1 className="text-4xl font-bold leading-tight mb-4">
             Advanced AI Triage for Modern Radiology
           </h1>
           <p className="text-slate-400 text-lg">
             Enterprise-grade diagnostic support with 99.8% accuracy in anomaly detection.
           </p>
        </div>
        <div className="relative z-10 flex gap-4 text-sm text-slate-500">
           <span>© 2024 HealthTech Inc.</span>
           <span>HIPAA Compliant</span>
           <span>v2.5.0</span>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <div className="max-w-sm mx-auto w-full space-y-8">
           <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900">Sign in to Portal</h2>
              <p className="text-slate-500 mt-2">Access your workstation securely</p>
           </div>

           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700">Hospital ID / Email</label>
                 <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="dr.name@hospital.org" />
              </div>
              <div className="space-y-2">
                 <label className="text-sm font-medium text-slate-700">Password</label>
                 <input type="password" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" placeholder="••••••••" />
              </div>
              <div className="flex items-center justify-between text-sm">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-slate-600">Remember me</span>
                 </label>
                 <button className="text-blue-600 font-medium hover:underline">Forgot password?</button>
              </div>
           </div>

           <button 
             onClick={onLogin}
             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-600/20"
           >
             Secure Sign In
           </button>

           <div className="pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400">
                Protected by enterprise-grade encryption. 
                Unauthorized access is a federal offense.
              </p>
           </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Dashboard Component ---

export const WebPortalScreens = ({ screenId, navigate, setRole }: any) => {
  const [view, setView] = useState('dashboard'); // dashboard, workspace, upload, reports
  const [selectedScan, setSelectedScan] = useState<any>(null);
  const [showAiOverlay, setShowAiOverlay] = useState(true);

  // Mock navigating "internal" routes for the desktop app
  const switchView = (v: string) => setView(v);

  if (view === 'login') {
    return <DesktopLogin onLogin={() => setView('dashboard')} />;
  }

  const Sidebar = () => (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
         <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
         </div>
         <span className="font-bold text-lg text-slate-900">MediScan</span>
      </div>

      <div className="p-4 space-y-6 flex-1 overflow-y-auto">
         <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">Clinical</div>
            <SidebarItem icon={Grid} label="Dashboard" active={view === 'dashboard'} onClick={() => switchView('dashboard')} />
            <SidebarItem icon={List} label="Worklist" count={4} active={view === 'worklist'} onClick={() => switchView('worklist')} />
            <SidebarItem icon={Upload} label="Import / Upload" active={view === 'upload'} onClick={() => switchView('upload')} />
         </div>
         
         <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">Analysis</div>
            <SidebarItem icon={Brain} label="AI Insights" active={view === 'analytics'} onClick={() => switchView('analytics')} />
            <SidebarItem icon={FileText} label="Reports" active={view === 'reports'} onClick={() => switchView('reports')} />
         </div>

         <div>
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">System</div>
            <SidebarItem icon={Settings} label="Settings" active={view === 'settings'} onClick={() => switchView('settings')} />
            <SidebarItem icon={Database} label="PACS Integration" active={false} onClick={() => {}} />
         </div>
      </div>

      <div className="p-4 border-t border-slate-100">
         <div className="flex items-center gap-3 px-4 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
               SB
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-sm font-medium text-slate-900 truncate">Dr. S. Bennett</p>
               <p className="text-xs text-slate-500 truncate">Radiology Dept.</p>
            </div>
         </div>
         <button 
           className="w-full flex items-center gap-2 text-slate-500 hover:text-red-600 px-4 py-2 text-sm transition-colors"
           onClick={() => navigate(1)} // Back to main mobile app selection
         >
            <LogOut className="w-4 h-4" /> Sign Out
         </button>
      </div>
    </div>
  );

  const TopBar = ({ title, subtitle }: any) => (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40 ml-64">
       <div>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
       </div>
       <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             System Operational
          </div>
          <div className="h-8 w-px bg-slate-200 mx-2" />
          <button className="p-2 text-slate-400 hover:text-slate-600 relative">
             <Bell className="w-5 h-5" />
             <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600">
             <Search className="w-5 h-5" />
          </button>
       </div>
    </div>
  );

  // --- Views ---

  if (view === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-50 flex">
        <Sidebar />
        <div className="flex-1 ml-64">
           <TopBar title="Triage Dashboard" subtitle="Overview of radiology workflow and AI performance" />
           
           <div className="p-8 max-w-7xl mx-auto space-y-8">
              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-6">
                 <StatCard title="Cases Pending" value="14" trend="12%" trendUp={false} icon={Clock} color="bg-orange-500" />
                 <StatCard title="Critical Findings" value="4" trend="2 New" trendUp={true} icon={AlertTriangle} color="bg-red-500" />
                 <StatCard title="AI Accuracy (24h)" value="99.8%" trend="0.2%" trendUp={true} icon={Brain} color="bg-purple-600" />
                 <StatCard title="Throughput" value="1,024" trend="Daily Scan" trendUp={true} icon={Database} color="bg-blue-600" />
              </div>

              {/* Main Content Split */}
              <div className="grid grid-cols-3 gap-8">
                 {/* Left: Worklist */}
                 <div className="col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                       <h3 className="font-bold text-lg text-slate-900">Priority Worklist</h3>
                       <div className="flex gap-2">
                          <button className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">Filter</button>
                          <button className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">Sort by Acuity</button>
                       </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                       <table className="w-full text-left">
                          <thead className="bg-slate-50 border-b border-slate-200">
                             <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Patient ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Modality</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">AI Finding</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Wait Time</th>
                                <th className="px-6 py-4"></th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                             {[
                                { status: 'Critical', id: 'P-1024', mod: 'CR Chest', find: 'Pneumothorax', conf: 98, time: '12m' },
                                { status: 'Critical', id: 'P-1192', mod: 'DX Chest', find: 'Pleural Effusion', conf: 94, time: '24m' },
                                { status: 'Urgent', id: 'P-0042', mod: 'CR Chest', find: 'Nodule L.U.L', conf: 82, time: '45m' },
                                { status: 'Routine', id: 'P-3321', mod: 'DX Chest', find: 'Normal', conf: 99, time: '1h 12m' },
                                { status: 'Routine', id: 'P-5511', mod: 'CR Chest', find: 'Normal', conf: 96, time: '1h 30m' },
                             ].map((row, i) => (
                                <tr key={i} className="hover:bg-blue-50/50 transition-colors group cursor-pointer" onClick={() => switchView('workspace')}>
                                   <td className="px-6 py-4"><StatusBadge status={row.status} /></td>
                                   <td className="px-6 py-4 font-medium text-slate-900">{row.id}</td>
                                   <td className="px-6 py-4 text-slate-500 text-sm">{row.mod}</td>
                                   <td className="px-6 py-4">
                                      <div className="flex flex-col">
                                         <span className="text-sm font-medium text-slate-900">{row.find}</span>
                                         <span className="text-xs text-slate-500">Confidence: {row.conf}%</span>
                                      </div>
                                   </td>
                                   <td className="px-6 py-4 text-slate-500 text-sm">{row.time}</td>
                                   <td className="px-6 py-4 text-right">
                                      <button className="text-blue-600 opacity-0 group-hover:opacity-100 font-medium text-sm">Review →</button>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>

                 {/* Right: AI Performance & System */}
                 <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                       <h3 className="font-bold text-slate-900 mb-4">AI Model Status</h3>
                       <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm">
                             <span className="text-slate-600">Model Version</span>
                             <span className="font-mono text-slate-900 bg-slate-100 px-2 py-1 rounded">v2.4.0-prod</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                             <span className="text-slate-600">Last Validation</span>
                             <span className="text-green-600 font-medium">Passed (2h ago)</span>
                          </div>
                          <div className="space-y-1">
                             <div className="flex justify-between text-xs text-slate-500">
                                <span>Sensitivity</span>
                                <span>99.2%</span>
                             </div>
                             <div className="w-full bg-slate-100 rounded-full h-1.5">
                                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '99.2%' }} />
                             </div>
                          </div>
                          <div className="space-y-1">
                             <div className="flex justify-between text-xs text-slate-500">
                                <span>Specificity</span>
                                <span>96.8%</span>
                             </div>
                             <div className="w-full bg-slate-100 rounded-full h-1.5">
                                <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '96.8%' }} />
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                       <div className="relative z-10">
                          <h3 className="font-bold text-lg mb-2">Technician On-Call</h3>
                          <div className="flex items-center gap-3 mt-4">
                             <img src={IMAGES.tech} className="w-10 h-10 rounded-full border-2 border-white/20" />
                             <div>
                                <p className="font-medium">James Chen</p>
                                <p className="text-xs text-slate-400">Radiology B • Ext. 4022</p>
                             </div>
                             <button className="ml-auto bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors">
                                <Icons.Phone className="w-5 h-5" />
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  if (view === 'upload') {
    return (
      <div className="min-h-screen bg-slate-50 flex">
        <Sidebar />
        <div className="flex-1 ml-64">
           <TopBar title="Image Ingestion" subtitle="Import DICOM studies from PACS or local modalities" />
           
           <div className="p-8 max-w-5xl mx-auto space-y-6">
              {/* Status Cards */}
              <div className="grid grid-cols-3 gap-6">
                 <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                    <div className="p-3 bg-green-50 rounded-lg text-green-600"><Database className="w-6 h-6"/></div>
                    <div>
                       <p className="text-sm font-bold text-slate-900">PACS Connection</p>
                       <p className="text-xs text-green-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"/> Connected (12ms)</p>
                    </div>
                 </div>
                 <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><Layers className="w-6 h-6"/></div>
                    <div>
                       <p className="text-sm font-bold text-slate-900">RIS Integration</p>
                       <p className="text-xs text-blue-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"/> Synced</p>
                    </div>
                 </div>
                 <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
                    <div className="p-3 bg-purple-50 rounded-lg text-purple-600"><Activity className="w-6 h-6"/></div>
                    <div>
                       <p className="text-sm font-bold text-slate-900">AI Pre-processing</p>
                       <p className="text-xs text-purple-600 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"/> Active</p>
                    </div>
                 </div>
              </div>

              {/* Upload Area */}
              <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-12 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
                 <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <Upload className="w-10 h-10 text-blue-600" />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-2">Drag & Drop DICOM files</h3>
                 <p className="text-slate-500 max-w-md mx-auto mb-6">
                    Support for .dcm, .dicom, and .zip archives. Automatic anonymization and quality checks are enabled.
                 </p>
                 <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                    Browse Files
                 </button>
              </div>

              {/* Recent Imports */}
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                 <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900">Recent Imports</h3>
                    <button className="text-blue-600 text-sm font-medium">View Logs</button>
                 </div>
                 <div className="divide-y divide-slate-100">
                    {[
                       { file: "CR_Chest_PA_0021.dcm", size: "12MB", time: "Just now", status: "Processing", quality: "Checking..." },
                       { file: "DX_Thorax_Batch_A.zip", size: "145MB", time: "10 mins ago", status: "Completed", quality: "Passed (98%)" },
                       { file: "CR_Chest_Portable_E.dcm", size: "14MB", time: "1 hour ago", status: "Flagged", quality: "Low Exposure" },
                    ].map((file, i) => (
                       <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50">
                          <div className="flex items-center gap-3">
                             <div className="p-2 bg-slate-100 rounded text-slate-500"><FileText className="w-5 h-5"/></div>
                             <div>
                                <p className="font-medium text-slate-900 text-sm">{file.file}</p>
                                <p className="text-xs text-slate-500">{file.size} • {file.time}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-6">
                             <div className="text-right">
                                <p className="text-xs font-bold text-slate-500 uppercase">Quality</p>
                                <p className={`text-sm font-medium ${file.quality.includes("Low") ? "text-orange-600" : "text-green-600"}`}>{file.quality}</p>
                             </div>
                             <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                file.status === "Processing" ? "bg-blue-100 text-blue-700 animate-pulse" :
                                file.status === "Flagged" ? "bg-orange-100 text-orange-700" :
                                "bg-green-100 text-green-700"
                             }`}>
                                {file.status}
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  if (view === 'workspace') {
    return (
      <div className="h-screen flex flex-col bg-black overflow-hidden">
        {/* Workspace Header */}
        <div className="h-14 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
           <div className="flex items-center gap-4">
              <button onClick={() => setView('dashboard')} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-medium">
                 <ArrowLeft className="w-4 h-4" /> Back to List
              </button>
              <div className="h-6 w-px bg-slate-700" />
              <div>
                 <h2 className="text-white font-bold text-sm">Doe, John (M, 45)</h2>
                 <p className="text-slate-400 text-xs">ID: P-1024 • Acc: #882100 • 10/24/2023</p>
              </div>
           </div>
           
           <div className="flex items-center gap-2">
              <div className="flex bg-slate-800 rounded-lg p-1">
                 <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded"><ZoomIn className="w-4 h-4"/></button>
                 <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded"><ZoomOut className="w-4 h-4"/></button>
                 <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded"><Move className="w-4 h-4"/></button>
                 <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded"><Sun className="w-4 h-4"/></button>
                 <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded"><Layers className="w-4 h-4"/></button>
              </div>
              <button 
                 onClick={() => setShowAiOverlay(!showAiOverlay)}
                 className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    showAiOverlay ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                 }`}
              >
                 <Brain className="w-4 h-4" /> AI Overlay {showAiOverlay ? 'ON' : 'OFF'}
              </button>
           </div>
        </div>

        {/* Main Workspace Area */}
        <div className="flex-1 flex overflow-hidden">
           {/* Left: Series Picker */}
           <div className="w-24 bg-slate-950 border-r border-slate-800 flex flex-col items-center py-4 gap-4 overflow-y-auto shrink-0">
              {[1, 2, 3].map((i) => (
                 <div key={i} className={`w-20 h-20 rounded border-2 ${i === 1 ? 'border-blue-500' : 'border-transparent'} overflow-hidden relative group cursor-pointer`}>
                    <img src={IMAGES.xrayNormal} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
                    <span className="absolute bottom-1 right-1 text-xs font-bold text-white drop-shadow-md">{i === 1 ? 'PA' : i === 2 ? 'LAT' : 'AP'}</span>
                 </div>
              ))}
           </div>

           {/* Center: Viewer */}
           <div className="flex-1 bg-black relative flex items-center justify-center">
              <div className="relative h-[90%] aspect-[3/4]">
                 <img src={IMAGES.xrayNormal} className="w-full h-full object-contain" />
                 
                 {/* AI Overlay Layer */}
                 {showAiOverlay && (
                    <div className="absolute top-[30%] right-[25%] w-32 h-32 border-2 border-red-500 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse rounded-lg flex items-start justify-end p-2">
                       <span className="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">Pneumothorax 98%</span>
                    </div>
                 )}

                 {/* Orientation Markers */}
                 <span className="absolute top-4 left-4 text-slate-500 font-mono text-xl">R</span>
                 <span className="absolute top-4 right-4 text-slate-500 font-mono text-xl">L</span>
              </div>
           </div>

           {/* Right: AI Results & Reporting */}
           <div className="w-96 bg-white border-l border-slate-200 flex flex-col shrink-0">
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                 <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900">AI Analysis Results</h3>
                    <span className="text-xs text-slate-500">Model v2.4</span>
                 </div>
                 <div className="flex items-center gap-2 mb-4">
                    <StatusBadge status="Critical" />
                    <span className="text-xs text-slate-500">Processing: 0.8s</span>
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                 {/* Findings */}
                 <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Detected Findings</h4>
                    <div className="space-y-3">
                       <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex justify-between items-start group hover:shadow-sm transition-all cursor-pointer">
                          <div>
                             <p className="font-bold text-red-900 text-sm">Pneumothorax (Right)</p>
                             <p className="text-xs text-red-700 mt-1">Apical region, 2.4cm separation</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                             <span className="text-xs font-bold text-red-600">98%</span>
                             <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1 hover:bg-red-200 rounded text-red-700"><CheckCircle className="w-3 h-3" /></button>
                                <button className="p-1 hover:bg-red-200 rounded text-red-700"><X className="w-3 h-3" /></button>
                             </div>
                          </div>
                       </div>
                       
                       <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-start opacity-60">
                          <div>
                             <p className="font-medium text-slate-700 text-sm">Cardiomegaly</p>
                             <p className="text-xs text-slate-500 mt-1">CTR {'<'} 0.5</p>
                          </div>
                          <span className="text-xs font-bold text-slate-400">12%</span>
                       </div>
                    </div>
                 </div>

                 {/* Report Generation */}
                 <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Preliminary Report</h4>
                    <div className="p-3 border border-slate-200 rounded-lg bg-slate-50 text-sm text-slate-700 leading-relaxed font-mono">
                       <p className="mb-2"><strong>FINDINGS:</strong></p>
                       <p>Right-sided apical pneumothorax is noted with approximately 2.4cm pleural separation. No mediastinal shift. Left lung field is clear. Cardiac silhouette is normal in size.</p>
                       <p className="mt-2"><strong>IMPRESSION:</strong></p>
                       <p>Right-sided pneumothorax. Urgent clinical correlation suggested.</p>
                    </div>
                    <div className="flex gap-2 mt-2">
                       <button className="flex-1 bg-white border border-slate-300 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-50">Edit Text</button>
                       <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700">Approve & Sign</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // Fallback for other views
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
       <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">View Under Construction</h2>
          <button onClick={() => setView('dashboard')} className="mt-4 text-blue-600 underline">Return to Dashboard</button>
       </div>
    </div>
  );
};
