import { useNavigate } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import {
  Camera, CheckCircle, Clock, AlertCircle, TrendingUp,
  Plus, ArrowRight, Activity, Users, Scan, BarChart3
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getTechnicianDashboard, getScanHistory } from '../../lib/api';
import { toast } from 'sonner';

const statusConfig = {
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700', icon: CheckCircle, dot: 'bg-green-500' },
  processing: { label: 'Processing', color: 'bg-amber-100 text-amber-700', icon: Clock, dot: 'bg-amber-500' },
  pending: { label: 'Pending', color: 'bg-slate-100 text-slate-600', icon: Clock, dot: 'bg-slate-400' },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-700', icon: AlertCircle, dot: 'bg-red-500' },
};

const weeklyData = [
  { day: 'Mon', scans: 14, completed: 12 },
  { day: 'Tue', scans: 11, completed: 10 },
  { day: 'Wed', scans: 16, completed: 14 },
  { day: 'Thu', scans: 9, completed: 8 },
  { day: 'Fri', scans: 18, completed: 16 },
  { day: 'Sat', scans: 7, completed: 6 },
  { day: 'Sun', scans: 3, completed: 3 },
];

const todayHourly = [
  { time: '07h', scans: 1 },
  { time: '08h', scans: 2 },
  { time: '09h', scans: 3 },
  { time: '10h', scans: 2 },
  { time: '11h', scans: 1 },
  { time: '12h', scans: 0 },
  { time: '13h', scans: 1 },
  { time: '14h', scans: 2 },
  { time: '15h', scans: 0 },
];

// Pure SVG bar chart — no Recharts, no internal key collisions
function SvgBarChart({ data }: { data: typeof weeklyData }) {
  const W = 560; const H = 140; const padL = 28; const padB = 24; const padT = 8; const padR = 8;
  const chartW = W - padL - padR;
  const chartH = H - padB - padT;
  const maxVal = Math.max(...data.map(d => d.scans));
  const groupW = chartW / data.length;
  const barW = Math.floor(groupW * 0.35);
  const gap = 3;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const y = padT + chartH * (1 - t);
        return (
          <g key={`grid-${i}`}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#f1f5f9" strokeWidth={1} />
            <text x={padL - 4} y={y + 3} textAnchor="end" fontSize={9} fill="#94a3b8">{Math.round(maxVal * t)}</text>
          </g>
        );
      })}
      {/* Bars */}
      {data.map((d, i) => {
        const cx = padL + i * groupW + groupW / 2;
        const scansH = (d.scans / maxVal) * chartH;
        const compH = (d.completed / maxVal) * chartH;
        return (
          <g key={`bar-group-${i}`}>
            <rect
              x={cx - barW - gap / 2}
              y={padT + chartH - scansH}
              width={barW}
              height={scansH}
              fill="#93c5fd"
              rx={2}
            />
            <rect
              x={cx + gap / 2}
              y={padT + chartH - compH}
              width={barW}
              height={compH}
              fill="#2563EB"
              rx={2}
            />
            <text x={cx} y={H - 6} textAnchor="middle" fontSize={9} fill="#94a3b8">{d.day}</text>
          </g>
        );
      })}
    </svg>
  );
}

