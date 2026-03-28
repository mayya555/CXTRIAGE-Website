import { useNavigate, useParams } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { Download, Share2, ArrowLeft, CheckCircle, Activity } from 'lucide-react';
import { mockCases, mockFindings } from '../../lib/data';

export default function ReportPreview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const caseData = mockCases.find(c => c.id === id) || mockCases[0];

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
                <p className="text-blue-300 text-xs">Report ID: RPT-2026-1240</p>
                <p className="text-blue-300 text-xs">Date: March 6, 2026</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Patient Info */}
            <div className="grid grid-cols-3 gap-4 p-5 bg-slate-50 rounded-xl mb-6">
              {[
                { label: 'Patient Name', value: caseData.patient },
                { label: 'Age / Gender', value: `${caseData.age}y / ${caseData.gender}` },
                { label: 'MRN', value: caseData.mrn, mono: true },
                { label: 'Date of Study', value: caseData.date },
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
                <p className="text-sm text-slate-700">Portable AP chest radiograph obtained with digital detector. Single view. Technical factors: 125 kV, 5 mAs. AI-assisted analysis performed using CXRT AI v3.2 (Confidence threshold: 60%).</p>
              </section>

              {/* Findings */}
              <section>
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Findings</h3>
                <div className="space-y-2.5">
                  {mockFindings.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-slate-400 font-mono text-sm mt-0.5">{i + 1}.</span>
                      <div className="flex-1">
                        <span className="text-sm text-slate-700 font-medium">{f.name} </span>
                        <span className="text-sm text-slate-600">— Located in {f.region}.</span>
                        <span className={`ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          f.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                          f.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                          f.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
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
                  <ol className="space-y-1.5 text-sm text-slate-700">
                    <li>1. Right lower lobe pneumonia, moderate severity.</li>
                    <li>2. Small left pleural effusion.</li>
                    <li>3. Cardiomegaly — cardiac silhouette enlarged.</li>
                    <li>4. No pneumothorax detected.</li>
                    <li>5. No acute bony abnormality.</li>
                  </ol>
                </div>
              </section>

              {/* Recommendation */}
              <section>
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Recommendation</h3>
                <p className="text-sm text-slate-700">
                  Clinical correlation recommended. Consider repeat CXR in 4–6 weeks after treatment. Cardiology referral for cardiomegaly evaluation.
                </p>
              </section>

              {/* Signature */}
              <div className="border-t border-slate-200 pt-5 mt-6">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-lg font-bold italic font-serif text-slate-800">Dr. Michael Chen</p>
                    <p className="text-sm text-slate-600 mt-1">Lead Radiologist, MD, FRCR</p>
                    <p className="text-xs text-slate-400 mt-0.5">License: RAD-789012 · Dept. of Radiology</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <p className="text-xs text-green-600 font-medium">Electronically signed — March 6, 2026 at 14:32 UTC</p>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-[10px] text-slate-400 text-center mb-1">AI Assisted</p>
                    <div className="w-16 h-16 bg-slate-200 rounded flex items-center justify-center">
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
