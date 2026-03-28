import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { ArrowLeft, CheckCircle, Clock, User, Calendar, Download, RefreshCw } from 'lucide-react';
import { getScanDetails } from '../../lib/api';

export default function ScanHistoryDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [scan, setScan] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        const data = await getScanDetails(id);
        setScan(data);
      } catch (error) {
        console.error('Failed to fetch scan details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <WebAppLayout role="technician" title="Loading..." subtitle="Fetching scan details">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
          <p className="text-slate-500">Loading scan details...</p>
        </div>
      </WebAppLayout>
    );
  }

  if (!scan) {
    return (
      <WebAppLayout role="technician" title="Not Found" subtitle="Scan record could not be located">
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-slate-500 mb-4">Scan record not found.</p>
          <button onClick={() => navigate('/technician/scan-history')} className="text-blue-600 font-medium">Back to History</button>
        </div>
      </WebAppLayout>
    );
  }

  const dateStr = new Date(scan.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

  return (
    <WebAppLayout
      role="technician"
      title={`Scan — ${scan.patient.full_name}`}
      subtitle={`MRN: ${scan.patient.mrn} · ${dateStr}`}
      breadcrumbs={[
        { label: 'Dashboard', path: '/technician/dashboard' },
        { label: 'Scan History', path: '/technician/scan-history' },
        { label: scan.patient.full_name },
      ]}
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* X-Ray Viewer */}
        <div className="xl:col-span-2 bg-[#050a14] rounded-2xl border border-slate-700 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 bg-[#0a1628] border-b border-slate-700/50">
            <span className="text-slate-300 text-sm font-medium">{scan.patient.full_name} — PA View</span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold rounded-full border border-green-500/30">
                DICOM
              </span>
              <button className="p-1.5 text-slate-400 hover:text-white transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center p-8">
            <div className="w-64 h-80">
              <svg viewBox="0 0 200 260" className="w-full h-full">
                <rect width="200" height="260" fill="#050a14" />
                {[0,1,2,3,4,5,6].map(i => (
                  <g key={i}>
                    <path d={`M 100 ${80 + i*20} Q ${70 - i*2} ${75 + i*20} ${45 - i} ${85 + i*20}`} fill="none" stroke="#c8d8e8" strokeWidth="1.5" opacity="0.85" />
                    <path d={`M 100 ${80 + i*20} Q ${130 + i*2} ${75 + i*20} ${155 + i} ${85 + i*20}`} fill="none" stroke="#c8d8e8" strokeWidth="1.5" opacity="0.85" />
                  </g>
                ))}
                <rect x="96" y="60" width="8" height="180" rx="4" fill="#d0dce8" opacity="0.7" />
                <ellipse cx="88" cy="140" rx="25" ry="30" fill="#8090a8" opacity="0.6" />
                <ellipse cx="62" cy="130" rx="22" ry="38" fill="none" stroke="#a0b8c8" strokeWidth="1.5" opacity="0.7" />
                <ellipse cx="138" cy="130" rx="22" ry="38" fill="none" stroke="#a0b8c8" strokeWidth="1.5" opacity="0.7" />
                {scan.status === 'completed' && (
                  <ellipse cx="138" cy="148" rx="14" ry="17" fill="#ff5050" opacity="0.22" />
                )}
                <path d="M 30 70 Q 40 55 100 50 Q 160 55 170 70" fill="none" stroke="#b0c0d0" strokeWidth="2" opacity="0.6" />
                <path d="M 40 195 Q 100 210 160 195" fill="none" stroke="#a0b0c0" strokeWidth="1.5" opacity="0.6" />
                <text x="4" y="255" fill="#4a6080" fontSize="7">CXRT AI · {scan.patient.mrn}</text>
                <text x="4" y="10" fill="#4a6080" fontSize="7">{dateStr}</text>
              </svg>
            </div>
          </div>
          <div className="px-5 py-3 bg-[#0a1628] border-t border-slate-700/50 flex items-center justify-between">
            <span className="text-slate-500 text-xs">1024 × 1024 px · PA View · 125 kV / 5 mAs</span>
            <span className="text-slate-500 text-xs">4.2 MB</span>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Patient Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-sm font-semibold text-slate-700">Patient Details</h3>
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Name', value: scan.patient.full_name },
                { label: 'Age / Gender', value: `58y / ${scan.patient.gender}` },
                { label: 'MRN', value: scan.patient.mrn, mono: true },
                { label: 'Date of Birth', value: scan.patient.date_of_birth },
                { label: 'Technician', value: 'Sarah Williams' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-xs text-slate-400">{item.label}</span>
                  <span className={`text-xs font-medium text-slate-700 ${item.mono ? 'font-mono' : ''}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-3">
              {scan.status === 'completed'
                ? <CheckCircle className="w-4 h-4 text-green-500" />
                : <Clock className="w-4 h-4 text-amber-500" />
              }
              <h3 className="text-sm font-semibold text-slate-700">AI Finding</h3>
            </div>
            <p className="text-sm font-medium text-slate-800">{scan.quality_check.message}</p>
            <p className="text-xs text-slate-400 mt-1">
              {scan.scan_status === 'Completed' ? 'Scan processed successfully' : 'Processing in progress...'}
            </p>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-[#2563EB]" />
              <h3 className="text-sm font-semibold text-slate-700">Processing Timeline</h3>
            </div>
            <div className="space-y-3">
              {scan.timeline.map((t: any, i: number) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="flex flex-col items-center mt-0.5">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${t.status === 'completed' ? 'bg-green-500' : 'bg-slate-200'}`} />
                    {i < scan.timeline.length - 1 && <div className={`w-px h-5 mt-1 ${t.status === 'completed' ? 'bg-green-200' : 'bg-slate-100'}`} />}
                  </div>
                  <div className="pb-1 flex-1 min-w-0">
                    <p className="text-[10px] text-slate-400 font-mono">{t.timestamp ? new Date(t.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'PENDING'}</p>
                    <p className={`text-xs ${t.status === 'completed' ? 'text-slate-600' : 'text-slate-300'}`}>{t.step} — {t.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={() => navigate(`/technician/scan-history`)}
              className="w-full border border-slate-200 text-slate-600 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to History
            </button>
            {scan.status === 'failed' && (
              <button
                onClick={() => navigate('/technician/scanner')}
                className="w-full bg-[#2563EB] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Schedule Retake
              </button>
            )}
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