// Pure SVG area chart
function SvgAreaChart({ data }: { data: typeof todayHourly }) {
  const W = 280; const H = 140; const padL = 24; const padB = 24; const padT = 8; const padR = 8;
  const chartW = W - padL - padR;
  const chartH = H - padB - padT;
  const maxVal = Math.max(...data.map(d => d.scans), 1);
  const pts = data.map((d, i) => ({
    x: padL + (i / (data.length - 1)) * chartW,
    y: padT + chartH - (d.scans / maxVal) * chartH,
  }));

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${pts[pts.length - 1].x},${padT + chartH} L${pts[0].x},${padT + chartH} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      {/* Grid */}
      {[0, 0.5, 1].map((t, i) => {
        const y = padT + chartH * (1 - t);
        return (
          <g key={`agrid-${i}`}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#f1f5f9" strokeWidth={1} />
            <text x={padL - 4} y={y + 3} textAnchor="end" fontSize={9} fill="#94a3b8">{Math.round(maxVal * t)}</text>
          </g>
        );
      })}
      {/* Area fill */}
      <path d={areaPath} fill="#2563EB" fillOpacity={0.12} />
      {/* Line */}
      <path d={linePath} fill="none" stroke="#2563EB" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {/* Dots + labels */}
      {pts.map((p, i) => (
        <g key={`adot-${i}`}>
          <circle cx={p.x} cy={p.y} r={3} fill="#2563EB" />
          <text x={p.x} y={H - 6} textAnchor="middle" fontSize={9} fill="#94a3b8">{data[i].time}</text>
        </g>
      ))}
    </svg>
  );
}

