import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import {
  Camera, ZoomIn, ZoomOut, RotateCcw, Sun, Contrast, ChevronRight,
  Maximize2, Grid, RefreshCw, CheckCircle, AlertTriangle, Info
} from 'lucide-react';

export default function ScannerScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state || { patientId: 1, patientName: 'John Smith', mrn: 'MRN-001240', scanId: 1 };
  const technicianName = localStorage.getItem('technicianName') || 'Sarah Williams';

  const [captured, setCaptured] = useState(false);
  const [brightness, setBrightness] = useState(50);
  const [contrast, setContrast] = useState(50);
  const [zoom, setZoom] = useState(1);
  const [capturing, setCapturing] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  const handleCapture = () => {
    setCapturing(true);
    setTimeout(() => {
      setCapturing(false);
      setCaptured(true);
    }, 1800);
  };

  return (
    <WebAppLayout
      role="technician"
      title="X-Ray Scanner"
      subtitle="Capture and preview the chest X-ray image"
      breadcrumbs={[
        { label: 'Dashboard', path: '/technician/dashboard' },
        { label: 'New Scan' },
        { label: 'Scanner' },
      ]}
    >
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-5 h-[calc(100vh-215px)]">
        {/* X-Ray Viewer */}
        <div className="xl:col-span-3 bg-[#050a14] rounded-2xl border border-slate-700/80 overflow-hidden flex flex-col shadow-2xl">
          {/* Toolbar */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0a1628] border-b border-slate-700/50">
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 flex items-center gap-1 ml-2">
              {[
                { icon: ZoomIn, action: () => setZoom((z: number) => Math.min(z + 0.25, 3)), title: 'Zoom In' },
                { icon: ZoomOut, action: () => setZoom((z: number) => Math.max(z - 0.25, 0.5)), title: 'Zoom Out' },
                { icon: RotateCcw, action: () => { setZoom(1); setBrightness(50); setContrast(50); }, title: 'Reset' },
                { icon: Maximize2, action: () => {}, title: 'Fullscreen' },
                { icon: Grid, action: () => setShowGrid((g: boolean) => !g), title: 'Toggle Grid', active: showGrid },
              ].map((tool, i) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={i}
                    onClick={tool.action}
                    title={tool.title}
                    className={`p-1.5 rounded transition-colors ${
                      tool.active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-[10px] font-mono">{Math.round(zoom * 100)}%</span>
              {captured && (
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[9px] font-bold rounded-full border border-green-500/30">
                  ✓ CAPTURED
                </span>
              )}
              {capturing && (
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[9px] font-bold rounded-full border border-amber-500/30 animate-pulse">
                  SCANNING...
                </span>
              )}
              {!captured && !capturing && (
                <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[9px] font-bold rounded-full border border-red-500/30">
                  ● LIVE
                </span>
              )}
            </div>
          </div>

          {/* Viewer Area */}
          <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-[#030710]">
            {/* Grid overlay */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none">
                <svg width="100%" height="100%" opacity="0.12">
                  <defs>
                    <pattern id="scanGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#scanGrid)" />
                </svg>
              </div>
            )}

            {/* Crosshair lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-blue-500/8" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-500/8" />
            </div>

            {/* X-Ray Simulation */}
            <div
              className="relative transition-transform duration-300"
              style={{ transform: `scale(${zoom})` }}
            >
              <svg viewBox="0 0 220 280" className="w-80 h-[400px]" style={{
                filter: `brightness(${0.4 + brightness / 100}) contrast(${0.45 + contrast / 100})`,
              }}>
                <rect width="220" height="280" fill="#030710" />
                <radialGradient id="bodyGlow" cx="50%" cy="50%" r="55%">
                  <stop offset="0%" stopColor="#1a2a3a" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <rect width="220" height="280" fill="url(#bodyGlow)" />

                {/* Ribcage */}
                {[0,1,2,3,4,5,6,7].map(i => (
                  <g key={i}>
                    <path d={`M 110 ${80 + i*20} Q ${78 - i*1.5} ${75 + i*20} ${42 - i*0.5} ${86 + i*20}`}
                      fill="none" stroke="#bccdd8"
                      strokeWidth={captured ? "1.4" : "0.7"}
                      opacity={captured ? (0.85 - i * 0.04) : (0.35 - i * 0.02)} />
                    <path d={`M 110 ${80 + i*20} Q ${142 + i*1.5} ${75 + i*20} ${178 + i*0.5} ${86 + i*20}`}
                      fill="none" stroke="#bccdd8"
                      strokeWidth={captured ? "1.4" : "0.7"}
                      opacity={captured ? (0.85 - i * 0.04) : (0.35 - i * 0.02)} />
                  </g>
                ))}

                {/* Spine */}
                <rect x="105" y="58" width="10" height="188" rx="5"
                  fill={captured ? "#c8d8e4" : "#405870"} opacity={captured ? "0.65" : "0.25"} />

                {/* Heart */}
                <ellipse cx="96" cy="148" rx="27" ry="32"
                  fill={captured ? "#788498" : "#2a3a50"} opacity={captured ? "0.55" : "0.22"} />

                {/* Lungs */}
                <ellipse cx="65" cy="138" rx="24" ry="42" fill="none"
                  stroke={captured ? "#90b0c4" : "#405870"} strokeWidth={captured ? "1.5" : "0.7"}
                  opacity={captured ? "0.65" : "0.25"} />
                <ellipse cx="155" cy="138" rx="24" ry="42" fill="none"
                  stroke={captured ? "#90b0c4" : "#405870"} strokeWidth={captured ? "1.5" : "0.7"}
                  opacity={captured ? "0.65" : "0.25"} />

                {/* Finding preview if captured */}
                {captured && (
                  <>
                    <ellipse cx="155" cy="158" rx="16" ry="20" fill="#ff6060" opacity="0.2" />
                    <ellipse cx="155" cy="158" rx="16" ry="20" fill="none" stroke="#ff6060" strokeWidth="0.8" strokeDasharray="3,2" opacity="0.4" />
                  </>
                )}

                {/* Shoulders */}
                <path d="M 28 76 Q 44 58 110 52 Q 176 58 192 76" fill="none"
                  stroke={captured ? "#a8bec8" : "#405870"} strokeWidth={captured ? "2" : "1"}
                  opacity={captured ? "0.6" : "0.22"} />

                {/* Diaphragm */}
                <path d="M 40 204 Q 110 220 180 204" fill="none"
                  stroke={captured ? "#98b0c0" : "#405870"} strokeWidth={captured ? "1.8" : "0.8"}
                  opacity={captured ? "0.55" : "0.22"} />

                {/* Scanning animation */}
                {capturing && (
                  <g>
                    <rect x="0" y="-4" width="220" height="4" fill="#3b82f6" opacity="0.5">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        from="0 0"
                        to="0 285"
                        dur="1.8s"
                        repeatCount="1"
                        fill="freeze"
                      />
                    </rect>
                    <rect x="0" y="-4" width="220" height="2" fill="#93c5fd" opacity="0.7">
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        from="0 2"
                        to="0 287"
                        dur="1.8s"
                        repeatCount="1"
                        fill="freeze"
                      />
                    </rect>
                  </g>
                )}

                {/* Corner markers */}
                {captured && (
                  <>
                    <path d="M 10 10 L 10 22 M 10 10 L 22 10" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" fill="none" />
                    <path d="M 210 10 L 198 10 M 210 10 L 210 22" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" fill="none" />
                    <path d="M 10 270 L 10 258 M 10 270 L 22 270" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" fill="none" />
                    <path d="M 210 270 L 198 270 M 210 270 L 210 258" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" fill="none" />
                  </>
                )}

                <text x="6" y="275" fill="#2a4060" fontSize="7">CXRT AI · {patient.mrn} · {new Date().toISOString().split('T')[0]}</text>
              </svg>

              {/* Ruler mark */}
              <div className="absolute bottom-2 right-2 text-[8px] text-slate-600 font-mono">10cm ━━━</div>
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between gap-6 px-5 py-3 bg-[#0a1628] border-t border-slate-700/50">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <Info className="w-3 h-3" />
              PA View · 1024×1024px · 125kV / 5mAs
            </div>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <Sun className="w-3.5 h-3.5 text-slate-500" />
                <input type="range" min={0} max={100} value={brightness} onChange={e => setBrightness(+e.target.value)} className="w-20 accent-blue-500" />
                <span className="text-slate-500 text-[10px] w-5">{brightness}</span>
              </div>
              <div className="flex items-center gap-2">
                <Contrast className="w-3.5 h-3.5 text-slate-500" />
                <input type="range" min={0} max={100} value={contrast} onChange={e => setContrast(+e.target.value)} className="w-20 accent-blue-500" />
                <span className="text-slate-500 text-[10px] w-5">{contrast}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex flex-col gap-3.5">
          {/* Patient Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-[10px] font-semibold text-slate-400 mb-2 uppercase tracking-wide">Current Patient</p>
            <p className="font-bold text-slate-800">{patient.patientName}</p>
            <p className="text-xs text-slate-500">{patient.mrn} · 58y M</p>
            <div className="mt-2.5 pt-2.5 border-t border-slate-100 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Scan Type</span>
                <span className="font-medium text-slate-700">PA View</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Priority</span>
                <span className="font-medium text-green-700">Routine</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Technician</span>
                <span className="font-medium text-slate-700">{technicianName}</span>
              </div>
            </div>
          </div>

          {/* Capture / Captured State */}
          {!captured ? (
            <button
              onClick={handleCapture}
              disabled={capturing}
              className={`flex-1 rounded-xl font-semibold text-sm flex flex-col items-center justify-center gap-3 transition-all border-2 ${
                capturing
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 cursor-not-allowed'
                  : 'bg-[#2563EB] border-[#2563EB] text-white hover:bg-blue-700 hover:border-blue-700 shadow-xl shadow-blue-900/30'
              }`}
            >
              {capturing ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                  </div>
                  <div className="text-center">
                    <span className="block">Scanning...</span>
                    <span className="text-amber-400/70 text-xs font-normal">Hold breath</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center border-2 border-white/20">
                    <Camera className="w-7 h-7" />
                  </div>
                  <div className="text-center">
                    <span className="block">Capture X-Ray</span>
                    <span className="text-blue-200 text-xs font-normal">Click to capture</span>
                  </div>
                </>
              )}
            </button>
          ) : (
            <div className="flex-1 bg-green-50 border-2 border-green-200 rounded-xl flex flex-col items-center justify-center gap-3 p-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-300">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <div className="text-center">
                <p className="font-bold text-green-700">Image Captured!</p>
                <p className="text-xs text-green-500 mt-0.5">1024×1024 · DICOM format</p>
                <p className="text-[10px] text-green-400 mt-0.5">4.2 MB · PA View</p>
              </div>
              <div className="w-full p-2.5 bg-white rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-xs text-green-700">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                  Ready for quality validation
                </div>
              </div>
            </div>
          )}

          {/* Quality Hint */}
          {!captured && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-amber-700">Pre-Capture Checklist</p>
                  <ul className="text-[10px] text-amber-600 mt-1 space-y-0.5">
                    <li>• Patient in upright position</li>
                    <li>• Full inspiration — 10 ribs visible</li>
                    <li>• No rotation detected</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2">
            {captured ? (
              <>
                <button
                  onClick={() => navigate('/technician/scan-quality', { state: { ...patient, captured: true } })}
                  className="w-full bg-[#2563EB] text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
                >
                  Validate Quality <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCaptured(false)}
                  className="w-full border border-slate-200 text-slate-600 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retake Image
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/technician/scanner-preparation')}
                className="w-full border border-slate-200 text-slate-600 py-2.5 rounded-xl text-sm hover:bg-slate-50 transition-colors"
              >
                ← Back to Preparation
              </button>
            )}
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
