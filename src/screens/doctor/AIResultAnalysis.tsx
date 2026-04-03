import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import {
  Brain, AlertCircle, CheckCircle, Eye, FileText,
  ZoomIn, ZoomOut, RotateCcw, Sun, Contrast, Layers,
  ChevronRight, Info
} from 'lucide-react';
import { getCaseById } from '../../lib/api';
import { toast } from 'sonner';

// Simplified findings since the backend currently provides a summary ai_result
const getFindingsFromCase = (caseData: any) => {
  if (!caseData.ai_result) return [];
  return [
    { 
      name: caseData.ai_result, 
      confidence: Math.round((caseData.ai_confidence || 0.85) * 100), 
      severity: caseData.priority || 'Medium', 
      region: 'Lung Field' 
    }
  ];
};

export default function AIResultAnalysis() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [caseData, setCaseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(55);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const fetchCase = async () => {
      if (!id) return;
      try {
        const data = await getCaseById(id);
        setCaseData(data);
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch case analysis');
      } finally {
        setLoading(false);
      }
    };
    fetchCase();
  }, [id]);

  const getSeverityConfig = (severity: string = 'Normal') => {
    const s = severity.toUpperCase();
    if (s === 'CRITICAL') return { bg: 'bg-red-50 border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-700', bar: 'bg-red-500', glow: 'shadow-red-100' };
    if (s === 'HIGH') return { bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700', bar: 'bg-orange-500', glow: '' };
    if (s === 'MEDIUM') return { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700', bar: 'bg-amber-500', glow: '' };
    return { bg: 'bg-green-50 border-green-200', text: 'text-green-700', badge: 'bg-green-100 text-green-700', bar: 'bg-green-500', glow: '' };
  };

  if (loading) {
    return (
      <WebAppLayout role="doctor" title="Loading Analysis..." breadcrumbs={[]}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB]"></div>
        </div>
      </WebAppLayout>
    );
  }

  if (!caseData) {
    return (
      <WebAppLayout role="doctor" title="Error" breadcrumbs={[]}>
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800">Case Not Found</h2>
          <button onClick={() => navigate('/doctor/dashboard')} className="mt-4 text-[#2563EB] font-semibold hover:underline">Back to Dashboard</button>
        </div>
      </WebAppLayout>
    );
  }

  const findings = getFindingsFromCase(caseData);

  return (
    <WebAppLayout
      role="doctor"
      title="AI Analysis Results"
      subtitle={`${caseData.patient_name} · Case ${caseData.case_code}`}
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'Cases', path: '/doctor/new-cases' },
        { label: 'AI Analysis' },
      ]}
    >
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 h-full min-h-[500px]">
        {/* X-Ray Viewer */}
        <div className="xl:col-span-3 bg-[#050a14] rounded-2xl border border-slate-700/80 flex flex-col overflow-hidden shadow-2xl">
          {/* Toolbar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#0a1628] border-b border-slate-700/50">
            <div className="flex gap-1">
              {[
                { icon: ZoomIn, action: () => setZoom(z => Math.min(z + 0.2, 2.5)), title: 'Zoom In' },
                { icon: ZoomOut, action: () => setZoom(z => Math.max(z - 0.2, 0.5)), title: 'Zoom Out' },
                { icon: RotateCcw, action: () => { setZoom(1); setBrightness(50); setContrast(55); }, title: 'Reset' },
              ].map((t, i) => {
                const Icon = t.icon;
                return (
                  <button key={i} onClick={t.action} title={t.title} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-4 ml-2">
              <div className="flex items-center gap-2">
                <Sun className="w-3 h-3 text-slate-500" />
                <input type="range" min={0} max={100} value={brightness} onChange={e => setBrightness(+e.target.value)} className="w-18 accent-blue-500 h-1" style={{ width: '60px' }} />
              </div>
              <div className="flex items-center gap-2">
                <Contrast className="w-3 h-3 text-slate-500" />
                <input type="range" min={0} max={100} value={contrast} onChange={e => setContrast(+e.target.value)} className="w-18 accent-blue-500 h-1" style={{ width: '60px' }} />
              </div>
            </div>
            <div className="flex-1" />
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all uppercase ${
                showHeatmap
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-900/20'
                  : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 border border-slate-600/50'
              }`}
            >
              <Layers className="w-3 h-3" />
              {showHeatmap ? 'Heatmap ON' : 'AI Heatmap'}
            </button>
          </div>

          {/* Viewer */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-[#040810] min-h-[400px]">
            <div className="relative transition-all duration-200" style={{ transform: `scale(${zoom})` }}>
              {caseData.image_url ? (
                <div className="relative">
                  <img 
                    src={caseData.image_url} 
                    alt="X-Ray Scan" 
                    className="max-h-[70vh] w-auto drop-shadow-2xl"
                    style={{ filter: `brightness(${0.45 + brightness / 100}) contrast(${0.45 + contrast / 100})` }}
                  />
                  {showHeatmap && caseData.ai_heatmap_url && (
                    <img 
                      src={caseData.ai_heatmap_url} 
                      alt="Heatmap Overlay" 
                      className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen pointer-events-none"
                    />
                  )}
                </div>
              ) : (
                /* Fallback SVG if no image_url */
                <svg
                  viewBox="0 0 220 280"
                  className="w-72 h-96 drop-shadow-2xl"
                  style={{ filter: `brightness(${0.45 + brightness / 100}) contrast(${0.45 + contrast / 100})` }}
                >
                  <rect width="220" height="280" fill="#040810" />
                  {/* ... (SVG content same as before) */}
                  {[0,1,2,3,4,5,6,7].map(i => (
                    <g key={i}>
                      <path d={`M 110 ${82 + i*19} Q ${78 - i*1.5} ${76 + i*19} ${40 - i*0.5} ${87 + i*19}`}
                        fill="none" stroke="#bccdd8" strokeWidth="1.4" opacity={0.82 - i * 0.04} />
                      <path d={`M 110 ${82 + i*19} Q ${142 + i*1.5} ${76 + i*19} ${180 + i*0.5} ${87 + i*19}`}
                        fill="none" stroke="#bccdd8" strokeWidth="1.4" opacity={0.82 - i * 0.04} />
                    </g>
                  ))}
                  <rect x="105" y="62" width="10" height="190" rx="5" fill="#c8d8e4" opacity="0.65" />
                  <ellipse cx="95" cy="148" rx="28" ry="33" fill="#788498" opacity="0.55" />
                  <ellipse cx="66" cy="138" rx="24" ry="42" fill="none" stroke="#90b0c4" strokeWidth="1.5" opacity="0.65" />
                  <ellipse cx="154" cy="138" rx="24" ry="42" fill="none" stroke="#90b0c4" strokeWidth="1.5" opacity="0.65" />
                  {showHeatmap && (
                    <ellipse cx="154" cy="165" rx="30" ry="35" fill="red" opacity="0.4" />
                  )}
                  <text x="6" y="274" fill="#2a4060" fontSize="7">SIMULATED VIEW · {caseData.case_code}</text>
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Right: Findings Panel */}
        <div className="xl:col-span-2 flex flex-col gap-3.5">
          {/* AI Result Banner */}
          <div className={`rounded-xl p-4 text-white shadow-lg ${caseData.priority?.toUpperCase() === 'CRITICAL' ? 'bg-gradient-to-br from-red-600 to-red-700' : 'bg-gradient-to-br from-blue-600 to-blue-700'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4" />
              <span className="font-bold text-sm">AI Analysis Overview</span>
              <span className="ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/20 uppercase tracking-wider">
                {caseData.priority || 'Normal'}
              </span>
            </div>
            <p className="text-white/80 text-xs mb-3 font-medium">
              {caseData.ai_result || 'Analysis in progress or no significant findings detected.'}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/15 rounded-lg p-2 text-center">
                <p className="font-bold text-base">{Math.round((caseData.ai_confidence || 0) * 100)}%</p>
                <p className="text-white/70 text-[9px] uppercase font-semibold">Confidence</p>
              </div>
              <div className="bg-white/15 rounded-lg p-2 text-center">
                <p className="font-bold text-base">{new Date(caseData.created_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</p>
                <p className="text-white/70 text-[9px] uppercase font-semibold">Processed At</p>
              </div>
            </div>
          </div>

          {/* Patient Summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Clinical Context</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Patient', value: caseData.patient_name },
                { label: 'MRN', value: caseData.case_code, mono: true },
                { label: 'Age / Gender', value: `${caseData.patient_age}y / ${caseData.patient_gender}` },
                { label: 'Priority', value: caseData.priority },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[10px] text-slate-400 font-medium">{item.label}</p>
                  <p className={`text-xs font-bold text-slate-800 mt-0.5 ${item.mono ? 'font-mono' : ''}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Findings */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-blue-500" />
                Detected Abnormalities
              </h3>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded uppercase">{findings.length} Found</span>
            </div>
            
            <div className="space-y-3">
              {findings.length > 0 ? findings.map((f, i) => {
                const cfg = getSeverityConfig(f.severity);
                return (
                  <div key={i} className={`p-3 rounded-xl border-l-4 transition-all hover:scale-[1.02] ${cfg.bg} ${cfg.glow}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-2">
                        <AlertCircle className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${cfg.text}`} />
                        <div>
                          <p className={`text-xs font-bold ${cfg.text}`}>{f.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{f.region}</p>
                        </div>
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter ${cfg.badge}`}>{f.severity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-black/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-1000 ${cfg.bar}`} style={{ width: `${f.confidence}%` }} />
                      </div>
                      <span className={`text-[10px] font-bold ${cfg.text}`}>{f.confidence}%</span>
                    </div>
                  </div>
                );
              }) : (
                <div className="p-6 text-center">
                  <CheckCircle className="w-10 h-10 text-green-300 mx-auto mb-2" />
                  <p className="text-xs font-medium text-slate-400">No high-confidence abnormalities detected by AI.</p>
                </div>
              )}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs font-bold text-blue-800 mb-2 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5" />
              AI Clinical Support
            </p>
            <ul className="space-y-1.5">
              {[
                'Clinical correlation with symptoms advised',
                'Compare with prior imaging if available',
                'Verify findings with standard diagnostic workflow',
              ].map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-blue-700 font-medium">
                  <span className="text-blue-300 mt-1 flex-shrink-0 w-1 h-1 rounded-full bg-blue-400" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/doctor/diagnosis-confirmation/${id}`)}
              className="flex-1 bg-[#2563EB] text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            >
              <FileText className="w-4 h-4" /> Confirm & Diagnose
            </button>
            <button
              onClick={() => navigate(`/doctor/case/${id}`)}
              className="px-4 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}

