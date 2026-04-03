import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { AlertCircle, Brain, Clock, ChevronRight, Bell, CheckCircle, Activity, Zap } from 'lucide-react';
import { getPriorityCases } from '../../lib/api';
import { toast } from 'sonner';

export default function CriticalAlerts() {
  const navigate = useNavigate();
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [acknowledged, setAcknowledged] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const storedId = localStorage.getItem('doctorId');
        const doctorId = parseInt(storedId || '0');

        if (!doctorId || isNaN(doctorId) || doctorId <= 0) {
          toast.error('Session expired. Please log in again.');
          navigate('/login');
          return;
        }

        const data = await getPriorityCases(doctorId);
        setCases(data);
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch critical cases');
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, [navigate]);

  const acknowledgeCase = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      // In a real app, we might update a 'viewed' or 'acknowledged' status in the backend
      // For now, we'll just track it in local state
      setAcknowledged(prev => new Set(prev).add(id));
      toast.success('Case acknowledged');
    } catch (error: any) {
      toast.error('Failed to acknowledge case');
    }
  };

  const criticalCases = cases.filter(c => c.priority?.toUpperCase() === 'CRITICAL');
  const highCases = cases.filter(c => c.priority?.toUpperCase() === 'HIGH');

  if (loading) {
    return (
      <WebAppLayout role="doctor" title="Loading..." breadcrumbs={[]}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB]"></div>
        </div>
      </WebAppLayout>
    );
  }

  return (
    <WebAppLayout
      role="doctor"
      title="Critical Alerts"
      subtitle={`${cases.length} cases requiring immediate attention`}
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'Critical Alerts' },
      ]}
    >
      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div className="bg-red-600 text-white rounded-xl p-4 flex items-center gap-3 shadow-lg shadow-red-200">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <p className="text-2xl font-bold">{criticalCases.length}</p>
            <p className="text-red-100 text-xs font-medium uppercase tracking-wider">Critical Cases</p>
          </div>
        </div>
        <div className="bg-orange-500 text-white rounded-xl p-4 flex items-center gap-3 shadow-lg shadow-orange-100">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold">{highCases.length}</p>
            <p className="text-orange-100 text-xs font-medium uppercase tracking-wider">High Priority</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{acknowledged.size}</p>
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Acknowledged</p>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {criticalCases.length > 0 && (
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-4 mb-5 flex items-center gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <div className="flex-1">
            <p className="font-bold">Immediate Review Required</p>
            <p className="text-red-100 text-sm mt-0.5">
              {criticalCases.length} CRITICAL case{criticalCases.length !== 1 ? 's' : ''} detected — review immediately to prevent adverse outcomes.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 bg-white/20 px-3 py-2 rounded-xl text-sm flex-shrink-0">
            <Activity className="w-4 h-4" />
            <span className="font-semibold">SLA: 15 min</span>
          </div>
        </div>
      )}

      {cases.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Critical Alerts</h3>
          <p className="text-slate-500 max-w-xs mx-auto mt-2">All high-priority cases have been processed or there are no new urgent findings.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {cases.map((c) => {
            const isAcknowledged = acknowledged.has(c.id);
            const isCritical = c.priority?.toUpperCase() === 'CRITICAL';
            return (
              <div
                key={c.id}
                onClick={() => navigate(`/doctor/case/${c.id}`)}
                className={`bg-white rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                  isAcknowledged ? 'border-green-200 opacity-80 shadow-sm'
                    : isCritical ? 'border-red-200 hover:border-red-400 shadow-md shadow-red-50'
                    : 'border-orange-200 hover:border-orange-400 shadow-sm shadow-orange-50'
                } p-5`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Priority indicator */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isAcknowledged ? 'bg-green-100'
                      : isCritical ? 'bg-red-100' : 'bg-orange-100'
                  }`}>
                    {isAcknowledged
                      ? <CheckCircle className="w-6 h-6 text-green-600" />
                      : <AlertCircle className={`w-6 h-6 ${isCritical ? 'text-red-600 animate-pulse' : 'text-orange-600'}`} />
                    }
                  </div>

                  {/* Patient Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="font-bold text-slate-900">{c.patient_name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isCritical ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {c.priority}
                      </span>
                      {c.ai_confidence && (
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] rounded-full font-bold">
                          AI: {Math.round(c.ai_confidence * 100)}%
                        </span>
                      )}
                      {isAcknowledged && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full font-medium">
                          Acknowledged
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 text-sm">{c.patient_age}y · {c.patient_gender} · MRN: {c.case_code}</p>
                    <p className="text-slate-700 text-sm font-semibold mt-2 line-clamp-1">{c.ai_result || 'No primary finding text provided.'}</p>

                    {/* Confidence Bar */}
                    {c.ai_confidence && (
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex-1 max-w-[220px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isCritical ? 'bg-red-500' : 'bg-orange-500'
                            }`}
                            style={{ width: `${c.ai_confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500">{Math.round(c.ai_confidence * 100)}% AI Confidence</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mt-3">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs text-slate-400">Received {new Date(c.created_at).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 flex-shrink-0 mt-2 md:mt-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/doctor/ai-analysis/${c.id}`); }}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/10"
                    >
                      <Brain className="w-3.5 h-3.5" />
                      AI Analysis
                    </button>
                    {!isAcknowledged && (
                      <button
                        onClick={(e) => acknowledgeCase(c.id, e)}
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-green-200 text-green-700 bg-green-50 rounded-xl text-xs font-bold hover:bg-green-100 transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Acknowledge
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/doctor/case/${c.id}`); }}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
                    >
                      Detail
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </WebAppLayout>
  );
}

