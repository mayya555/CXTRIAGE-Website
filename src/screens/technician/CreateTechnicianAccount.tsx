import { useNavigate } from 'react-router';
import { useState, useMemo } from 'react';
import { ArrowLeft, User, Lock, Phone, Activity, Shield, Check, X, Eye, EyeOff } from 'lucide-react';
import { registerTechnician } from '../../lib/api';
import { toast } from 'sonner';
import { validatePassword, validatePhoneNumber } from '../../lib/validation';

export default function CreateTechnicianAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    roleRequested: 'Technician',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const pwdValidation = useMemo(() => validatePassword(formData.password), [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwdValidation.isValid) {
      toast.error('Please meet all password requirements');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    const phoneValidation = validatePhoneNumber(formData.phoneNumber);
    if (!phoneValidation.isValid) {
      toast.error(phoneValidation.message);
      return;
    }

    try {
      const loadingToast = toast.loading('Creating account...');
      const cleanedPhone = formData.phoneNumber.replace(/[\s\-]/g, '').replace(/^\+91/, '');
      
      await registerTechnician({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone_number: cleanedPhone,
        role_requested: formData.roleRequested,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });
      toast.dismiss(loadingToast);
      toast.success('Technician account created successfully!');
      navigate('/technician/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-row-reverse">
      {/* Right Panel - Branding (Visible on LG up) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative bg-gradient-to-br from-[#2563EB] via-blue-600 to-blue-700 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-300/10 rounded-full blur-2xl" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10 text-white">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <Activity className="w-6 h-6 text-[#2563EB]" strokeWidth={2} />
          </div>
          <div>
            <p className="font-bold text-lg leading-tight">CXRT AI</p>
            <p className="text-blue-100 text-xs leading-tight">Chest X-Ray Triage System</p>
          </div>
        </div>

        {/* Branding Content */}
        <div className="relative z-10 text-white">
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            Empowering<br />
            <span className="text-blue-200">Radiographers</span>
          </h2>
          <p className="text-blue-100/80 text-sm leading-relaxed max-w-md">
            Streamline your clinical imaging workflow with AI-assisted quality checks and patient management. Register to get started.
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-3 text-blue-100/60">
          <Shield className="w-4 h-4" />
          <span className="text-xs">Secure · HIPAA Compliant · Professional</span>
        </div>
      </div>

      {/* Left Panel - Form Container */}
      <div className="flex-1 flex justify-center p-4 lg:p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md py-6">
          {/* Form Header Card */}
          <div className="bg-[#2563EB] text-white px-6 py-4 rounded-t-3xl flex items-center gap-4 shadow-lg shadow-blue-500/20">
            <button
              onClick={() => navigate('/login')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">Create Account</h1>
          </div>

          {/* Form Body Card */}
          <div className="bg-white rounded-b-3xl px-6 py-3 shadow-2xl border border-slate-100 border-t-0">
            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Name Group */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-600 font-semibold mb-1 block">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Jane"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white focus:border-[#2563EB]/30 transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-600 font-semibold mb-1 block">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    placeholder="Doe"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white focus:border-[#2563EB]/30 transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-xs text-slate-600 font-semibold mb-1 block">
                  Hospital Email
                </label>
                <div className="relative group">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#2563EB] transition-colors" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane.doe@hospital.org"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white focus:border-[#2563EB]/30 transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>


              {/* Phone Number */}
              <div>
                <label className="text-xs text-slate-600 font-semibold mb-1 block">
                  Phone Number
                </label>
                <div className="relative group">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#2563EB] transition-colors" />
                  <input
                    type="text"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+1 XXXXXXXXXX"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white focus:border-[#2563EB]/30 transition-all placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              {/* Role Requested */}
              <div>
                <label className="text-xs text-slate-600 font-semibold mb-1 block">
                  Role Requested
                </label>
                <div className="relative">
                  <div className="w-full px-4 py-2 bg-blue-50/50 border-2 border-blue-100 rounded-xl text-sm text-[#2563EB] font-semibold flex items-center">
                    Technician
                    <div className="ml-auto bg-[#2563EB] text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">
                      FIXED
                    </div>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs text-slate-600 font-semibold mb-1 block">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#2563EB] transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white focus:border-[#2563EB]/30 transition-all placeholder:text-slate-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {/* Password Requirements UI */}
                <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 px-1">
                  {[
                    { label: 'One Uppercase', met: pwdValidation.hasUppercase },
                    { label: 'One Lowercase', met: pwdValidation.hasLowercase },
                    { label: 'One Number', met: pwdValidation.hasNumber },
                    { label: 'One Symbol', met: pwdValidation.hasSymbol },
                    { label: '8+ Characters', met: pwdValidation.isMinLength },
                  ].map((req, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      {req.met ? (
                        <Check className="w-3 h-3 text-green-500" />
                      ) : (
                        <div className="w-3 h-3 rounded-full border border-slate-300 flex items-center justify-center">
                           <div className="w-1 h-1 bg-slate-300 rounded-full" />
                        </div>
                      )}
                      <span className={`text-[10px] ${req.met ? 'text-green-600 font-medium' : 'text-slate-400'}`}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-xs text-slate-600 font-semibold mb-1 block">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-[#2563EB] transition-colors" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:bg-white focus:border-[#2563EB]/30 transition-all placeholder:text-slate-400"
                    required
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#2563EB] hover:bg-blue-700 text-white py-2 rounded-xl font-bold transition-all active:scale-[0.98] shadow-lg shadow-blue-500/30 mt-0 text-sm"
              >
                Create Account
              </button>

              {/* Terms */}
              <p className="text-[10px] text-center text-slate-400 leading-relaxed">
                By clicking Create Account, you agree to our{' '}
                <button type="button" className="text-[#2563EB] font-medium hover:underline">Terms of Service</button>
                {' '}and{' '}
                <button type="button" className="text-[#2563EB] font-medium hover:underline">Privacy Policy</button>
              </p>
            </form>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-[#2563EB] font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}