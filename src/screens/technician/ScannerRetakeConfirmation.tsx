import { useNavigate } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { RotateCcw, AlertTriangle, ChevronRight } from 'lucide-react';

export default function ScannerRetakeConfirmation() {
  const navigate = useNavigate();

  return (
    <WebAppLayout
      role="technician"
      title="Retake Required"
      breadcrumbs={[
        { label: 'Dashboard', path: '/technician/dashboard' },
        { label: 'New Scan' },
        { label: 'Retake' },
      ]}
    >
      <div className="max-w-lg mx-auto py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <AlertTriangle className="w-9 h-9 text-amber-500" />
          </div>
          <h2 className="text-slate-900 text-xl mb-3">Retake Required</h2>
          <p className="text-slate-500 text-sm mb-6">
            The previous image did not meet quality standards. Please ensure proper patient positioning and try again.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-amber-700 mb-2">Quality Issues Detected:</p>
            <ul className="space-y-1 text-xs text-amber-600">
              <li>• Left costophrenic angle partially clipped (field coverage 65%)</li>
              <li>• Inspiration depth suboptimal (8 posterior ribs)</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/technician/scanner')}
              className="flex-1 bg-[#2563EB] text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Retake Scan
            </button>
            <button
              onClick={() => navigate('/technician/upload-to-ai')}
              className="flex-1 border border-slate-200 text-slate-600 py-3.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Accept Anyway
            </button>
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
