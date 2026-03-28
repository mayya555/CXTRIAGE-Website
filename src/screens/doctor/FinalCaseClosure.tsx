import { useNavigate, useParams } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { CheckCircle, Home, FileText, Users } from 'lucide-react';
import { mockCases } from '../../lib/data';

export default function FinalCaseClosure() {
  const navigate = useNavigate();
  const { id } = useParams();
  const caseData = mockCases.find(c => c.id === id) || mockCases[0];

  return (
    <WebAppLayout
      role="doctor"
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'Case Closure' },
      ]}
    >
      <div className="max-w-lg mx-auto py-8">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-white text-xl">Case Successfully Closed</h2>
            <p className="text-green-100 text-sm mt-2">
              The case has been reviewed, diagnosed, and the report has been shared with the clinical team.
            </p>
          </div>

          <div className="p-8">
            <div className="bg-slate-50 rounded-xl p-5 mb-6 space-y-3">
              {[
                { label: 'Patient', value: caseData.patient },
                { label: 'Case ID', value: caseData.mrn, mono: true },
                { label: 'Final Diagnosis', value: caseData.finding },
                { label: 'Closed By', value: 'Dr. Michael Chen' },
                { label: 'Closure Date', value: 'March 6, 2026 · 14:45' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-xs text-slate-400">{item.label}</span>
                  <span className={`text-xs font-semibold text-slate-800 ${item.mono ? 'font-mono' : ''}`}>{item.value}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6">
              <p className="text-xs text-blue-600">
                All actions have been logged for audit. The report has been sent to the referring physician and filed in the EHR system.
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => navigate('/doctor/dashboard')}
                className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <Home className="w-4 h-4" /> Back to Dashboard
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => navigate('/doctor/new-cases')} className="border border-slate-200 text-slate-600 py-3 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" /> New Cases
                </button>
                <button onClick={() => navigate('/doctor/patient-history')} className="border border-slate-200 text-slate-600 py-3 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" /> History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
