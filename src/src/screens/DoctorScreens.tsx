import React, { useState, useEffect } from 'react';
import { ZoomIn, Move, Sun, Brain, X, Check, Activity, Database, FileText, ChevronRight, Search, Filter, Share2, Download, Bell, Shield, Lock, Globe, HelpCircle, LogOut, Mail, MessageSquare, Printer, Zap, ArrowUpRight, Settings, Calendar, User, Clock, ChevronLeft, MoreVertical, AlertTriangle, AlertCircle, CheckCircle, Image as ImageIcon, Copy, PenTool } from 'lucide-react';
import { Button, Input, Card, Badge, Switch } from '../components/ui/Material';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Icons, MOCK_SCANS, IMAGES, MOCK_PATIENTS } from '../lib/data';
import { MobileFrame } from '../components/layout/MobileFrame';
import { DocNav } from '../components/layout/BottomNav';
import { motion, AnimatePresence } from 'motion/react';

export const DoctorScreens = ({ screenId, navigate, setRole }: any) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState({ newCases: true, critical: true, reports: false });
  const [privacy, setPrivacy] = useState({ dataSharing: false, retention: true, analytics: true });
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [reportConfig, setReportConfig] = useState({ includeImages: true, detailedFindings: true, aiConfidence: false });

  // Reset heatmap state when entering relevant screens
  useEffect(() => {
    if (screenId === 42) setShowHeatmap(true);
    else if (screenId === 39) setShowHeatmap(false);
  }, [screenId]);

  const NavWrapper = ({ children, title, back = false, actions, transparentHeader = false, showBottomNav = true }: any) => (
    <MobileFrame 
      title={title} 
      showBack={back} 
      onBack={() => navigate(typeof back === 'number' ? back : 36)} 
      role="doctor"
      transparentHeader={transparentHeader}
      actions={actions || 
        <div className="flex gap-2">
           <div className="relative">
              <Button variant="ghost" className="p-2 rounded-full text-white/90 hover:bg-white/10 w-10 h-10" onClick={() => navigate(40)}>
                 <Bell className="w-5 h-5" />
                 <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-slate-900" />
              </Button>
           </div>
           <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="p-2 rounded-full text-white/90 hover:bg-white/10 w-10 h-10">
                 <LogOut className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sign Out</AlertDialogTitle>
                <AlertDialogDescription>Are you sure you want to sign out?</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => { setRole(null); navigate(3); }}>Yes, Log Out</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      }
    >
      <div className="flex flex-col min-h-full bg-slate-50">
        <div className={`flex-1 ${showBottomNav ? 'pb-20' : ''}`}>
          {children}
        </div>
        {!back && showBottomNav && <div className="fixed bottom-0 w-full z-30">
          <DocNav activeTab={activeTab} onTabChange={(tab) => {
             setActiveTab(tab);
             if (tab === 'dashboard') navigate(36);
             if (tab === 'cases') navigate(38);
             if (tab === 'alerts') navigate(40);
             if (tab === 'history') navigate(48);
          }} />
        </div>}
      </div>
    </MobileFrame>
  );

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      navigate(50);
    }, 1500);
  };

  const handleShareAction = (platform: string) => {
    setShowShare(false);
    navigate(50);
  };

  const handlePhotoUpdate = () => {
    setCameraActive(true);
  };

  const handleCapture = () => {
    setCameraActive(false);
    navigate(37);
  };

  if (cameraActive) {
    return (
      <div className="h-full w-full bg-black relative flex flex-col z-50">
         <div className="absolute top-4 right-4 z-20">
            <button onClick={() => setCameraActive(false)} className="p-3 bg-black/50 backdrop-blur-md rounded-full text-white active:scale-95 transition-transform"><X className="w-6 h-6"/></button>
         </div>
         <div className="flex-1 relative overflow-hidden">
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1080" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-72 h-72 border-2 border-white/50 rounded-full relative">
                  <div className="absolute inset-0 border-t-2 border-teal-500 rounded-full animate-spin duration-[3s]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full overflow-hidden border-2 border-white/20">
                     <img src={IMAGES.doctor} className="w-full h-full object-cover opacity-50" />
                  </div>
               </div>
            </div>
            <div className="absolute bottom-12 w-full flex justify-center items-center gap-10">
               <button className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white active:scale-95 transition-transform"><Zap className="w-6 h-6"/></button>
               <button onClick={handleCapture} className="w-20 h-20 bg-white rounded-full border-[6px] border-slate-300/50 shadow-2xl active:scale-90 transition-transform flex items-center justify-center" >
                  <div className="w-16 h-16 bg-slate-100 rounded-full border-2 border-slate-900/10" />
               </button>
               <button className="p-4 bg-white/10 backdrop-blur-md rounded-full text-white active:scale-95 transition-transform"><Icons.RefreshCw className="w-6 h-6"/></button>
            </div>
         </div>
      </div>
    );
  }

  switch (screenId) {
    // ----------------------------------------------------------------------
    // 36. Doctor Dashboard
    // ----------------------------------------------------------------------
    case 36: 
      return (
        <NavWrapper title="Triage Dashboard">
           <div className="p-4 space-y-6">
              {/* Header Stats */}
              <div className="grid grid-cols-2 gap-4">
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                     <Card className="bg-red-50 border-red-100 p-5 shadow-sm active:scale-[0.98] transition-transform cursor-pointer h-full relative overflow-hidden" onClick={() => navigate(40)}>
                        <div className="absolute -right-4 -top-4 w-20 h-20 bg-red-100 rounded-full opacity-50" />
                        <div className="flex items-center gap-2 mb-3 relative z-10">
                           <div className="p-2 bg-white rounded-lg shadow-sm">
                              <AlertTriangle className="w-5 h-5 text-red-600" />
                           </div>
                           <span className="font-bold text-red-900">Critical</span>
                        </div>
                        <div className="flex flex-col gap-1 relative z-10">
                           <p className="text-4xl font-black text-red-900">4</p>
                           <p className="text-xs text-red-700 font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Avg Wait: 12m
                           </p>
                        </div>
                     </Card>
                 </motion.div>
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                     <Card className="bg-orange-50 border-orange-100 p-5 shadow-sm active:scale-[0.98] transition-transform cursor-pointer h-full relative overflow-hidden" onClick={() => navigate(38)}>
                        <div className="absolute -right-4 -top-4 w-20 h-20 bg-orange-100 rounded-full opacity-50" />
                        <div className="flex items-center gap-2 mb-3 relative z-10">
                           <div className="p-2 bg-white rounded-lg shadow-sm">
                              <AlertCircle className="w-5 h-5 text-orange-600" />
                           </div>
                           <span className="font-bold text-orange-900">Urgent</span>
                        </div>
                        <div className="flex flex-col gap-1 relative z-10">
                           <p className="text-4xl font-black text-orange-900">8</p>
                           <p className="text-xs text-orange-700 font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" /> Avg Wait: 45m
                           </p>
                        </div>
                     </Card>
                 </motion.div>
              </div>

              {/* Triage Worklist */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800 text-lg">Priority Queue</h3>
                  <div className="flex gap-1 text-xs bg-slate-200/50 p-1 rounded-full">
                     <button className="px-4 py-1.5 bg-slate-900 text-white shadow-sm rounded-full font-bold transition-all" onClick={() => navigate(38)}>View All</button>
                  </div>
                </div>
                
                <div className="space-y-4">
                   {[
                      { id: "P-1024", name: "John Doe", acuity: "Critical", finding: "Pneumothorax", time: "12m", conf: 98, age: "45M" },
                      { id: "P-1192", name: "Jane Smith", acuity: "Critical", finding: "Pleural Effusion", time: "24m", conf: 94, age: "62F" },
                      { id: "P-0042", name: "Robert Johnson", acuity: "Urgent", finding: "Nodule L.U.L", time: "45m", conf: 82, age: "33M" },
                   ].map((caseItem, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        transition={{ delay: 0.3 + (i * 0.1) }}
                      >
                         <Card className="p-0 overflow-hidden flex flex-col active:scale-[0.99] transition-all hover:shadow-md cursor-pointer group bg-white border border-slate-100" onClick={() => navigate(39)}>
                            <div className={`h-1.5 w-full ${
                               caseItem.acuity === 'Critical' ? 'bg-red-500' : 
                               caseItem.acuity === 'Urgent' ? 'bg-orange-500' : 'bg-green-500'
                            }`} />
                            <div className="p-4 flex gap-4">
                               <div className="w-16 h-16 bg-slate-900 rounded-xl overflow-hidden shrink-0 relative shadow-inner">
                                  <img src={IMAGES.xrayNormal} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" />
                                  {caseItem.acuity === 'Critical' && (
                                     <div className="absolute top-0 right-0 p-1 bg-red-600 rounded-bl-lg z-10 shadow-lg">
                                        <AlertTriangle className="w-3 h-3 text-white" />
                                     </div>
                                  )}
                               </div>
                               <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-start mb-1">
                                     <h4 className="font-bold text-slate-900 text-base truncate">{caseItem.name}</h4>
                                     <span className="text-xs text-slate-400 font-medium">{caseItem.time}</span>
                                  </div>
                                  
                                  <div className="flex flex-col gap-2 mt-1">
                                     <div className="flex items-center gap-2">
                                        <Badge variant={caseItem.acuity === 'Critical' ? 'error' : caseItem.acuity === 'Urgent' ? 'warning' : 'success'} className="px-1.5 py-0 text-[10px] uppercase font-bold tracking-wide rounded-sm">
                                           {caseItem.acuity}
                                        </Badge>
                                        <span className="text-sm text-slate-700 font-medium truncate">{caseItem.finding}</span>
                                     </div>
                                     <div className={`h-1 w-full rounded-full ${caseItem.acuity === 'Critical' ? 'bg-red-100' : caseItem.acuity === 'Urgent' ? 'bg-orange-100' : 'bg-green-100'}`}>
                                        <div 
                                          className={`h-full rounded-full ${caseItem.acuity === 'Critical' ? 'bg-red-500' : caseItem.acuity === 'Urgent' ? 'bg-orange-500' : 'bg-green-500'}`} 
                                          style={{ width: `${caseItem.conf}%` }}
                                        />
                                     </div>
                                  </div>
                               </div>
                            </div>
                         </Card>
                      </motion.div>
                   ))}
                </div>
              </div>
           </div>
        </NavWrapper>
      );

    // ----------------------------------------------------------------------
    // 37. Doctor Profile Screen
    // ----------------------------------------------------------------------
    case 37: 
      return (
        <NavWrapper title="My Profile" back>
           <div className="relative">
              <div className="h-40 bg-gradient-to-br from-indigo-600 to-indigo-800 absolute top-0 w-full z-0" />
              <div className="relative z-10 px-4 pt-16 pb-8 flex flex-col items-center">
                 <div className="relative group" onClick={() => navigate(57)}>
                    <div className="w-32 h-32 rounded-full bg-white p-1 shadow-xl">
                       <img src={IMAGES.doctor} className="w-full h-full rounded-full object-cover border-4 border-indigo-50" />
                    </div>
                    <div className="absolute bottom-1 right-1 bg-indigo-600 text-white p-2.5 rounded-full shadow-lg">
                       <Icons.Camera className="w-4 h-4" />
                    </div>
                 </div>
                 <h2 className="font-bold text-2xl mt-4 text-slate-900">Dr. Sarah Bennett</h2>
                 <p className="text-sm text-slate-500 font-medium">Radiologist • ID: RAD-8821</p>
                 <div className="flex gap-2 mt-4">
                    <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">Cardiothoracic</Badge>
                    <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200">Senior Attending</Badge>
                 </div>
              </div>

              <div className="px-4 space-y-4 pb-8">
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 border-b border-slate-100" onClick={() => navigate(58)}>
                       <span className="flex items-center gap-3 font-medium text-slate-700"><User className="w-5 h-5 text-slate-400"/> Personal Information</span>
                       <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>
                    <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50" onClick={() => navigate(62)}>
                       <span className="flex items-center gap-3 font-medium text-slate-700"><Settings className="w-5 h-5 text-slate-400"/> App Preferences</span>
                       <ChevronRight className="w-4 h-4 text-slate-300" />
                    </button>
                 </div>
              </div>
           </div>
        </NavWrapper>
      );

    // ----------------------------------------------------------------------
    // 38. New Case Queue Screen
    // ----------------------------------------------------------------------
    case 38: 
       return (
         <NavWrapper title="Case Queue">
            <div className="p-4 space-y-4">
               <div className="flex gap-2 mb-2 overflow-x-auto pb-2 no-scrollbar">
                  <div className="px-4 py-1.5 bg-slate-900 text-white rounded-full font-bold text-sm shadow-md">All Cases</div>
                  <div className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-full font-medium text-sm" onClick={() => navigate(40)}>Critical</div>
                  <div className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-full font-medium text-sm">Urgent</div>
               </div>
               {MOCK_SCANS.map((scan, i) => (
                 <motion.div key={scan.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.99] border-slate-200 bg-white" onClick={() => navigate(39)}>
                       <div className="flex justify-between mb-3 border-b border-slate-100 pb-2">
                          <span className="text-xs font-bold text-slate-500">ID: {scan.id}</span>
                          <span className="text-xs text-slate-400 font-mono">{scan.date}</span>
                       </div>
                       <div className="flex gap-4">
                          <div className="w-16 h-16 bg-slate-900 rounded-xl overflow-hidden relative shadow-md shrink-0">
                             <img src={IMAGES.xrayNormal} className="w-full h-full object-cover opacity-80" />
                             {scan.priority === 'High' && <div className="absolute top-0 right-0 p-1 bg-red-600 rounded-bl-lg shadow-sm"><AlertTriangle className="w-3 h-3 text-white" /></div>}
                          </div>
                          <div className="flex-1 min-w-0">
                             <h3 className="font-bold text-base text-slate-900 truncate">Patient Name</h3>
                             <p className="text-xs text-slate-500 mb-2 truncate">45 yrs • Male • Cough & Fever</p>
                             <div className="flex gap-2">
                                <Badge variant={scan.priority === 'High' ? 'error' : 'secondary'} className="text-[10px] uppercase font-bold px-2">{scan.priority}</Badge>
                                <Badge variant="outline" className="text-[10px] bg-slate-50 border-slate-200">AI: {scan.aiResult}</Badge>
                             </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-300 self-center" />
                       </div>
                    </Card>
                 </motion.div>
               ))}
            </div>
         </NavWrapper>
       );

    // ----------------------------------------------------------------------
    // 39. Case Detail Screen
    // 41. AI Result Analysis Screen
    // 42. AI Heatmap Visualization Screen
    // ----------------------------------------------------------------------
    case 39:
    case 41:
    case 42:
       return (
         <NavWrapper title="Case Review" back={38} role="doctor" transparentHeader showBottomNav={false}>
            <div className="flex flex-col h-full bg-black relative">
               {/* Viewer Area */}
               <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
                  <motion.img 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={showHeatmap ? IMAGES.xrayHeatmap : IMAGES.xrayNormal} 
                    className="w-full h-full object-contain" 
                  />
                  
                  {/* Overlays */}
                  <div className="absolute top-20 left-4 flex flex-col gap-2 pointer-events-none">
                     <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
                        <Check className="w-3 h-3 text-green-500" />
                        <span className="text-xs font-medium text-white">Quality: Optimal</span>
                     </div>
                  </div>

                  {/* Heatmap Legend Overlay (Screen 42) */}
                  <AnimatePresence>
                  {showHeatmap && (
                     <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute top-20 right-4 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-red-500/30 text-white text-xs space-y-3 max-w-[180px] shadow-xl"
                     >
                        <div className="flex items-center justify-between mb-1 border-b border-white/10 pb-2">
                           <span className="font-black text-red-400 tracking-wider">CRITICAL</span>
                           <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
                        </div>
                        <div className="space-y-3">
                           <div>
                              <div className="flex justify-between items-center mb-1">
                                 <span className="text-slate-300 font-medium">Pneumothorax</span>
                                 <span className="font-bold text-red-400">98%</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-1.5">
                                 <div className="bg-red-500 h-full rounded-full" style={{ width: '98%' }} />
                              </div>
                           </div>
                           <div>
                              <div className="flex justify-between items-center mb-1">
                                 <span className="text-slate-300 font-medium">Effusion</span>
                                 <span className="font-bold text-orange-400">45%</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-1.5">
                                 <div className="bg-orange-500 h-full rounded-full" style={{ width: '45%' }} />
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  )}
                  </AnimatePresence>

                  {/* Viewer Toolbar */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                      <button className="p-3.5 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 backdrop-blur-md border border-white/10 shadow-lg"><ZoomIn className="w-5 h-5" /></button>
                      <button className="p-3.5 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 backdrop-blur-md border border-white/10 shadow-lg"><Move className="w-5 h-5" /></button>
                      <button className="p-3.5 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 backdrop-blur-md border border-white/10 shadow-lg"><Sun className="w-5 h-5" /></button>
                      <button 
                        onClick={() => setShowHeatmap(!showHeatmap)} 
                        className={`p-3.5 rounded-full transition-all backdrop-blur-md border shadow-lg ${showHeatmap ? 'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-500/50' : 'bg-slate-800/80 text-slate-400 border-white/10'}`}
                     >
                        <Brain className="w-5 h-5" />
                     </button>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute bottom-48 flex gap-4 z-20">
                     <button className="flex items-center gap-2 px-6 py-3 bg-red-600/90 hover:bg-red-700 text-white rounded-full font-bold shadow-lg backdrop-blur-sm transition-transform active:scale-95 border border-red-500/50" onClick={() => navigate(44)}>
                        <X className="w-5 h-5" /> Reject
                     </button>
                     <button className="flex items-center gap-2 px-6 py-3 bg-green-600/90 hover:bg-green-700 text-white rounded-full font-bold shadow-lg backdrop-blur-sm transition-transform active:scale-95 border border-green-500/50" onClick={() => navigate(43)}>
                        <Check className="w-5 h-5" /> Accept
                     </button>
                  </div>
               </div>

               {/* Bottom Sheet: Findings & Analysis (Screen 41 content integrated) */}
               <motion.div 
                  className="bg-white rounded-t-3xl p-6 relative z-10 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.3)] pb-8"
                  initial={{ y: 200 }}
                  animate={{ y: 0 }}
               >
                  <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6" />
                  
                  <div className="flex items-start justify-between mb-4">
                     <div>
                        <div className="flex items-center gap-2 mb-1">
                           <h2 className="font-bold text-xl text-slate-900">AI Analysis</h2>
                           <Badge variant="warning" className="text-[10px] h-5 px-2 tracking-wide font-bold">V 2.1</Badge>
                        </div>
                        <p className="text-sm text-slate-500">Auto-generated preliminary findings</p>
                     </div>
                     <button className="text-indigo-600 text-sm font-bold bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors" onClick={() => navigate(44)}>Edit</button>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-700 leading-relaxed font-medium mb-6">
                     "Right-sided apical pneumothorax is noted with approx. 2.4cm pleural separation. No mediastinal shift. Left lung field clear."
                  </div>

                  <div className="flex gap-3">
                     <Button fullWidth variant="outlined" className="border-slate-200 text-slate-600 h-12 font-bold" onClick={() => navigate(48)}>
                        <Clock className="w-4 h-4 mr-2" /> History
                     </Button>
                     <Button fullWidth className="bg-indigo-600 h-12 font-bold shadow-lg shadow-indigo-200" onClick={() => navigate(43)}>
                        Confirm Diagnosis
                     </Button>
                  </div>
               </motion.div>
            </div>
         </NavWrapper>
       );

    // ----------------------------------------------------------------------
    // 40. Critical Alerts Screen
    // ----------------------------------------------------------------------
    case 40:
       return (
         <NavWrapper title="Critical Alerts" back={36}>
            <div className="p-4 space-y-4">
               <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex gap-3 items-start">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                     <h3 className="font-bold text-red-900 text-sm">Action Required</h3>
                     <p className="text-xs text-red-700 mt-1">4 critical cases require immediate review. Average wait time exceeding 15 minutes.</p>
                  </div>
               </div>
               
               {MOCK_SCANS.filter(s => s.priority === 'High').map((scan, i) => (
                 <motion.div key={scan.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                    <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.99] border-l-4 border-l-red-500 bg-white" onClick={() => navigate(39)}>
                       <div className="flex justify-between mb-2">
                          <span className="text-xs font-bold text-slate-500">ID: {scan.id}</span>
                          <span className="text-xs font-bold text-red-600 animate-pulse">Wait: 18m</span>
                       </div>
                       <div className="flex gap-4">
                          <div className="w-16 h-16 bg-slate-900 rounded-xl overflow-hidden relative shadow-md shrink-0">
                             <img src={IMAGES.xrayNormal} className="w-full h-full object-cover opacity-80" />
                          </div>
                          <div className="flex-1 min-w-0">
                             <h3 className="font-bold text-base text-slate-900 truncate">Patient Name</h3>
                             <p className="text-sm text-red-600 font-bold mt-1">{scan.aiResult}</p>
                             <div className="flex gap-2 mt-2">
                                <Badge variant="error" className="text-[10px] uppercase font-bold px-2">Critical</Badge>
                                <Badge variant="outline" className="text-[10px]">Confidence: 98%</Badge>
                             </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-slate-300 self-center" />
                       </div>
                    </Card>
                 </motion.div>
               ))}
            </div>
         </NavWrapper>
       );

    // ----------------------------------------------------------------------
    // 43. Diagnosis Confirmation Screen
    // ----------------------------------------------------------------------
    case 43:
      return (
         <NavWrapper title="Confirm Diagnosis" back={39} showBottomNav={false}>
            <div className="p-4 space-y-6">
               <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 shadow-sm text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Brain className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">AI Diagnosis</h3>
                  <p className="text-2xl font-black text-indigo-700 mt-2">Pneumothorax</p>
                  <div className="flex justify-center gap-2 mt-2">
                     <Badge variant="warning" className="px-3">98% Confidence</Badge>
                     <Badge variant="outline" className="bg-white">Right-Sided</Badge>
                  </div>
               </div>

               <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider ml-1">Your Assessment</h3>
                  
                  <label className="flex items-center gap-4 p-4 border-2 border-indigo-600 bg-indigo-50/50 rounded-xl cursor-pointer transition-all shadow-sm">
                     <div className="w-6 h-6 rounded-full border-2 border-indigo-600 flex items-center justify-center bg-indigo-600 text-white">
                        <Check className="w-4 h-4" />
                     </div>
                     <div>
                        <span className="font-bold text-indigo-900 block">Agree with AI</span>
                        <span className="text-xs text-indigo-700">Confirm Pneumothorax</span>
                     </div>
                  </label>

                  <Button fullWidth variant="outlined" className="justify-start h-14 border-slate-200 text-slate-600" onClick={() => navigate(44)}>
                     <div className="w-6 h-6 rounded-full border-2 border-slate-300 mr-4" />
                     Modify Diagnosis
                  </Button>

                  <div className="pt-4">
                     <label className="text-xs font-bold text-slate-500 uppercase ml-1 mb-2 block">Add Clinical Note (Optional)</label>
                     <textarea className="w-full p-4 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none bg-white" placeholder="Add specific observations..." />
                  </div>

                  <Button fullWidth className="bg-indigo-600 mt-4 h-14 font-bold text-lg shadow-lg shadow-indigo-200" onClick={() => navigate(45)}>Proceed to Report</Button>
               </div>
            </div>
         </NavWrapper>
       );

    // ----------------------------------------------------------------------
    // 44. Diagnosis Modification Screen
    // ----------------------------------------------------------------------
    case 44:
      return (
         <NavWrapper title="Modify Diagnosis" back={39} showBottomNav={false}>
            <div className="p-4 space-y-6">
               <div className="space-y-4">
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider ml-1">Select Primary Condition</h3>
                  
                  {[
                     'No Acute Findings',
                     'Pneumonia',
                     'Pleural Effusion',
                     'Nodule / Mass',
                     'Cardiomegaly',
                     'Fracture'
                  ].map((condition, i) => (
                     <label key={i} className="flex items-center gap-4 p-4 border border-slate-200 bg-white rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
                        <input type="radio" name="diagnosis" className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
                        <span className="font-medium text-slate-700">{condition}</span>
                     </label>
                  ))}
                  
                  <label className="flex items-center gap-4 p-4 border border-slate-200 bg-white rounded-xl cursor-pointer">
                     <input type="radio" name="diagnosis" className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                     <input type="text" placeholder="Other (Type here...)" className="flex-1 outline-none text-slate-900 bg-transparent border-b border-slate-200 pb-1 focus:border-indigo-500 transition-colors" />
                  </label>
               </div>

               <Button fullWidth className="bg-slate-900 mt-4 h-14 font-bold text-lg" onClick={() => navigate(45)}>Update & Continue</Button>
            </div>
         </NavWrapper>
       );

    // ----------------------------------------------------------------------
    // 45. Report Generation Screen
    // ----------------------------------------------------------------------
    case 45:
       return (
         <NavWrapper title="Generate Report" back={43} showBottomNav={false}>
            <div className="p-4 space-y-6">
               <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex gap-4 items-center mb-6">
                     <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                        <img src={IMAGES.xrayNormal} className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <h3 className="font-bold text-slate-900">John Doe</h3>
                        <p className="text-xs text-slate-500">ID: P-1024 • 45M</p>
                     </div>
                  </div>
                  
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Report Configuration</h4>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Include Key Images</span>
                        <Switch checked={reportConfig.includeImages} onCheckedChange={(c) => setReportConfig({...reportConfig, includeImages: c})} />
                     </div>
                     <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Detailed Findings</span>
                        <Switch checked={reportConfig.detailedFindings} onCheckedChange={(c) => setReportConfig({...reportConfig, detailedFindings: c})} />
                     </div>
                     <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Show AI Confidence Score</span>
                        <Switch checked={reportConfig.aiConfidence} onCheckedChange={(c) => setReportConfig({...reportConfig, aiConfidence: c})} />
                     </div>
                  </div>
               </div>

               <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Recipients</h4>
                  <Card className="flex items-center gap-3 p-3 bg-white border-slate-200">
                     <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">Dr</div>
                     <div className="flex-1">
                        <p className="text-sm font-bold text-slate-900">Dr. Gregory House</p>
                        <p className="text-xs text-slate-500">Referring Physician</p>
                     </div>
                     <CheckCircle className="w-5 h-5 text-green-500" />
                  </Card>
                  <Button variant="outlined" className="w-full border-dashed border-slate-300 text-slate-500">
                     + Add Recipient
                  </Button>
               </div>

               <div className="pt-8">
                  <Button fullWidth className="bg-indigo-600 h-14 font-bold text-lg shadow-lg shadow-indigo-200" onClick={() => navigate(46)}>
                     <FileText className="w-5 h-5 mr-2" /> Preview Report
                  </Button>
               </div>
            </div>
         </NavWrapper>
       );

    // ----------------------------------------------------------------------
    // 46. Report Preview Screen
    // ----------------------------------------------------------------------
    case 46:
       return (
         <NavWrapper title="Report Preview" back={45} showBottomNav={false}>
            <div className="p-4 h-full flex flex-col pb-8 bg-slate-100">
               <div className="flex-1 bg-white shadow-xl rounded-sm p-8 space-y-6 relative overflow-hidden text-sm">
                  {/* Paper Header */}
                  <div className="flex justify-between border-b-2 border-slate-900 pb-4">
                     <div className="flex items-center gap-2 text-indigo-700 font-black text-xl">
                        <Activity className="w-6 h-6" /> MediScan
                     </div>
                     <div className="text-right">
                        <span className="text-xs text-slate-500 block">Report #RPT-2023-884</span>
                        <span className="text-xs text-slate-900 font-bold">FINAL REPORT</span>
                     </div>
                  </div>
                  
                  {/* Patient Info */}
                  <div className="grid grid-cols-2 gap-4 text-xs">
                     <div>
                        <p className="text-slate-400 uppercase font-bold">Patient</p>
                        <p className="font-bold text-slate-900 text-base">John Doe</p>
                        <p className="text-slate-600">ID: P-1024 • DOB: 12/05/1978</p>
                     </div>
                     <div className="text-right">
                        <p className="text-slate-400 uppercase font-bold">Exam Date</p>
                        <p className="font-bold text-slate-900 text-base">Oct 24, 2023</p>
                        <p className="text-slate-600">10:30 AM</p>
                     </div>
                  </div>

                  {/* Body */}
                  <div className="space-y-4 pt-2">
                     <div>
                        <p className="text-xs font-bold text-slate-900 uppercase border-b border-slate-100 mb-2">Clinical History</p>
                        <p className="text-slate-700">45-year-old male presenting with shortness of breath and right-sided chest pain.</p>
                     </div>
                     
                     <div>
                        <p className="text-xs font-bold text-slate-900 uppercase border-b border-slate-100 mb-2">Findings</p>
                        <p className="text-slate-700 leading-relaxed">
                           Right-sided large pneumothorax identified with approximately 2.4cm pleural separation at the apex. No significant mediastinal shift. The left lung is clear. Heart size is normal. Bony thorax is intact.
                        </p>
                     </div>

                     <div className="bg-slate-50 p-3 border border-slate-100 rounded">
                        <p className="text-xs font-bold text-slate-900 uppercase mb-1">Impression</p>
                        <p className="font-bold text-slate-900">
                           1. RIGHT-SIDED PNEUMOTHORAX.
                        </p>
                        <p className="text-slate-700">2. Urgent clinical correlation recommended.</p>
                     </div>
                  </div>

                  {/* Footer */}
                  <div className="pt-8 mt-auto">
                     <div className="h-12 w-32 border-b border-slate-900 mb-1 relative">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" className="absolute bottom-0 w-full opacity-60 mix-blend-multiply h-full object-contain" />
                     </div>
                     <p className="text-xs font-bold text-slate-900">Dr. Sarah Bennett, MD</p>
                     <p className="text-[10px] text-slate-500">Electronically Signed: 10/24/2023 10:45 AM</p>
                  </div>
               </div>

               <div className="flex gap-3 mt-6">
                  <Button variant="outlined" className="bg-white border-slate-300 flex-1 h-14" onClick={() => navigate(45)}>Edit</Button>
                  <Button className="bg-indigo-600 flex-[2] h-14 font-bold shadow-lg shadow-indigo-200" onClick={() => navigate(47)}>Sign & Finalize</Button>
               </div>
            </div>
         </NavWrapper>
       );

    // ----------------------------------------------------------------------
    // 47. Report Download / Share Screen
    // 50. Final Case Closure Screen
    // ----------------------------------------------------------------------
    case 47: 
    case 50:
       return (
         <MobileFrame>
            <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-8 relative bg-slate-50">
               <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  transition={{ type: "spring", damping: 12 }}
                  className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-xl shadow-green-100"
               >
                  <Check className="w-12 h-12 text-green-600" />
               </motion.div>
               
               <div className="space-y-2">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Case Closed</h2>
                  <p className="text-slate-500 font-medium">The report has been finalized and distributed securely.</p>
               </div>
               
               <Card className="w-full bg-white border border-slate-200 p-5 flex items-center gap-5 text-left shadow-sm rounded-2xl cursor-pointer hover:border-indigo-300 transition-colors">
                  <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center shrink-0 border border-red-100">
                     <FileText className="w-7 h-7 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                     <p className="font-bold text-slate-900 truncate text-lg">Report_J.Doe.pdf</p>
                     <p className="text-xs text-slate-500 font-medium">1.2 MB • Finalized</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setShowShare(true)}>
                     <Share2 className="w-5 h-5 text-slate-400" />
                  </Button>
               </Card>

               <div className="grid grid-cols-2 gap-4 w-full pt-4">
                  <Button variant="outlined" className={`gap-2 border-slate-300 text-slate-700 h-12 font-bold bg-white ${downloading ? 'opacity-50' : ''}`} onClick={handleDownload} disabled={downloading}>
                     {downloading ? <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" /> : <Download className="w-4 h-4" />}
                     {downloading ? 'Saving...' : 'Download'}
                  </Button>
                  <Button variant="outlined" className="gap-2 border-slate-300 text-slate-700 h-12 font-bold bg-white" onClick={() => setShowShare(true)}>
                     <Share2 className="w-4 h-4" /> Share
                  </Button>
               </div>

               <Button fullWidth onClick={() => navigate(36)} className="bg-indigo-600 h-14 font-bold text-lg shadow-lg shadow-indigo-200">Return to Dashboard</Button>
               <Button variant="text" onClick={() => navigate(38)} className="text-slate-500">View Next Case</Button>

               {/* Share Sheet Overlay */}
               <AnimatePresence>
               {showShare && (
                  <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center" 
                     onClick={() => setShowShare(false)}
                  >
                     <motion.div 
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 20 }}
                        className="w-full max-w-md bg-white rounded-t-3xl p-6 pb-10" 
                        onClick={e => e.stopPropagation()}
                     >
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full mx-auto mb-8" />
                        <h3 className="font-bold text-xl mb-6 text-center text-slate-900">Share Report</h3>
                        
                        <div className="grid grid-cols-4 gap-4 mb-8">
                           <button className="flex flex-col items-center gap-3 group" onClick={() => handleShareAction('Email')}>
                              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors group-active:scale-95 duration-200">
                                 <Mail className="w-7 h-7 text-indigo-600" />
                              </div>
                              <span className="text-xs font-bold text-slate-600">Email</span>
                           </button>
                           <button className="flex flex-col items-center gap-3 group" onClick={() => handleShareAction('Teams')}>
                              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors group-active:scale-95 duration-200">
                                 <MessageSquare className="w-7 h-7 text-indigo-600" />
                              </div>
                              <span className="text-xs font-bold text-slate-600">Teams</span>
                           </button>
                           <button className="flex flex-col items-center gap-3 group" onClick={() => handleShareAction('Print')}>
                              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-100 transition-colors group-active:scale-95 duration-200">
                                 <Printer className="w-7 h-7 text-indigo-600" />
                              </div>
                              <span className="text-xs font-bold text-slate-600">Print</span>
                           </button>
                           <button className="flex flex-col items-center gap-3 group" onClick={() => handleShareAction('More')}>
                              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-slate-200 transition-colors group-active:scale-95 duration-200">
                                 <Share2 className="w-7 h-7 text-slate-500" />
                              </div>
                              <span className="text-xs font-bold text-slate-600">More</span>
                           </button>
                        </div>
                        
                        <Button fullWidth variant="outlined" onClick={() => setShowShare(false)} className="h-12 font-bold border-slate-200">Cancel</Button>
                     </motion.div>
                  </motion.div>
               )}
               </AnimatePresence>
            </div>
         </MobileFrame>
       );

    // ----------------------------------------------------------------------
    // 48. Patient History List Screen
    // ----------------------------------------------------------------------
    case 48:
       return (
         <NavWrapper title="Patient History" back={39}>
            <div className="p-4 space-y-4">
               {/* Patient Header */}
               <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 mb-2">
                  <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-lg">JD</div>
                  <div>
                     <h2 className="font-bold text-slate-900">John Doe</h2>
                     <p className="text-xs text-slate-500">ID: P-1024 • 45 Years • Male</p>
                  </div>
               </div>

               <h3 className="text-xs font-bold text-slate-500 uppercase ml-1">Previous Exams</h3>
               
               <div className="space-y-3">
                  {[
                     { date: "Oct 24, 2023", type: "Chest X-Ray", finding: "Pneumothorax", doctor: "Dr. S. Bennett" },
                     { date: "Aug 12, 2022", type: "CT Chest", finding: "Normal", doctor: "Dr. G. House" },
                     { date: "Jan 05, 2021", type: "Chest X-Ray", finding: "Bronchitis", doctor: "Dr. L. Cuddy" }
                  ].map((exam, i) => (
                     <Card key={i} className="p-4 bg-white border border-slate-200 hover:border-indigo-300 cursor-pointer transition-colors" onClick={() => navigate(49)}>
                        <div className="flex justify-between items-start mb-2">
                           <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-slate-400" />
                              <span className="font-bold text-slate-900 text-sm">{exam.date}</span>
                           </div>
                           <ChevronRight className="w-4 h-4 text-slate-300" />
                        </div>
                        <div className="pl-6 space-y-1">
                           <p className="text-sm font-medium text-indigo-700">{exam.type}</p>
                           <p className="text-xs text-slate-600">Finding: <span className="font-semibold">{exam.finding}</span></p>
                           <p className="text-[10px] text-slate-400">Signed by {exam.doctor}</p>
                        </div>
                     </Card>
                  ))}
               </div>
            </div>
         </NavWrapper>
       );

    // ----------------------------------------------------------------------
    // 49. Patient History Detail Screen
    // ----------------------------------------------------------------------
    case 49:
       return (
         <NavWrapper title="Exam Details" back={48}>
            <div className="flex flex-col h-full bg-slate-50">
               <div className="h-64 bg-black relative shrink-0">
                  <img src={IMAGES.xrayNormal} className="w-full h-full object-contain opacity-80" />
                  <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-md">
                     Aug 12, 2022
                  </div>
               </div>
               
               <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                  <div>
                     <h2 className="font-bold text-xl text-slate-900 mb-1">CT Chest w/ Contrast</h2>
                     <p className="text-sm text-slate-500">Performed at General Hospital • Radiology Dept</p>
                  </div>

                  <div className="space-y-4">
                     <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase border-b border-slate-200 pb-1 mb-2">Findings</h3>
                        <p className="text-sm text-slate-700 leading-relaxed">
                           No evidence of pulmonary embolism. The lungs are clear without consolidation, effusion, or pneumothorax. Heart size is within normal limits.
                        </p>
                     </div>
                     <div>
                        <h3 className="text-xs font-bold text-slate-500 uppercase border-b border-slate-200 pb-1 mb-2">Impression</h3>
                        <p className="text-sm font-bold text-slate-900">
                           Normal CT Chest.
                        </p>
                     </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                     <Button variant="outlined" className="flex-1 border-slate-300 bg-white" onClick={() => navigate(46)}>
                        <FileText className="w-4 h-4 mr-2" /> View Report
                     </Button>
                     <Button variant="outlined" className="flex-1 border-slate-300 bg-white">
                        <Copy className="w-4 h-4 mr-2" /> Compare
                     </Button>
                  </div>
               </div>
            </div>
         </NavWrapper>
       );

    default:
      return <div>Screen {screenId} not found</div>;
  }
};