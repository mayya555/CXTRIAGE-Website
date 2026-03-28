import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/Material';
import { Icons } from '../../lib/data';
import { MobileFrame } from '../../components/layout/MobileFrame';
import { Eye, EyeOff, ArrowLeft, Stethoscope, Shield, Scan, ChevronRight, UserPlus } from 'lucide-react';

interface LoginScreenProps {
  navigate: (screenId: number) => void;
  setRole: (role: any) => void;
  username: string;
  setUsername: (u: string) => void;
  password: string;
  setPassword: (p: string) => void;
  loading: boolean;
  setLoading: (l: boolean) => void;
  selectedRole: string;
  setSelectedRole: (r: string) => void;
}

export const LoginScreen = ({ 
  navigate, setRole, username, setUsername, password, setPassword, loading, setLoading, selectedRole, setSelectedRole 
}: LoginScreenProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [viewState, setViewState] = useState<'role-selection' | 'login-form'>('role-selection');

  // Setup auto-fill based on role
  useEffect(() => {
    switch(selectedRole) {
      case 'Doctor':
        setUsername('dr.sarah@cxtriage.ai');
        setPassword('clinical_access_01');
        break;
      case 'Technician':
        setUsername('tech.mike@cxtriage.ai');
        setPassword('scan_protocol_v2');
        break;
      default:
        setUsername('');
        setPassword('');
    }
  }, [selectedRole]);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setViewState('login-form');
  };

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Navigate directly to dashboard based on role
      if (selectedRole === 'Admin') {
        navigate(23); // Admin uses same as Technician Dashboard
      } else if (selectedRole === 'Technician') {
        setRole('technician');
        navigate(23); // Technician Dashboard
      } else if (selectedRole === 'Doctor') {
        setRole('doctor');
        navigate(36); // Doctor Dashboard
      }
    }, 800);
  };

  const roleConfig = {
    Admin: { color: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-600', ring: 'ring-purple-600', shadow: 'shadow-purple-200', icon: Shield },
    Doctor: { color: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600', ring: 'ring-blue-600', shadow: 'shadow-blue-200', icon: Stethoscope },
    Technician: { color: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600', ring: 'ring-blue-600', shadow: 'shadow-blue-200', icon: Scan }
  };

  const activeTheme = roleConfig[selectedRole as keyof typeof roleConfig] || roleConfig.Admin;

  if (loading) {
    const RoleIcon = activeTheme.icon;
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-white text-center space-y-10">
         <div className="relative w-40 h-40 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
            <div className={`absolute inset-0 rounded-full border-4 border-t-transparent animate-spin ${activeTheme.border.replace('bg-', 'border-')}`} />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
               <RoleIcon className={`w-10 h-10 mb-1 ${activeTheme.text}`} />
            </div>
         </div>

         <div className="space-y-2">
           <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
             Verifying Credentials...
           </h2>
           <p className="text-slate-500 text-sm max-w-[260px] mx-auto leading-relaxed">
             Authenticating with Hospital {selectedRole} Directory.
           </p>
         </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // VIEW 1: ROLE SELECTION
  // --------------------------------------------------------------------------
  if (viewState === 'role-selection') {
    return (
      <div className="flex flex-col h-full bg-slate-50 relative font-sans">
         <div className="bg-[#2563EB] text-white p-4 pt-12 flex items-center gap-4 shrink-0 shadow-sm">
            <button onClick={() => navigate(2)} className="p-1 hover:bg-white/10 rounded-full">
               <ArrowLeft className="w-6 h-6" />
            </button>
         </div>

         <div className="flex-1 px-6 pb-8 flex flex-col justify-center -mt-12">
            <div className="mb-8">
               <div className="flex items-center gap-2 mb-2">
                  <button className="text-[#2563EB] font-bold text-sm flex items-center gap-1" onClick={() => navigate(2)}>
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
               </div>
               <h1 className="text-3xl font-bold text-slate-900 mb-2">Select Your Role</h1>
               <p className="text-slate-500 text-base">Choose your role to continue</p>
            </div>

            <div className="space-y-4">
               <button 
                  onClick={() => handleRoleSelect('Doctor')}
                  className="w-full bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-[#2563EB] hover:shadow-md transition-all group active:scale-[0.99]"
               >
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 bg-[#2563EB] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                        <Stethoscope className="w-7 h-7" />
                     </div>
                     <div className="text-left">
                        <span className="block font-bold text-slate-900 text-lg">Doctor</span>
                        <span className="text-xs text-slate-500 font-medium">Radiologist / Physician</span>
                     </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#2563EB] transition-colors" />
               </button>

               <button 
                  onClick={() => handleRoleSelect('Technician')}
                  className="w-full bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-[#2563EB] hover:shadow-md transition-all group active:scale-[0.99]"
               >
                  <div className="flex items-center gap-4">
                     <div className="w-14 h-14 bg-[#2563EB] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                        <Scan className="w-7 h-7" />
                     </div>
                     <div className="text-left">
                        <span className="block font-bold text-slate-900 text-lg">Technician</span>
                        <span className="text-xs text-slate-500 font-medium">Radiography Staff</span>
                     </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#2563EB] transition-colors" />
               </button>
            </div>
         </div>
         <div className="h-1 w-32 bg-slate-200 rounded-full mx-auto mb-2" />
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // VIEW 2: LOGIN FORM
  // --------------------------------------------------------------------------
  const RoleIcon = activeTheme.icon;

  return (
    <div className="flex flex-col h-full bg-white relative font-sans">
      <div className={`p-4 pt-12 flex items-center gap-4 shrink-0 shadow-sm transition-colors duration-300 ${activeTheme.color} text-white`}>
         <button onClick={() => setViewState('role-selection')} className="p-1 hover:bg-white/10 rounded-full">
            <ArrowLeft className="w-6 h-6" />
         </button>
         <h1 className="text-lg font-bold">{selectedRole} Login</h1>
      </div>

      <div className="flex-1 px-8 pt-10 flex flex-col items-center overflow-y-auto">
        <div className="mb-6 relative">
           <div className={`w-20 h-20 rounded-[24px] flex items-center justify-center shadow-xl z-10 relative transition-colors duration-300 ${activeTheme.color} ${activeTheme.shadow}`}>
              <RoleIcon className="w-10 h-10 text-white stroke-[1.5]" />
           </div>
        </div>

        <div className="text-center space-y-1 mb-8">
           <h2 className="text-2xl font-bold tracking-wide text-slate-900">
             Welcome Back
           </h2>
           <p className="text-slate-400 text-sm font-medium">Please sign in to continue</p>
        </div>

        <div className="w-full space-y-5">
           <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email ID</label>
              <div className="relative group">
                 <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${activeTheme.text}`}>
                    <Icons.User className="w-5 h-5" />
                 </div>
                 <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:border-transparent transition-all font-medium focus:bg-white"
                    style={{ '--tw-ring-color': '#2563eb' } as any}
                    placeholder={`${selectedRole.toLowerCase()}@hospital.org`}
                 />
              </div>
           </div>

           <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                 <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${activeTheme.text}`}>
                    <Icons.Lock className="w-5 h-5" />
                 </div>
                 <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-12 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:border-transparent transition-all font-medium tracking-widest focus:bg-white"
                    style={{ '--tw-ring-color': '#2563eb' } as any}
                    placeholder="••••••••"
                 />
                 <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                 >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                 </button>
              </div>
           </div>

           <div className="flex justify-end pt-1">
              <button 
                 onClick={() => navigate(75)} 
                 className={`text-sm font-bold transition-colors ${activeTheme.text} hover:opacity-80`}
              >
                 Forgot Password?
              </button>
           </div>
        </div>

        <div className="w-full mt-8">
           <button 
             onClick={handleLogin}
             disabled={loading}
             className={`w-full h-14 rounded-full text-white font-bold text-lg shadow-lg flex items-center justify-center transition-all active:scale-[0.98] ${activeTheme.color} hover:opacity-90 ${activeTheme.shadow}`}
           >
             Secure Login
           </button>
        </div>

        {/* Create Account Button - ONLY for Doctor and Technician */}
        {selectedRole !== 'Admin' && (
           <div className="mt-6 w-full flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <div className="flex items-center gap-3 w-full px-2">
                 <div className="h-px bg-slate-100 flex-1" />
                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">New User?</span>
                 <div className="h-px bg-slate-100 flex-1" />
              </div>
              <button 
                 onClick={() => navigate(67)}
                 className="w-full h-12 rounded-xl border-2 border-dashed border-blue-200 text-blue-600 hover:bg-blue-50 font-bold text-sm flex items-center justify-center transition-all gap-2"
              >
                 <UserPlus className="w-4 h-4" /> Create {selectedRole} Account
              </button>
           </div>
        )}

        <div className="mt-auto pb-4 pt-6">
           <p className="text-xs text-slate-400 text-center">CXTRIAGE AI v2.5.0 • Authorized Personnel Only</p>
        </div>
      </div>
    </div>
  );
};