import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { Search, ChevronRight, Users, Filter, Download } from 'lucide-react';
import { getPatientHistory } from '../../lib/api';
import { toast } from 'sonner';

export default function PatientHistoryList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const storedId = localStorage.getItem('doctorId');
        const doctorId = parseInt(storedId || '0');

        if (!doctorId || isNaN(doctorId) || doctorId <= 0) {
          toast.error('Session expired. Please log in again.');
          navigate('/login');
          return;
        }

        const data = await getPatientHistory(doctorId);
        
        // Group by patient name or MRN to show unique patients
        const grouped: Record<string, any> = {};
        data.forEach((item: any) => {
          const key = item.mrn || item.patient_name;
          if (!grouped[key]) {
            grouped[key] = {
              id: item.id,
              patient: item.patient_name,
              mrn: item.mrn,
              age: item.patient_age,
              lastVisit: new Date(item.created_at).toLocaleDateString(),
              totalScans: 1,
              diagnosis: item.final_diagnosis || item.diagnosis,
              status: item.priority,
            };
          } else {
            grouped[key].totalScans += 1;
            // Update last visit if newer
            if (new Date(item.created_at) > new Date(grouped[key].lastVisit)) {
              grouped[key].lastVisit = new Date(item.created_at).toLocaleDateString();
              grouped[key].diagnosis = item.final_diagnosis || item.diagnosis;
            }
          }
        });
        
        setPatients(Object.values(grouped));
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch patient history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filtered = patients.filter(p => {
    const matchSearch = (p.patient || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.mrn || '').toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || (p.status || '').toLowerCase() === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusColors = {
    Active: 'bg-blue-100 text-blue-700',
    Critical: 'bg-red-100 text-red-700',
    Stable: 'bg-green-100 text-green-700',
    Discharged: 'bg-slate-100 text-slate-600',
  };

  return (
    <WebAppLayout
      role="doctor"
      title="Patient History"
      subtitle={`${patients.length} patients in your care history`}
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'Patient History' },
      ]}
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by patient name or MRN..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] bg-white"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'active', 'critical', 'stable', 'discharged'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold capitalize transition-all ${
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

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100">
          <Users className="w-4 h-4 text-[#2563EB]" />
          <h3 className="text-slate-800">All Patients</h3>
          <span className="ml-auto text-xs text-slate-400">{filtered.length} results</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Patient', 'MRN', 'Last Visit', 'Total Scans', 'Latest Diagnosis', 'Status', 'Action'].map((h, i) => (
                  <th key={i} className={`px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide ${i === 6 ? 'text-right' : 'text-left'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  onClick={() => navigate(`/doctor/patient-history/${encodeURIComponent(p.patient)}`)}
                  className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[9px] font-bold text-[#2563EB]">{(p.patient || 'P').split(' ').map((n: string) => n[0]).join('')}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{p.patient}</p>
                        <p className="text-[11px] text-slate-400">{p.age}y</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500 font-mono">{p.mrn}</td>
                  <td className="px-5 py-4 text-sm text-slate-500">{p.lastVisit}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${Math.min(p.totalScans * 12, 100)}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{p.totalScans}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600 max-w-[180px]">
                    <p className="truncate">{p.diagnosis}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${statusColors[p.status as keyof typeof statusColors] || 'bg-slate-100 text-slate-600'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="inline-flex items-center gap-1 text-[#2563EB] text-xs font-medium hover:underline">
                      View <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </WebAppLayout>
  );
}