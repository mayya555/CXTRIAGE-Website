import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, Eye, EyeOff, Stethoscope, Wrench, Shield, ChevronRight, UserPlus } from 'lucide-react';
import { loginDoctor, loginTechnician } from '../../lib/api';
import { toast } from 'sonner';
import { validatePassword } from '../../lib/validation';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'doctor' | 'technician'>('doctor');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }

    const validation = validatePassword(password);
    if (!validation.isValid) {
      toast.error('Password must contain at least one uppercase, one lowercase, one number, and one symbol (Minimum 8 characters)');
      return;
    }

    setLoading(true);
    try {
      if (role === 'technician') {
        const response = await loginTechnician({ email: username, password });
        localStorage.setItem('technicianId', response.technician_id);
        localStorage.setItem('technicianName', response.name);
        localStorage.setItem('userRole', 'technician');
        toast.success('Login successful!');
        navigate('/technician/dashboard');
      } else {
        const response = await loginDoctor({ email: username, password });
        localStorage.setItem('doctorId', response.doctor_id);
        localStorage.setItem('doctorName', response.name);
        localStorage.setItem('doctorEmail', response.email);
        localStorage.setItem('userRole', 'doctor');
        toast.success('Login successful!');
        navigate('/doctor/dashboard');
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0f172a] to-[#1e3a8a] flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-2xl" />
          {/* Fake X-Ray Grid Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Activity className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-tight">CXRT AI</p>
            <p className="text-blue-400 text-xs leading-tight">Chest X-Ray Triage System</p>
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-blue-300 text-xs font-medium">AI System Online</span>
            </div>
            <h1 className="text-4xl text-white mb-4 leading-snug">
              AI-Powered<br />
              <span className="text-[#60a5fa]">Radiology Triage</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Advanced chest X-ray analysis with real-time AI detection, heatmap visualization, and seamless radiologist workflows — accelerating diagnosis by up to 70%.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="space-y-3">
            {[
              { icon: '🔬', text: 'AI Confidence scoring with heatmap overlays' },
              { icon: '⚡', text: 'Critical finding alerts in under 30 seconds' },
              { icon: '📋', text: 'Automated report generation & sharing' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-3">
          <Shield className="w-4 h-4 text-slate-500" />
          <span className="text-slate-500 text-xs">HIPAA Compliant · Encrypted · Audit Logged</span>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md mt-8">
          {/* Mobile Logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <span className="font-bold text-slate-800">CXRT AI</span>
          </div>

          <div className="mb-8">
            <h2 className="text-slate-900 mb-1">Welcome back</h2>
            <p className="text-slate-500 text-sm">Sign in to access your clinical dashboard</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setRole('doctor')}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${role === 'doctor'
                  ? 'border-[#2563EB] bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${role === 'doctor' ? 'bg-[#2563EB]' : 'bg-slate-100'
                  }`}>
                  <Stethoscope className={`w-5 h-5 ${role === 'doctor' ? 'text-white' : 'text-slate-500'}`} />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${role === 'doctor' ? 'text-[#2563EB]' : 'text-slate-700'}`}>Doctor</p>
                  <p className="text-xs text-slate-400">Radiologist</p>
                </div>
              </button>
              <button
                onClick={() => setRole('technician')}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${role === 'technician'
                  ? 'border-[#2563EB] bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${role === 'technician' ? 'bg-[#2563EB]' : 'bg-slate-100'
                  }`}>
                  <Wrench className={`w-5 h-5 ${role === 'technician' ? 'text-white' : 'text-slate-500'}`} />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${role === 'technician' ? 'text-[#2563EB]' : 'text-slate-700'}`}>Technician</p>
                  <p className="text-xs text-slate-400">Radiographer</p>
                </div>
              </button>
            </div>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={role === 'doctor' ? 'dr.michael.chen' : 'sarah.williams'}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your password"
                className="w-full px-4 py-3 pr-11 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all bg-slate-50 focus:bg-white"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => navigate('/forgot-password')}
              className="text-xs text-[#2563EB] hover:underline font-medium"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 active:scale-[0.99] transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Create Account Button */}
          <button
            onClick={() => navigate(role === 'doctor' ? '/doctor/create-account' : '/technician/create-account')}
            className="w-full mt-3 bg-white text-[#2563EB] py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 active:scale-[0.99] transition-all border-2 border-[#2563EB]"
          >
            <UserPlus className="w-4 h-4" />
            Create New Account
          </button>

          {/* Demo Hint */}
          <div className="mt-6 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs text-amber-700 text-center">
              <span className="font-semibold">Demo Mode:</span> Enter any credentials and click Sign In to access the dashboard
            </p>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            © 2026 CXRT AI · Secure Clinical Platform
          </p>
        </div>
      </div>
    </div>
  );
}