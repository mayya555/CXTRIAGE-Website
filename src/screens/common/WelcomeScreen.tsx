import { useNavigate } from 'react-router';
import { Activity, ChevronRight, Shield, Zap, Brain, BarChart3, Lock } from 'lucide-react';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0f172a] to-[#1e3a8a] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-[#2563EB]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-blue-400/5 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2563EB]/3 rounded-full blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="welcomeGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#welcomeGrid)" />
        </svg>
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-14 h-14 bg-[#2563EB] rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40">
            <Activity className="w-8 h-8 text-white" strokeWidth={2} />
          </div>
          <div className="text-left">
            <p className="text-white text-2xl font-bold leading-tight">CXRT AI</p>
            <p className="text-blue-400 text-sm leading-tight">Chest X-Ray Triage System</p>
          </div>
        </div>

        {/* AI Online indicator */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-blue-300 text-sm font-medium">AI System Online · v3.2.1</span>
        </div>

        <h1 className="text-white mb-5 leading-tight" style={{ fontSize: '2.5rem' }}>
          AI-Powered Radiology<br />
          <span className="text-[#60a5fa]">Decision Support</span>
        </h1>

        <p className="text-slate-400 text-base mb-10 leading-relaxed max-w-lg mx-auto">
          Advanced chest X-ray analysis with real-time AI detection, interactive heatmap visualization, and seamless radiologist workflows — accelerating diagnosis by up to 70%.
        </p>

        {/* Feature grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { icon: Brain, label: 'AI Detection', desc: '92% accuracy' },
            { icon: Zap, label: 'Fast Analysis', desc: '<30 seconds' },
            { icon: BarChart3, label: 'Smart Reports', desc: 'Auto-generated' },
            { icon: Shield, label: 'HIPAA Secure', desc: 'End-to-end encrypted' },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="w-9 h-9 bg-[#2563EB]/30 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-white text-xs font-semibold">{f.label}</p>
                <p className="text-slate-400 text-[10px] mt-0.5">{f.desc}</p>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-2 bg-[#2563EB] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
        >
          Get Started <ChevronRight className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 justify-center mt-8 text-slate-500 text-xs">
          <Lock className="w-3.5 h-3.5" />
          <span>HIPAA Compliant · AES-256 Encrypted · Audit Logged · ISO 27001</span>
        </div>
      </div>
    </div>
  );
}
