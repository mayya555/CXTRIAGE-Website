import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { FileText, CheckCircle, ChevronRight, Edit3, Download } from 'lucide-react';
import { mockCases, mockFindings } from '../../lib/data';

export default function ReportGeneration() {
  const navigate = useNavigate();
  const { id } = useParams();
  const caseData = mockCases.find(c => c.id === id) || mockCases[0];
  const [impression, setImpression] = useState(
    '1. Right lower lobe pneumonia, moderate severity.\n2. Small left pleural effusion.\n3. Cardiomegaly — cardiac silhouette enlarged.\n4. No pneumothorax detected.\n5. No acute bony abnormality.'
  );
  const [recommendation, setRecommendation] = useState(
    'Clinical correlation recommended. Consider repeat CXR in 4–6 weeks after treatment. Cardiology referral for cardiomegaly evaluation.'
  );
  const [reportType, setReportType] = useState('standard');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2000);
  };

  return (
    <WebAppLayout
      role="doctor"
      title="Report Generation"
      subtitle={`Generating clinical report for ${caseData.patient}`}
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'Cases', path: '/doctor/new-cases' },
        { label: 'Report Generation' },
      ]}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Editor */}
        <div className="lg:col-span-2 space-y-5">
          {/* Patient Header */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-[#2563EB]">{caseData.patient.split(' ').map(n=>n[0]).join('')}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800">{caseData.patient}</h3>
              <p className="text-sm text-slate-500">{caseData.age}y · {caseData.gender} · MRN: {caseData.mrn}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Report Date</p>
              <p className="text-sm font-semibold text-slate-700">March 6, 2026</p>
            </div>
          </div>

          {/* Technique */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-slate-800 mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Technique</h3>
            <p className="text-sm text-slate-700">Portable AP chest radiograph. Single view. Digital acquisition. DICOM format. 125 kV / 5 mAs.</p>
          </div>

          {/* AI Findings Table */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-slate-800 mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">AI-Generated Findings</h3>
            <div className="space-y-2">
              {mockFindings.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-xs text-slate-400 w-4 font-mono">{i + 1}.</span>
                  <p className="text-sm text-slate-700 flex-1">{f.name}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    f.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                    f.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                    f.severity === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                  }`}>{f.severity}</span>
                  <span className="text-xs font-bold text-slate-500 w-10 text-right">{f.confidence}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Impression */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-slate-800 text-sm font-semibold uppercase tracking-wide text-slate-500">Impression</h3>
              <Edit3 className="w-4 h-4 text-slate-400" />
            </div>
            <textarea
              value={impression}
              onChange={e => setImpression(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] resize-none text-slate-700 bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Recommendation */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-slate-800 text-sm font-semibold uppercase tracking-wide text-slate-500">Recommendation</h3>
              <Edit3 className="w-4 h-4 text-slate-400" />
            </div>
            <textarea
              value={recommendation}
              onChange={e => setRecommendation(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] resize-none text-slate-700 bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Signature */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">Dr. Michael Chen, MD</p>
                <p className="text-xs text-slate-400">Lead Radiologist · License: RAD-789012</p>
                <p className="text-xs text-slate-400 mt-0.5">Electronically signed — March 6, 2026 at 14:32</p>
              </div>
              <div className="w-16 h-8 border-b-2 border-slate-700">
                <span className="text-slate-700 text-lg italic font-serif">MChen</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Report Settings</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">Report Type</label>
                <select
                  value={reportType}
                  onChange={e => setReportType(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30"
                >
                  <option value="standard">Standard Report</option>
                  <option value="urgent">Urgent Report</option>
                  <option value="preliminary">Preliminary Report</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">Format</label>
                <div className="grid grid-cols-2 gap-2">
                  {['PDF', 'DOCX', 'HL7', 'FHIR'].map(f => (
                    <button key={f} className="py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:border-[#2563EB] hover:text-[#2563EB] transition-colors">
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Include Sections</h4>
            <div className="space-y-2">
              {['AI Heatmap Images', 'Confidence Scores', 'Clinical History', 'QA Metrics'].map((s, i) => (
                <label key={i} className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#2563EB]" />
                  <span className="text-sm text-slate-600">{s}</span>
                </label>
              ))}
            </div>
          </div>

          {generated ? (
            <div className="space-y-2">
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-bold text-green-700">Report Generated!</p>
                  <p className="text-xs text-green-600">Ready for preview and sharing</p>
                </div>
              </div>
              <button
                onClick={() => navigate(`/doctor/report-preview/${id}`)}
                className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
              >
                Preview Report <ChevronRight className="w-4 h-4" />
              </button>
              <button className="w-full border border-slate-200 text-slate-600 py-3 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={generating}
              className={`w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                generating
                  ? 'bg-blue-100 text-[#2563EB] cursor-not-allowed'
                  : 'bg-[#2563EB] text-white hover:bg-blue-700 shadow-md shadow-blue-500/20'
              }`}
            >
              {generating ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#2563EB]/30 border-t-[#2563EB] rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Generate Report
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </WebAppLayout>
  );
}
