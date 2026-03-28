import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import {
  Brain, AlertCircle, CheckCircle, Eye, FileText,
  ZoomIn, ZoomOut, RotateCcw, Sun, Contrast, Layers,
  ChevronRight, Info
} from 'lucide-react';
import { mockFindings, mockCases } from '../../lib/data';

export default function AIResultAnalysis() {
  const navigate = useNavigate();
  const { id } = useParams();
  const caseData = mockCases.find(c => c.id === id) || mockCases[0];

  const [showHeatmap, setShowHeatmap] = useState(false);
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(55);
  const [zoom, setZoom] = useState(1);

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'Critical': return { bg: 'bg-red-50 border-red-200', text: 'text-red-700', badge: 'bg-red-100 text-red-700', bar: 'bg-red-500', glow: 'shadow-red-100' };
      case 'High': return { bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700', bar: 'bg-orange-500', glow: '' };
      case 'Medium': return { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700', bar: 'bg-amber-500', glow: '' };
      case 'Normal': return { bg: 'bg-green-50 border-green-200', text: 'text-green-700', badge: 'bg-green-100 text-green-700', bar: 'bg-green-500', glow: '' };
      default: return { bg: 'bg-slate-50 border-slate-200', text: 'text-slate-700', badge: 'bg-slate-100 text-slate-700', bar: 'bg-slate-500', glow: '' };
    }
  };

  return (
    <WebAppLayout
      role="doctor"
      title="AI Analysis Results"
      subtitle={`${caseData.patient} · Case ${caseData.mrn}`}
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'Cases', path: '/doctor/new-cases' },
        { label: 'AI Analysis' },
      ]}
    >
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5 h-[calc(100vh-215px)]">
        {/* X-Ray Viewer */}
        <div className="xl:col-span-3 bg-[#050a14] rounded-2xl border border-slate-700/80 flex flex-col overflow-hidden shadow-2xl">
          {/* Toolbar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a1628] border-b border-slate-700/50">
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
                <input type="range" min={0} max={100} value={brightness} onChange={e => setBrightness(+e.target.value)} className="w-18 accent-blue-500 h-1" style={{ width: '72px' }} />
              </div>
              <div className="flex items-center gap-2">
                <Contrast className="w-3 h-3 text-slate-500" />
                <input type="range" min={0} max={100} value={contrast} onChange={e => setContrast(+e.target.value)} className="w-18 accent-blue-500 h-1" style={{ width: '72px' }} />
              </div>
            </div>
            <div className="flex-1" />
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                showHeatmap
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-lg shadow-amber-900/20'
                  : 'bg-slate-700/60 text-slate-300 hover:bg-slate-700 border border-slate-600/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {showHeatmap ? 'Heatmap ON' : 'AI Heatmap'}
            </button>
            <span className="text-slate-600 text-[11px] font-mono w-8 text-right">{Math.round(zoom * 100)}%</span>
          </div>

          {/* Viewer */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-[#040810]">
            {/* Grid overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="xraygrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e3a5f" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#xraygrid)" />
              </svg>
            </div>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-blue-500/5" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-500/5" />

            <div className="relative transition-all duration-200" style={{ transform: `scale(${zoom})` }}>
              <svg
                viewBox="0 0 220 280"
                className="w-72 h-96 drop-shadow-2xl"
                style={{ filter: `brightness(${0.45 + brightness / 100}) contrast(${0.45 + contrast / 100})` }}
              >
                {/* Background */}
                <rect width="220" height="280" fill="#040810" />
                {/* Soft vignette */}
                <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
                  <stop offset="60%" stopColor="transparent" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
                </radialGradient>
                <rect width="220" height="280" fill="url(#vignette)" />

                {/* Ribcage */}
                {[0,1,2,3,4,5,6,7].map(i => (
                  <g key={i}>
                    <path d={`M 110 ${82 + i*19} Q ${78 - i*1.5} ${76 + i*19} ${40 - i*0.5} ${87 + i*19}`}
                      fill="none" stroke="#bccdd8" strokeWidth="1.4" opacity={0.82 - i * 0.04} />
                    <path d={`M 110 ${82 + i*19} Q ${142 + i*1.5} ${76 + i*19} ${180 + i*0.5} ${87 + i*19}`}
                      fill="none" stroke="#bccdd8" strokeWidth="1.4" opacity={0.82 - i * 0.04} />
                  </g>
                ))}

                {/* Spine */}
                <rect x="105" y="62" width="10" height="190" rx="5" fill="#c8d8e4" opacity="0.65" />

                {/* Heart/mediastinum */}
                <ellipse cx="95" cy="148" rx="28" ry="33" fill="#788498" opacity="0.55" />

                {/* Lung outlines */}
                <ellipse cx="66" cy="138" rx="24" ry="42" fill="none" stroke="#90b0c4" strokeWidth="1.5" opacity="0.65" />
                <ellipse cx="154" cy="138" rx="24" ry="42" fill="none" stroke="#90b0c4" strokeWidth="1.5" opacity="0.65" />

                {/* Lung texture */}
                <ellipse cx="66" cy="138" rx="20" ry="36" fill="#1a2a3a" opacity="0.4" />
                <ellipse cx="154" cy="138" rx="20" ry="36" fill="#1a2a3a" opacity="0.4" />

                {/* Shoulders/clavicles */}
                <path d="M 28 74 Q 42 58 110 52 Q 178 58 192 74" fill="none" stroke="#a8bec8" strokeWidth="2" opacity="0.6" />

                {/* Diaphragm */}
                <path d="M 38 206 Q 110 224 182 206" fill="none" stroke="#9ab0c0" strokeWidth="1.8" opacity="0.55" />

                {/* Trachea */}
                <rect x="107" y="32" width="6" height="30" rx="3" fill="#9ab0c0" opacity="0.5" />

                {/* Heatmap overlays */}
                {showHeatmap && (
                  <>
                    <defs>
                      <radialGradient id="heatCritical2">
                        <stop offset="0%" stopColor="#ff2020" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#ff4040" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="heatHigh2">
                        <stop offset="0%" stopColor="#ff7000" stopOpacity="0.85" />
                        <stop offset="55%" stopColor="#ffaa00" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#ff8000" stopOpacity="0" />
                      </radialGradient>
                      <radialGradient id="heatMed2">
                        <stop offset="0%" stopColor="#ffee00" stopOpacity="0.65" />
                        <stop offset="65%" stopColor="#ffdd00" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#ffff00" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    {/* Pneumonia - Right Lower Lobe */}
                    <ellipse cx="154" cy="165" rx="22" ry="26" fill="url(#heatCritical2)" />
                    <ellipse cx="154" cy="165" rx="22" ry="26" fill="none" stroke="#ff4040" strokeWidth="1" strokeDasharray="3,2" opacity="0.7" />

                    {/* Pleural Effusion */}
                    <ellipse cx="58" cy="178" rx="18" ry="16" fill="url(#heatHigh2)" />
                    <ellipse cx="58" cy="178" rx="18" ry="16" fill="none" stroke="#ff8000" strokeWidth="1" strokeDasharray="3,2" opacity="0.6" />

                    {/* Cardiomegaly */}
                    <ellipse cx="90" cy="148" rx="30" ry="36" fill="url(#heatMed2)" />

                    {/* Labels */}
                    <rect x="124" y="180" width="52" height="11" rx="2" fill="#0a0a0a" opacity="0.6" />
                    <text x="150" y="188" fill="#ff6060" fontSize="7" fontWeight="bold" textAnchor="middle">Pneumonia 92%</text>
                    <rect x="26" y="192" width="46" height="11" rx="2" fill="#0a0a0a" opacity="0.6" />
                    <text x="49" y="200" fill="#ff9030" fontSize="7" fontWeight="bold" textAnchor="middle">Effusion 88%</text>
                    <rect x="58" y="134" width="56" height="11" rx="2" fill="#0a0a0a" opacity="0.6" />
                    <text x="86" y="142" fill="#ffdd00" fontSize="7" fontWeight="bold" textAnchor="middle">Cardiomegaly 75%</text>
                  </>
                )}

                {/* Metadata */}
                <text x="6" y="274" fill="#2a4060" fontSize="7">CXRT AI v3.2 · {caseData.mrn} · PA View</text>
                <text x="6" y="14" fill="#2a4060" fontSize="7">2026-03-06 · 09:41 · 125kV/5mAs</text>
              </svg>

              {/* Overlay badges */}
              <div className="absolute top-2 left-2">
                {caseData.priority === 'Critical' ? (
                  <span className="px-2 py-0.5 bg-red-500/30 text-red-400 border border-red-500/50 rounded text-[9px] font-bold animate-pulse">
                    ⚠ CRITICAL FINDINGS
                  </span>
                ) : (
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded text-[9px] font-bold">
                    HIGH PRIORITY
                  </span>
                )}
              </div>
              <div className="absolute bottom-2 right-2 text-[8px] text-slate-600 font-mono">10cm ━━━</div>
            </div>
          </div>

          {/* Heatmap Legend */}
          {showHeatmap && (
            <div className="px-4 py-2.5 bg-[#0a1628] border-t border-slate-700/50 flex items-center gap-4 flex-wrap">
              <p className="text-slate-500 text-[10px] font-semibold uppercase">AI Confidence Map:</p>
              <div className="flex items-center gap-4">
                {[
                  { color: 'bg-red-500', label: 'Critical >90%' },
                  { color: 'bg-orange-500', label: 'High 75–90%' },
                  { color: 'bg-yellow-400', label: 'Moderate 60–75%' },
                  { color: 'bg-green-500', label: 'Normal' },
                ].map((l, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-sm ${l.color} opacity-80`} />
                    <span className="text-slate-500 text-[10px]">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom controls bar */}
          {!showHeatmap && (
            <div className="px-4 py-2.5 bg-[#0a1628] border-t border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <Info className="w-3 h-3" />
                <span>PA View · 1024×1024px · DICOM · 4.2MB</span>
              </div>
              <button
                onClick={() => navigate(`/doctor/ai-heatmap/${id}`)}
                className="text-[10px] text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
              >
                <Layers className="w-3 h-3" /> Full Heatmap View
              </button>
            </div>
          )}
        </div>

        {/* Right: Findings Panel */}
        <div className="xl:col-span-2 flex flex-col gap-3.5 overflow-y-auto">
          {/* AI Result Banner */}
          <div className={`rounded-xl p-4 text-white ${caseData.priority === 'Critical' ? 'bg-gradient-to-br from-red-600 to-red-700' : 'bg-gradient-to-br from-orange-500 to-orange-600'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4" />
              <span className="font-bold text-sm">AI Analysis Complete</span>
              <span className={`ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full ${caseData.priority === 'Critical' ? 'bg-white/20' : 'bg-white/20'}`}>
                {caseData.priority.toUpperCase()}
              </span>
            </div>
            <p className="text-white/80 text-[11px] mb-3">
              {caseData.priority === 'Critical'
                ? 'Multiple critical abnormalities detected — immediate review required'
                : 'Significant findings detected requiring clinical review'}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { v: '92%', l: 'Max Conf.' },
                { v: '3', l: 'Findings' },
                { v: '<30s', l: 'AI Time' },
              ].map((s, i) => (
                <div key={i} className="bg-white/15 rounded-lg p-2 text-center">
                  <p className="font-bold text-sm">{s.v}</p>
                  <p className="text-white/70 text-[10px]">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Patient', value: caseData.patient },
                { label: 'Age / Sex', value: `${caseData.age}y / ${caseData.gender}` },
                { label: 'Case ID', value: caseData.mrn, mono: true },
                { label: 'Scan Date', value: caseData.date },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">{item.label}</p>
                  <p className={`text-xs font-semibold text-slate-800 mt-0.5 ${item.mono ? 'font-mono' : ''}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Findings */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 flex-1">
            <h3 className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-red-500" />
              AI Findings
            </h3>
            <div className="space-y-2">
              {mockFindings.map((f, i) => {
                const cfg = getSeverityConfig(f.severity);
                return (
                  <div key={i} className={`p-3 rounded-xl border ${cfg.bg}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-2">
                        {f.severity === 'Normal'
                          ? <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                          : <AlertCircle className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${cfg.text}`} />
                        }
                        <div>
                          <p className={`text-xs font-semibold ${cfg.text}`}>{f.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{f.region}</p>
                        </div>
                      </div>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${cfg.badge}`}>{f.severity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-black/10 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${cfg.bar}`} style={{ width: `${f.confidence}%` }} />
                      </div>
                      <span className={`text-[10px] font-bold ${cfg.text}`}>{f.confidence}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5">
            <p className="text-xs font-bold text-blue-800 mb-2 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5" />
              AI Clinical Recommendations
            </p>
            <ul className="space-y-1">
              {[
                'Immediate clinical correlation required',
                'Consider CT scan for detailed assessment',
                'Cardiology consultation recommended',
                'Monitor for respiratory distress',
              ].map((r, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-blue-700">
                  <span className="text-blue-400 mt-0.5 flex-shrink-0">•</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/doctor/ai-heatmap/${id}`)}
              className="flex-1 bg-[#2563EB] text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Eye className="w-4 h-4" /> Full Heatmap
            </button>
            <button
              onClick={() => navigate(`/doctor/diagnosis-confirmation/${id}`)}
              className="flex-1 border-2 border-[#2563EB] text-[#2563EB] py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
            >
              <FileText className="w-4 h-4" /> Diagnose
            </button>
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
