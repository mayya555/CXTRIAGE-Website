import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { Search, Filter, CheckCircle, Clock, AlertCircle, ChevronRight, Download } from 'lucide-react';
import { getScanHistory } from '../../lib/api';

const statusConfig = {
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  processing: { label: 'Processing', color: 'bg-amber-100 text-amber-700', icon: Clock },
  pending: { label: 'Pending', color: 'bg-slate-100 text-slate-600', icon: Clock },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-700', icon: AlertCircle },
  'retake required': { label: 'Retake', color: 'bg-red-100 text-red-700', icon: AlertCircle },
  'started': { label: 'Started', color: 'bg-blue-100 text-blue-700', icon: Clock },
};

export default function ScanHistoryList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [scans, setScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const technicianId = parseInt(localStorage.getItem('technicianId') || '1');
        const data = await getScanHistory(technicianId);
        setScans(data);
      } catch (error) {
        console.error('Failed to fetch scan history', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filtered = scans.filter((s: any) => {
    const matchSearch = s.patient_name.toLowerCase().includes(search.toLowerCase()) || s.mrn.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || s.status.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <WebAppLayout
      role="technician"
      title="Scan History"
      subtitle={`${scans.length} total scans · Showing ${filtered.length} results`}
      breadcrumbs={[
        { label: 'Dashboard', path: '/technician/dashboard' },
        { label: 'Scan History' },
      ]}
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient name or MRN..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] bg-white"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'completed', 'processing', 'pending', 'failed'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                statusFilter === s ? 'bg-[#2563EB] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:border-slate-300 transition-all">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total', value: scans.length, color: 'text-slate-700' },
          { label: 'Completed', value: scans.filter((s: any) => s.status.toLowerCase() === 'completed').length, color: 'text-green-600' },
          { label: 'Processing', value: scans.filter((s: any) => s.status.toLowerCase() === 'processing').length, color: 'text-amber-600' },
          { label: 'Failed', value: scans.filter((s: any) => s.status.toLowerCase() === 'failed').length, color: 'text-red-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 px-4 py-3 text-center">
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Patient</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">MRN</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">AI Finding</th>
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Technician</th>
                <th className="text-right px-6 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400 text-sm">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2" />
                    Loading history...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400 text-sm">
                    No scans match your search criteria
                  </td>
                </tr>
              ) : (
                filtered.map((scan) => {
                  const statusKey = scan.status.toLowerCase();
                  const cfg = statusConfig[statusKey as keyof typeof statusConfig] || statusConfig.pending;
                  const StatusIcon = cfg.icon;
                  const dateStr = new Date(scan.created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
                  
                  return (
                    <tr
                      key={scan.scan_id}
                      className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/technician/scan-history/${scan.scan_id}`)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-[#2563EB]">
                              {scan.patient_name.split(' ').map((n: string) => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">{scan.patient_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 font-mono">{scan.scan_id}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{dateStr}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {cfg.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{scan.ai_finding || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{scan.technician_name || 'N/A'}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="inline-flex items-center gap-1 text-[#2563EB] text-xs font-medium hover:underline">
                          View <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </WebAppLayout>
  );
}
