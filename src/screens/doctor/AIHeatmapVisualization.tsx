import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import {
  Layers, Eye, EyeOff, Sun, Contrast, ZoomIn, ZoomOut, RotateCcw,
  FileText, ChevronRight, Info, Download
} from 'lucide-react';

const heatmapLayers = [
  { id: 'pneumonia', label: 'Pneumonia', region: 'Right Lower Lobe', color: '#ff3030', opacity: 0.72, cx: 154, cy: 163, rx: 23, ry: 26, confidence: 92, severity: 'Critical' },
  { id: 'effusion', label: 'Pleural Effusion', region: 'Left Hemithorax', color: '#ff8000', opacity: 0.62, cx: 58, cy: 176, rx: 19, ry: 17, confidence: 88, severity: 'High' },
  { id: 'cardio', label: 'Cardiomegaly', region: 'Cardiac Silhouette', color: '#ffdd00', opacity: 0.45, cx: 92, cy: 148, rx: 32, ry: 36, confidence: 75, severity: 'Medium' },
];

export default function AIHeatmapVisualization() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    pneumonia: true, effusion: true, cardio: true,
  });
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(55);
  const [zoom, setZoom] = useState(1);
  const [opacity, setOpacity] = useState(70);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  const toggleLayer = (id: string) => setActiveLayers(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <WebAppLayout
      role="doctor"
      title="AI Heatmap Visualization"
      subtitle="Interactive region-of-interest overlay with layer controls"
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'AI Analysis', path: `/doctor/ai-analysis/${id}` },
        { label: 'Heatmap' },
      ]}
    >
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5 h-[calc(100vh-215px)]">
        {/* Viewer */}
        <div className="xl:col-span-3 bg-[#050a14] rounded-2xl border border-slate-700/80 flex flex-col overflow-hidden shadow-2xl">
          {/* Toolbar */}
          <div className="flex items-center gap-3 px-4 py-2.5 bg-[#0a1628] border-b border-slate-700/50 flex-wrap gap-y-2">
            <div className="flex gap-1">
              {[
                { icon: ZoomIn, action: () => setZoom(z => Math.min(z + 0.2, 2.5)), title: 'Zoom In' },
                { icon: ZoomOut, action: () => setZoom(z => Math.max(z - 0.2, 0.5)), title: 'Zoom Out' },
                { icon: RotateCcw, action: () => { setZoom(1); setBrightness(50); setContrast(55); setOpacity(70); }, title: 'Reset' },
              ].map((t, i) => {
                const Icon = t.icon;
                return (
                  <button key={i} onClick={t.action} title={t.title} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Sun className="w-3 h-3 text-slate-500" />
                <input type="range" min={0} max={100} value={brightness} onChange={e => setBrightness(+e.target.value)} className="w-16 accent-blue-500" />
              </div>
              <div className="flex items-center gap-2">
                <Contrast className="w-3 h-3 text-slate-500" />
                <input type="range" min={0} max={100} value={contrast} onChange={e => setContrast(+e.target.value)} className="w-16 accent-blue-500" />
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-3 h-3 text-slate-500" />
                <input type="range" min={0} max={100} value={opacity} onChange={e => setOpacity(+e.target.value)} className="w-16 accent-amber-500" />
                <span className="text-slate-500 text-[10px]">{opacity}%</span>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-slate-600 text-[10px] font-mono">{Math.round(zoom * 100)}%</span>
              <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors" title="Download">
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Viewer */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-[#030810]">
            {/* Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="heatGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e3a5f" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#heatGrid)" />
              </svg>
            </div>

            <div className="transition-transform duration-200" style={{ transform: `scale(${zoom})` }}>
              <svg
                viewBox="0 0 220 280"
                className="w-80 h-[420px] drop-shadow-2xl"
                style={{ filter: `brightness(${0.45 + brightness / 100}) contrast(${0.45 + contrast / 100})` }}
              >
                <rect width="220" height="280" fill="#030810" />

                {/* Vignette */}
                <defs>
                  <radialGradient id="heatVig" cx="50%" cy="50%" r="70%">
                    <stop offset="60%" stopColor="transparent" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
                  </radialGradient>
                </defs>
                <rect width="220" height="280" fill="url(#heatVig)" />

                {/* Ribcage */}
                {[0,1,2,3,4,5,6,7].map(i => (
                  <g key={i}>
                    <path d={`M 110 ${80 + i*20} Q ${78 - i*1.5} ${75 + i*20} ${42 - i*0.5} ${86 + i*20}`}
                      fill="none" stroke="#bccdd8" strokeWidth="1.4" opacity={0.82 - i * 0.04} />
                    <path d={`M 110 ${80 + i*20} Q ${142 + i*1.5} ${75 + i*20} ${178 + i*0.5} ${86 + i*20}`}
                      fill="none" stroke="#bccdd8" strokeWidth="1.4" opacity={0.82 - i * 0.04} />
                  </g>
                ))}

                {/* Spine */}
                <rect x="105" y="60" width="10" height="190" rx="5" fill="#c8d8e4" opacity="0.65" />

                {/* Heart */}
                <ellipse cx="94" cy="148" rx="28" ry="33" fill="#788498" opacity="0.55" />

                {/* Lungs */}
                <ellipse cx="65" cy="138" rx="24" ry="42" fill="none" stroke="#90b0c4" strokeWidth="1.5" opacity="0.65" />
                <ellipse cx="155" cy="138" rx="24" ry="42" fill="none" stroke="#90b0c4" strokeWidth="1.5" opacity="0.65" />
                <ellipse cx="65" cy="138" rx="20" ry="36" fill="#1a2a3a" opacity="0.35" />
                <ellipse cx="155" cy="138" rx="20" ry="36" fill="#1a2a3a" opacity="0.35" />

                {/* Shoulders */}
                <path d="M 28 74 Q 44 58 110 52 Q 176 58 192 74" fill="none" stroke="#a8bec8" strokeWidth="2" opacity="0.6" />

                {/* Diaphragm */}
                <path d="M 38 206 Q 110 224 182 206" fill="none" stroke="#9ab0c0" strokeWidth="1.8" opacity="0.55" />

                {/* Heatmap layers */}
                <defs>
                  {heatmapLayers.map(l => (
                    <radialGradient key={l.id} id={`hgrad-${l.id}`}>
                      <stop offset="0%" stopColor={l.color} stopOpacity={l.opacity} />
                      <stop offset="45%" stopColor={l.color} stopOpacity={l.opacity * 0.55} />
                      <stop offset="100%" stopColor={l.color} stopOpacity="0" />
                    </radialGradient>
                  ))}
                </defs>

                {heatmapLayers.map(l => activeLayers[l.id] && (
                  <g key={l.id}>
                    <ellipse
                      cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry}
                      fill={`url(#hgrad-${l.id})`}
                      opacity={opacity / 100}
                    />
                    <ellipse
                      cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry}
                      fill="none"
                      stroke={l.color}
                      strokeWidth={hoveredLayer === l.id ? "1.5" : "0.8"}
                      strokeDasharray="3,2"
                      opacity={hoveredLayer === l.id ? "1" : "0.65"}
                    />
                    {/* Crosshair center */}
                    <line x1={l.cx - 4} y1={l.cy} x2={l.cx + 4} y2={l.cy} stroke={l.color} strokeWidth="0.8" opacity="0.7" />
                    <line x1={l.cx} y1={l.cy - 4} x2={l.cx} y2={l.cy + 4} stroke={l.color} strokeWidth="0.8" opacity="0.7" />
                  </g>
                ))}

                <text x="6" y="274" fill="#2a4060" fontSize="7">AI Heatmap · Robert Wilson · MRN-002100 · v3.2</text>
              </svg>
            </div>
          </div>

          {/* Color Scale */}
          <div className="px-5 py-2.5 bg-[#0a1628] border-t border-slate-700/50">
            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-[10px] uppercase font-semibold w-10">Low</span>
              <div className="flex-1 h-3 rounded-full overflow-hidden" style={{
                background: 'linear-gradient(to right, #0d1f40, #1040a0, #2080c0, #40b060, #b8d020, #e07020, #e03020, #c00000)'
              }} />
              <span className="text-slate-500 text-[10px] uppercase font-semibold w-10 text-right">High</span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-slate-600 text-[9px]">AI Confidence Score</span>
              <div className="flex items-center gap-1 text-[9px] text-slate-600">
                <Info className="w-2.5 h-2.5" />
                GradCAM visualization
              </div>
            </div>
          </div>
        </div>

        {/* Layer Controls */}
        <div className="flex flex-col gap-3.5 overflow-y-auto">
          {/* Heatmap Layers */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#2563EB]" />
              Heatmap Layers
            </h3>
            <div className="space-y-2.5">
              {heatmapLayers.map(l => (
                <div
                  key={l.id}
                  className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                    activeLayers[l.id] ? 'border-blue-200 bg-blue-50' : 'border-slate-200 bg-slate-50'
                  }`}
                  onMouseEnter={() => setHoveredLayer(l.id)}
                  onMouseLeave={() => setHoveredLayer(null)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: l.color }} />
                      <div>
                        <span className="text-xs font-semibold text-slate-700">{l.label}</span>
                        <p className="text-[10px] text-slate-400">{l.region}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleLayer(l.id)}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {activeLayers[l.id] ? <Eye className="w-4 h-4 text-[#2563EB]" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${l.confidence}%`, backgroundColor: l.color }} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600">{l.confidence}%</span>
                  </div>
                  <div className="mt-1.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                      l.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                      l.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>{l.severity}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold text-slate-500">Overlay Opacity</p>
                <span className="text-[10px] font-bold text-slate-700">{opacity}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={opacity}
                onChange={e => setOpacity(+e.target.value)}
                className="w-full accent-amber-500"
              />
            </div>
          </div>

          {/* Interpretation Guide */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h4 className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[#2563EB]" />
              Heatmap Interpretation
            </h4>
            <div className="space-y-2 text-xs text-slate-500">
              <p>• <span className="text-red-600 font-medium">Red/Orange</span> — High-confidence pathological findings</p>
              <p>• <span className="text-yellow-600 font-medium">Yellow</span> — Moderate confidence, needs correlation</p>
              <p>• Crosshairs mark the highest-activation pixel in each region</p>
              <p>• GradCAM v3.2 with 92% sensitivity on validation set</p>
              <p>• Always correlate with clinical presentation and history</p>
            </div>
          </div>

          {/* AI Model Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-2">Model Details</p>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Model</span>
                <span className="font-semibold text-slate-700">CXRT-Net v3.2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Visualization</span>
                <span className="font-semibold text-slate-700">GradCAM++</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Training Set</span>
                <span className="font-semibold text-slate-700">224K images</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sensitivity</span>
                <span className="font-semibold text-green-700">92.4%</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 mt-auto">
            <button
              onClick={() => navigate(`/doctor/diagnosis-confirmation/${id}`)}
              className="w-full bg-[#2563EB] text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
            >
              <FileText className="w-4 h-4" />
              Confirm Diagnosis
            </button>
            <button
              onClick={() => navigate(`/doctor/ai-analysis/${id}`)}
              className="w-full border border-slate-200 text-slate-600 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              ← Back to Analysis
            </button>
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
