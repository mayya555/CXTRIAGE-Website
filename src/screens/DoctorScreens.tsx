import React, { useState, useEffect } from 'react';
import { ZoomIn, Move, Sun, Brain, X, Check, Activity, Database, FileText, ChevronRight, Search, Filter, Share2, Download, Bell, Shield, Lock, Globe, HelpCircle, LogOut, Mail, MessageSquare, Printer, Zap, ArrowUpRight, ArrowRight, Settings, Calendar, User, Clock, ChevronLeft, MoreVertical, AlertTriangle, AlertCircle, CheckCircle, Image as ImageIcon, Copy, PenTool, Upload, Scan, Save } from 'lucide-react';
import { Button, Input, Card, Badge, Switch } from '../components/ui/Material';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Icons, MOCK_SCANS, IMAGES } from '../lib/data';
import { WebLayout } from '../components/layout/WebLayout';
import { toast } from 'sonner@2.0.3';
import { DoctorSettingsScreen, DoctorProfileScreen, DoctorSecurityScreen, DoctorNotificationsScreen, DoctorHelpScreen } from '../components/doctor/DoctorSettingsScreens';
import { AIAssistantScreen } from '../components/doctor/AIAssistantScreen';
import { UploadScannerScreen } from '../components/doctor/UploadScannerScreen';

// Mock Patient Data for Queue
const QUEUE_PATIENTS = [
  { id: "P-1024", name: "John Doe", age: "45", gender: "M", xrayStatus: "Uploaded", aiStatus: "Pending", time: "10:30 AM" },
  { id: "P-1025", name: "Jane Smith", age: "62", gender: "F", xrayStatus: "Uploaded", aiStatus: "Pending", time: "10:45 AM" },
  { id: "P-1026", name: "Robert Johnson", age: "33", gender: "M", xrayStatus: "Pending", aiStatus: "Pending", time: "11:00 AM" },
];

const CRITICAL_QUEUE = [
   { id: "P-1024", name: "John Doe", diagnosis: "Pneumothorax", time: "12m", acuity: "CRITICAL", conf: 98, img: IMAGES.xrayNormal },
   { id: "P-1192", name: "Jane Smith", diagnosis: "Pleural Effusion", time: "24m", acuity: "CRITICAL", conf: 85, img: IMAGES.xrayNormal },
   { id: "P-0042", name: "Robert Johnson", diagnosis: "Nodule L.U.L", time: "45m", acuity: "URGENT", conf: 72, img: IMAGES.xrayNormal },
   { id: "P-3321", name: "Emily Davis", diagnosis: "Normal", time: "1h", acuity: "ROUTINE", conf: 15, img: IMAGES.xrayNormal },
];

