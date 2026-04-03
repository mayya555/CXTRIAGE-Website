import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { ArrowLeft, Brain, FileText, CheckCircle, Calendar } from 'lucide-react';
import { getPatientHistoryDetail } from '../../lib/api';
import { toast } from 'sonner';

export default function PatientHistoryDetail() {
  const navigate = useNavigate();
  const { id: patientName } = useParams();
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!patientName) return;
      try {
        const storedId = localStorage.getItem('doctorId');
        const doctorId = parseInt(storedId || '0');

        if (!doctorId || isNaN(doctorId) || doctorId <= 0) {
          toast.error('Session expired. Please log in again.');
          navigate('/login');
          return;
        }

        const data = await getPatientHistoryDetail(decodeURIComponent(patientName), doctorId);
        setHistory(data);
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch patient details');
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [patientName]);

  const patient = history[0] || { patient_name: patientName, mrn: '...', patient_age: '...' };

  const scans = history.map(item => ({
    date: new Date(item.created_at).toLocaleDateString(),
    type: 'Chest X-Ray',
    finding: item.diagnosis,
    severity: item.priority,
    id: item.id
  }));

  return (
    <WebAppLayout
      role="doctor"
      title={patient.patient_name}
      subtitle={`MRN: ${patient.mrn} · ${scans.length} total scans`}
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'Patient History', path: '/doctor/patient-history' },
        { label: patient.patient },
      ]}
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* History */}
        <div className="xl:col-span-2 space-y-5">
          {/* Patient Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-[#2563EB]">{(patient.patient_name || 'PN').split(' ').map((n: string) => n[0]).join('')}</span>
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-slate-900 text-xl">{patient.patient_name}</h2>
                <p className="text-slate-500 text-sm">{patient.patient_age}y · MRN: {patient.mrn}</p>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  patient.status === 'Critical' ? 'bg-red-100 text-red-700' :
                  patient.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                  patient.status === 'Stable' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {patient.status}
                </span>
              </div>
            </div>
          </div>

          {/* Scan History */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100">
              <Calendar className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-slate-800">Scan History</h3>
              <span className="ml-auto text-xs text-slate-400">{scans.length} scans</span>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {['Date', 'Scan Type', 'Finding', 'Severity', 'Action'].map((h, i) => (
                    <th key={i} className={`px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide ${i === 4 ? 'text-right' : 'text-left'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scans.map((s) => (
                  <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm text-slate-600 font-mono">{s.date}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-700">{s.type}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-600">{s.finding}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        s.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                        s.severity === 'Medium' ? 'bg-amber-100 text-amber-700' :
                        s.severity === 'Normal' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>{s.severity}</span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => navigate(`/doctor/ai-analysis/${s.id}`)}
                        className="text-[#2563EB] text-xs font-medium hover:underline flex items-center gap-1 ml-auto"
                      >
                        <Brain className="w-3.5 h-3.5" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Latest Findings */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#2563EB]" />
              Latest AI Findings ({scans[0]?.date || '...'})
            </h3>
            <div className="space-y-2">
              <div className="p-4 rounded-xl bg-slate-50">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {patient.ai_findings || 'No detailed findings available for this patient.'}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    Confidence: {patient.ai_confidence}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h4 className="text-sm font-semibold text-slate-700 mb-4">Summary</h4>
            <div className="space-y-3">
              {[
                { label: 'Total Scans', value: scans.length.toString() },
                { label: 'Last Visit', value: scans[0]?.date || 'N/A' },
                { label: 'Latest Dx', value: patient.diagnosis },
                { label: 'Status', value: patient.status },
              ].map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-xs text-slate-400">{item.label}</span>
                  <span className="text-xs font-semibold text-slate-700 text-right max-w-[140px]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => navigate(`/doctor/case/${patient.id}`)}
              className="w-full bg-[#2563EB] text-white py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Brain className="w-4 h-4" /> Latest Case View
            </button>
            <button
              onClick={() => navigate(`/doctor/report-preview/${patient.id}`)}
              className="w-full border border-slate-200 text-slate-600 py-3 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" /> View Report
            </button>
            <button
              onClick={() => navigate('/doctor/patient-history')}
              className="w-full border border-slate-200 text-slate-600 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
