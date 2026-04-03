import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { CheckCircle, XCircle, AlertTriangle, ChevronRight, RotateCcw } from 'lucide-react';

const qualityChecks = [
  { id: 'exposure', label: 'Exposure Level', score: 92, status: 'good', desc: 'Optimal — lung markings clearly visible' },
  { id: 'positioning', label: 'Patient Positioning', score: 88, status: 'good', desc: 'Symmetrical — clavicles equidistant from spine' },
  { id: 'inspiration', label: 'Inspiration Depth', score: 78, status: 'warn', desc: 'Acceptable — 9 posterior ribs visible' },
  { id: 'motion', label: 'Motion Artifact', score: 95, status: 'good', desc: 'Minimal — sharp diaphragm edges' },
  { id: 'rotation', label: 'Image Rotation', score: 91, status: 'good', desc: 'None detected — <1° deviation' },
  { id: 'coverage', label: 'Field Coverage', score: 65, status: 'warn', desc: 'Partial — left costophrenic angle clipped' },
];

export default function ScanQualityValidation() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state || { patientId: 1, patientName: 'John Smith', mrn: 'MRN-001240', scanId: 1, selectedFile: null };
  const selectedFile = location.state?.selectedFile;
  
  const [decision, setDecision] = useState<'accept' | 'retake' | null>(null);

  const overallScore = Math.round(qualityChecks.reduce((s, c) => s + c.score, 0) / qualityChecks.length);
  const hasWarnings = qualityChecks.some(c => c.status === 'warn');

  return (
    <WebAppLayout
      role="technician"
      title="Scan Quality Validation"
      subtitle="Review AI-generated quality metrics before submitting"
      breadcrumbs={[
        { label: 'Dashboard', path: '/technician/dashboard' },
        { label: 'New Scan' },
        { label: 'Quality Validation' },
      ]}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quality Checks */}
        <div className="lg:col-span-2 space-y-4">
          {/* Overall Score */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-800">Overall Quality Score</h3>
              <div className="flex items-center gap-2">
                {hasWarnings
                  ? <AlertTriangle className="w-5 h-5 text-amber-500" />
                  : <CheckCircle className="w-5 h-5 text-green-500" />
                }
                <span className={`text-2xl font-bold ${overallScore >= 85 ? 'text-green-600' : overallScore >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                  {overallScore}%
                </span>
              </div>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${overallScore >= 85 ? 'bg-green-500' : overallScore >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                style={{ width: `${overallScore}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {overallScore >= 85 ? 'Excellent image quality — safe to submit for AI analysis' :
               overallScore >= 70 ? 'Acceptable quality with minor concerns — review warnings' :
               'Poor quality — retake recommended for accurate diagnosis'}
            </p>
          </div>

          {/* Individual Checks */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-slate-800 mb-4">Quality Metrics</h3>
            <div className="space-y-4">
              {qualityChecks.map((check) => (
                <div key={check.id} className={`p-4 rounded-xl border ${
                  check.status === 'good' ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {check.status === 'good'
                        ? <CheckCircle className="w-4 h-4 text-green-500" />
                        : <AlertTriangle className="w-4 h-4 text-amber-500" />
                      }
                      <span className={`text-sm font-medium ${check.status === 'good' ? 'text-green-800' : 'text-amber-800'}`}>
                        {check.label}
                      </span>
                    </div>
                    <span className={`text-sm font-bold ${check.status === 'good' ? 'text-green-700' : 'text-amber-700'}`}>
                      {check.score}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${check.status === 'good' ? 'bg-green-400' : 'bg-amber-400'}`}
                      style={{ width: `${check.score}%` }}
                    />
                  </div>
                  <p className={`text-xs mt-2 ${check.status === 'good' ? 'text-green-600' : 'text-amber-600'}`}>
                    {check.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          {/* X-ray Thumbnail */}
          <div className="bg-[#050a14] rounded-xl border border-slate-700 p-4">
            <p className="text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wide">Captured Image</p>
            <div className="aspect-square bg-[#0a1628] rounded-lg flex items-center justify-center overflow-hidden border border-slate-700/50">
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Quality Review"
                  className="w-full h-full object-cover opacity-80"
                />
              ) : (
                <svg viewBox="0 0 200 200" className="w-full h-full opacity-80">
                  <rect width="200" height="200" fill="#050a14" />
                  {[0,1,2,3,4,5].map(i => (
                    <g key={i}>
                      <path d={`M 100 ${55 + i*18} Q ${72} ${52 + i*18} ${42} ${62 + i*18}`} fill="none" stroke="#c8d8e8" strokeWidth="1.2" opacity="0.8" />
                      <path d={`M 100 ${55 + i*18} Q ${128} ${52 + i*18} ${158} ${62 + i*18}`} fill="none" stroke="#c8d8e8" strokeWidth="1.2" opacity="0.8" />
                    </g>
                  ))}
                  <rect x="96" y="45" width="8" height="140" rx="4" fill="#d0dce8" opacity="0.6" />
                  <ellipse cx="86" cy="105" rx="20" ry="25" fill="#8090a8" opacity="0.5" />
                  <ellipse cx="55" cy="100" rx="18" ry="32" fill="none" stroke="#a0b8c8" strokeWidth="1.2" opacity="0.6" />
                  <ellipse cx="145" cy="100" rx="18" ry="32" fill="none" stroke="#a0b8c8" strokeWidth="1.2" opacity="0.6" />
                  <ellipse cx="145" cy="115" rx="11" ry="14" fill="#ff6060" opacity="0.2" />
                </svg>
              )}
            </div>
            <p className="text-slate-500 text-[10px] text-center mt-2">{patient.patientName} · PA View · {new Date().toISOString().split('T')[0]}</p>
          </div>

          {/* Decision */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Quality Decision</h4>
            <div className="space-y-2 mb-4">
              <button
                onClick={() => setDecision('accept')}
                className={`w-full p-3.5 rounded-xl border-2 flex items-center gap-3 transition-all ${
                  decision === 'accept' ? 'border-green-400 bg-green-50' : 'border-slate-200 hover:border-green-200'
                }`}
              >
                <CheckCircle className={`w-5 h-5 ${decision === 'accept' ? 'text-green-500' : 'text-slate-300'}`} />
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-700">Accept & Upload</p>
                  <p className="text-xs text-slate-400">Send for AI analysis</p>
                </div>
              </button>
              <button
                onClick={() => setDecision('retake')}
                className={`w-full p-3.5 rounded-xl border-2 flex items-center gap-3 transition-all ${
                  decision === 'retake' ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-red-200'
                }`}
              >
                <RotateCcw className={`w-5 h-5 ${decision === 'retake' ? 'text-red-500' : 'text-slate-300'}`} />
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-700">Retake Scan</p>
                  <p className="text-xs text-slate-400">Capture a new image</p>
                </div>
              </button>
            </div>
            <button
              onClick={() => {
                if (decision === 'accept') navigate('/technician/upload-to-ai', { state: { ...location.state, selectedFile } });
                if (decision === 'retake') navigate('/technician/scanner', { state: location.state });
              }}
              disabled={!decision}
              className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                decision
                  ? 'bg-[#2563EB] text-white hover:bg-blue-700'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {decision === 'accept' ? 'Proceed to Upload' : decision === 'retake' ? 'Go to Retake' : 'Select a Decision'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
