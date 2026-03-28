import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { AlertCircle, Brain, Clock, ChevronRight, Bell, CheckCircle, Activity, Zap } from 'lucide-react';
import { mockCases } from '../../lib/data';

export default function CriticalAlerts() {
  const navigate = useNavigate();
  const critical = mockCases.filter(c => c.priority === 'Critical' || c.priority === 'High');
  const [acknowledged, setAcknowledged] = useState<Set<string>>(new Set());

  const acknowledgeCase = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAcknowledged(prev => new Set(prev).add(id));
  };

  const criticalCount = critical.filter(c => c.priority === 'Critical').length;
  const highCount = critical.filter(c => c.priority === 'High').length;

  return (
    <WebAppLayout
      role="doctor"
      title="Critical Alerts"
      subtitle={`${critical.length} cases requiring immediate attention`}
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'Critical Alerts' },
      ]}
    >
      {/* Alert Stats */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="bg-red-600 text-white rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <p className="text-2xl font-bold">{criticalCount}</p>
            <p className="text-red-200 text-xs">Critical Cases</p>
          </div>
        </div>
        <div className="bg-orange-500 text-white rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold">{highCount}</p>
            <p className="text-orange-200 text-xs">High Priority</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{acknowledged.size}</p>
            <p className="text-slate-500 text-xs">Acknowledged</p>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-4 mb-5 flex items-center gap-4">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <Bell className="w-5 h-5 animate-bounce" />
        </div>
        <div className="flex-1">
          <p className="font-bold">Critical Cases Require Immediate Review</p>
          <p className="text-red-200 text-sm mt-0.5">
            {criticalCount} CRITICAL case{criticalCount !== 1 ? 's' : ''} with AI confidence &gt;90% — review immediately to prevent adverse outcomes.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-white/20 px-3 py-2 rounded-xl text-sm flex-shrink-0">
          <Activity className="w-4 h-4" />
          <span className="font-semibold">SLA: 15 min</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {critical.map((c) => {
          const isAcknowledged = acknowledged.has(c.id);
          return (
            <div
              key={c.id}
              onClick={() => navigate(`/doctor/case/${c.id}`)}
              className={`bg-white rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg ${
                isAcknowledged ? 'border-green-200 opacity-70'
                  : c.priority === 'Critical' ? 'border-red-200 hover:border-red-300 shadow-sm shadow-red-50'
                  : 'border-orange-200 hover:border-orange-300 shadow-sm shadow-orange-50'
              } p-5`}
            >
              <div className="flex items-start gap-4">
                {/* Priority indicator */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isAcknowledged ? 'bg-green-100'
                    : c.priority === 'Critical' ? 'bg-red-100' : 'bg-orange-100'
                }`}>
                  {isAcknowledged
                    ? <CheckCircle className="w-6 h-6 text-green-600" />
                    : <AlertCircle className={`w-6 h-6 ${c.priority === 'Critical' ? 'text-red-600 animate-pulse' : 'text-orange-600'}`} />
                  }
                </div>

                {/* Patient Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-bold text-slate-900">{c.patient}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      c.priority === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {c.priority}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] rounded-full font-medium">
                      AI: {c.confidence}% confidence
                    </span>
                    {isAcknowledged && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full font-medium">
                        Acknowledged
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm">{c.age}y · {c.gender} · MRN: {c.mrn}</p>
                  <p className="text-slate-700 text-sm font-medium mt-1.5">{c.finding}</p>

                  {/* Confidence Bar */}
                  <div className="flex items-center gap-3 mt-2.5">
                    <div className="flex-1 max-w-[220px] h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          c.priority === 'Critical' ? 'bg-red-500' : 'bg-orange-500'
                        }`}
                        style={{ width: `${c.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-700">{c.confidence}% AI Confidence</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs text-slate-400">Received {c.date} · {isAcknowledged ? 'Acknowledged' : 'Awaiting review'}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/doctor/ai-analysis/${c.id}`); }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                  >
                    <Brain className="w-4 h-4" />
                    AI Analysis
                  </button>
                  {!isAcknowledged && (
                    <button
                      onClick={(e) => acknowledgeCase(c.id, e)}
                      className="flex items-center gap-2 px-4 py-2.5 border border-green-200 text-green-700 bg-green-50 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Acknowledge
                    </button>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/doctor/case/${c.id}`); }}
                    className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                    Case Detail
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </WebAppLayout>
  );
}
