import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import {
  FileText, Brain, Clock, CheckCircle, TrendingUp, Mail,
  Phone, Calendar, Award, Shield, Edit3, Star, MapPin, Bell,
  Lock, Eye, Globe, Moon, ChevronRight, LogOut, HelpCircle,
  Download, Trash2, UserCircle, UserPlus, Camera, Upload
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Switch } from '../../components/ui/switch';
import { getDoctorProfile, updateDoctorProfile } from '../../lib/api';
import { toast } from 'sonner';

// Pure SVG dual-area chart
function SvgDualAreaChart({ data }: { data: { month: string; reviewed: number; reports: number }[] }) {
  const W = 480; const H = 140; const padL = 32; const padB = 22; const padT = 8; const padR = 8;
  const chartW = W - padL - padR;
  const chartH = H - padB - padT;
  const maxVal = Math.max(...data.map(d => d.reviewed), 1);
  const pts1 = data.map((d, i) => ({ x: padL + (i / (data.length - 1)) * chartW, y: padT + chartH - (d.reviewed / maxVal) * chartH }));
  const pts2 = data.map((d, i) => ({ x: padL + (i / (data.length - 1)) * chartW, y: padT + chartH - (d.reports / maxVal) * chartH }));
  const path1 = `M ${pts1.map(p => `${p.x},${p.y}`).join(' L ')}`;
  const path2 = `M ${pts2.map(p => `${p.x},${p.y}`).join(' L ')}`;
  const area1 = `${path1} L ${W - padR},${padT + chartH} L ${padL},${padT + chartH} Z`;
  const area2 = `${path2} L ${W - padR},${padT + chartH} L ${padL},${padT + chartH} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
      {[0, 0.5, 1].map((t, i) => {
        const y = padT + chartH * (1 - t);
        return (
          <g key={`g-${i}`}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#f1f5f9" strokeWidth={1} />
            <text x={padL - 4} y={y + 3} textAnchor="end" fontSize={9} fill="#94a3b8">{Math.round(maxVal * t)}</text>
          </g>
        );
      })}
      <path d={area1} fill="#2563EB" fillOpacity={0.15} />
      <path d={path1} stroke="#2563EB" strokeWidth={2} fill="none" />
      <path d={area2} fill="#10b981" fillOpacity={0.15} />
      <path d={path2} stroke="#10b981" strokeWidth={2} fill="none" />
      {data.map((d, i) => (
        <text key={`l-${i}`} x={padL + (i / (data.length - 1)) * chartW} y={H - 5} textAnchor="middle" fontSize={9} fill="#94a3b8">{d.month}</text>
      ))}
    </svg>
  );
}

export default function DoctorProfile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  
  // Get email from localStorage after login
  const doctorEmail = localStorage.getItem('doctorEmail') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    licenseNumber: '',
    department: '',
    location: '',
  });

  useEffect(() => {
    if (!doctorEmail) {
      setLoading(false);
      return;
    }
    const fetchProfile = async () => {
      try {
        const profile = await getDoctorProfile(doctorEmail);
        setFormData({
          name: profile.full_name,
          email: profile.email,
          phone: profile.phone || '',
          specialization: profile.specialization || 'Radiology',
          licenseNumber: profile.license_number || 'N/A',
          department: profile.department || 'Diagnostics',
          location: profile.location || 'N/A',
        });
        if (profile.photo_url) setProfilePhoto(profile.photo_url);
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch doctor profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [doctorEmail]);

  const [settings, setSettings] = useState({
    notifications: {
      criticalCases: true,
      newAssignments: true,
      reportReady: true,
      emailNotifications: true,
    },
    privacy: {
      showActivityStatus: true,
      shareStatistics: true,
    },
    display: {
      darkMode: false,
      compactView: false,
      aiAssistanceLevel: 'standard',
    },
  });

  const handleSave = async () => {
    try {
      await updateDoctorProfile({
        email: formData.email,
        full_name: formData.name,
        phone: formData.phone,
        specialization: formData.specialization,
        department: formData.department,
        license_number: formData.licenseNumber
      });
      toast.success('Profile updated successfully');
      setIsEditOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { label: 'Cases Reviewed', value: '1,847', icon: FileText, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
    { label: 'AI Accuracy', value: '94.3%', icon: Brain, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Avg. Review Time', value: '12m', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'This Month', value: '143', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const reviewData = [
    { month: 'Oct', reviewed: 142, reports: 138 },
    { month: 'Nov', reviewed: 156, reports: 151 },
    { month: 'Dec', reviewed: 138, reports: 133 },
    { month: 'Jan', reviewed: 167, reports: 162 },
    { month: 'Feb', reviewed: 151, reports: 147 },
    { month: 'Mar', reviewed: 143, reports: 139 },
  ];

  const certifications = [
    { name: 'Board Certified Radiologist', id: 'BCR-2019-78901', expiry: 'Dec 2029', status: 'Active' },
    { name: 'AI Diagnostic Systems', id: 'ADS-2024-112', expiry: 'Jun 2026', status: 'Active' },
    { name: 'HIPAA Compliance', id: 'HIP-2025-445', expiry: 'Mar 2026', status: 'Expiring' },
  ];

  const achievements = [
    { title: 'Top Reviewer', desc: 'Highest accuracy rate this quarter', icon: Star },
    { title: 'Fast Responder', desc: 'Average review time under 15 minutes', icon: TrendingUp },
    { title: 'Critical Save', desc: 'Caught 5 critical cases early', icon: Shield },
  ];

  return (
    <WebAppLayout
      role="doctor"
      title="My Profile"
      breadcrumbs={[{ label: 'Dashboard', path: '/doctor/dashboard' }, { label: 'Profile' }]}
    >
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'profile'
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Profile Details
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-[#2563EB] text-[#2563EB]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Settings
          </button>
        </div>

        {activeTab === 'profile' ? (
          <>
            {/* Profile Card */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-[#2563EB] to-blue-700" />
              <div className="px-6 pb-5 pt-0">
                <div className="flex items-end justify-between -mt-10 mb-4">
                  <div className="relative">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Profile"
                        className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-[#2563EB] rounded-2xl flex items-center justify-center flex-shrink-0 border-4 border-white shadow-lg">
                        <span className="text-2xl font-bold text-white">MC</span>
                      </div>
                    )}
                    <label
                      htmlFor="doctor-profile-photo"
                      className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors shadow-lg border border-slate-200 z-10"
                      title="Upload profile photo"
                    >
                      <Camera className="w-4 h-4 text-[#2563EB]" />
                    </label>
                    <input
                      id="doctor-profile-photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </div>
                  <button
                    onClick={() => setIsEditOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                  </button>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="font-bold text-slate-900 text-xl">{formData.name}</h2>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Active</span>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{formData.specialization} Specialist • {formData.department}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-4 h-4" />
                      <span>{formData.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="w-4 h-4" />
                      <span>{formData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{formData.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>Joined Feb 2019</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Shield className="w-4 h-4" />
                      <span>License: {formData.licenseNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-4">
                  <div className={`w-10 h-10 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-0.5">{stat.value}</div>
                  <div className="text-xs text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Activity Chart */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Review Activity</h3>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#2563EB] rounded-full" />
                    <span className="text-slate-600">Reviewed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full" />
                    <span className="text-slate-600">Reports</span>
                  </div>
                </div>
              </div>
              <div className="h-36">
                <SvgDualAreaChart data={reviewData} />
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Recent Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.map((ach, i) => (
                  <div key={i} className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg border border-blue-100">
                    <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center mb-3">
                      <ach.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-semibold text-slate-900 text-sm mb-1">{ach.title}</div>
                    <div className="text-xs text-slate-600">{ach.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Certifications & Licenses</h3>
                <Award className="w-5 h-5 text-slate-400" />
              </div>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Shield className="w-4 h-4 text-[#2563EB]" />
                        <span className="font-medium text-slate-900 text-sm">{cert.name}</span>
                      </div>
                      <div className="text-xs text-slate-600">ID: {cert.id} • Expires: {cert.expiry}</div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        cert.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {cert.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Notification Settings */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-semibold text-slate-900">Notifications</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div>
                    <div className="font-medium text-slate-900 text-sm">Critical Cases</div>
                    <div className="text-xs text-slate-600">Immediate alerts for urgent cases</div>
                  </div>
                  <Switch
                    checked={settings.notifications.criticalCases}
                    onCheckedChange={(checked: boolean) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, criticalCases: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div>
                    <div className="font-medium text-slate-900 text-sm">New Assignments</div>
                    <div className="text-xs text-slate-600">Notify when new cases are assigned</div>
                  </div>
                  <Switch
                    checked={settings.notifications.newAssignments}
                    onCheckedChange={(checked: boolean) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, newAssignments: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div>
                    <div className="font-medium text-slate-900 text-sm">Report Ready</div>
                    <div className="text-xs text-slate-600">Alert when reports are generated</div>
                  </div>
                  <Switch
                    checked={settings.notifications.reportReady}
                    onCheckedChange={(checked: boolean) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, reportReady: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium text-slate-900 text-sm">Email Notifications</div>
                    <div className="text-xs text-slate-600">Receive updates via email</div>
                  </div>
                  <Switch
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked: boolean) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, emailNotifications: checked },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-semibold text-slate-900">Privacy & Security</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div>
                    <div className="font-medium text-slate-900 text-sm">Show Activity Status</div>
                    <div className="text-xs text-slate-600">Let others see when you're active</div>
                  </div>
                  <Switch
                    checked={settings.privacy.showActivityStatus}
                    onCheckedChange={(checked: boolean) =>
                      setSettings({
                        ...settings,
                        privacy: { ...settings.privacy, showActivityStatus: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-medium text-slate-900 text-sm">Share Statistics</div>
                    <div className="text-xs text-slate-600">Include my stats in department reports</div>
                  </div>
                  <Switch
                    checked={settings.privacy.shareStatistics}
                    onCheckedChange={(checked: boolean) =>
                      setSettings({
                        ...settings,
                        privacy: { ...settings.privacy, shareStatistics: checked },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Display & AI Settings */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-semibold text-slate-900">Display & AI Preferences</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div>
                    <div className="font-medium text-slate-900 text-sm">Dark Mode</div>
                    <div className="text-xs text-slate-600">Use dark theme for X-ray viewers</div>
                  </div>
                  <Switch
                    checked={settings.display.darkMode}
                    onCheckedChange={(checked: boolean) =>
                      setSettings({
                        ...settings,
                        display: { ...settings.display, darkMode: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div>
                    <div className="font-medium text-slate-900 text-sm">Compact View</div>
                    <div className="text-xs text-slate-600">Show more information in less space</div>
                  </div>
                  <Switch
                    checked={settings.display.compactView}
                    onCheckedChange={(checked: boolean) =>
                      setSettings({
                        ...settings,
                        display: { ...settings.display, compactView: checked },
                      })
                    }
                  />
                </div>
                <div className="py-3">
                  <div className="mb-3">
                    <div className="font-medium text-slate-900 text-sm">AI Assistance Level</div>
                    <div className="text-xs text-slate-600">Control how much AI guidance you see</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {['minimal', 'standard', 'detailed'].map((level) => (
                      <button
                        key={level}
                        onClick={() =>
                          setSettings({
                            ...settings,
                            display: { ...settings.display, aiAssistanceLevel: level },
                          })
                        }
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          settings.display.aiAssistanceLevel === level
                            ? 'bg-[#2563EB] text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Account Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/doctor/create-account')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors text-left border border-blue-200"
                >
                  <div className="flex items-center gap-3">
                    <UserPlus className="w-5 h-5 text-[#2563EB]" />
                    <div>
                      <div className="font-medium text-[#2563EB] text-sm">Create New Account</div>
                      <div className="text-xs text-blue-600/70">Register a new doctor account</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-900 text-sm">Download My Data</div>
                      <div className="text-xs text-slate-600">Export all your profile and activity data</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-900 text-sm">Export Reports</div>
                      <div className="text-xs text-slate-600">Download your diagnostic reports</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-900 text-sm">Help & Support</div>
                      <div className="text-xs text-slate-600">Get help or contact support</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="font-medium text-red-600 text-sm">Log Out</div>
                      <div className="text-xs text-red-600/70">Sign out of your account</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-red-100" />
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-xl border border-red-200 p-6">
              <h3 className="font-semibold text-red-600 mb-4">Danger Zone</h3>
              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-red-50 transition-colors text-left border border-red-200">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="font-medium text-red-600 text-sm">Delete Account</div>
                    <div className="text-xs text-red-600/70">Permanently delete your account and all data</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto px-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.name.split(' ')[0] || ''}
                  onChange={(e) => {
                    const names = formData.name.split(' ');
                    names[0] = e.target.value;
                    setFormData({ ...formData, name: names.join(' ') });
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.name.split(' ').slice(1).join(' ') || ''}
                  onChange={(e) => {
                    const names = formData.name.split(' ');
                    setFormData({ ...formData, name: [names[0], e.target.value].join(' ') });
                  }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                readOnly
                value={formData.email}
                className="bg-slate-50 opacity-70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setIsEditOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-[#2563EB] hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </WebAppLayout>
  );
}