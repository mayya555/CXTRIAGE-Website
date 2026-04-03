import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { Brain, FileText, User, AlertCircle, ArrowLeft, Clock, CheckCircle } from 'lucide-react';
import { getCaseById } from '../../lib/api';
import { toast } from 'sonner';

export default function CaseDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [caseData, setCaseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCase = async () => {
      if (!id) return;
      try {
        const data = await getCaseById(id);
        setCaseData(data);
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch case details');
      } finally {
        setLoading(false);
      }
    };
    fetchCase();
  }, [id]);

  if (loading) {
    return (
      <WebAppLayout role="doctor" title="Loading Case..." breadcrumbs={[]}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB]"></div>
        </div>
      </WebAppLayout>
    );
  }

  if (!caseData) {
    return (
      <WebAppLayout role="doctor" title="Case Not Found" breadcrumbs={[]}>
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-900">Case Not Found</h2>
          <button onClick={() => navigate('/doctor/dashboard')} className="mt-4 text-[#2563EB] hover:underline">Back to Dashboard</button>
        </div>
      </WebAppLayout>
    );
  }

  const findings = caseData.findings || [];

  return (
    <WebAppLayout
      role="doctor"
      title={`Case — ${caseData.patient_name}`}
      subtitle={`MRN: ${caseData.case_code} · ${caseData.created_at}`}
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'Cases', path: '/doctor/new-cases' },
        { label: caseData.patient_name },
      ]}
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="xl:col-span-2 space-y-5">
          {/* X-Ray Preview */}
          <div className="bg-[#050a14] rounded-2xl border border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-[#0a1628] border-b border-slate-700/50">
              <span className="text-slate-300 text-sm font-medium">{caseData.patient_name} — PA Chest X-Ray</span>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                caseData.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/30'
                  : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
              }`}>
                {(caseData.priority || 'ROUTINE').toUpperCase()}
              </span>
            </div>
            <div className="flex items-center justify-center p-8">
              {/* This SVG is a placeholder for the actual X-Ray image */}
              <svg viewBox="0 0 200 260" className="w-60 h-80">
                <rect width="200" height="260" fill="#050a14" />
                {[0,1,2,3,4,5,6].map(i => (
                  <g key={i}>
                    <path d={`M 100 ${80 + i*20} Q ${70 - i*2} ${75 + i*20} ${45 - i} ${85 + i*20}`} fill="none" stroke="#c8d8e8" strokeWidth="1.5" opacity="0.85" />
                    <path d={`M 100 ${80 + i*20} Q ${130 + i*2} ${75 + i*20} ${155 + i} ${85 + i*20}`} fill="none" stroke="#c8d8e8" strokeWidth="1.5" opacity="0.85" />
                  </g>
                ))}
                <rect x="96" y="60" width="8" height="180" rx="4" fill="#d0dce8" opacity="0.7" />
                <ellipse cx="88" cy="140" rx="25" ry="30" fill="#8090a8" opacity="0.6" />
                <ellipse cx="62" cy="130" rx="22" ry="38" fill="none" stroke="#a0b8c8" strokeWidth="1.5" opacity="0.7" />
                <ellipse cx="138" cy="130" rx="22" ry="38" fill="none" stroke="#a0b8c8" strokeWidth="1.5" opacity="0.7" />
                <ellipse cx="138" cy="152" rx="18" ry="20" fill="#ff4040" opacity="0.25" />
                <path d="M 30 70 Q 40 55 100 50 Q 160 55 170 70" fill="none" stroke="#b0c0d0" strokeWidth="2" opacity="0.6" />
                <path d="M 40 195 Q 100 210 160 195" fill="none" stroke="#a0b0c0" strokeWidth="1.5" opacity="0.6" />
              </svg>
            </div>
            <div className="flex gap-3 px-5 py-4 bg-[#0a1628] border-t border-slate-700/50">
              <button
                onClick={() => navigate(`/doctor/ai-analysis/${id}`)}
                className="flex-1 bg-[#2563EB] text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Brain className="w-4 h-4" /> View AI Analysis
              </button>
              <button
                onClick={() => navigate(`/doctor/ai-heatmap/${id}`)}
                className="flex-1 border border-slate-700 text-slate-300 py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                View Heatmap
              </button>
            </div>
          </div>

          {/* AI Findings Summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-slate-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              AI Findings
            </h3>
            <div className="space-y-3">
              {findings.length === 0 && <p className="text-sm text-slate-400 italic">No specific findings processed yet.</p>}
              {findings.map((f: any, i: number) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  {f.severity === 'NORMAL'
                    ? <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    : <AlertCircle className={`w-4 h-4 flex-shrink-0 ${
                        f.severity === 'CRITICAL' ? 'text-red-500' : f.severity === 'HIGH' ? 'text-orange-500' : 'text-amber-500'
                      }`} />
                  }
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700">{f.name}</p>
                    <p className="text-xs text-slate-400">{f.region}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${
                        f.severity === 'CRITICAL' ? 'bg-red-500' : f.severity === 'HIGH' ? 'bg-orange-500' : f.severity === 'MEDIUM' ? 'bg-amber-500' : 'bg-green-500'
                      }`} style={{ width: `${f.confidence}%` }} />
                    </div>
                    <span className="text-xs font-bold text-slate-600 w-8">{f.confidence}%</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    f.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                    f.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                    f.severity === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                  }`}>{f.severity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* Patient Details */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-sm font-semibold text-slate-700">Patient Details</h3>
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Full Name', value: caseData.patient_name },
                { label: 'Age / Gender', value: `${caseData.patient_age}y / ${caseData.patient_gender}` },
                { label: 'MRN', value: caseData.case_code, mono: true },
                { label: 'Scan Date', value: caseData.created_at },
                { label: 'Priority', value: caseData.priority },
                { label: 'AI Status', value: caseData.ai_status || 'Complete' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-xs text-slate-400">{item.label}</span>
                  <span className={`text-xs font-semibold text-slate-700 ${item.mono ? 'font-mono' : ''}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Case Status */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2563EB]" />
              Case Timeline
            </h3>
            <div className="space-y-3">
              {[
                { event: 'X-ray uploaded by technician', done: true, time: caseData.created_at },
                { event: 'AI analysis completed', done: !!caseData.ai_result, time: caseData.ai_completed_at || 'N/A' },
                { event: 'Awaiting radiologist review', done: (caseData.status || '').toLowerCase() !== 'new', time: 'Active' },
                { event: 'Diagnosis confirmation', done: (caseData.status || '').toLowerCase() === 'completed', time: 'Pending' },
                { event: 'Report generation', done: (caseData.status || '').toLowerCase() === 'completed', time: 'Pending' },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.done ? 'bg-green-500' : 'bg-slate-200'}`} />
                  <p className={`text-xs flex-1 ${t.done ? 'text-slate-600' : 'text-slate-300'}`}>{t.event}</p>
                  <span className="text-[10px] text-slate-400 font-mono">{t.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={() => navigate(`/doctor/diagnosis-confirmation/${id}`)}
              className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <FileText className="w-4 h-4" /> Confirm Diagnosis
            </button>
            <button
              onClick={() => navigate('/doctor/new-cases')}
              className="w-full border border-slate-200 text-slate-600 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Cases
            </button>
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
