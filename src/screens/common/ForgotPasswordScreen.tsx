import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Activity, ArrowLeft, Mail, ChevronRight } from 'lucide-react';

export default function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    setSent(true);
    setTimeout(() => navigate('/login'), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-[#1e3a8a] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-800">CXRT AI</span>
        </div>

        {!sent ? (
          <>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Login
            </button>
            <h2 className="text-slate-900 mb-2">Reset Password</h2>
            <p className="text-slate-500 text-sm mb-6">
              Enter your institutional email address and we'll send you a secure reset link.
            </p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.name@hospital.org"
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] bg-slate-50 focus:bg-white transition-all"
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
            >
              Send Reset Link <ChevronRight className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-slate-900 mb-2">Check your email</h2>
            <p className="text-slate-500 text-sm">
              A password reset link has been sent to your email. Redirecting to login...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
