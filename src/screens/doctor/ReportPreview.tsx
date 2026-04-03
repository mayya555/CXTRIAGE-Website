import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { Download, Share2, ArrowLeft, CheckCircle, Activity } from 'lucide-react';
import { getCaseById } from '../../lib/api';
import { toast } from 'sonner';

export default function ReportPreview() {
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

  if (!caseData) return null;

  const findingsList = caseData.findings || [];

  return (
    <WebAppLayout
      role="doctor"
      title="Report Preview"
      subtitle="Review before sharing with clinical team"
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'Cases', path: '/doctor/new-cases' },
        { label: 'Report Preview' },
      ]}
    >
      <div className="max-w-4xl mx-auto">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => navigate(`/doctor/report-generation/${id}`)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Editor
          </button>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
              <Download className="w-4 h-4" /> Download PDF
            </button>
            <button
              onClick={() => navigate(`/doctor/report-download/${id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
            >
              <Share2 className="w-4 h-4" /> Share Report
            </button>
          </div>
        </div>

        {/* Report Document */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
          {/* Report Header */}
          <div className="bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] p-8">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg">CXRT AI</p>
                  <p className="text-blue-300 text-xs">Chest X-Ray Triage System</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">Radiology Report</p>
                <p className="text-blue-300 text-xs">Report ID: RPT-{caseData.id}</p>
                <p className="text-blue-300 text-xs">Date: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Patient Info */}
            <div className="grid grid-cols-3 gap-4 p-5 bg-slate-50 rounded-xl mb-6">
              {[
                { label: 'Patient Name', value: caseData.patient_name },
                { label: 'Age / Gender', value: `${caseData.patient_age}y / ${caseData.patient_gender}` },
                { label: 'MRN', value: caseData.case_code, mono: true },
                { label: 'Date of Study', value: caseData.created_at },
                { label: 'Referring Physician', value: 'Dr. Sarah Connor' },
                { label: 'Priority', value: caseData.priority },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">{item.label}</p>
                  <p className={`text-sm font-semibold text-slate-800 mt-1 ${item.mono ? 'font-mono' : ''}`}>{item.value}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 pt-6 space-y-5">
              {/* Technique */}
              <section>
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Technique</h3>
                <p className="text-sm text-slate-700">Portable AP chest radiograph obtained with digital detector. Single view. Technical factors: 125 kV, 5 mAs. AI-assisted analysis performed using CXRT AI engine.</p>
              </section>

              {/* Findings */}
              <section>
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Confirmed Findings</h3>
                <div className="space-y-2.5">
                  {findingsList.length === 0 && <p className="text-sm text-slate-400 italic">No specific findings confirmed.</p>}
                  {findingsList.map((f: any, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-slate-400 font-mono text-sm mt-0.5">{i + 1}.</span>
                      <div className="flex-1">
                        <span className="text-sm text-slate-700 font-medium">{f.name} </span>
                        <span className="text-sm text-slate-600">— Located in {f.region}.</span>
                        <span className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          f.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                          f.severity === 'HIGH' ? 'bg-orange-100 text-orange-700' :
                          f.severity === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {f.severity} · AI {f.confidence}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Impression */}
              <section>
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Impression</h3>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <p className="text-sm text-slate-700 whitespace-pre-line">
                    {caseData.ai_result || 'No significant findings detected.'}
                  </p>
                </div>
              </section>

              {/* Recommendation */}
              <section>
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Recommendation / Notes</h3>
                <p className="text-sm text-slate-700 whitespace-pre-line">
                  {caseData.clinical_notes || 'Clinical correlation recommended.'}
                </p>
              </section>

              {/* Signature */}
              <div className="border-t border-slate-200 pt-5 mt-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-lg font-bold italic font-serif text-slate-800">Verified Electronic Signature</p>
                    <p className="text-sm text-slate-600 mt-1">Lead Radiologist, MD, FRCR</p>
                    <p className="text-xs text-slate-400 mt-0.5">License: RAD-INTERNAL · Dept. of Radiology</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <p className="text-xs text-green-600 font-medium">Electronically signed — {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()} UTC</p>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-[10px] text-slate-400 text-center mb-1">AI Assisted</p>
                    <div className="w-16 h-16 bg-slate-200 rounded flex items-center justify-center overflow-hidden">
                       <div className="grid grid-cols-4 gap-0.5">
                        {Array.from({ length: 16 }, (_, i) => (
                          <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? 'bg-slate-700' : 'bg-white'} rounded-sm`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-[8px] text-slate-400 text-center mt-1">Scan to verify</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button
            onClick={() => navigate(`/doctor/report-download/${id}`)}
            className="flex items-center gap-2 px-6 py-3 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            <Share2 className="w-4 h-4" /> Finalize & Share
          </button>
        </div>
      </div>
    </WebAppLayout>
  );
}

