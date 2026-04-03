import { useNavigate, useLocation } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { CheckCircle, Clock, ArrowRight, Home, Scan, User, Brain, Send, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getDoctors, createStudy, distributeStudy } from '../../lib/api';
import { toast } from 'sonner';

export default function UploadSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state || { patientId: 1, patientName: 'John Smith', mrn: 'MRN-001240', scanId: 1, doctorId: 1 };
  const analysis = location.state?.analysis || { disease: 'Pending...', confidence: 0 };
  
  const [doctors, setDoctors] = useState<any[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState<number>(patient.doctorId || 1);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        console.error('Failed to fetch doctors', error);
      }
    };
    fetchDoctors();
  }, []);

  const handleSendToDoctor = async () => {
    setSending(true);
    try {
      // 1. Create clinical study
      const studyResponse = await createStudy(patient.scanId, selectedDoctorId);
      
      // 2. Distribute to AI & Doctor dash
      await distributeStudy(studyResponse.study_id);
      
      setSent(true);
      toast.success('Case successfully sent to doctor');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send case to doctor');
    } finally {
      setSending(false);
    }
  };

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

          <div className="bg-slate-50 rounded-xl p-6 mb-6 text-left space-y-4 border border-slate-100">
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">AI Condition Analysis</p>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-100">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  analysis.disease?.toLowerCase() === 'normal' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-sm font-bold ${
                    analysis.disease?.toLowerCase() === 'normal' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {analysis.disease || 'Analysis Complete'}
                  </p>
                  <p className="text-[10px] text-slate-500">Confidence: {analysis.confidence}%</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Patient Name', value: patient.patientName },
                { label: 'MRN', value: patient.mrn },
                { label: 'Case ID', value: `CXR-${analysis.case_id || '2026-1240'}`, mono: true },
                { label: 'Status', value: 'Ready to Send' },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[10px] text-slate-400">{item.label}</p>
                  <p className={`text-xs font-semibold text-slate-800 ${item.mono ? 'font-mono' : ''}`}>{item.value}</p>
                </div>
              ))}
            </div>

            {!sent && (
              <div className="pt-4 border-t border-slate-200">
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Assign to Radiologist</p>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={selectedDoctorId}
                      onChange={(e) => setSelectedDoctorId(parseInt(e.target.value))}
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none"
                    >
                      {doctors.map((dr) => (
                        <option key={dr.doctor_id} value={dr.doctor_id}>
                          {dr.name} (ID: {dr.doctor_id})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {sent ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl mb-6 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-semibold text-green-700">Successfully Sent!</p>
                <p className="text-xs text-green-600 mt-1">
                  The case has been distributed to {doctors.find(d => d.doctor_id === selectedDoctorId)?.name}'s dashboard for final review.
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={handleSendToDoctor}
              disabled={sending}
              className="w-full mb-6 bg-[#2563EB] text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-70"
            >
              {sending ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send to Doctor for Review
                </>
              )}
            </button>
          )}

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
