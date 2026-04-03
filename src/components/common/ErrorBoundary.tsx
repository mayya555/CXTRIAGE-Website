import { useRouteError, useNavigate } from "react-router";
import { AlertCircle, Home, RefreshCcw, ShieldAlert } from "lucide-react";

export function ErrorBoundary() {
  const error = useRouteError() as any;
  const navigate = useNavigate();

  console.error("Application Error:", error);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="bg-red-600 px-6 py-8 text-center relative overflow-hidden">
          {/* Decorative backgrounds */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <pattern id="error-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#error-pattern)" />
            </svg>
          </div>
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30">
              <ShieldAlert className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
            <p className="text-red-100 text-sm">We've encountered an unexpected application error.</p>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Error Details</p>
                <p className="text-sm text-slate-700 font-mono break-all leading-relaxed">
                  {error?.message || error?.statusText || "An unknown error occurred."}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-[#2563EB] hover:bg-blue-700 text-white py-3.5 rounded-2xl font-bold transition-all active:scale-[0.98] shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              Retry Application
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-600 py-3.5 rounded-2xl font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Return to Home
            </button>
          </div>

          <p className="mt-8 text-center text-[10px] text-slate-400 font-medium">
            APPLICATION ID: b6a3ffb0-c422-4645-9921-ac50d398a742
          </p>
        </div>
      </div>
    </div>
  );
}
