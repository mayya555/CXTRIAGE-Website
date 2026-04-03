import React, { useState } from 'react';
import {
  ChevronLeft, User, Lock, Bell, Sun, Globe, HelpCircle, FileText,
  LogOut, ChevronRight, Settings, Activity, Database, Clock,
  Camera, Mail, Phone, Building2, Shield, Key, Smartphone,
  Volume2, MessageSquare, Calendar, Moon, Check, AlertCircle,
  Download, ExternalLink, BookOpen, LifeBuoy, Send
} from 'lucide-react';
import { WebLayout } from '../layout/WebLayout';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { toast } from 'sonner@2.0.3';

interface DoctorSettingsScreenProps {
  navigate: (screenId: number) => void;
  setRole: (role: any) => void;
}

// Main Settings Screen
export const DoctorSettingsScreen = ({ navigate, setRole }: DoctorSettingsScreenProps) => {
  return (
    <WebLayout
      title="Settings"
      role="doctor"
      currentScreen={62}
      onNavigate={navigate}
      onLogout={() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        setRole(null);
        navigate(2);
      }}
    >
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-slate-900">Dr. Sarah Mitchell</h2>
              <p className="text-sm text-slate-500">Radiologist • DOC-3847</p>
              <p className="text-sm text-slate-500">Cardiothoracic Imaging Specialist</p>
            </div>
            <Button
              onClick={() => navigate(63)}
              variant="outline"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Account Settings */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3 px-1">Account</h3>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
            <button
              onClick={() => navigate(63)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-slate-900">Profile Information</div>
                  <div className="text-sm text-slate-500">Update your personal details</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button
              onClick={() => navigate(64)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-slate-900">Security & Privacy</div>
                  <div className="text-sm text-slate-500">Password, 2FA, and authentication</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button
              onClick={() => navigate(65)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Bell className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-slate-900">Notifications</div>
                  <div className="text-sm text-slate-500">Manage alerts and preferences</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* App Preferences */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3 px-1">Preferences</h3>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Sun className="w-6 h-6 text-slate-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-slate-900">Appearance</div>
                  <div className="text-sm text-slate-500">Light mode</div>
                </div>
              </div>
              <Switch defaultChecked={false} />
            </div>

            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-slate-900">Language</div>
                  <div className="text-sm text-slate-500">English (US)</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-slate-900">AI Confidence Threshold</div>
                  <div className="text-sm text-slate-500">Currently set to 85%</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Support & Legal */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-3 px-1">Support & Legal</h3>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
            <button
              onClick={() => navigate(66)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-slate-900">Help & Support</div>
                  <div className="text-sm text-slate-500">FAQs, contact, and resources</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-slate-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-slate-900">Terms & Privacy</div>
                  <div className="text-sm text-slate-500">Legal information and policies</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-teal-600" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-slate-900">User Guide</div>
                  <div className="text-sm text-slate-500">Documentation and tutorials</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            setRole(null);
            navigate(2);
            toast.success('Logged out successfully');
          }}
          className="w-full bg-white rounded-xl shadow-sm border border-red-200 px-6 py-4 flex items-center justify-between hover:bg-red-50 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
              <LogOut className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-left">
              <div className="font-medium text-red-600">Sign Out</div>
              <div className="text-sm text-red-400">Log out of your account</div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-red-600" />
        </button>

        {/* App Version */}
        <div className="text-center py-4 text-sm text-slate-400">
          CXRT AI v2.1.4 • Build 2847 • Doctor Portal
        </div>
      </div>
    </WebLayout>
  );
};

// Profile Information Screen (Screen 63)
export const DoctorProfileScreen = ({ navigate }: { navigate: (screenId: number) => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Mitchell',
    email: 'sarah.mitchell@hospital.com',
    phone: '+1 (555) 123-4567',
    specialty: 'Radiology',
    subspecialty: 'Cardiothoracic Imaging',
    licenseNumber: 'MD-123456',
    hospital: 'City General Hospital',
    department: 'Radiology Department'
  });

  const handleSave = () => {
    toast.success('Profile updated successfully');
    setIsEditing(false);
  };

  return (
    <WebLayout
      title="Profile Information"
      showBack
      onBack={() => navigate(62)}
      role="doctor"
      currentScreen={63}
      onNavigate={navigate}
      actions={
        !isEditing ? (
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        )
      }
    >
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Profile Picture */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Profile Picture</h3>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-600 mb-3">JPG, PNG or GIF. Max size 5MB.</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Camera className="w-4 h-4 mr-2" />
                  Upload Photo
                </Button>
                <Button variant="outline" size="sm">Remove</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Professional Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="specialty">Specialty</Label>
              <Input
                id="specialty"
                value={formData.specialty}
                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="subspecialty">Subspecialty</Label>
              <Input
                id="subspecialty"
                value={formData.subspecialty}
                onChange={(e) => setFormData({ ...formData, subspecialty: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="licenseNumber">Medical License Number</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="hospital">Hospital/Institution</Label>
              <Input
                id="hospital"
                value={formData.hospital}
                onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Account Status</h4>
              <p className="text-sm text-slate-600 mb-2">Your account is verified and active</p>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Email Verified
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  2FA Enabled
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  Premium Account
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebLayout>
  );
};

// Security & Privacy Screen (Screen 64)
export const DoctorSecurityScreen = ({ navigate }: { navigate: (screenId: number) => void }) => {
  return (
    <WebLayout
      title="Security & Privacy"
      showBack
      onBack={() => navigate(62)}
      role="doctor"
      currentScreen={64}
      onNavigate={navigate}
    >
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Password */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Password</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" placeholder="Enter current password" />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" placeholder="Enter new password" />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
            </div>
            <Button onClick={() => toast.success('Password updated successfully')}>
              Update Password
            </Button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900">Two-Factor Authentication</h3>
              <p className="text-sm text-slate-600 mt-1">Add an extra layer of security to your account</p>
            </div>
            <Switch defaultChecked={true} />
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900">2FA is enabled</p>
                <p className="text-sm text-green-700 mt-1">
                  Using authenticator app • Last verified: Today at 8:00 AM
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <button className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center justify-between transition-colors">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-slate-600" />
                <div className="text-left">
                  <div className="text-sm font-medium text-slate-900">Authenticator App</div>
                  <div className="text-xs text-slate-500">Google Authenticator, Authy</div>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Active</span>
            </button>
            <button className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center justify-between transition-colors">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-slate-600" />
                <div className="text-left">
                  <div className="text-sm font-medium text-slate-900">SMS Authentication</div>
                  <div className="text-xs text-slate-500">Receive codes via text message</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Session Management */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Active Sessions</h3>
          <div className="space-y-3">
            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Current Session</p>
                  <p className="text-xs text-slate-500 mt-1">Chrome on Windows • New York, USA</p>
                  <p className="text-xs text-slate-500">Last active: Just now</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">Active</span>
            </div>
            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Mobile App</p>
                  <p className="text-xs text-slate-500 mt-1">iOS App • New York, USA</p>
                  <p className="text-xs text-slate-500">Last active: 2 hours ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Revoke</Button>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Privacy Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">Activity Logging</p>
                <p className="text-xs text-slate-500">Track account activity and login history</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">Data Analytics</p>
                <p className="text-xs text-slate-500">Help improve the platform with usage data</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">Email Notifications</p>
                <p className="text-xs text-slate-500">Receive updates about your account</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-xl border border-red-200 p-6">
          <h3 className="font-semibold text-red-900 mb-4">Danger Zone</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start border-red-300 text-red-700 hover:bg-red-100">
              <AlertCircle className="w-4 h-4 mr-2" />
              Download My Data
            </Button>
            <Button variant="outline" className="w-full justify-start border-red-300 text-red-700 hover:bg-red-100">
              <AlertCircle className="w-4 h-4 mr-2" />
              Deactivate Account
            </Button>
          </div>
        </div>
      </div>
    </WebLayout>
  );
};

// Notifications Screen (Screen 65)
export const DoctorNotificationsScreen = ({ navigate }: { navigate: (screenId: number) => void }) => {
  return (
    <WebLayout
      title="Notification Settings"
      showBack
      onBack={() => navigate(62)}
      role="doctor"
      currentScreen={65}
      onNavigate={navigate}
    >
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Push Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Push Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">Critical Alerts</p>
                <p className="text-xs text-slate-500">Urgent cases requiring immediate attention</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">New Case Assignments</p>
                <p className="text-xs text-slate-500">When new cases are assigned to you</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">AI Analysis Complete</p>
                <p className="text-xs text-slate-500">When AI finishes processing scans</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">Case Updates</p>
                <p className="text-xs text-slate-500">Updates on cases you're following</p>
              </div>
              <Switch defaultChecked={false} />
            </div>
          </div>
        </div>

        {/* Email Notifications */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Email Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">Daily Summary</p>
                <p className="text-xs text-slate-500">Daily report of cases and activities</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">Weekly Reports</p>
                <p className="text-xs text-slate-500">Weekly performance and statistics</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">System Updates</p>
                <p className="text-xs text-slate-500">Important platform updates and news</p>
              </div>
              <Switch defaultChecked={false} />
            </div>
          </div>
        </div>

        {/* Sound & Vibration */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Sound & Vibration</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">Notification Sound</p>
                <p className="text-xs text-slate-500">Play sound for notifications</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">Vibration</p>
                <p className="text-xs text-slate-500">Vibrate for critical alerts</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900">Quiet Hours</h3>
              <p className="text-sm text-slate-600 mt-1">Mute non-critical notifications during specific hours</p>
            </div>
            <Switch defaultChecked={true} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quietStart">Start Time</Label>
              <Input id="quietStart" type="time" defaultValue="22:00" />
            </div>
            <div>
              <Label htmlFor="quietEnd">End Time</Label>
              <Input id="quietEnd" type="time" defaultValue="07:00" />
            </div>
          </div>
          <p className="text-xs text-amber-700 mt-3 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            Critical alerts will still come through during quiet hours
          </p>
        </div>

        {/* Notification Preferences */}
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
          <div className="flex items-start gap-3">
            <Bell className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-slate-900 mb-1">Smart Notifications</h4>
              <p className="text-sm text-slate-600">
                AI-powered notification management ensures you only receive the most relevant alerts based on your preferences and behavior patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </WebLayout>
  );
};

// Help & Support Screen (Screen 66)
export const DoctorHelpScreen = ({ navigate }: { navigate: (screenId: number) => void }) => {
  return (
    <WebLayout
      title="Help & Support"
      showBack
      onBack={() => navigate(62)}
      role="doctor"
      currentScreen={66}
      onNavigate={navigate}
    >
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <button className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:bg-slate-50 transition-colors text-left">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Live Chat Support</h3>
            <p className="text-sm text-slate-600">Get help from our support team</p>
            <p className="text-xs text-green-600 mt-2">• Online now</p>
          </button>

          <button className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:bg-slate-50 transition-colors text-left">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">Email Support</h3>
            <p className="text-sm text-slate-600">Send us a detailed message</p>
            <p className="text-xs text-slate-500 mt-2">Response within 24 hours</p>
          </button>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-3">
            <button className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-lg text-left transition-colors">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">How do I interpret AI confidence scores?</p>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </button>
            <button className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-lg text-left transition-colors">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">How to customize the heatmap visualization?</p>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </button>
            <button className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-lg text-left transition-colors">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">What are the system requirements?</p>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </button>
            <button className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-lg text-left transition-colors">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">How to export case reports?</p>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </button>
          </div>
          <Button variant="link" className="mt-4 text-blue-600">
            View All FAQs
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Resources */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Resources</h3>
          <div className="space-y-3">
            <button className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center justify-between transition-colors">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-slate-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-900">User Guide</p>
                  <p className="text-xs text-slate-500">Complete documentation and tutorials</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            <button className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center justify-between transition-colors">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-slate-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-900">Download Resources</p>
                  <p className="text-xs text-slate-500">Quick reference guides and PDFs</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
            <button className="w-full p-4 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center justify-between transition-colors">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-slate-600" />
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-900">Video Tutorials</p>
                  <p className="text-xs text-slate-500">Step-by-step video guides</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-900">Email</p>
                <p className="text-sm text-slate-600">support@cxrtai.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-900">Phone</p>
                <p className="text-sm text-slate-600">+1 (800) 555-CXRT</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-slate-900">Support Hours</p>
                <p className="text-sm text-slate-600">24/7 for critical issues • Mon-Fri 9AM-6PM EST for general inquiries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Feedback */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Send Feedback</h3>
          <p className="text-sm text-slate-600 mb-4">Help us improve CXRT AI by sharing your suggestions</p>
          <div className="space-y-3">
            <textarea
              className="w-full p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Tell us what you think..."
            />
            <Button className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </Button>
          </div>
        </div>

        {/* App Info */}
        <div className="text-center text-sm text-slate-500 space-y-1">
          <p>CXRT AI v2.1.4 • Build 2847</p>
          <p>© 2026 CXRT AI. All rights reserved.</p>
        </div>
      </div>
    </WebLayout>
  );
};
