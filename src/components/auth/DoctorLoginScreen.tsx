import React, { useState } from 'react';
import { Activity, Eye, EyeOff, ArrowLeft, User, Lock } from 'lucide-react';
import { loginDoctor } from '../../lib/api';

interface DoctorLoginScreenProps {
  navigate: (screenId: number) => void;
  setRole: (role: any) => void;
}

export const DoctorLoginScreen = ({ navigate, setRole }: DoctorLoginScreenProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await loginDoctor({ email: username, password });
      // Assuming response has token
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userRole', 'doctor');
      setRole('doctor');
      navigate(36); // Navigate to Doctor Dashboard
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      {/* Status Bar */}
      <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between">
        <span className="font-medium">12:00</span>
        <span className="font-medium">5G 100%</span>
      </div>

      {/* Blue Header */}
      <div className="bg-[#2563EB] text-white px-4 pb-6 shrink-0 flex items-center gap-3 relative">
        <button onClick={() => navigate(2)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-medium">Login: Doctor</h1>
        {/* Pink dot indicator */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-2 w-2 h-2 bg-pink-500 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 pb-8 overflow-y-auto">
        {/* Icon and Welcome Section */}
        <div className="flex flex-col items-center text-center pt-8 pb-6">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <Activity className="w-8 h-8 text-[#2563EB]" strokeWidth={2} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Welcome Back</h2>
          <p className="text-slate-400 text-sm">Please enter your credentials</p>
        </div>

        {/* Form */}
        <div className="space-y-4 max-w-sm mx-auto w-full">
          {/* Username Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-500 block pl-1">Username / ID</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <User className="w-4 h-4" strokeWidth={2} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: doctor.user"
                className="w-full h-12 bg-slate-50/50 border border-slate-100 rounded-xl pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:bg-white focus:border-blue-200 transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-500 block pl-1">Password</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Lock className="w-4 h-4" strokeWidth={2} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 bg-slate-50/50 border border-slate-100 rounded-xl pl-11 pr-11 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:bg-white focus:border-blue-200 transition-all"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end items-center gap-2 pt-1">
            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
            <button
              onClick={() => navigate(75)}
              className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-12 bg-[#2563EB] hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium text-sm rounded-full shadow-md shadow-blue-200 transition-all active:scale-[0.98] mt-6"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          {error && (
            <div className="text-red-500 text-sm text-center mt-2">
              {error}
            </div>
          )}

          {/* Create Account Link */}
          <div className="text-center pt-6">
            <p className="text-sm text-slate-400">
              Don't have an account?
            </p>
            <button
              onClick={() => navigate(67)}
              className="font-bold text-slate-900 hover:text-[#2563EB] text-sm transition-colors mt-1"
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Indicator */}
      <div className="pb-2 flex justify-center">
        <div className="w-32 h-1 bg-pink-500 rounded-full"></div>
      </div>
    </div>
  );
};
