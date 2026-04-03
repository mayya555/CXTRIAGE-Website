import { useNavigate, useLocation } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { CheckCircle, ChevronRight, User, Calendar, Scan } from 'lucide-react';

export default function PatientRegistrationConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { patientId, patientName, mrn, urgency, scanType } = location.state || { patientId: 0, patientName: 'N/A', mrn: 'N/A', urgency: 'Routine', scanType: 'PA (Postero-Anterior)' };

  return (
    <WebAppLayout
      role="technician"
      breadcrumbs={[
        { label: 'Dashboard', path: '/technician/dashboard' },
        { label: 'New Scan' },
        { label: 'Confirmation' },
      ]}
    >
      <div className="max-w-2xl mx-auto py-8">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2563EB] to-blue-600 px-8 py-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-white text-xl">Patient Registered Successfully</h2>
            <p className="text-blue-200 text-sm mt-1">Ready to proceed to scanner preparation</p>
          </div>

          {/* Details */}
          <div className="p-8">
            <div className="bg-slate-50 rounded-xl p-5 mb-6 space-y-3">
              {[
                { icon: User, label: 'Patient Name', value: patientName },
                { icon: User, label: 'MRN', value: mrn },
                { icon: Scan, label: 'Scan Type', value: scanType || 'PA (Postero-Anterior)' },
                { icon: CheckCircle, label: 'Urgency', value: urgency || 'Routine' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="text-xs text-slate-500 w-28 flex-shrink-0">{item.label}</span>
                    <span className="text-sm font-medium text-slate-800">{item.value}</span>
                  </div>
                );
              })}
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6">
              <p className="text-sm text-amber-700 font-medium">Next Step</p>
              <p className="text-xs text-amber-600 mt-1">
                Proceed to scanner preparation to calibrate the X-ray equipment before starting the scan.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/technician/scanner-preparation', { state: location.state })}
                className="flex-1 bg-[#2563EB] text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
              >
                Scanner Preparation <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/technician/dashboard')}
                className="flex-1 border border-slate-200 text-slate-600 py-3.5 rounded-xl text-sm hover:bg-slate-50 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
