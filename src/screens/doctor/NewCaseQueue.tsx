import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { Search, Brain, FileText, AlertCircle, Clock, ChevronRight, Filter } from 'lucide-react';
import { getRecentCases } from '../../lib/api';
import { toast } from 'sonner';

const priorityConfig = {
  CRITICAL: { color: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500' },
  URGENT: { color: 'bg-orange-100 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
  ROUTINE: { color: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-400' },
};

export default function NewCaseQueue() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState('all');
  const [view, setView] = useState<'table' | 'cards'>('table');
  const [cases, setCases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const storedId = localStorage.getItem('doctorId');
        const doctorId = parseInt(storedId || '0');

        if (!doctorId || isNaN(doctorId) || doctorId <= 0) {
          toast.error('Session expired. Please log in again.');
          navigate('/login');
          return;
        }

        const data = await getRecentCases(doctorId);
        setCases(data);
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch cases');
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, [navigate]);

  const filtered = cases.filter(c => {
    const patientName = c.patient_name || '';
    const caseCode = c.case_code || '';
    const matchSearch = patientName.toLowerCase().includes(search.toLowerCase()) || caseCode.toLowerCase().includes(search.toLowerCase());
    const matchPriority = priority === 'all' || (c.priority || '').toLowerCase() === priority;
    return matchSearch && matchPriority;
  });

  return (
    <WebAppLayout
      role="doctor"
      title="Case Queue"
      subtitle={`${cases.filter(c => (c.status || '').toLowerCase() === 'new').length} new cases awaiting review`}
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'Case Queue' },
      ]}
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/50 z-20 flex items-center justify-center backdrop-blur-[1px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2563EB]"></div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search patient or MRN..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] bg-white"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'critical', 'urgent', 'routine'].map(p => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                priority === p ? 'bg-[#2563EB] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
          <button onClick={() => setView('table')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === 'table' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-400'}`}>Table</button>
          <button onClick={() => setView('cards')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === 'cards' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-400'}`}>Cards</button>
        </div>
      </div>

      {!loading && filtered.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <h3 className="text-slate-900 font-semibold mb-1">No cases found</h3>
          <p className="text-slate-500 text-sm">No cases match your current filters or search criteria.</p>
        </div>
      )}

      {filtered.length > 0 && (
        view === 'table' ? (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    {['Patient', 'Code', 'Finding', 'Priority', 'AI Confidence', 'Date', 'Status', 'Actions'].map((h, i) => (
                      <th key={i} className={`px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wide ${i === 7 ? 'text-right' : 'text-left'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => {
                    const cfg = priorityConfig[c.priority as keyof typeof priorityConfig] || priorityConfig.ROUTINE;
                    return (
                      <tr
                        key={c.id}
                        className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => navigate(`/doctor/case/${c.id}`)}
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-[#2563EB]">{c.patient_name?.split(' ').map((n:any)=>n[0]).join('') || 'P'}</span>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{c.patient_name}</p>
                              <p className="text-xs text-slate-400">{c.patient_age}y</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-xs text-slate-500 font-mono">{c.case_code}</td>
                        <td className="px-5 py-4 text-sm text-slate-600 max-w-[160px]">
                          <p className="truncate">{c.ai_result || 'Awaiting Analysis'}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${cfg.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {c.priority}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${c.ai_confidence >= 85 ? 'bg-red-500' : c.ai_confidence >= 70 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${c.ai_confidence || 0}%` }} />
                            </div>
                            <span className="text-xs font-bold text-slate-700">{c.ai_confidence || 0}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-xs text-slate-500">{c.created_at}</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                            (c.status || '').toLowerCase() === 'new' ? 'bg-blue-50 text-blue-700'
                              : (c.status || '').toLowerCase() === 'in_review' ? 'bg-amber-50 text-amber-700'
                              : 'bg-green-50 text-green-700'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={(e) => { e.stopPropagation(); navigate(`/doctor/ai-analysis/${c.id}`); }}
                              className="flex items-center gap-1 px-2.5 py-1.5 bg-[#2563EB] text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors"
                            >
                              <Brain className="w-3.5 h-3.5" /> AI
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); navigate(`/doctor/case/${c.id}`); }}
                              className="flex items-center gap-1 px-2.5 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((c) => {
              const cfg = priorityConfig[c.priority as keyof typeof priorityConfig] || priorityConfig.ROUTINE;
              return (
                <div
                  key={c.id}
                  onClick={() => navigate(`/doctor/case/${c.id}`)}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-200 cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-[#2563EB]">{c.patient_name?.split(' ').map((n:any)=>n[0]).join('') || 'P'}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{c.patient_name}</p>
                        <p className="text-xs text-slate-400">{c.patient_age}y</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${cfg.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {c.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">{c.ai_result || 'Awaiting Analysis'}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${c.ai_confidence >= 85 ? 'bg-red-500' : c.ai_confidence >= 70 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${c.ai_confidence || 0}%` }} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{c.ai_confidence || 0}%</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/doctor/ai-analysis/${c.id}`); }}
                      className="flex-1 bg-[#2563EB] text-white py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 hover:bg-blue-700 transition-colors"
                    >
                      <Brain className="w-3.5 h-3.5" /> AI Analysis
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/doctor/case/${c.id}`); }}
                      className="px-3 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      )}
    </WebAppLayout>
  );
}

