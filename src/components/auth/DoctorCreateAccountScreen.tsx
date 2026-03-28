import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Lock, ChevronDown, Eye, EyeOff } from 'lucide-react';

interface DoctorCreateAccountScreenProps {
  navigate: (screenId: number) => void;
}

export const DoctorCreateAccountScreen = ({ navigate }: DoctorCreateAccountScreenProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [roleRequested, setRoleRequested] = useState('Doctor');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCreateAccount = () => {
    // Navigate to OTP verification
    navigate(68); // Email OTP Entry screen
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* Status Bar */}
      <div className="bg-[#2563EB] text-white px-5 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
        <span>12:30</span>
        <span>5G 100%</span>
      </div>

      {/* Blue Header */}
      <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3 rounded-b-3xl">
        <button onClick={() => navigate(2)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
          <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>
        <h1 className="text-lg font-medium">Create Account</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 pt-6 pb-8 overflow-y-auto">
        <div className="space-y-4 max-w-sm mx-auto w-full">
          {/* First Name and Last Name - Side by Side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 block">First Name</label>
              <input 
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jane"
                className="w-full h-11 bg-slate-50/80 border-0 rounded-lg px-3 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:bg-slate-100/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-500 block">Last Name</label>
              <input 
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="w-full h-11 bg-slate-50/80 border-0 rounded-lg px-3 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:bg-slate-100/50 transition-all"
              />
            </div>
          </div>

          {/* Hospital Email */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 block">Hospital Email</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <User className="w-[18px] h-[18px]" strokeWidth={2} />
              </div>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane.doe@hospital.org"
                className="w-full h-11 bg-slate-50/80 border-0 rounded-lg pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:bg-slate-100/50 transition-all"
              />
            </div>
          </div>

          {/* Role Requested */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 block">Role Requested</label>
            <div className="relative">
              <select 
                value={roleRequested}
                onChange={(e) => setRoleRequested(e.target.value)}
                className="w-full h-11 bg-slate-50/80 border-0 rounded-lg px-3 pr-8 text-sm text-slate-900 outline-none focus:bg-slate-100/50 transition-all appearance-none"
              >
                <option value="Doctor">Doctor</option>
                <option value="Technician">Technician</option>
                <option value="Admin">Admin</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 block">Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock className="w-[18px] h-[18px]" strokeWidth={2} />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 bg-slate-50/80 border-0 rounded-lg pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:bg-slate-100/50 transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-500 block">Confirm Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock className="w-[18px] h-[18px]" strokeWidth={2} />
              </div>
              <input 
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 bg-slate-50/80 border-0 rounded-lg pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:bg-slate-100/50 transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Create Account Button */}
          <button 
            onClick={handleCreateAccount}
            className="w-full h-12 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium text-sm rounded-full transition-all active:scale-[0.98] mt-6"
          >
            Create Account
          </button>

          {/* Terms and Privacy */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-400">
              By submitting, you agree to the{' '}
              <button className="text-[#2563EB] underline hover:text-blue-700">
                Terms of Service
              </button>
              {' '}and{' '}
              <button className="text-[#2563EB] underline hover:text-blue-700">
                Privacy Policy
              </button>
              .
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Indicator Bar */}
      <div className="pb-2 flex justify-center bg-white">
        <div className="h-1 bg-slate-200 rounded-full" style={{ width: '100px' }}></div>
      </div>
    </div>
  );
};