export const DoctorScreens = ({ screenId, navigate, setRole }: any) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<'Not Scanned' | 'Scanning...' | 'AI Analysis Completed'>('Not Scanned');

  // Reset heatmap state when entering relevant screens
  useEffect(() => {
    if (screenId === 42) setShowHeatmap(true);
    else if (screenId === 39) setShowHeatmap(false);
  }, [screenId]);

  const NavWrapper = ({ children, title, back = false, actions, showSidebar = true }: any) => (
    <WebLayout 
      title={title} 
      showBack={back} 
      onBack={() => navigate(typeof back === 'number' ? back : 36)} 
      role="doctor"
      currentScreen={screenId}
      showSidebar={showSidebar}
      onNavigate={navigate}
      onLogout={() => { setRole(null); navigate(3); }}
      actions={actions}
    >
      {children}
    </WebLayout>
  );

  const handleStartScan = () => {
    setScanning(true);
    setScanStatus('Scanning...');
    setTimeout(() => {
      setScanning(false);
      setScanStatus('AI Analysis Completed');
      toast.success("AI Analysis Completed");
    }, 2000);
  };

  switch (screenId) {
    // ----------------------------------------------------------------------
    // 36. Doctor Dashboard - Web Version
    // ----------------------------------------------------------------------
    case 36: 
      return (
        <NavWrapper title="">
           <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
              {/* Hero Header Section */}
              <div className="bg-gradient-to-br from-[#2563EB] via-[#1d4ed8] to-[#1e40af] rounded-2xl p-8 text-white shadow-lg">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30">
                        <User className="w-8 h-8" />
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold mb-1">Welcome back, Dr. Sarah Mitchell</h1>
                        <p className="text-blue-100 text-lg">Radiology Department • Thursday, March 5, 2026</p>
                      </div>
                    </div>
                    <p className="text-blue-50 ml-20">You have 4 critical cases requiring immediate attention</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(85)}
                      className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 px-6 py-3 rounded-xl transition-all flex items-center gap-2"
                    >
                      <Brain className="w-5 h-5" />
                      <span className="font-medium">AI Assistant</span>
                    </button>
                    <button
                      onClick={() => navigate(68)}
                      className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl transition-all font-medium flex items-center gap-2"
                    >
                      <Upload className="w-5 h-5" />
                      Upload Scan
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats Overview - Enhanced Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Critical Cases */}
                <div className="group bg-white rounded-2xl shadow-sm border-2 border-red-100 hover:border-red-200 p-6 transition-all hover:shadow-md cursor-pointer" onClick={() => navigate(38)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
                      <AlertTriangle className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-slate-900 mb-1">4</div>
                      <div className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full inline-block">CRITICAL</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-slate-900">Critical Cases</div>
                    <div className="text-xs text-slate-500">Requires immediate attention</div>
                    <div className="flex items-center gap-1 text-xs text-red-600 font-medium pt-1">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      2 new in last hour
                    </div>
                  </div>
                </div>

                {/* Urgent Cases */}
                <div className="group bg-white rounded-2xl shadow-sm border-2 border-orange-100 hover:border-orange-200 p-6 transition-all hover:shadow-md cursor-pointer" onClick={() => navigate(38)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-slate-900 mb-1">8</div>
                      <div className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full inline-block">URGENT</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-slate-900">Urgent Cases</div>
                    <div className="text-xs text-slate-500">Review within 4 hours</div>
                    <div className="flex items-center gap-1 text-xs text-orange-600 font-medium pt-1">
                      <Clock className="w-3 h-3" />
                      Average wait: 2.5 hrs
                    </div>
                  </div>
                </div>

                {/* Active Queue */}
                <div className="group bg-white rounded-2xl shadow-sm border-2 border-blue-100 hover:border-blue-200 p-6 transition-all hover:shadow-md cursor-pointer" onClick={() => navigate(38)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Activity className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-slate-900 mb-1">28</div>
                      <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">ACTIVE</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-slate-900">Total Queue</div>
                    <div className="text-xs text-slate-500">All pending reviews</div>
                    <div className="flex items-center gap-1 text-xs text-blue-600 font-medium pt-1">
                      <ArrowUpRight className="w-3 h-3" />
                      +6 from yesterday
                    </div>
                  </div>
                </div>

                {/* Completed Today */}
                <div className="group bg-white rounded-2xl shadow-sm border-2 border-green-100 hover:border-green-200 p-6 transition-all hover:shadow-md cursor-pointer" onClick={() => navigate(48)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                      <CheckCircle className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-slate-900 mb-1">42</div>
                      <div className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">TODAY</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-slate-900">Cases Reviewed</div>
                    <div className="text-xs text-slate-500">Completed today</div>
                    <div className="flex items-center gap-1 text-xs text-green-600 font-medium pt-1">
                      <CheckCircle className="w-3 h-3" />
                      Goal: 50 cases
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Left Column - Priority Cases */}
                <div className="xl:col-span-2 space-y-6">
                  {/* Priority Cases */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        Priority Cases
                      </h2>
                      <button 
                        className="text-sm text-[#2563EB] font-semibold hover:underline flex items-center gap-1"
                        onClick={() => navigate(38)}
                      >
                        View All <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                       {CRITICAL_QUEUE.slice(0, 4).map((item, i) => (
                          <button 
                            key={i} 
                            onClick={() => navigate(45)}
                            className="w-full bg-white rounded-xl shadow-sm border-2 border-slate-100 hover:border-blue-200 overflow-hidden hover:shadow-md transition-all text-left group"
                          >
                             {/* Color Bar */}
                             <div className={`h-1.5 w-full ${
                                item.acuity === 'CRITICAL' ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                                item.acuity === 'URGENT' ? 'bg-gradient-to-r from-orange-500 to-amber-500' : 
                                'bg-gradient-to-r from-green-500 to-emerald-500'
                             }`} />
                             
                             <div className="p-5 flex gap-4">
                                {/* X-Ray Thumbnail */}
                                <div className="w-24 h-24 bg-slate-900 rounded-xl overflow-hidden shrink-0 relative border-2 border-slate-800">
                                   <img src={item.img} className="w-full h-full object-cover opacity-80" alt="X-Ray" />
                                   {item.acuity === 'CRITICAL' && (
                                      <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                                         <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                                           <AlertTriangle className="w-5 h-5 text-white" />
                                         </div>
                                      </div>
                                   )}
                                </div>

                                {/* Patient Info */}
                                <div className="flex-1 min-w-0">
                                   <div className="flex justify-between items-start mb-3">
                                      <div>
                                         <h4 className="font-bold text-slate-900 text-lg">{item.name}</h4>
                                         <span className="text-sm text-slate-500 font-medium">{item.id}</span>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-xs text-slate-400 font-medium mb-1">Waiting</div>
                                        <span className="text-sm font-bold text-slate-700">{item.time}</span>
                                      </div>
                                   </div>
                                   
                                   <div className="flex items-center gap-2 mb-3">
                                      <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                                         item.acuity === 'CRITICAL' ? 'bg-red-100 text-red-700' : 
                                         item.acuity === 'URGENT' ? 'bg-orange-100 text-orange-700' : 
                                         'bg-green-100 text-green-700'
                                      }`}>
                                         {item.acuity}
                                      </span>
                                      <span className="text-sm font-semibold text-slate-700">{item.diagnosis}</span>
                                   </div>

                                   {/* Confidence Bar */}
                                   <div className="space-y-1">
                                      <div className="flex items-center justify-between">
                                        <span className="text-xs text-slate-600 font-medium">AI Confidence</span>
                                        <span className="text-xs font-bold text-slate-900">{item.conf}%</span>
                                      </div>
                                      <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                         <div 
                                            className="h-full bg-gradient-to-r from-[#2563EB] to-[#1d4ed8] rounded-full transition-all" 
                                            style={{ width: `${item.conf}%` }}
                                         />
                                      </div>
                                   </div>
                                </div>

                                {/* Arrow */}
                                <div className="flex items-center">
                                  <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-blue-600 transition-colors" />
                                </div>
                             </div>
                          </button>
                       ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Quick Actions & Stats */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" />
                      Quick Actions
                    </h2>
                    <div className="space-y-3">
                      <button
                        onClick={() => navigate(85)}
                        className="w-full bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-xl p-5 shadow-md hover:shadow-lg transition-all group text-left"
                      >
                        <div className="flex items-center gap-4 text-white">
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Brain className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-base">Ammulu AI Assistant</div>
                            <div className="text-sm text-blue-100">Get medical insights</div>
                          </div>
                          <ChevronRight className="w-5 h-5 opacity-70" />
                        </div>
                      </button>

                      <button
                        onClick={() => navigate(68)}
                        className="w-full bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl p-5 shadow-md hover:shadow-lg transition-all group text-left"
                      >
                        <div className="flex items-center gap-4 text-white">
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-base">Upload X-Ray</div>
                            <div className="text-sm text-teal-100">Add new scan</div>
                          </div>
                          <ChevronRight className="w-5 h-5 opacity-70" />
                        </div>
                      </button>

                      <button
                        onClick={() => navigate(38)}
                        className="w-full bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl p-5 shadow-md hover:shadow-lg transition-all group text-left"
                      >
                        <div className="flex items-center gap-4 text-white">
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Database className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-base">Patient Queue</div>
                            <div className="text-sm text-purple-100">View all cases</div>
                          </div>
                          <ChevronRight className="w-5 h-5 opacity-70" />
                        </div>
                      </button>

                      <button
                        onClick={() => navigate(48)}
                        className="w-full bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl p-5 shadow-md hover:shadow-lg transition-all group text-left"
                      >
                        <div className="flex items-center gap-4 text-white">
                          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-base">Case History</div>
                            <div className="text-sm text-orange-100">Past records</div>
                          </div>
                          <ChevronRight className="w-5 h-5 opacity-70" />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Today's Performance */}
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      Today's Performance
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-600">Daily Goal</span>
                          <span className="text-sm font-bold text-slate-900">42 / 50</span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full" style={{ width: '84%' }} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="bg-blue-50 rounded-lg p-3">
                          <div className="text-xs text-blue-600 mb-1">Avg. Time</div>
                          <div className="text-xl font-bold text-slate-900">4.2m</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="text-xs text-green-600 mb-1">Accuracy</div>
                          <div className="text-xl font-bold text-slate-900">98.5%</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* System Status */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      System Status
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">AI Engine</span>
                        <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">Online</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Database</span>
                        <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">Connected</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">PACS Integration</span>
                        <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
           </div>
        </NavWrapper>
      );

    // ----------------------------------------------------------------------
    // 38. Patient Queue (FIXED)
    // ----------------------------------------------------------------------
    case 38: 
       return (
         <NavWrapper title="Patient Queue" back={36} tab="cases">
            <div className="p-4 space-y-4">
               <div className="bg-slate-100 p-3 rounded-xl flex items-center gap-2 mb-2">
                  <Filter className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">AI Triage Pending</span>
               </div>
               
               {QUEUE_PATIENTS.map((patient, i) => (
                 <Card key={i} className="p-4 border-l-4 border-indigo-500">
                    <div className="flex justify-between items-start mb-3">
                       <div>
                          <h3 className="font-bold text-lg text-slate-900">{patient.name}</h3>
                          <p className="text-sm text-slate-500 font-medium">{patient.id} • {patient.age} yrs • {patient.gender}</p>
                       </div>
                       <Badge variant="outline" className="bg-slate-50">{patient.time}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                       <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">X-Ray Status</p>
                          <p className={`text-xs font-bold ${patient.xrayStatus === 'Uploaded' ? 'text-green-600' : 'text-orange-600'}`}>{patient.xrayStatus}</p>
                       </div>
                       <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 text-center">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">AI Status</p>
                          <p className="text-xs font-bold text-slate-600">{patient.aiStatus}</p>
                       </div>
                    </div>

                    <Button 
                      fullWidth 
                      className="bg-indigo-600 h-10 font-bold shadow-md"
                      onClick={() => navigate(45)}
                      disabled={patient.xrayStatus !== 'Uploaded'}
                    >
                       Open Case
                    </Button>
                 </Card>
               ))}
            </div>
         </NavWrapper>
       );

    // ----------------------------------------------------------------------
    // 45. Patient Case Overview (NEW)
    // ----------------------------------------------------------------------
    case 45: 
      return (
        <NavWrapper title="Case Overview" back={36}>
           <div className="p-4 space-y-6">
              {/* Patient Details */}
              <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                 <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold text-2xl">
                       JD
                    </div>
                    <div>
                       <h2 className="text-xl font-bold text-slate-900">John Doe</h2>
                       <p className="text-sm text-slate-500 font-medium">ID: P-1024 • 45M</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="text-xs text-slate-400 font-bold uppercase">Blood Type</label>
                       <p className="font-medium text-slate-900">O+</p>
                    </div>
                    <div>
                       <label className="text-xs text-slate-400 font-bold uppercase">Weight</label>
                       <p className="font-medium text-slate-900">78 kg</p>
                    </div>
                    <div>
                       <label className="text-xs text-slate-400 font-bold uppercase">Symptoms</label>
                       <p className="font-medium text-slate-900">Chest Pain, SOB</p>
                    </div>
                 </div>
              </div>

              {/* X-Ray Thumbnail */}
              <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-slate-500" /> Latest Scan
                 </h3>
                 <div className="h-48 bg-black rounded-xl overflow-hidden relative flex items-center justify-center">
                    <img src={IMAGES.xrayNormal} className="h-full object-contain opacity-80" />
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                       DICOM • 14 MB
                    </div>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                 <Button 
                    className="h-14 bg-indigo-600 font-bold text-lg shadow-lg shadow-indigo-200 rounded-xl"
                    onClick={() => navigate(46)}
                 >
                    <Brain className="w-5 h-5 mr-2" /> Start AI Analysis
                 </Button>
                 <Button 
                    variant="outlined" 
                    className="h-14 border-slate-300 text-slate-600 font-bold rounded-xl"
                    onClick={() => navigate(48)}
                 >
                    <Clock className="w-5 h-5 mr-2" /> View Patient History
                 </Button>
              </div>
           </div>
        </NavWrapper>
      );

    // ----------------------------------------------------------------------
    // 46. AI Scanner Section (NEW)
    // ----------------------------------------------------------------------
    case 46: 
       return (
         <NavWrapper title="AI Scanner" back={45} showBottomNav={false}>
            <div className="p-6 h-full flex flex-col items-center justify-center space-y-8">
               <div className="w-full max-w-xs bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative aspect-square group">
                  <img src={IMAGES.xrayNormal} className={`w-full h-full object-cover transition-all duration-700 ${scanning ? 'opacity-50 blur-sm scale-105' : ''}`} />
                  
                  {/* Scanning Overlay */}
                  {scanning && (
                     <div className="absolute inset-0 z-10">
                        <div className="absolute top-0 left-0 w-full h-1 bg-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.8)] animate-[scan_2s_ease-in-out_infinite]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="bg-black/70 px-4 py-2 rounded-full text-teal-400 font-mono font-bold animate-pulse border border-teal-500/30">
                              ANALYZING STRUCTURES...
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Status Overlay */}
                  <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md p-4 border-t border-slate-100">
                     <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                           scanStatus === 'Not Scanned' ? 'bg-slate-300' : 
                           scanStatus === 'Scanning...' ? 'bg-teal-500 animate-pulse' : 'bg-green-500'
                        }`} />
                        <span className="font-bold text-sm text-slate-800 uppercase tracking-wide">{scanStatus}</span>
                     </div>
                  </div>
               </div>

               <div className="w-full space-y-4">
                  {scanStatus === 'Not Scanned' && (
                     <Button className="w-full h-14 bg-slate-900 font-bold text-lg rounded-xl" onClick={handleStartScan}>
                        <Zap className="w-5 h-5 mr-2 text-yellow-400" /> Run Analysis
                     </Button>
                  )}
                  
                  {scanStatus === 'Scanning...' && (
                     <div className="text-center text-slate-500 font-medium">
                        Processing image data...
                     </div>
                  )}

                  {scanStatus === 'AI Analysis Completed' && (
                     <Button className="w-full h-14 bg-indigo-600 font-bold text-lg rounded-xl shadow-lg shadow-indigo-200 animate-in zoom-in" onClick={() => navigate(39)}>
                        View Triage Result <ArrowRight className="w-5 h-5 ml-2" />
                     </Button>
                  )}
               </div>
            </div>
         </NavWrapper>
       );

    // ----------------------------------------------------------------------
    // 39. AI Result Screen (FIXED)
    // ----------------------------------------------------------------------
    case 39:
    case 41:
    case 42:
       return (
         <NavWrapper title="Triage Result" back={46} role="doctor" transparentHeader showBottomNav={false}>
            <div className="flex flex-col h-full bg-black relative">
               {/* Viewer Area */}
               <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
                  <img 
                    src={showHeatmap ? IMAGES.xrayHeatmap : IMAGES.xrayNormal} 
                    className="w-full h-full object-contain animate-in fade-in duration-500" 
                  />
                  
                  {/* Heatmap Toggle */}
                  <div className="absolute top-4 right-4 z-20">
                     <button 
                        onClick={() => setShowHeatmap(!showHeatmap)} 
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all backdrop-blur-md border shadow-lg ${showHeatmap ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800/80 text-white border-white/10'}`}
                     >
                        <Brain className="w-4 h-4" /> {showHeatmap ? 'Hide Heatmap' : 'Show Heatmap'}
                     </button>
                  </div>
               </div>

               {/* Result Bottom Sheet */}
               <div className="bg-white rounded-t-3xl p-6 relative z-10 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.3)] pb-8 animate-in slide-in-from-bottom-20 duration-500">
                  <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
                  
                  <div className="flex items-start justify-between mb-4">
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <h2 className="font-bold text-xl text-slate-900">AI-Assisted Triage Result</h2>
                           <Badge variant="error" className="h-6 px-2.5 tracking-wide font-bold flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> HIGH PRIORITY
                           </Badge>
                        </div>
                        <p className="text-xs font-bold text-red-600 mt-1 uppercase tracking-wide">For clinical review only</p>
                     </div>
                     <div className="text-right">
                        <span className="block text-2xl font-black text-indigo-600">98%</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">Confidence</span>
                     </div>
                  </div>

                  <div className="space-y-4 mb-6">
                     <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-2">
                           <PenTool className="w-4 h-4 text-slate-500" /> Doctor Notes
                        </h4>
                        <textarea 
                           className="w-full bg-transparent text-sm text-slate-600 outline-none resize-none h-20 placeholder:text-slate-400"
                           placeholder="Add clinical observations here..."
                        />
                     </div>
                  </div>

                  <div className="flex gap-3">
                     <Button fullWidth variant="outlined" className="border-slate-300 text-slate-700 h-12 font-bold" onClick={() => navigate(36)}>
                        <Save className="w-4 h-4 mr-2" /> Save Case
                     </Button>
                     <Button fullWidth className="bg-indigo-600 h-12 font-bold shadow-lg shadow-indigo-200" onClick={() => toast.success("Case marked as Reviewed")}>
                        <Check className="w-4 h-4 mr-2" /> Confirm & Close
                     </Button>
                  </div>
               </div>
            </div>
         </NavWrapper>
       );

    // ----------------------------------------------------------------------
    // 48. Patient History Screen (NEW)
    // ----------------------------------------------------------------------
    case 48:
       return (
         <NavWrapper title="Medical History" back={45}>
            <div className="p-4 space-y-6">
               <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">JD</div>
                  <div>
                     <h2 className="font-bold text-slate-900">John Doe</h2>
                     <p className="text-xs text-slate-500">History Record: #8821</p>
                  </div>
               </div>

               <div className="relative pl-6 border-l-2 border-slate-200 space-y-8">
                  {[
                     { date: "Today, 10:30 AM", status: "High Priority", note: "Pneumothorax detected", active: true },
                     { date: "Feb 10, 2024", status: "Low Priority", note: "Routine checkup - Clear", active: false },
                     { date: "Jan 15, 2024", status: "Medium Priority", note: "Mild congestion", active: false },
                  ].map((record, i) => (
                     <div key={i} className="relative">
                        <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${record.active ? 'bg-indigo-600' : 'bg-slate-300'}`} />
                        <Card className="p-4">
                           <div className="flex justify-between items-start mb-2">
                              <span className="font-bold text-sm text-slate-900">{record.date}</span>
                              <Badge variant={record.status.includes('High') ? 'error' : 'secondary'} className="text-[10px]">{record.status}</Badge>
                           </div>
                           <div className="flex gap-3 mt-2">
                              <div className="w-12 h-12 bg-slate-100 rounded-lg shrink-0 overflow-hidden">
                                 <img src={IMAGES.xrayNormal} className="w-full h-full object-cover opacity-60" />
                              </div>
                              <div>
                                 <p className="text-xs text-slate-600 font-medium">{record.note}</p>
                              </div>
                           </div>
                        </Card>
                     </div>
                  ))}
               </div>
               
               <Button fullWidth variant="outlined" className="h-12 border-slate-300 text-slate-600 font-bold mt-4">
                  <FileText className="w-4 h-4 mr-2" /> View Full Report
               </Button>
            </div>
         </NavWrapper>
       );

    // 62. Doctor Settings Screen
    case 62:
      return <DoctorSettingsScreen navigate={navigate} setRole={setRole} />;

    // 63. Doctor Profile Information Screen
    case 63:
      return <DoctorProfileScreen navigate={navigate} />;

    // 64. Doctor Security & Privacy Screen
    case 64:
      return <DoctorSecurityScreen navigate={navigate} />;

    // 65. Doctor Notifications Screen
    case 65:
      return <DoctorNotificationsScreen navigate={navigate} />;

    // 66. Doctor Help & Support Screen
    case 66:
      return <DoctorHelpScreen navigate={navigate} />;

    // 68. Upload Scanner Images (Doctor Only)
    case 68:
      return <UploadScannerScreen navigate={navigate} />;

    // 85. AI Medical Assistant Screen
    case 85:
      return <AIAssistantScreen navigate={navigate} />;

    // ----------------------------------------------------------------------
    // 37. Doctor Profile Screen
    // ----------------------------------------------------------------------
    case 37:
      return (
        <NavWrapper title="My Profile" back={36}>
          <div className="p-4 space-y-5">
            <div className="bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-3xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/30 text-2xl font-bold">DS</div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">Dr. Sarah Smith</h2>
                  <p className="text-blue-100 text-sm">Radiologist</p>
                  <p className="text-blue-100 text-xs mt-1">ID: DOC-2024-4521</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/20">
                <div className="text-center"><p className="text-2xl font-black">247</p><p className="text-xs text-blue-100">Cases</p></div>
                <div className="text-center"><p className="text-2xl font-black">98%</p><p className="text-xs text-blue-100">Accuracy</p></div>
                <div className="text-center"><p className="text-2xl font-black">4.8</p><p className="text-xs text-blue-100">Rating</p></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold text-slate-500 uppercase mb-3">Professional Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-sm text-slate-600">Specialization</span><span className="text-sm font-bold text-slate-900">Radiology & Imaging</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-600">License Number</span><span className="text-sm font-bold text-slate-900">RAD-45821-NY</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-600">Experience</span><span className="text-sm font-bold text-slate-900">12 Years</span></div>
              </div>
            </div>
            <Button fullWidth className="bg-[#2563EB] h-12 font-bold rounded-xl shadow-lg"><Settings className="w-4 h-4 mr-2" /> Edit Profile</Button>
          </div>
        </NavWrapper>
      );

    // 40. Critical Alerts
    case 40:
      return (
        <NavWrapper title="Critical Alerts" back={36}>
          <div className="p-4 space-y-4">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-white" /></div>
                <div><h3 className="font-bold text-red-900">High Priority Cases</h3><p className="text-xs text-red-700">Require immediate attention</p></div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 bg-white/60 rounded-lg p-2 text-center"><p className="text-2xl font-black text-red-900">4</p><p className="text-xs text-red-700">Critical</p></div>
                <div className="flex-1 bg-white/60 rounded-lg p-2 text-center"><p className="text-2xl font-black text-orange-900">8</p><p className="text-xs text-orange-700">Urgent</p></div>
              </div>
            </div>
            <div className="space-y-3">
              {CRITICAL_QUEUE.filter(item => item.acuity !== 'ROUTINE').map((item, i) => (
                <button key={i} onClick={() => navigate(45)} className="w-full bg-white rounded-2xl shadow-md border-2 border-transparent hover:border-[#2563EB] overflow-hidden active:scale-[0.98] transition-all">
                  <div className={`h-1.5 w-full ${item.acuity === 'CRITICAL' ? 'bg-red-500' : 'bg-orange-500'}`} />
                  <div className="p-4"><div className="flex items-center gap-3"><div className="w-16 h-16 bg-slate-900 rounded-xl overflow-hidden relative"><img src={item.img} className="w-full h-full object-cover opacity-80" alt="X-Ray" /></div><div className="flex-1 text-left"><h4 className="font-bold text-slate-900">{item.name}</h4><p className="text-xs text-slate-500 mt-1">{item.diagnosis}</p></div></div></div>
                </button>
              ))}
            </div>
          </div>
        </NavWrapper>
      );

    // 43. Diagnosis Confirmation
    case 43:
      return (
        <NavWrapper title="Confirm Diagnosis" back={39}>
          <div className="p-4 space-y-5">
            <div className="bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-2xl p-5 text-white shadow-lg">
              <h3 className="font-bold text-lg mb-3">AI Detection Result</h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4"><p className="text-xl font-bold">Pneumothorax (Left Lung)</p><div className="flex justify-between mt-3 pt-3 border-t border-white/20"><span className="text-sm">Confidence</span><span className="text-2xl font-black">98%</span></div></div>
            </div>
            <div className="space-y-3">
              <button onClick={() => { toast.success("Diagnosis Confirmed"); navigate(47); }} className="w-full bg-green-50 border-2 border-green-200 rounded-xl p-4 hover:bg-green-100"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center"><CheckCircle className="w-5 h-5 text-white" /></div><div className="text-left"><p className="font-bold text-green-900">Confirm AI Diagnosis</p></div></div></button>
              <button onClick={() => navigate(44)} className="w-full bg-amber-50 border-2 border-amber-200 rounded-xl p-4 hover:bg-amber-100"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center"><PenTool className="w-5 h-5 text-white" /></div><div className="text-left"><p className="font-bold text-amber-900">Modify Diagnosis</p></div></div></button>
            </div>
          </div>
        </NavWrapper>
      );

    // 44. Diagnosis Modification
    case 44:
      return (
        <NavWrapper title="Modify Diagnosis" back={43}>
          <div className="p-4 space-y-5">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4"><p className="text-base font-bold text-slate-900">Pneumothorax (Left Lung)</p><p className="text-xs text-slate-600 mt-1">AI Confidence: 98%</p></div>
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-bold text-slate-900 mb-3">Select Diagnosis</h3>
              {['Pneumothorax', 'Pleural Effusion', 'Pneumonia', 'Normal'].map((d, i) => (<button key={i} className={`w-full text-left p-3 rounded-xl border-2 ${i === 0 ? 'border-[#2563EB] bg-blue-50 font-bold' : 'border-slate-200'}`}>{d}</button>))}
            </div>
            <Button fullWidth className="bg-[#2563EB] h-12 font-bold" onClick={() => { toast.success("Diagnosis Updated"); navigate(47); }}><Save className="w-4 h-4 mr-2" /> Save Changes</Button>
          </div>
        </NavWrapper>
      );

    // 47. Report Download/Share
    case 47:
      return (
        <NavWrapper title="Report & Export" back={39}>
          <div className="p-4 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
              <div className="bg-slate-100 p-4 border-b"><h3 className="font-bold">Diagnostic Report</h3><p className="text-xs text-slate-500">Case #P-1024</p></div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between pb-3 border-b"><span className="text-sm text-slate-600">Diagnosis</span><span className="text-sm font-bold">Pneumothorax</span></div>
                <div className="flex justify-between pb-3 border-b"><span className="text-sm text-slate-600">Confidence</span><span className="text-sm font-bold text-[#2563EB]">98%</span></div>
                <div className="flex justify-between"><span className="text-sm text-slate-600">Priority</span><Badge variant="error">Critical</Badge></div>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full bg-white border rounded-xl p-4 hover:bg-slate-50"><div className="flex items-center gap-3"><FileText className="w-5 h-5 text-red-600" /><div className="flex-1 text-left"><p className="font-bold">Download as PDF</p></div><Download className="w-5 h-5 text-slate-400" /></div></button>
              <button className="w-full bg-white border rounded-xl p-4 hover:bg-slate-50"><div className="flex items-center gap-3"><Mail className="w-5 h-5 text-[#2563EB]" /><div className="flex-1 text-left"><p className="font-bold">Email Report</p></div></div></button>
            </div>
            <Button fullWidth className="bg-[#2563EB] h-12 font-bold" onClick={() => navigate(50)}>Close Case</Button>
          </div>
        </NavWrapper>
      );

    // 49. Patient History Detail
    case 49:
      return (
        <NavWrapper title="Medical Record" back={48}>
          <div className="p-4 space-y-5">
            <div className="bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-2xl p-5 text-white">
              <div className="flex items-center gap-3 mb-3"><div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center font-bold">JD</div><div><h2 className="font-bold">John Doe</h2><p className="text-xs text-blue-100">45 years • Male</p></div></div>
            </div>
            <div className="bg-white rounded-2xl p-4 border shadow-sm"><h3 className="font-bold mb-3">Diagnosis</h3><p className="font-bold text-slate-900">Pleural Effusion (Right Lung)</p></div>
            <div className="bg-white rounded-2xl p-4 border shadow-sm"><h3 className="font-bold mb-3">Images</h3><div className="grid grid-cols-2 gap-3"><div className="aspect-square bg-slate-900 rounded-xl overflow-hidden"><img src={IMAGES.xrayNormal} className="w-full h-full object-cover opacity-80" alt="X-Ray" /></div></div></div>
            <Button fullWidth className="bg-[#2563EB] h-12 font-bold" onClick={() => toast.success("Report Downloaded")}><Download className="w-4 h-4 mr-2" /> Download Report</Button>
          </div>
        </NavWrapper>
      );

    // 50. Final Case Closure
    case 50:
      return (
        <NavWrapper title="Close Case" back={47} showBottomNav={false}>
          <div className="p-4 h-full flex flex-col justify-between">
            <div className="space-y-5">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 text-center border border-green-200">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-10 h-10 text-white" /></div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Case Complete</h2>
                <p className="text-sm text-slate-600">All diagnostic procedures completed</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border shadow-sm space-y-3">
                <h3 className="font-bold">Case Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between pb-3 border-b"><span className="text-sm text-slate-600">Patient</span><span className="text-sm font-bold">John Doe</span></div>
                  <div className="flex justify-between pb-3 border-b"><span className="text-sm text-slate-600">Diagnosis</span><span className="text-sm font-bold">Pneumothorax</span></div>
                  <div className="flex justify-between"><span className="text-sm text-slate-600">Status</span><Badge className="bg-green-100 text-green-700">Completed</Badge></div>
                </div>
              </div>
            </div>
            <Button fullWidth className="bg-[#2563EB] h-14 font-bold text-lg mb-4" onClick={() => { toast.success("Case Closed"); navigate(36); }}><Check className="w-5 h-5 mr-2" /> Close & Return to Dashboard</Button>
          </div>
        </NavWrapper>
      );

    default:
       return (
         <NavWrapper title="Doctor Portal" back={36}>
            <div className="p-8 text-center text-slate-500">
               <p>Screen {screenId} implementation preserved.</p>
               <Button onClick={() => navigate(36)} className="mt-4">Back to Dashboard</Button>
            </div>
         </NavWrapper>
       );
  }
};