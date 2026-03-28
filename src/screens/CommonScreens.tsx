import React, { useState, useEffect } from 'react';
import { Button, Input, Card, Badge } from '../components/ui/Material';
import { Icons, IMAGES, MOCK_USERS, MOCK_SCANS } from '../lib/data';
import { WebLayout } from '../components/layout/WebLayout';
import { LoginScreen } from '../components/auth/LoginScreen';
import { DoctorLoginScreen } from '../components/auth/DoctorLoginScreen';
import { TechnicianLoginScreen } from '../components/auth/TechnicianLoginScreen';
import { DoctorCreateAccountScreen } from '../components/auth/DoctorCreateAccountScreen';
import { ChevronRight, Phone, Mail, MessageSquare, FileText, HelpCircle, Search, ArrowRight, Shield, Zap, Activity, Check, Eye, EyeOff, AlertTriangle } from 'lucide-react';

export const CommonScreens = ({ screenId, navigate, setRole }: any) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Doctor'); 
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [showResendSuccess, setShowResendSuccess] = useState(false);
  
  // Forgot Password Flow State
  const [otpValue, setOtpValue] = useState('');
  const [otpResendTimer, setOtpResendTimer] = useState(30);
  const [otpShowResendSuccess, setOtpShowResendSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Simplified login handler is now managed inside LoginScreen mostly, 
  // but we keep this for legacy refs if needed.
  
  const handleTermsAccept = () => {
    if (selectedRole === 'Technician' || selectedRole === 'Radiologist') {
      setRole('technician');
      navigate(23);
    } else {
      setRole('doctor');
      navigate(36);
    }
  };

  const handleResendOTP = () => {
    setResendTimer(60);
    setShowResendSuccess(true);
    setTimeout(() => setShowResendSuccess(false), 3000);
  };
  
  const handleOtpResend = () => {
    setOtpResendTimer(30);
    setOtpShowResendSuccess(true);
    setTimeout(() => setOtpShowResendSuccess(false), 2000);
  };
  
  const handleResetPassword = () => {
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    navigate(78);
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);
  
  useEffect(() => {
    if (otpResendTimer > 0 && screenId === 76) {
      const timer = setTimeout(() => setOtpResendTimer(otpResendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpResendTimer, screenId]);

  switch (screenId) {
    case 1: // Splash Screen - Web Version
      return (
        <div 
          className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] text-white p-6 relative overflow-hidden cursor-pointer"
          onClick={() => navigate(2)}
        >
          {/* Decorative Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          
          {/* Main Content */}
          <div className="flex flex-col items-center animate-in fade-in duration-700 relative z-10">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-900/20">
              <div className="w-28 h-28 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                 <Activity className="w-14 h-14 text-[#2563EB]" />
              </div>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-center mb-3">CXR-Triage AI</h1>
            <p className="text-blue-100 text-lg font-medium tracking-wide">Advanced Triage System</p>
            <p className="text-blue-200 text-sm mt-2 opacity-75">Click anywhere to continue</p>
          </div>
        </div>
      );

    case 2: // Welcome Screen - Web Version
      return (
        <div className="min-h-screen w-full bg-gradient-to-b from-white to-slate-50 relative flex flex-col items-center justify-center px-6 font-sans">
           {/* Decorative Elements */}
           <div className="absolute inset-0 overflow-hidden">
             <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
             <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
           </div>

           <div className="flex flex-col items-center w-full max-w-2xl relative z-10">
              {/* Logo Card */}
              <div className="w-32 h-32 bg-white rounded-[2rem] flex items-center justify-center mb-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-100">
                 <Activity className="w-16 h-16 text-[#2563EB]" />
              </div>

              {/* Live Badge */}
              <div className="mb-8 bg-blue-50 border border-blue-100 text-[#2563EB] px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2.5">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] animate-pulse" />
                 Live System Active
              </div>

              <h1 className="text-5xl font-bold mb-6 tracking-tight text-slate-900 text-center">Real-Time Triage</h1>
              <p className="text-slate-600 mb-12 text-center leading-relaxed text-lg max-w-xl">
                Instant AI analysis for critical chest X-ray diagnostics. Connect to hospital PACS in milliseconds.
              </p>

              <div className="w-full max-w-md mb-12">
                <Button 
                  fullWidth 
                  size="lg" 
                  className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold h-14 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all" 
                  onClick={() => navigate(3)}
                >
                  Get Started
                </Button>
              </div>

              <div className="flex items-center gap-8 text-xs text-slate-500 font-medium uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <span>&lt;50ms Latency</span>
                </div>
              </div>
           </div>
        </div>
      );

    case 3: // Login Screen (Handles Role Selection internally now)
      return <LoginScreen navigate={navigate} setRole={setRole} username={username} setUsername={setUsername} password={password} setPassword={setPassword} loading={loading} setLoading={setLoading} selectedRole={selectedRole} setSelectedRole={setSelectedRole} />;
    
    // ... Keeping other screens (4-99) as they were ...
    case 67: // Sign Up
      return (
        <MobileFrame title="Create Account" showBack onBack={() => navigate(3)}>
          <div className="p-6 space-y-5">
            <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600 ml-1">First Name</label>
                    <input 
                      type="text"
                      placeholder="Jane" 
                      className="w-full h-12 rounded-xl bg-slate-100 border-0 px-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-600 ml-1">Last Name</label>
                    <input 
                      type="text"
                      placeholder="Doe" 
                      className="w-full h-12 rounded-xl bg-slate-100 border-0 px-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
               </div>

               <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600 ml-1">Hospital Email</label>
                  <div className="relative">
                    <Icons.User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                      type="email"
                      placeholder="jane.doe@hospital.org" 
                      className="w-full h-12 rounded-xl bg-slate-100 border-0 pl-11 pr-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
               </div>

               <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600 ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                      type="tel"
                      placeholder="+1 (555) 123-4567" 
                      className="w-full h-12 rounded-xl bg-slate-100 border-0 pl-11 pr-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
               </div>
               
               <div className="space-y-1.5">
                 <label className="text-xs font-medium text-slate-600 ml-1">Role Requested</label>
                 <select className="w-full h-12 rounded-xl bg-slate-100 border-0 px-4 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer">
                   <option>Doctor</option>
                   <option>Technician</option>
                 </select>
               </div>

               <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600 ml-1">Password</label>
                  <div className="relative">
                    <Icons.Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                      type="password"
                      placeholder="••••••••" 
                      className="w-full h-12 rounded-xl bg-slate-100 border-0 pl-11 pr-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
               </div>

               <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-600 ml-1">Confirm Password</label>
                  <div className="relative">
                    <Icons.Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input 
                      type="password"
                      placeholder="••••••••" 
                      className="w-full h-12 rounded-xl bg-slate-100 border-0 pl-11 pr-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
               </div>
            </div>

            <Button fullWidth onClick={() => navigate(69)} className="mt-4 h-14 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-base">
              Create Account
            </Button>
            
            <p className="text-center text-xs text-slate-500 mt-4">
              By submitting, you agree to the <span className="text-primary underline">Terms of Service</span>and <span className="text-primary underline">Privacy Policy</span>.
            </p>
          </div>
        </MobileFrame>
      );
    
    case 4: // Login Error / Access Denied
      return (
        <MobileFrame title="Login Failed" showBack onBack={() => navigate(3)}>
          <div className="p-6 h-full flex flex-col items-center justify-center text-center space-y-6">
             <div className="w-20 h-20 bg-error-container rounded-full flex items-center justify-center">
                <Icons.AlertTriangle className="w-10 h-10 text-error" />
             </div>
             <div>
               <h2 className="text-xl font-bold text-slate-800">Access Denied</h2>
               <p className="text-slate-500 mt-2">
                 Your account has been temporarily locked due to multiple failed login attempts.
               </p>
             </div>
             <div className="w-full space-y-3">
                <Button fullWidth onClick={() => navigate(3)}>Try Again</Button>
                <Button fullWidth variant="text" className="text-slate-500" onClick={() => navigate(68)}>Contact Support</Button>
             </div>
          </div>
        </MobileFrame>
      );

    case 68: // Public Help - Enhanced
      return (
        <MobileFrame title="Help Center" showBack onBack={() => navigate(3)}>
           <div className="flex flex-col h-full bg-slate-50">
              {/* Search Header */}
              <div className="bg-white p-4 border-b border-slate-100 sticky top-0 z-10">
                 <h2 className="text-xl font-bold text-slate-900 mb-3">How can we help?</h2>
                 <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Search for issues..." className="w-full h-10 pl-10 pr-4 bg-slate-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                 </div>
              </div>

              <div className="p-4 space-y-6 flex-1 overflow-y-auto">
                 {/* Quick Actions */}
                 <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-blue-50 transition-all group" onClick={() => window.location.href = 'mailto:reset@hospital.org'}>
                       <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors">
                          <Icons.Lock className="w-5 h-5" />
                       </div>
                       <span className="text-xs font-bold text-slate-700">Reset Password</span>
                    </button>
                    <button className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center gap-2 hover:border-teal-500 hover:bg-teal-50 transition-all group" onClick={() => window.location.href = 'tel:555'}>
                       <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 group-hover:bg-teal-200 transition-colors">
                          <Phone className="w-5 h-5" />
                       </div>
                       <span className="text-xs font-bold text-slate-700">Call IT Support</span>
                    </button>
                 </div>

                 {/* FAQ Section */}
                 <div className="space-y-3">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider ml-1">Common Issues</h3>
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                       {[
                          { title: "Cannot login to my account", icon: <HelpCircle className="w-4 h-4 text-orange-500"/> },
                          { title: "App crashing on scan upload", icon: <Icons.AlertTriangle className="w-4 h-4 text-red-500"/> },
                          { title: "Where do I find patient ID?", icon: <Search className="w-4 h-4 text-blue-500"/> },
                          { title: "VPN Connection Errors", icon: <Icons.Wifi className="w-4 h-4 text-slate-500"/> }
                       ].map((item, i) => (
                          <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 border-b border-slate-100 last:border-0 text-left transition-colors">
                             <div className="flex items-center gap-3">
                                {item.icon}
                                <span className="text-sm font-medium text-slate-700">{item.title}</span>
                             </div>
                             <ChevronRight className="w-4 h-4 text-slate-300" />
                          </button>
                       ))}
                    </div>
                 </div>

                 {/* Contact Info */}
                 <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-5 text-white shadow-lg">
                    <div className="flex items-start gap-4">
                       <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                          <MessageSquare className="w-6 h-6" />
                       </div>
                       <div>
                          <h4 className="font-bold mb-1">24/7 Live Support</h4>
                          <p className="text-xs text-slate-300 mb-3">Our dedicated hospital support team is available round the clock.</p>
                          <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-100 border-none h-8 text-xs font-bold w-full justify-between px-4">
                             Start Chat <ArrowRight className="w-3 h-3" />
                          </Button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </MobileFrame>
      );
    
    case 5: // Forgot Password
      return (
        <MobileFrame title="Reset Password" showBack onBack={() => navigate(3)}>
          <div className="p-6 space-y-6 pt-10">
            <p className="text-sm text-slate-500">Enter your employee ID. An administrator will review your request and reset your access.</p>
             <Input 
                key="forgot-id"
                label="Employee ID" 
                placeholder="Ex: EMP-1024" 
                icon={<Icons.User className="w-4 h-4" />}
              />
              <Input 
                key="forgot-dept"
                label="Department" 
                placeholder="Ex: Radiology" 
                icon={<Icons.Activity className="w-4 h-4" />}
              />
              <Button fullWidth onClick={() => navigate(6)}>Request Reset</Button>
          </div>
        </MobileFrame>
      );

    case 75: // Forgot Password - Email Entry
      return (
        <MobileFrame title="Forgot Password" showBack onBack={() => navigate(3)}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 -mt-16">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-10 h-10 text-blue-600" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Reset Password</h2>
                <p className="text-sm text-slate-500 max-w-[280px]">Enter your registered email address to receive a verification code</p>
              </div>

              <div className="w-full space-y-4">
                <Input 
                  key="reset-email"
                  label="Email Address" 
                  placeholder="name@hospital.org" 
                  type="email"
                  icon={<Mail className="w-4 h-4" />}
                />
              </div>
            </div>

            <Button fullWidth className="bg-[#2563EB] hover:bg-blue-700 h-14 rounded-xl font-bold shadow-lg shadow-blue-100 text-white mb-4" onClick={() => navigate(76)}>
              Send Verification Code
            </Button>
          </div>
        </MobileFrame>
      );

    case 76: // Forgot Password - OTP Verification
      return (
        <MobileFrame title="Verify Email" showBack onBack={() => navigate(75)}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 -mt-16">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-10 h-10 text-blue-600" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h2>
                <p className="text-sm text-slate-500 max-w-[280px]">We've sent a 6-digit verification code to your email</p>
              </div>

              <div className="w-full space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1 block mb-2">Enter OTP</label>
                  <div className="flex gap-2 justify-center">
                    {[...Array(6)].map((_, i) => (
                      <input 
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-slate-100 border-2 border-slate-200 text-slate-900 outline-none focus:border-blue-600 focus:bg-white transition-all"
                      />
                    ))}
                  </div>
                </div>

                <div className="text-sm text-slate-500">
                  Didn't receive the code?{' '}
                  <button className="text-[#2563EB] font-bold hover:underline" onClick={handleOtpResend} disabled={otpResendTimer > 0}>
                    {otpResendTimer > 0 ? `Resend in ${otpResendTimer}s` : 'Resend OTP'}
                  </button>
                  {otpShowResendSuccess && <span className="ml-2 text-green-500">Sent!</span>}
                </div>
              </div>
            </div>

            <Button fullWidth className="bg-[#2563EB] hover:bg-blue-700 h-14 rounded-xl font-bold shadow-lg shadow-blue-100 text-white mb-4" onClick={() => navigate(77)}>
              Verify & Continue
            </Button>
          </div>
        </MobileFrame>
      );

    case 77: // Forgot Password - New Password Entry
      return (
        <MobileFrame title="Create New Password" showBack onBack={() => navigate(76)}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex-1 flex flex-col justify-center -mt-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.Lock className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Set New Password</h2>
                <p className="text-sm text-slate-500 max-w-[280px] mx-auto">Create a strong password to secure your account</p>
              </div>

              <div className="w-full space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">New Password</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
                      <Icons.Lock className="w-5 h-5" />
                    </div>
                    <input 
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => { setNewPassword(e.target.value); setPasswordError(''); }}
                      className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-12 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all font-medium tracking-widest focus:bg-white"
                      placeholder="••••••••"
                    />
                    <button 
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1">Confirm Password</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">
                      <Icons.Lock className="w-5 h-5" />
                    </div>
                    <input 
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError(''); }}
                      className="w-full h-14 bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-12 text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all font-medium tracking-widest focus:bg-white"
                      placeholder="••••••••"
                    />
                    <button 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {passwordError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2 animate-in fade-in slide-in-from-top-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700 font-medium">{passwordError}</p>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-left">
                  <p className="text-xs font-bold text-blue-900 mb-2">Password Requirements:</p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${newPassword.length >= 8 ? 'bg-green-500' : 'bg-slate-300'}`} />
                      At least 8 characters
                    </li>
                    <li className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(newPassword) ? 'bg-green-500' : 'bg-slate-300'}`} />
                      One uppercase letter
                    </li>
                    <li className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(newPassword) ? 'bg-green-500' : 'bg-slate-300'}`} />
                      One number
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Button fullWidth className="bg-[#2563EB] hover:bg-blue-700 h-14 rounded-xl font-bold shadow-lg shadow-blue-100 text-white mb-4" onClick={handleResetPassword}>
              Reset Password
            </Button>
          </div>
        </MobileFrame>
      );

    case 78: // Password Reset Success
      return (
        <MobileFrame>
          <div className="p-6 h-full flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <Icons.CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Password Reset Successful!</h2>
              <p className="text-sm text-slate-500 max-w-[280px]">Your password has been successfully reset. You can now login with your new password.</p>
            </div>
            <Button fullWidth className="bg-[#2563EB] hover:bg-blue-700 h-14 rounded-xl font-bold shadow-lg shadow-blue-100 text-white" onClick={() => navigate(3)}>
              Back to Login
            </Button>
          </div>
        </MobileFrame>
      );

    case 6: // Reset Confirm
      return (
        <MobileFrame>
          <div className="p-6 h-full flex flex-col items-center justify-center text-center space-y-6">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <Icons.CheckCircle className="w-10 h-10 text-green-600" />
             </div>
             <div>
               <h2 className="text-xl font-bold text-slate-800">Request Sent</h2>
               <p className="text-slate-500 mt-2">Your administrator has been notified. You will receive a temporary password via secure hospital email.</p>
             </div>
             <Button fullWidth onClick={() => navigate(3)} variant="outlined">Return to Login</Button>
          </div>
        </MobileFrame>
      );

    case 7: // Session Timeout
       return (
        <MobileFrame>
           <div className="p-6 h-full flex flex-col items-center justify-center text-center space-y-6 bg-slate-50">
             <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
                <Icons.LogOut className="w-10 h-10 text-slate-500" />
             </div>
             <div>
               <h2 className="text-xl font-bold text-slate-800">Session Expired</h2>
               <p className="text-slate-500 mt-2">For security, you have been automatically logged out after 15 minutes of inactivity.</p>
             </div>
             <Button fullWidth onClick={() => navigate(3)}>Log In Again</Button>
          </div>
        </MobileFrame>
       );

    case 69: // OTP Verification Screen
       return (
         <MobileFrame title="Verify Email" showBack onBack={() => navigate(67)}>
            <div className="p-6 h-full flex flex-col">
               <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 -mt-16">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                     <Mail className="w-10 h-10 text-[#2563EB]" />
                  </div>
                  
                  <div>
                     <h2 className="text-2xl font-bold text-slate-900 mb-2">Check Your Email</h2>
                     <p className="text-slate-500 text-sm leading-relaxed">
                        We've sent a verification code to<br />
                        <span className="font-semibold text-slate-700">jane.doe@hospital.org</span>
                     </p>
                  </div>

                  <div className="w-full max-w-xs space-y-4">
                     <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-600 ml-1">Enter OTP</label>
                        <div className="flex gap-3 justify-center">
                           {[1, 2, 3, 4, 5, 6].map((i) => (
                              <input 
                                 key={i}
                                 type="text"
                                 maxLength={1}
                                 className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-slate-100 border-2 border-slate-200 text-slate-900 outline-none focus:border-[#2563EB] focus:bg-white transition-all"
                              />
                           ))}
                        </div>
                     </div>

                     <div className="text-sm text-slate-500">
                        Didn't receive the code?{' '}
                        <button className="text-[#2563EB] font-bold hover:underline" onClick={handleResendOTP} disabled={resendTimer > 0}>
                          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                        </button>
                        {showResendSuccess && <span className="ml-2 text-green-500">Sent!</span>}
                     </div>

                     <Button 
                        fullWidth 
                        onClick={() => navigate(70)} 
                        className="h-14 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-base mt-6"
                     >
                        Verify & Continue
                     </Button>
                  </div>

                  <p className="text-xs text-slate-400 mt-4">Code expires in 10 minutes</p>
               </div>
            </div>
         </MobileFrame>
       );

    case 70: // Account Created Successfully
       return (
         <MobileFrame>
            <div className="p-6 h-full flex flex-col items-center justify-center text-center space-y-6">
               <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center relative">
                  <Icons.CheckCircle className="w-14 h-14 text-green-600" />
                  <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-20" />
               </div>
               
               <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Account Created!</h2>
                  <p className="text-slate-500 leading-relaxed">
                     Your account has been successfully created and verified. You can now sign in to access the system.
                  </p>
               </div>

               <div className="w-full space-y-3 max-w-xs">
                  <Button 
                     fullWidth 
                     onClick={() => navigate(3)} 
                     className="h-14 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-base"
                  >
                     Go to Login
                  </Button>
               </div>
            </div>
         </MobileFrame>
       );

    case 71: // Phone OTP Verification (during login)
       return (
         <MobileFrame title="Verify Phone" showBack onBack={() => navigate(72)}>
            <div className="p-6 h-full flex flex-col">
               <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 -mt-16">
                  <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center">
                     <Phone className="w-10 h-10 text-teal-600" />
                  </div>
                  
                  <div>
                     <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify Your Phone</h2>
                     <p className="text-slate-500 text-sm leading-relaxed">
                        We've sent a verification code to<br />
                        <span className="font-semibold text-slate-700">+1 (555) •••-4567</span>
                     </p>
                  </div>

                  <div className="w-full max-w-xs space-y-4">
                     <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-600 ml-1">Enter OTP</label>
                        <div className="flex gap-3 justify-center">
                           {[1, 2, 3, 4, 5, 6].map((i) => (
                              <input 
                                 key={i}
                                 type="text"
                                 maxLength={1}
                                 className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-slate-100 border-2 border-slate-200 text-slate-900 outline-none focus:border-teal-500 focus:bg-white transition-all"
                              />
                           ))}
                        </div>
                     </div>

                     <div className="text-sm text-slate-500">
                        Didn't receive the code?{' '}
                        <button className="text-teal-600 font-bold hover:underline" onClick={handleResendOTP} disabled={resendTimer > 0}>
                          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                        </button>
                        {showResendSuccess && <span className="ml-2 text-green-500">Sent!</span>}
                     </div>

                     <Button 
                        fullWidth 
                        onClick={() => {
                          // Navigate based on selected role
                          if (selectedRole === 'Technician' || selectedRole === 'Radiologist') {
                            setRole('technician');
                            navigate(74); // Navigate to Terms & Conditions first
                          } else {
                            setRole('doctor');
                            navigate(36);
                          }
                        }} 
                        className="h-14 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-base mt-6"
                     >
                        Verify & Login
                     </Button>
                  </div>

                  <p className="text-xs text-slate-400 mt-4">Code expires in 5 minutes</p>
               </div>
            </div>
         </MobileFrame>
       );

    case 72: // Phone Number Entry (after login, before OTP)
       return (
         <MobileFrame title="Phone Verification" showBack onBack={() => navigate(3)}>
            <div className="p-6 h-full flex flex-col">
               <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 -mt-16">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                     <Phone className="w-10 h-10 text-[#2563EB]" />
                  </div>
                  
                  <div>
                     <h2 className="text-2xl font-bold text-slate-900 mb-2">Enter Your Phone Number</h2>
                     <p className="text-slate-500 text-sm leading-relaxed">
                        We'll send you a verification code for<br />
                        secure authentication
                     </p>
                  </div>

                  <div className="w-full max-w-xs space-y-4">
                     <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-600 ml-1">Phone Number</label>
                        <div className="flex gap-2">
                           {/* Country Code Selector - India Only */}
                           <div className="relative w-24 h-14 bg-slate-100 border-2 border-slate-200 rounded-xl flex items-center px-3 gap-1.5 cursor-pointer hover:border-[#2563EB] transition-all">
                              <span className="text-2xl">🇮🇳</span>
                              <span className="text-sm font-bold text-slate-700">+91</span>
                           </div>
                           
                           {/* Phone Number Input */}
                           <div className="relative flex-1">
                              <input 
                                 type="tel"
                                 placeholder="98765 43210" 
                                 maxLength={10}
                                 className="w-full h-14 rounded-xl bg-slate-100 border-2 border-slate-200 px-4 text-slate-900 placeholder:text-slate-400 outline-none focus:border-[#2563EB] focus:bg-white transition-all font-medium text-base"
                              />
                           </div>
                        </div>
                        <p className="text-xs text-slate-500 ml-1">Enter 10-digit mobile number</p>
                     </div>

                     <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-left">
                        <p className="text-xs text-blue-800 font-medium flex items-start gap-2">
                           <Shield className="w-4 h-4 shrink-0 mt-0.5" />
                           <span>We use your phone number only for secure two-factor authentication.</span>
                        </p>
                     </div>

                     <Button 
                        fullWidth 
                        onClick={() => {
                          handleResendOTP(); // Simulate sending OTP
                          navigate(71);
                        }} 
                        className="h-14 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-base mt-6"
                     >
                        Send Verification Code
                     </Button>
                  </div>

                  <button 
                     className="text-sm text-slate-500 hover:text-slate-700 font-medium mt-4"
                     onClick={() => navigate(3)}
                  >
                     Back to Login
                  </button>
               </div>
            </div>
         </MobileFrame>
       );

    case 99: // Terms & Conditions
       return (
         <MobileFrame title="Terms & Privacy">
            <div className="p-6 h-full flex flex-col bg-slate-50">
               <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex-1 overflow-y-auto mb-4 space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">1. Acceptance of Terms</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">By accessing and using the CXTRIAGE AI application, you agree to be bound by these Terms and Conditions.</p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">2. Data Privacy</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">We collect and process your data in accordance with our Privacy Policy. Your employee ID and ticket information are stored securely and encrypted at rest.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">3. Acceptable Use</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">You agree to use this service only for official hospital purposes. Misuse of the diagnostic system may result in disciplinary action.</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 mb-2">4. AI Features</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">This application uses Artificial Intelligence to categorize and prioritize scans. While we strive for accuracy, automated decisions should be verified by a qualified professional.</p>
                  </div>
               </div>

               <div className="space-y-4 pt-2 bg-slate-50">
                  <label className="flex items-start gap-3 p-1 cursor-pointer group">
                     <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${termsAccepted ? 'bg-primary border-primary' : 'bg-white border-slate-300'}`} onClick={() => setTermsAccepted(!termsAccepted)}>
                        {termsAccepted && <Check className="w-3 h-3 text-white" />}
                     </div>
                     <span className="text-sm text-slate-600 select-none">I agree to the Terms of Service and Privacy Policy</span>
                  </label>

                  <Button fullWidth onClick={handleTermsAccept} disabled={!termsAccepted} className={termsAccepted ? 'bg-primary' : 'bg-slate-300'}>
                     Accept & Continue
                  </Button>
               </div>
            </div>
         </MobileFrame>
       );

    case 79: // Technician Login Screen (Dedicated)
      return <TechnicianLoginScreen navigate={navigate} setRole={setRole} />;

    case 80: // Doctor Login Screen (Dedicated)
      return <DoctorLoginScreen navigate={navigate} setRole={setRole} />;

    case 81: // Doctor Create Account Screen (Clean Design)
      return <DoctorCreateAccountScreen navigate={navigate} />;

    default:
      return null;
  }
};