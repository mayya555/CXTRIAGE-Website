import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { Download, Mail, Share2, CheckCircle, Copy, ExternalLink, Home } from 'lucide-react';
import { mockCases } from '../../lib/data';

export default function ReportDownloadShare() {
  const navigate = useNavigate();
  const { id } = useParams();
  const caseData = mockCases.find(c => c.id === id) || mockCases[0];
  const [shared, setShared] = useState<Set<string>>(new Set());
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const markShared = (method: string) => setShared(prev => new Set(prev).add(method));

  const handleSendEmail = () => {
    setSent(true);
    markShared('email');
  };

  const shareOptions = [
    { id: 'ehr', label: 'Export to EHR System', sub: 'Epic / Cerner integration', icon: ExternalLink },
    { id: 'pacs', label: 'Send to PACS', sub: 'Picture Archiving System', icon: Share2 },
    { id: 'copy', label: 'Copy Secure Link', sub: 'Expires in 48 hours', icon: Copy },
  ];

  return (
    <WebAppLayout
      role="doctor"
      title="Share & Download Report"
      subtitle="Distribute the finalized report to the clinical team"
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'Report Preview', path: `/doctor/report-preview/${id}` },
        { label: 'Share' },
      ]}
    >
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-5 text-white flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <CheckCircle className="w-7 h-7" />
          </div>
          <div>
            <p className="font-bold text-lg">Report Finalized</p>
            <p className="text-green-100 text-sm mt-0.5">
              {caseData.patient} · {caseData.mrn} · Report ID: RPT-2026-1240
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-green-200 text-xs">Signed by</p>
            <p className="font-bold text-sm">Dr. Michael Chen</p>
          </div>
        </div>

        {/* Download Options */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-slate-800 mb-4">Download Report</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { format: 'PDF', size: '2.4 MB', icon: '📄' },
              { format: 'DOCX', size: '1.8 MB', icon: '📝' },
              { format: 'HL7', size: '45 KB', icon: '🏥' },
              { format: 'FHIR', size: '38 KB', icon: '⚕️' },
            ].map((d) => (
              <button
                key={d.format}
                onClick={() => markShared('download-' + d.format)}
                className={`flex flex-col items-center gap-2 p-4 border-2 rounded-xl transition-all ${
                  shared.has('download-' + d.format)
                    ? 'border-green-300 bg-green-50'
                    : 'border-slate-200 hover:border-[#2563EB] hover:bg-blue-50'
                }`}
              >
                <span className="text-2xl">{d.icon}</span>
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-700">{d.format}</p>
                  <p className="text-xs text-slate-400">{d.size}</p>
                </div>
                {shared.has('download-' + d.format)
                  ? <CheckCircle className="w-4 h-4 text-green-500" />
                  : <Download className="w-4 h-4 text-slate-400" />
                }
              </button>
            ))}
          </div>
        </div>

        {/* Email */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#2563EB]" />
            Email to Physician
          </h3>
          {!sent ? (
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="referring.doctor@hospital.org"
                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]"
              />
              <button
                onClick={handleSendEmail}
                className="px-5 py-2.5 bg-[#2563EB] text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Send
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-sm text-green-700 font-medium">Report sent successfully to {email || 'referring physician'}</p>
            </div>
          )}
        </div>

        {/* Other Share Options */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-slate-800 mb-4">Other Sharing Options</h3>
          <div className="space-y-3">
            {shareOptions.map((opt) => {
              const Icon = opt.icon;
              const isShared = shared.has(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => markShared(opt.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    isShared ? 'border-green-300 bg-green-50' : 'border-slate-200 hover:border-[#2563EB]/30 hover:bg-blue-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isShared ? 'bg-green-100' : 'bg-slate-100'
                  }`}>
                    {isShared
                      ? <CheckCircle className="w-5 h-5 text-green-500" />
                      : <Icon className="w-5 h-5 text-slate-500" />
                    }
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-slate-700">{opt.label}</p>
                    <p className="text-xs text-slate-400">{opt.sub}</p>
                  </div>
                  {isShared && <span className="text-xs font-bold text-green-600">Sent</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Finalize */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/doctor/case-closure/${id}`)}
            className="flex-1 bg-[#2563EB] text-white py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <CheckCircle className="w-4 h-4" /> Close Case
          </button>
          <button
            onClick={() => navigate('/doctor/dashboard')}
            className="flex-1 border border-slate-200 text-slate-600 py-3.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Dashboard
          </button>
        </div>
      </div>
    </WebAppLayout>
  );
}
