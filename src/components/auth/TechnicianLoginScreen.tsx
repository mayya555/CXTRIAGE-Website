import React, { useState } from 'react';
import { Activity, Eye, EyeOff, ArrowLeft, User, Lock } from 'lucide-react';

interface TechnicianLoginScreenProps {
  navigate: (screenId: number) => void;
  setRole: (role: any) => void;
}

export const TechnicianLoginScreen = ({ navigate, setRole }: TechnicianLoginScreenProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setRole('technician');
    navigate(74); // Navigate directly to Terms & Conditions for Technician
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* Status Bar */}
      <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
        <span>12:30</span>
        <span>5G 100%</span>
      </div>

      {/* Blue Header */}
      <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
        <button onClick={() => navigate(2)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
          <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
        </button>
        <h1 className="text-lg font-medium">Login: Technician</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 pb-8 overflow-y-auto bg-gray-50">
        {/* Icon and Welcome Section */}
        <div className="flex flex-col items-center text-center pt-10 pb-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <Activity className="w-10 h-10 text-[#2563EB]" strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
          <p className="text-slate-400 text-sm">Please enter your credentials to continue</p>
        </div>

        {/* Form */}
        <div className="space-y-5 max-w-sm mx-auto w-full">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">Username / ID</label>
            <div className="relative bg-white rounded-xl border border-gray-200">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2563EB]">
                <User className="w-5 h-5" strokeWidth={2} />
              </div>
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: tech.user"
                className="w-full h-14 bg-transparent border-0 rounded-xl pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block">Password</label>
            <div className="relative bg-white rounded-xl border border-gray-200">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2563EB]">
                <Lock className="w-5 h-5" strokeWidth={2} />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-14 bg-transparent border-0 rounded-xl pl-12 pr-12 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end pt-1">
            <button 
              onClick={() => navigate(75)}
              className="text-sm text-slate-400 hover:text-[#2563EB] transition-colors font-medium"
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button 
            onClick={handleLogin}
            className="w-full h-14 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-base rounded-xl transition-all active:scale-[0.98] mt-6 shadow-lg shadow-blue-200"
          >
            Sign In
          </button>

          {/* Create Account Link */}
          <div className="text-center pt-4">
            <p className="text-sm text-slate-400 mb-1">
              Don't have an account?
            </p>
            <button 
              onClick={() => navigate(67)}
              className="font-bold text-slate-900 hover:text-[#2563EB] text-sm transition-colors"
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Indicator Bar */}
      <div className="pb-3 flex justify-center bg-gray-50">
        <div className="h-1 bg-slate-300 rounded-full" style={{ width: '120px' }}></div>
      </div>
    </div>
  );
};