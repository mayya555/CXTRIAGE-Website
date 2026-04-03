import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { CheckCircle, Home, FileText, Users, AlertCircle } from 'lucide-react';
import { getCaseById } from '../../lib/api';
import { toast } from 'sonner';

export default function FinalCaseClosure() {
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
      <WebAppLayout role="doctor" title="Loading..." breadcrumbs={[]}>
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

  return (
    <WebAppLayout
      role="doctor"
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'Case Closure' },
      ]}
    >
      <div className="max-w-lg mx-auto py-8">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-10 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-white text-2xl font-bold">Case Successfully Closed</h2>
            <p className="text-green-100 text-sm mt-2 font-medium">
              The case has been reviewed, diagnosed, and the report has been committed to the medical record.
            </p>
          </div>

          <div className="p-8">
            <div className="bg-slate-50 rounded-xl p-5 mb-6 space-y-3.5">
              {[
                { label: 'Patient Name', value: caseData.patient_name },
                { label: 'MRN', value: caseData.case_code, mono: true },
                { label: 'Status', value: caseData.status },
                { label: 'Closure Date', value: new Date().toLocaleString() },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</span>
                  <span className={`text-sm font-bold text-slate-800 ${item.mono ? 'font-mono' : ''}`}>{item.value}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl mb-6">
              <p className="text-xs text-blue-600 leading-relaxed font-medium">
                <span className="font-bold">Audit Log:</span> This case action has been recorded. The final report is now accessible via the patient's EHR and has been shared with the referring physician.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/doctor/dashboard')}
                className="w-full bg-[#2563EB] text-white py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                <Home className="w-4 h-4" /> Back to Dashboard
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => navigate('/doctor/new-cases')} 
                  className="border border-slate-200 text-slate-600 py-3 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" /> New Cases
                </button>
                <button 
                  onClick={() => navigate('/doctor/patient-history')} 
                  className="border border-slate-200 text-slate-600 py-3 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
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