export default function TechnicianDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({ today: 0, pending: 0, total: 0, recent_scans: [] });
  const [scanHistory, setScanHistory] = useState<any[]>([]);

  const technicianId = parseInt(localStorage.getItem('technicianId') || '1');

  useEffect(() => {
    let isInitialLoad = true;

    const loadData = async () => {
      try {
        if (isInitialLoad) setLoading(true);
        const [dashboard, history] = await Promise.all([
          getTechnicianDashboard(technicianId),
          getScanHistory()
        ]);
        setStatsData(dashboard);
        setScanHistory(history);
      } catch (error: any) {
        // Only show error toast on initial load to avoid repetitive alerts
        if (isInitialLoad) {
          toast.error(error.message || 'Failed to load technician dashboard');
        }
      } finally {
        if (isInitialLoad) {
          setLoading(false);
          isInitialLoad = false;
        }
      }
    };

    loadData();
    const intervalId = setInterval(loadData, 5000); // Poll every 5 seconds for "real-time" updates

    return () => clearInterval(intervalId);
  }, [technicianId]);

  const stats = [
    { label: "Today's Scans", value: statsData.today.toString(), sub: 'Scans captured today', icon: Camera, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
    { label: 'Processing', value: statsData.pending.toString(), sub: 'Awaiting AI analysis', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Completed', value: (statsData.total - statsData.pending).toString(), sub: 'Total sent to radiology', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'All Records', value: statsData.total.toString(), sub: 'Lifetime scan count', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const timeline = statsData.recent_scans.map((scan: any) => ({
    time: new Date(scan.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    patient: scan.patient_name,
    action: `Scan ${scan.status}`,
    status: scan.status.toLowerCase() === 'completed' ? 'completed' : 'processing'
  }));

  return (
    <WebAppLayout
      role="technician"
      breadcrumbs={[{ label: 'Technician Portal' }, { label: 'Dashboard' }]}
    >
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/50 z-20 flex items-center justify-center backdrop-blur-[1px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2563EB]"></div>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
              <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 leading-tight">{stat.label}</p>
                <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{stat.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#2563EB]" />
            Quick Actions
          </h3>
          <div className="space-y-2.5">
            <button
              onClick={() => navigate('/technician/patient-registration')}
              className="w-full bg-[#2563EB] text-white rounded-xl p-3.5 flex items-center gap-3 hover:bg-blue-700 transition-colors group"
            >
              <div className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Plus className="w-4 h-4" />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-sm">Register New Patient</p>
                <p className="text-blue-200 text-xs">Start a new X-ray session</p>
              </div>
              <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/technician/scan-history')}
              className="w-full border-2 border-[#2563EB]/20 bg-blue-50 text-[#2563EB] rounded-xl p-3.5 flex items-center gap-3 hover:bg-blue-100 transition-colors group"
            >
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                <Scan className="w-4 h-4" />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-sm">View Scan History</p>
                <p className="text-blue-400 text-xs">Browse all scans</p>
              </div>
              <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/technician/scanner-preparation')}
              className="w-full border border-slate-200 text-slate-700 rounded-xl p-3.5 flex items-center gap-3 hover:bg-slate-50 transition-colors group"
            >
              <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Camera className="w-4 h-4 text-slate-500" />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-sm">Scanner Preparation</p>
                <p className="text-slate-400 text-xs">Calibrate equipment</p>
              </div>
              <ArrowRight className="w-4 h-4 opacity-40 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Today's Timeline */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#2563EB]" />
            Today's Activity
          </h3>
          <div className="space-y-3.5">
            {timeline.map((item, i) => {
              const cfg = statusConfig[item.status as keyof typeof statusConfig];
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex flex-col items-center mt-1">
                    <div className={`w-2 h-2 rounded-full ${cfg.dot} flex-shrink-0`} />
                    {i < timeline.length - 1 && <div className="w-px h-7 bg-slate-100 mt-1" />}
                  </div>
                  <div className="flex-1 min-w-0 pb-1">
                    <p className="text-[10px] text-slate-400 font-mono mb-0.5">{item.time}</p>
                    <p className="text-xs font-semibold text-slate-800 truncate">{item.patient}</p>
                    <p className="text-[11px] text-slate-500">{item.action}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${cfg.color}`}>
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h3 className="text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#2563EB]" />
            Performance
          </h3>
          <div className="space-y-3.5">
            {[
              { label: 'Scan Quality Rate', value: 94, color: 'bg-green-500' },
              { label: 'Upload Success Rate', value: 98, color: 'bg-[#2563EB]' },
              { label: 'Avg. Scan Time', value: 72, sublabel: '7.2 min', color: 'bg-purple-500' },
              { label: 'Patient Throughput', value: 85, color: 'bg-amber-500' },
            ].map((m, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-slate-600 text-[11px]">{m.label}</span>
                  <span className="font-bold text-slate-800 text-[11px]">{m.sublabel || `${m.value}%`}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${m.color} rounded-full transition-all duration-1000`} style={{ width: `${m.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-xs text-blue-700 font-semibold">Excellent performance today!</p>
            </div>
            <p className="text-[10px] text-blue-500 mt-0.5">Above department average by 12%</p>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
        {/* Weekly Scan Volume — custom SVG */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#2563EB]" />
              Weekly Scan Volume
            </h3>
            <span className="text-xs text-slate-400">Last 7 days</span>
          </div>
          <div className="h-40">
            <SvgBarChart data={weeklyData} />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#93c5fd]" /><span className="text-[10px] text-slate-500">Total Scans</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-[#2563EB]" /><span className="text-[10px] text-slate-500">Completed</span></div>
          </div>
        </div>

        {/* Today's Hourly — custom SVG */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#2563EB]" />
              Today (Hourly)
            </h3>
            <span className="text-xs text-slate-400">Today</span>
          </div>
          <div className="h-40">
            <SvgAreaChart data={todayHourly} />
          </div>
        </div>
      </div>

      {/* Recent Scans Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <h3 className="text-slate-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#2563EB]" />
            Recent Scans
          </h3>
          <button
            onClick={() => navigate('/technician/scan-history')}
            className="text-xs text-[#2563EB] hover:underline font-medium flex items-center gap-1"
          >
            View all <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Patient</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">MRN</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Date</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-right px-5 py-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody>
              {scanHistory.slice(0, 5).map((scan, idx) => {
                const cfg = statusConfig[scan.status.toLowerCase() as keyof typeof statusConfig] || statusConfig.pending;
                const StatusIcon = cfg.icon;
                return (
                  <tr
                    key={idx}
                    onClick={() => navigate(`/technician/scan-history/${scan.scan_id}`)}
                    className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] font-bold text-[#2563EB]">{scan.patient_name.split(' ').map((n: string) => n[0]).join('')}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{scan.patient_name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500 font-mono">{scan.mrn}</td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">{new Date(scan.created_at).toLocaleDateString()}</td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium ${cfg.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button className="text-[#2563EB] text-xs font-medium hover:underline">Details</button>
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
