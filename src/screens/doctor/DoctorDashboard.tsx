import { useNavigate } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import {
  FileText, AlertCircle, Clock, CheckCircle, TrendingUp,
  ArrowRight, Brain, Users, Activity
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getDashboardSummary, getRecentCases, getPriorityCases } from '../../lib/api';
import { toast } from 'sonner';

const priorityConfig = {
  CRITICAL: { color: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500' },
  URGENT: { color: 'bg-orange-100 text-orange-700 border-orange-200', dot: 'bg-orange-500' },
  ROUTINE: { color: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-400' },
};

const caseDistribution = [
  { name: 'Pneumonia', value: 34, color: '#ef4444' },
  { name: 'Cardiomegaly', value: 22, color: '#f97316' },
  { name: 'Effusion', value: 18, color: '#eab308' },
  { name: 'Normal', value: 15, color: '#22c55e' },
  { name: 'Other', value: 11, color: '#6366f1' },
];

const weeklyReviewed = [
  { day: 'Mon', cases: 20, critical: 3 },
  { day: 'Tue', cases: 16, critical: 2 },
  { day: 'Wed', cases: 23, critical: 5 },
  { day: 'Thu', cases: 18, critical: 1 },
  { day: 'Fri', cases: 24, critical: 4 },
  { day: 'Sat', cases: 10, critical: 2 },
  { day: 'Sun', cases: 5, critical: 1 },
];

function SvgDualAreaChart({ data }: { data: { day: string; cases: number; critical: number }[] }) {
  const W = 560; const H = 130; const padL = 28; const padB = 22; const padT = 8; const padR = 8;
  const chartW = W - padL - padR;
  const chartH = H - padB - padT;
  const maxVal = Math.max(...data.map(d => d.cases), 1);
  const pts1 = data.map((d, i) => ({ x: padL + (i / (data.length - 1)) * chartW, y: padT + chartH - (d.cases / maxVal) * chartH }));
  const pts2 = data.map((d, i) => ({ x: padL + (i / (data.length - 1)) * chartW, y: padT + chartH - (d.critical / maxVal) * chartH }));

  const line1 = pts1.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area1 = `${line1} L${pts1[pts1.length - 1].x},${padT + chartH} L${pts1[0].x},${padT + chartH} Z`;
  const line2 = pts2.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const area2 = `${line2} L${pts2[pts2.length - 1].x},${padT + chartH} L${pts2[0].x},${padT + chartH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      {[0, 0.5, 1].map((t, i) => {
        const y = padT + chartH * (1 - t);
        return (
          <g key={`grid-${i}`}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#f1f5f9" strokeWidth={1} />
            <text x={padL - 4} y={y + 3} textAnchor="end" fontSize={9} fill="#94a3b8">{Math.round(maxVal * t)}</text>
          </g>
        );
      })}
      <path d={area1} fill="#2563EB" fillOpacity={0.1} />
      <path d={line1} fill="none" stroke="#2563EB" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      <path d={area2} fill="#ef4444" fillOpacity={0.1} />
      <path d={line2} fill="none" stroke="#ef4444" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {pts1.map((p, i) => <circle key={`d1-${i}`} cx={p.x} cy={p.y} r={3} fill="#2563EB" />)}
      {pts2.map((p, i) => <circle key={`d2-${i}`} cx={p.x} cy={p.y} r={3} fill="#ef4444" />)}
      {data.map((d, i) => (
        <text key={`lbl-${i}`} x={pts1[i].x} y={H - 5} textAnchor="middle" fontSize={9} fill="#94a3b8">{d.day}</text>
      ))}
    </svg>
  );
}

function SvgDonutChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  const cx = 65; const cy = 65; const r = 52; const ri = 34;
  const total = data.reduce((s, d) => s + d.value, 0);
  let angle = -Math.PI / 2;
  const slices = data.map(d => {
    const sweep = (d.value / total) * 2 * Math.PI;
    const start = angle;
    angle += sweep;
    return { ...d, start, sweep };
  });

  function arc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const large = endAngle - startAngle > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  }

  return (
    <svg viewBox="0 0 130 130" className="w-full h-full">
      {slices.map((s, i) => {
        const outerArc = arc(cx, cy, r, s.start, s.start + s.sweep);
        const innerArc = arc(cx, cy, ri, s.start + s.sweep, s.start);
        const path = `${outerArc} L ${cx + ri * Math.cos(s.start + s.sweep)} ${cy + ri * Math.sin(s.start + s.sweep)} ${innerArc} Z`;
        return <path key={`slice-${i}`} d={path} fill={s.color} stroke="white" strokeWidth={1.5} />;
      })}
      <text x={cx} y={cy - 5} textAnchor="middle" fontSize={14} fill="#1e293b" fontWeight="bold">{total}</text>
      <text x={cx} y={cy + 9} textAnchor="middle" fontSize={9} fill="#94a3b8">cases</text>
    </svg>
  );
}

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({ new: 0, critical: 0, in_review: 0, completed: 0 });
  const [recentCases, setRecentCases] = useState<any[]>([]);
  const [priorityCases, setPriorityCases] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedId = localStorage.getItem('doctorId');
        const doctorId = parseInt(storedId || '0');

        if (!doctorId || isNaN(doctorId) || doctorId <= 0) {
          toast.error('Session expired. Please log in again.');
          navigate('/login');
          return;
        }

        const [summary, recent, priority] = await Promise.all([
          getDashboardSummary(),
          getRecentCases(doctorId),
          getPriorityCases(doctorId)
        ]);
        setStatsData(summary);
        setRecentCases(recent.slice(0, 5));
        setPriorityCases(priority.slice(0, 3));
      } catch (error: any) {
        toast.error(error.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [navigate]);

  const stats = [
    { label: 'New Cases', value: statsData.new.toString(), sub: 'Awaiting review', icon: FileText, color: 'text-[#2563EB]', bg: 'bg-blue-50', path: '/doctor/new-cases' },
    { label: 'Critical', value: statsData.critical.toString(), sub: 'Immediate attention', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50', path: '/doctor/critical-alerts' },
    { label: 'In Review', value: statsData.in_review.toString(), sub: 'Currently reviewing', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', path: '/doctor/new-cases' },
    { label: 'Completed Today', value: statsData.completed.toString(), sub: 'Total records', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', path: '/doctor/patient-history' },
  ];

  return (
    <WebAppLayout
      role="doctor"
      title="Clinical Dashboard"
      subtitle="Dr. Michael Chen · Radiology Dept · March 15, 2026"
      breadcrumbs={[{ label: 'Doctor Portal' }, { label: 'Dashboard' }]}
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/50 z-20 flex items-center justify-center backdrop-blur-[1px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2563EB]"></div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <button
              key={i}
              onClick={() => navigate(stat.path)}
              className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 hover:shadow-md hover:border-blue-200 transition-all text-left group"
            >
              <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 leading-tight">{stat.label}</p>
                <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{stat.sub}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#2563EB] group-hover:translate-x-0.5 transition-all" />
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
        {/* Priority Cases */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
            <h3 className="text-slate-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Priority Cases
            </h3>
            <button
              onClick={() => navigate('/doctor/critical-alerts')}
              className="text-xs text-[#2563EB] hover:underline font-medium flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-slate-50 min-h-[100px]">
            {priorityCases.length === 0 && !loading && (
              <div className="p-8 text-center text-slate-400 text-sm italic">No priority cases found</div>
            )}
            {priorityCases.map((c) => {
              const cfg = priorityConfig[c.priority as keyof typeof priorityConfig] || priorityConfig.ROUTINE;
              return (
                <div
                  key={c.id}
                  onClick={() => navigate(`/doctor/case/${c.id}`)}
                  className="px-5 py-4 hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] font-bold text-red-600">
                          {c.patient_name?.split(' ').map((n: any) => n[0]).join('') || 'P'}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-slate-800">{c.patient_name}</p>
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold border ${cfg.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {c.priority}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{c.patient_age}y · MRN {c.case_code}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{c.ai_result || 'Awaiting Analysis'}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-[10px] text-slate-400 mb-1.5">{c.created_at}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: `${c.ai_confidence || 0}%` }} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{c.ai_confidence || 0}%</span>
                      </div>
                      <p className="text-[9px] text-slate-400 mt-0.5">AI Confidence</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h3 className="text-slate-800 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#2563EB]" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                { label: 'Review New Cases', sub: `${statsData.new} cases pending`, path: '/doctor/new-cases', icon: FileText, primary: true },
                { label: 'Critical Alerts', sub: `${statsData.critical} urgent cases`, path: '/doctor/critical-alerts', icon: AlertCircle, warn: true },
                { label: 'Patient History', sub: 'Search records', path: '/doctor/patient-history', icon: Users, primary: false },
              ].map((action, i) => {
                const Icon = action.icon;
                return (
                  <button
                    key={i}
                    onClick={() => navigate(action.path)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all group text-left ${
                      action.primary ? 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                        : action.warn ? 'border-red-200 bg-red-50 hover:bg-red-100'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${action.primary ? 'text-[#2563EB]' : action.warn ? 'text-red-500' : 'text-slate-500'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-700">{action.label}</p>
                      <p className="text-[10px] text-slate-400">{action.sub}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#2563EB]" />
              Weekly Case Reviews
            </h3>
            <span className="text-xs text-slate-400">Last 7 days</span>
          </div>
          <div className="h-36">
            <SvgDualAreaChart data={weeklyReviewed} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-slate-800 flex items-center gap-2">
              <Brain className="w-4 h-4 text-[#2563EB]" />
              Findings Mix
            </h3>
            <span className="text-xs text-slate-400">This month</span>
          </div>
          <div className="h-32 w-32 mx-auto">
            <SvgDonutChart data={caseDistribution} />
          </div>
        </div>
      </div>

      {/* All Cases Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <h3 className="text-slate-800 flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#2563EB]" />
            Recent Cases
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Patient', 'Code', 'Finding', 'Priority', 'AI Score', 'Action'].map((h, i) => (
                  <th key={i} className={`px-4 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide text-left`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentCases.map((c) => {
                const cfg = priorityConfig[c.priority as keyof typeof priorityConfig] || priorityConfig.ROUTINE;
                return (
                  <tr
                    key={c.id}
                    onClick={() => navigate(`/doctor/case/${c.id}`)}
                    className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-[9px] font-bold text-[#2563EB]">{c.patient_name?.split(' ').map((n: any) => n[0]).join('') || 'P'}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{c.patient_name}</p>
                          <p className="text-[11px] text-slate-400">{c.patient_age}y</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-[11px] text-slate-500 font-mono">{c.case_code}</td>
                    <td className="px-4 py-3.5 text-xs text-slate-600 max-w-[150px] truncate">{c.ai_result || 'Pending'}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold border ${cfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {c.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[11px] font-bold text-slate-700">{c.ai_confidence || 0}%</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <button className="text-[#2563EB] text-xs font-medium hover:underline flex items-center gap-1">
                        <Brain className="w-3.5 h-3.5" /> Review
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </WebAppLayout>
  );
}