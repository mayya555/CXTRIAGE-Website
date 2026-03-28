import { useNavigate } from 'react-router';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import {
  Camera, CheckCircle, Clock, BarChart3, Edit3, Mail, Phone, MapPin, Calendar,
  Award, Shield, Bell, Lock, Eye, Globe, Moon, ChevronRight, LogOut, HelpCircle,
  FileText, Download, Trash2, UserPlus, Upload
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Switch } from '../../components/ui/switch';
import { getTechnicianProfile, updateTechnicianProfile } from '../../lib/api';
import { toast } from 'sonner';

const monthlyScans = [
  { month: 'Oct', scans: 162 },
  { month: 'Nov', scans: 178 },
  { month: 'Dec', scans: 145 },
  { month: 'Jan', scans: 191 },
  { month: 'Feb', scans: 208 },
  { month: 'Mar', scans: 187 },
];

// Pure SVG bar chart
function SvgBarChart({ data }: { data: { month: string; scans: number }[] }) {
  const W = 400; const H = 140; const padL = 32; const padB = 22; const padT = 8; const padR = 8;
  const chartW = W - padL - padR;
  const chartH = H - padB - padT;
  const maxVal = Math.max(...data.map(d => d.scans), 1);
  const barW = Math.floor((chartW / data.length) * 0.55);
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
      {data.map((d, i) => {
        const x = padL + (i / data.length) * chartW + (chartW / data.length - barW) / 2;
        const bh = (d.scans / maxVal) * chartH;
        return (
          <g key={`b-${i}`}>
            <rect x={x} y={padT + chartH - bh} width={barW} height={bh} fill="#2563EB" rx={3} />
            <text x={x + barW / 2} y={H - 5} textAnchor="middle" fontSize={9} fill="#94a3b8">{d.month}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function TechnicianProfile() {
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  
  const technicianId = parseInt(localStorage.getItem('technicianId') || '1');
  
  const [formData, setFormData] = useState({
    name: 'Sarah Williams',
    email: 'sarah.williams@hospital.org',
    phone: '+1 (555) 123-4567',
    department: 'Radiology',
    location: 'Building A, Floor 2',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getTechnicianProfile(technicianId);
        setFormData({
          name: data.full_name,
          email: data.email,
          phone: data.phone_number || '',
          department: 'Radiology', // Assuming department/location are static for now or can be added later
          location: 'Building A, Floor 2',
        });
      } catch (error) {
        console.error('Failed to fetch technician profile', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [technicianId]);

  const [settings, setSettings] = useState({
    notifications: {
      scanComplete: true,
      qualityIssues: true,
      systemUpdates: false,
      emailNotifications: true,
    },
    privacy: {
      showActivityStatus: true,
      shareStatistics: false,
    },
    display: {
      darkMode: false,
      compactView: false,
    },
  });

  const handleSave = async () => {
    try {
      const names = formData.name.split(' ');
      const firstName = names[0] || '';
      const lastName = names.slice(1).join(' ') || '';
      
      await updateTechnicianProfile(technicianId, {
        first_name: firstName,
        last_name: lastName,
        phone_number: formData.phone
      });
      
      localStorage.setItem('technicianName', formData.name);
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
    { label: 'Total Scans', value: '2,341', icon: Camera, color: 'text-[#2563EB]', bg: 'bg-blue-50' },
    { label: 'Quality Rate', value: '96%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Avg. Scan Time', value: '7.2m', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'This Month', value: '187', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const certifications = [
    { name: 'ARRT Certification', id: 'ARRT-2021-445678', expiry: 'Dec 2027', status: 'Active' },
    { name: 'Radiation Safety', id: 'RSO-2023-112', expiry: 'Jun 2025', status: 'Active' },
    { name: 'HIPAA Training', id: 'HIP-2025-889', expiry: 'Mar 2026', status: 'Expiring' },
  ];

  return (
    <WebAppLayout
      role="technician"
      title="My Profile"
      breadcrumbs={[{ label: 'Dashboard', path: '/technician/dashboard' }, { label: 'Profile' }]}
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
                        <span className="text-2xl font-bold text-white">SW</span>
                      </div>
                    )}
                    <label
                      htmlFor="profile-photo"
                      className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors shadow-lg border border-slate-200 z-10"
                      title="Upload profile photo"
                    >
                      <Camera className="w-4 h-4 text-[#2563EB]" />
                    </label>
                    <input
                      id="profile-photo"
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
                  <p className="text-slate-600 text-sm mb-4">X-Ray Technician • {formData.department}</p>
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
                      <span>Joined Jan 2021</span>
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
              <h3 className="font-semibold text-slate-900 mb-4">Monthly Scan Activity</h3>
              <div className="h-36">
                <SvgBarChart data={monthlyScans} />
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
                    <div className="font-medium text-slate-900 text-sm">Scan Complete Alerts</div>
                    <div className="text-xs text-slate-600">Get notified when scans finish processing</div>
                  </div>
                  <Switch
                    checked={settings.notifications.scanComplete}
                    onCheckedChange={(checked: boolean) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, scanComplete: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div>
                    <div className="font-medium text-slate-900 text-sm">Quality Issues</div>
                    <div className="text-xs text-slate-600">Alert me about scan quality concerns</div>
                  </div>
                  <Switch
                    checked={settings.notifications.qualityIssues}
                    onCheckedChange={(checked: boolean) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, qualityIssues: checked },
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div>
                    <div className="font-medium text-slate-900 text-sm">System Updates</div>
                    <div className="text-xs text-slate-600">Notifications about system maintenance</div>
                  </div>
                  <Switch
                    checked={settings.notifications.systemUpdates}
                    onCheckedChange={(checked: boolean) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, systemUpdates: checked },
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

            {/* Display Settings */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-[#2563EB]" />
                <h3 className="font-semibold text-slate-900">Display Preferences</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-slate-100">
                  <div>
                    <div className="font-medium text-slate-900 text-sm">Dark Mode</div>
                    <div className="text-xs text-slate-600">Use dark theme throughout the app</div>
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
                <div className="flex items-center justify-between py-3">
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
              </div>
            </div>

            {/* Account Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Account Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/technician/create-account')}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-blue-50 transition-colors text-left border border-blue-200"
                >
                  <div className="flex items-center gap-3">
                    <UserPlus className="w-5 h-5 text-[#2563EB]" />
                    <div>
                      <div className="font-medium text-[#2563EB] text-sm">Create New Account</div>
                      <div className="text-xs text-blue-600/70">Register a new technician account</div>
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
                  <ChevronRight className="w-5 h-5 text-red-400" />
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
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
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