import { useNavigate } from 'react-router';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function LoginErrorScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-[#1e3a8a] flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <AlertCircle className="w-9 h-9 text-red-500" />
        </div>
        <h2 className="text-slate-900 text-xl mb-2">Login Failed</h2>
        <p className="text-slate-500 text-sm mb-6">
          Please enter both a username and password to continue.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Try Again
        </button>
      </div>
    </div>
  );
}
