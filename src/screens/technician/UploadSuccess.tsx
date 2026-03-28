import { useNavigate } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { CheckCircle, Clock, ArrowRight, Home, Scan } from 'lucide-react';

export default function UploadSuccess() {
  const navigate = useNavigate();

  return (
    <WebAppLayout
      role="technician"
      breadcrumbs={[
        { label: 'Dashboard', path: '/technician/dashboard' },
        { label: 'New Scan' },
        { label: 'Upload Complete' },
      ]}
    >
      <div className="max-w-lg mx-auto py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-11 h-11 text-green-500" />
          </div>
          <h2 className="text-slate-900 text-xl mb-2">Upload Successful!</h2>
          <p className="text-slate-500 text-sm mb-6">
            The chest X-ray has been securely transmitted to the AI analysis engine and queued for radiologist review.
          </p>

          <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left space-y-2">
            {[
              { label: 'Case ID', value: 'CXR-2026-1240', mono: true },
              { label: 'Patient', value: 'John Smith' },
              { label: 'AI Queue Position', value: '#2 of 8 pending' },
              { label: 'Est. AI completion', value: '~8 minutes' },
            ].map((item, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-xs text-slate-500">{item.label}</span>
                <span className={`text-xs font-semibold text-slate-800 ${item.mono ? 'font-mono' : ''}`}>{item.value}</span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6 flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-semibold text-[#2563EB]">What happens next?</p>
              <p className="text-xs text-blue-600 mt-1">
                The AI will analyze the X-ray and generate a report. A radiologist will be notified to review the findings. You can track status in Scan History.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/technician/patient-registration')}
              className="flex-1 bg-[#2563EB] text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Scan className="w-4 h-4" />
              New Scan
            </button>
            <button
              onClick={() => navigate('/technician/dashboard')}
              className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </button>
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
