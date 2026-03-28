import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Activity } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#2563EB] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-5 animate-pulse">
        <div className="w-20 h-20 bg-white/10 backdrop-blur border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl">
          <Activity className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold tracking-tight">CXRT AI</h1>
          <p className="text-blue-200 text-sm mt-1">Chest X-Ray Triage System</p>
        </div>
      </div>
      <div className="mt-16 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-white/40 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
