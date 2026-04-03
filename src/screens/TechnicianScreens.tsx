import React, { useState, useEffect } from 'react';
import { Check, User, Calendar, FileText, ArrowRight, Sun, Moon, Smartphone, Fingerprint, Eye, Phone, Mail, Clock, Layout, Search, Filter, Shield, Bell, HelpCircle, LogOut, ChevronRight, Upload, X, Camera, Zap, Image, Activity, Database, AlertTriangle, Settings, ChevronLeft, MoreVertical, Globe, MessageSquare, CheckCircle, UserPlus, History, Scan, RefreshCw, AlertCircle, Send, Plus, Edit3, MapPin, Hash, XCircle, Info, Lock } from 'lucide-react';
import { Button, Input, Card, Badge, Switch } from '../components/ui/Material';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Icons, MOCK_PATIENTS, MOCK_SCANS, IMAGES } from '../lib/data';
import { WebLayout } from '../components/layout/WebLayout';
import { toast } from 'sonner@2.0.3';

export const TechnicianScreens = ({ screenId, navigate, setRole }: any) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState({ shifts: true, assignments: true, urgent: true });
  const [privacy, setPrivacy] = useState({ analytics: true, showStatus: true });
  const [scanProgress, setScanProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [appTheme, setAppTheme] = useState('light');
  const [selectedLanguage, setSelectedLanguage] = useState('English (US)');
  const [profileImage, setProfileImage] = useState(IMAGES.tech);
  const [isUploading, setIsUploading] = useState(false);
  const [scanImage, setScanImage] = useState<string | null>(null);
  const [aiPriority, setAiPriority] = useState<'Normal' | 'Urgent' | 'Critical'>('Normal');

  // Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState('James Chen');
  const [profileEmail, setProfileEmail] = useState('james.chen@hospital.org');
  const [profilePhone, setProfilePhone] = useState('+1 (555) 123-4567');


  // Patient Registration State
  const [patientFullName, setPatientFullName] = useState('');
  const [patientDOB, setPatientDOB] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [patientMRN, setPatientMRN] = useState('');
  const [patientReason, setPatientReason] = useState('');
  const [currentPatient, setCurrentPatient] = useState<any>(null);

  // Terms & Conditions State
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Retake Reason State
  const [selectedRetakeReason, setSelectedRetakeReason] = useState('');

  // Feedback State (Screen 97)
  const [feedbackType, setFeedbackType] = useState('Bug Report');
  const [feedbackText, setFeedbackText] = useState('');

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
    setIsEditingProfile(false);
  };

  // Simulating upload progress
  useEffect(() => {
    if (screenId === 32) {
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => navigate(33), 500);
            return 100;
          }
          return p + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [screenId]);

  const handleRegisterPatient = () => {
    const newPatient = {
      id: `PAT-${Math.floor(Math.random() * 10000)}`,
      fullName: patientFullName,
      dob: patientDOB,
      gender: patientGender,
      mrn: patientMRN,
      reason: patientReason,
      registeredAt: new Date().toISOString()
    };
    setCurrentPatient(newPatient);
    navigate(26);
  };

  switch (screenId) {
    // 74. Terms & Conditions Screen (Before Dashboard)
    case 74:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h1 className="text-lg font-medium">Terms & Privacy</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-6 pb-8 overflow-y-auto">
            <div className="max-w-md mx-auto space-y-6">
              {/* Terms Content */}
              <div className="space-y-5">
                {/* 1. Acceptance of Terms */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">1. Acceptance of Terms</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    By accessing and using the MediScan AI application, you agree to be bound by these Terms and Conditions.
                  </p>
                </div>

                {/* 2. Data Privacy */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">2. Data Privacy</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We collect and process your data in accordance with our Privacy Policy. Your employee ID and ticket information are stored securely and encrypted at rest.
                  </p>
                </div>

                {/* 3. Acceptable Use */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">3. Acceptable Use</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    You agree to use this service only for official hospital purposes. Misuse of the diagnostic system may result in disciplinary action.
                  </p>
                </div>

                {/* 4. AI Features */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">4. AI Features</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    This application uses Artificial Intelligence to categorize and prioritize scans. We strive for accuracy, automated decisions should be verified by a qualified professional.
                  </p>
                </div>
              </div>

              {/* Checkbox */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="pt-0.5">
                    <input
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="w-5 h-5 text-[#2563EB] border-gray-300 rounded focus:ring-2 focus:ring-blue-200 cursor-pointer"
                    />
                  </div>
                  <span className="text-sm text-slate-700 leading-relaxed">
                    I agree to the Terms of Service and Privacy Policy.
                  </span>
                </label>
              </div>

              {/* Accept Button */}
              <button
                onClick={() => navigate(23)}
                disabled={!acceptedTerms}
                className="w-full h-12 bg-[#2563EB] hover:bg-[#1d4ed8] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all active:scale-[0.98]"
              >
                Accept & Continue
              </button>
            </div>
          </div>
        </div>
      );

    // 23. Technician Dashboard - Web Version
    case 23:
      return (
        <WebLayout
          title="Dashboard"
          role="technician"
          currentScreen={screenId}
          onNavigate={navigate}
          onLogout={() => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            setRole(null);
            navigate(3);
          }}
        >
          <div className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome, James Chen</h1>
              <p className="text-slate-600">Technician Portal - Ready to scan and upload X-rays</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-[#2563EB]" />
                  </div>
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">TODAY</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-1">12</p>
                <p className="text-sm text-slate-600">Scans Completed</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">PENDING</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-1">8</p>
                <p className="text-sm text-slate-600">Pending Upload</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <History className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">TOTAL</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 mb-1">247</p>
                <p className="text-sm text-slate-600">All Time Scans</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="font-bold text-slate-900 text-lg mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => navigate(25)}
                  className="bg-gradient-to-br from-[#2563EB] to-[#1d4ed8] rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:scale-105 group h-40"
                >
                  <div className="flex flex-col items-start gap-3 text-white h-full">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <UserPlus className="w-7 h-7" />
                    </div>
                    <div className="mt-auto">
                      <div className="font-bold text-lg">New Patient</div>
                      <div className="text-sm text-blue-100">Register</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => navigate(27)}
                  className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:scale-105 group h-40"
                >
                  <div className="flex flex-col items-start gap-3 text-white h-full">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Camera className="w-7 h-7" />
                    </div>
                    <div className="mt-auto">
                      <div className="font-bold text-lg">Start Scan</div>
                      <div className="text-sm text-green-100">X-Ray</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => navigate(34)}
                  className="bg-gradient-to-br from-purple-600 to-violet-600 rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:scale-105 group h-40"
                >
                  <div className="flex flex-col items-start gap-3 text-white h-full">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <History className="w-7 h-7" />
                    </div>
                    <div className="mt-auto">
                      <div className="font-bold text-lg">History</div>
                      <div className="text-sm text-purple-100">View All</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => navigate(61)}
                  className="bg-gradient-to-br from-orange-600 to-amber-600 rounded-xl p-6 shadow-md hover:shadow-lg transition-all hover:scale-105 group h-40"
                >
                  <div className="flex flex-col items-start gap-3 text-white h-full">
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Settings className="w-7 h-7" />
                    </div>
                    <div className="mt-auto">
                      <div className="font-bold text-lg">Settings</div>
                      <div className="text-sm text-orange-100">Profile</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="font-bold text-slate-900 text-lg mb-4">Recent Scans</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[
                  { patient: 'Sarah Wilson', mrn: 'MRN-4521', time: '10 min ago', status: 'Processing' },
                  { patient: 'John Davis', mrn: 'MRN-3892', time: '1 hour ago', status: 'Completed' },
                  { patient: 'Emily Chen', mrn: 'MRN-7234', time: '2 hours ago', status: 'Completed' },
                  { patient: 'Michael Brown', mrn: 'MRN-5678', time: '3 hours ago', status: 'Completed' }
                ].map((scan, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                          <User className="w-6 h-6 text-slate-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{scan.patient}</div>
                          <div className="text-sm text-slate-500">{scan.mrn}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs font-semibold px-3 py-1.5 rounded-full ${scan.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                          }`}>
                          {scan.status}
                        </div>
                        <div className="text-xs text-slate-400 mt-2">{scan.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </WebLayout>
      );

    // 24. Technician Profile Screen
    case 24:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(23)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">Profile</h1>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="ml-auto hover:bg-white/10 rounded-full p-2 transition-colors"
            >
              <Edit3 className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-6 pb-8 overflow-y-auto">
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <User className="w-12 h-12 text-[#2563EB]" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">{profileName}</h2>
              <p className="text-sm text-slate-400">X-Ray Technician</p>
              <div className="mt-2 px-3 py-1 bg-blue-50 rounded-full">

              </div>
            </div>

            {/* Profile Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Full Name</label>
                <div className="bg-white rounded-xl border border-gray-200 px-4 py-3">
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full text-sm text-slate-900 outline-none"
                    />
                  ) : (
                    <div className="text-sm text-slate-900">{profileName}</div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Email</label>
                <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#2563EB]" />
                  {isEditingProfile ? (
                    <input
                      type="email"
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="flex-1 text-sm text-slate-900 outline-none"
                    />
                  ) : (
                    <div className="text-sm text-slate-900">{profileEmail}</div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Phone Number</label>
                <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#2563EB]" />
                  {isEditingProfile ? (
                    <input
                      type="tel"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                      className="flex-1 text-sm text-slate-900 outline-none"
                    />
                  ) : (
                    <div className="text-sm text-slate-900">{profilePhone}</div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Employee ID</label>
                <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center gap-3">
                  <Hash className="w-5 h-5 text-[#2563EB]" />

                </div>
              </div>

              {isEditingProfile && (
                <button
                  onClick={handleSaveProfile}
                  className="w-full h-12 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-sm rounded-xl transition-all active:scale-[0.98] mt-6"
                >
                  Save Changes
                </button>
              )}
            </div>

            {/* Additional Options */}
            <div className="mt-8 space-y-3">
              <button className="w-full bg-white rounded-xl border border-gray-200 px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-medium text-slate-900">Security</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>

              <button className="w-full bg-white rounded-xl border border-gray-200 px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-slate-400" />
                  <span className="text-sm font-medium text-slate-900">Help & Support</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </button>

              <button
                onClick={() => navigate(2)}
                className="w-full bg-white rounded-xl border border-red-200 px-4 py-4 flex items-center justify-between hover:bg-red-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-red-600" />
                  <span className="text-sm font-medium text-red-600">Logout</span>
                </div>
                <ChevronRight className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      );

    // 25. Patient Registration Screen
    case 25:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(23)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">Patient Registration</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-6 pb-8 overflow-y-auto">
            <div className="max-w-md mx-auto space-y-4">
              {/* Icon */}
              <div className="flex justify-center mb-2">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center">
                  <UserPlus className="w-8 h-8 text-[#2563EB]" />
                </div>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  value={patientFullName}
                  onChange={(e) => setPatientFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Date of Birth</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2563EB]" />
                  <input
                    type="date"
                    value={patientDOB}
                    onChange={(e) => setPatientDOB(e.target.value)}
                    className="w-full h-12 bg-white border border-gray-200 rounded-xl pl-12 pr-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Gender</label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="w-full h-12 bg-white border border-gray-200 rounded-xl px-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* MRN */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Medical Record Number</label>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2563EB]" />
                  <input
                    type="text"
                    value={patientMRN}
                    onChange={(e) => setPatientMRN(e.target.value)}
                    placeholder="MRN-XXXX"
                    className="w-full h-12 bg-white border border-gray-200 rounded-xl pl-12 pr-4 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>

              {/* Reason for X-Ray */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Reason for X-Ray</label>
                <textarea
                  value={patientReason}
                  onChange={(e) => setPatientReason(e.target.value)}
                  placeholder="Chest pain, shortness of breath..."
                  rows={3}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                />
              </div>

              {/* Register Button */}
              <button
                onClick={handleRegisterPatient}
                disabled={!patientFullName || !patientDOB || !patientGender || !patientMRN}
                className="w-full h-12 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-sm rounded-xl transition-all active:scale-[0.98] mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Register Patient
              </button>
            </div>
          </div>
        </div>
      );

    // 26. Patient Registration Confirmation Screen
    case 26:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(25)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">Registration Confirmed</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-12 pb-8 overflow-y-auto flex flex-col items-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Registration Successful!</h2>
            <p className="text-slate-400 text-sm text-center mb-8">Patient has been registered successfully</p>

            {/* Patient Info Card */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-sm font-semibold text-slate-400 uppercase">Patient ID</span>
                <span className="text-sm font-bold text-[#2563EB]">{currentPatient?.id || 'PAT-7821'}</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Name</span>
                  <span className="text-sm font-medium text-slate-900">
                    {currentPatient?.fullName || 'John Doe'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Date of Birth</span>
                  <span className="text-sm font-medium text-slate-900">{currentPatient?.dob || '1985-03-15'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Gender</span>
                  <span className="text-sm font-medium text-slate-900">{currentPatient?.gender || 'Male'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">MRN</span>
                  <span className="text-sm font-medium text-slate-900">{currentPatient?.mrn || 'MRN-5643'}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-md mt-8 space-y-3">
              <button
                onClick={() => navigate(27)}
                className="w-full h-12 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-sm rounded-xl transition-all active:scale-[0.98]"
              >
                Start X-Ray Scan
              </button>
              <button
                onClick={() => navigate(25)}
                className="w-full h-12 bg-white border border-slate-200 hover:bg-gray-50 text-slate-900 font-semibold text-sm rounded-xl transition-all active:scale-[0.98]"
              >
                Register Another Patient
              </button>
              <button
                onClick={() => navigate(23)}
                className="w-full h-12 text-slate-400 hover:text-slate-600 font-medium text-sm transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      );

    // 27. Scanner Preparation Screen
    case 27:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(26)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">Scanner Preparation</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-6 pb-8 overflow-y-auto">
            {/* Scanner Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
                <Camera className="w-12 h-12 text-[#2563EB]" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-slate-900 text-center mb-2">Prepare X-Ray Scanner</h2>
            <p className="text-slate-400 text-sm text-center mb-8">Follow the checklist below before scanning</p>

            {/* Checklist */}
            <div className="max-w-md mx-auto space-y-3">
              {[
                { text: 'Position patient correctly', icon: User },
                { text: 'Ensure proper distance from scanner', icon: MapPin },
                { text: 'Check radiation safety equipment', icon: Shield },
                { text: 'Remove metal objects from patient', icon: AlertCircle },
                { text: 'Verify scanner calibration', icon: Settings },
                { text: 'Set appropriate exposure settings', icon: Zap }
              ].map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-4 shadow-sm">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-[#2563EB]" />
                  </div>
                  <span className="text-sm font-medium text-slate-900">{item.text}</span>
                  <div className="ml-auto">
                    <div className="w-6 h-6 border-2 border-slate-200 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Warning */}
            <div className="max-w-md mx-auto mt-6 bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-yellow-900 mb-1">Safety Reminder</div>
                <div className="text-xs text-yellow-700">Ensure all safety protocols are followed before proceeding with the scan.</div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="max-w-md mx-auto mt-8">
              <button
                onClick={() => navigate(28)}
                className="w-full h-12 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-sm rounded-xl transition-all active:scale-[0.98]"
              >
                Start X-Ray Scan
              </button>
            </div>
          </div>
        </div>
      );

    // 28. Scanner Screen – Real-Time X-Ray Preview with Live Camera
    case 28:
      const LiveXRayScanner = () => {
        const videoRef = React.useRef<HTMLVideoElement>(null);
        const canvasRef = React.useRef<HTMLCanvasElement>(null);
        const [cameraActive, setCameraActive] = React.useState(false);
        const [cameraError, setCameraError] = React.useState(false);
        const [errorMessage, setErrorMessage] = React.useState('');

        // Suppress camera-related console errors
        React.useEffect(() => {
          const originalError = console.error;
          console.error = (...args: any[]) => {
            const errorString = args.join(' ');
            if (errorString.includes('Camera access error') ||
              errorString.includes('NotAllowedError') ||
              errorString.includes('Permission denied')) {
              // Silently handle camera errors - UI will show user-friendly message
              return;
            }
            originalError.apply(console, args);
          };

          return () => {
            console.error = originalError;
          };
        }, []);
        const [capturedImage, setCapturedImage] = React.useState<string | null>(null);

        const startCamera = async () => {
          setCameraError(false);
          setErrorMessage('');

          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              video: {
                facingMode: 'environment', // Use back camera on mobile
                width: { ideal: 1920 },
                height: { ideal: 1080 }
              }
            });

            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              setCameraActive(true);
            }
          } catch (err: any) {
            // Error handling - UI will display user-friendly message
            setCameraError(true);

            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
              setErrorMessage('Camera permission denied. Please allow camera access in your browser settings.');
            } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
              setErrorMessage('No camera found on this device.');
            } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
              setErrorMessage('Camera is already in use by another application.');
            } else {
              setErrorMessage('Unable to access camera. Please check your device settings.');
            }
          }
        };

        React.useEffect(() => {
          // Start camera - errors are handled with UI, not console
          startCamera();

          // Cleanup: Stop camera when component unmounts
          return () => {
            if (videoRef.current && videoRef.current.srcObject) {
              const stream = videoRef.current.srcObject as MediaStream;
              stream.getTracks().forEach(track => track.stop());
            }
          };
        }, []);

        const capturePhoto = () => {
          if (videoRef.current && canvasRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(video, 0, 0);
              const imageData = canvas.toDataURL('image/png');
              setCapturedImage(imageData);

              // Stop camera after capture
              if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
              }
              setCameraActive(false);
            }
          }
        };

        const retakePhoto = () => {
          setCapturedImage(null);
          startCamera();
        };

        const acceptAndSend = () => {
          if (capturedImage) {
            setScanImage(capturedImage);
            navigate(32); // Go to Upload Progress screen
          } else {
            setScanImage('demo-mode');
            navigate(32);
          }
        };

        return (
          <div className="flex flex-col h-full bg-white font-sans">
            {/* Status Bar */}
            <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
              <span>12:30</span>
              <span>5G 100%</span>
            </div>

            {/* Header */}
            <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3 shadow-md">
              <button onClick={() => navigate(27)} className="hover:bg-white/10 rounded-full p-1.5 transition-colors">
                <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
              </button>
              <h1 className="text-lg font-semibold">{capturedImage ? 'Review Scan' : 'Live X-Ray'}</h1>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-50 overflow-y-auto">
              <div className="p-4 pb-6 space-y-4">
                {/* X-Ray Preview Card */}
                <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  {!capturedImage ? (
                    // Camera View
                    <div className="relative aspect-[3/4] bg-slate-800">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Scanning Guide Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="border-2 border-blue-400 rounded-lg w-4/5 h-4/5 opacity-50"></div>
                      </div>
                      <canvas ref={canvasRef} className="hidden" />
                    </div>
                  ) : (
                    // Captured X-Ray Review
                    <div className="relative aspect-[3/4]">
                      <img
                        src={capturedImage}
                        alt="Captured X-Ray"
                        className="w-full h-full object-cover"
                      />
                      {/* Scan Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5">
                        <h3 className="text-white font-bold text-base mb-2">Scan #001</h3>
                        <div className="flex items-center justify-between text-xs text-white/90">
                          <span>Exposure: Normal • 12:42 PM</span>
                          <span className="bg-[#2563EB] px-3 py-1 rounded-full font-semibold">Sharpness: High</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {capturedImage ? (
                  <div className="space-y-4">
                    {/* Quality Check Info */}
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 flex gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <AlertTriangle className="w-5 h-5 text-[#2563EB]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-blue-900 text-sm font-bold mb-1">Quality Check:</p>
                        <p className="text-blue-700 text-xs leading-relaxed">
                          Please ensure no motion blur is present. This scan will be permanently archived.
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={retakePhoto}
                        className="h-16 bg-white border-2 border-slate-300 text-slate-700 font-bold text-sm rounded-2xl transition-all active:scale-[0.97] hover:border-slate-400 hover:bg-slate-50 flex flex-col items-center justify-center gap-1 shadow-sm"
                      >
                        <RefreshCw className="w-5 h-5" />
                        <span>Retake</span>
                      </button>
                      <button
                        onClick={acceptAndSend}
                        className="h-16 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-sm rounded-2xl transition-all active:scale-[0.97] flex flex-col items-center justify-center gap-1 shadow-lg"
                      >
                        <Check className="w-5 h-5" />
                        <span>Accept & Send</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  // Capture Button
                  <button
                    onClick={capturePhoto}
                    className="w-full h-16 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-base rounded-2xl transition-all active:scale-[0.98] shadow-lg flex items-center justify-center gap-3"
                  >
                    <Camera className="w-6 h-6" />
                    Capture X-Ray Scan
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      };

      return <LiveXRayScanner />;

    // 29. Scanner Retake Confirmation Screen
    case 29:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(28)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">Retake Confirmation</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-8 pb-8 overflow-y-auto flex flex-col items-center">
            {/* Warning Icon */}
            <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mb-6">
              <RefreshCw className="w-12 h-12 text-yellow-600" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Retake X-Ray?</h2>
            <p className="text-slate-400 text-sm text-center mb-8 max-w-xs">
              Are you sure you want to discard the current scan and retake the X-ray?
            </p>

            {/* Reason Selection */}
            <div className="w-full max-w-md space-y-3 mb-8">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 px-1">Select Reason</div>

              {[
                'Poor image quality',
                'Incorrect positioning',
                'Patient movement',
                'Technical error',
                'Other'
              ].map((reason, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRetakeReason(reason)}
                  className={`w-full bg-white rounded-xl border px-4 py-3.5 text-left transition-all flex items-center justify-between ${selectedRetakeReason === reason
                      ? 'border-[#2563EB] bg-blue-50'
                      : 'border-slate-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                >
                  <span className={`text-sm font-medium ${selectedRetakeReason === reason ? 'text-[#2563EB]' : 'text-slate-900'
                    }`}>
                    {reason}
                  </span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selectedRetakeReason === reason
                      ? 'border-[#2563EB] bg-[#2563EB]'
                      : 'border-slate-300'
                    }`}>
                    {selectedRetakeReason === reason && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-md space-y-3">
              <button
                onClick={() => {
                  if (selectedRetakeReason) {
                    toast.success(`Retaking scan: ${selectedRetakeReason}`);
                    navigate(28);
                  } else {
                    toast.error('Please select a reason');
                  }
                }}
                disabled={!selectedRetakeReason}
                className="w-full h-12 bg-[#2563EB] hover:bg-[#1d4ed8] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl transition-all active:scale-[0.98]"
              >
                Confirm Retake
              </button>
              <button
                onClick={() => navigate(30)}
                className="w-full h-12 bg-white border border-slate-200 hover:bg-gray-50 text-slate-900 font-semibold text-sm rounded-xl transition-all active:scale-[0.98]"
              >
                Cancel, Keep Current Scan
              </button>
            </div>
          </div>
        </div>
      );

    // 30. Scan Quality Validation Screen
    case 30:
      return (
        <div className="flex flex-col h-full bg-black font-sans">
          {/* Status Bar */}
          <div className="bg-black text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Header */}
          <div className="bg-black text-white px-4 py-4 shrink-0 flex items-center justify-between">
            <button onClick={() => navigate(28)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">Quality Check</h1>
            <button onClick={() => navigate(29)} className="hover:bg-white/10 rounded-full px-3 py-1.5 transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* X-Ray Image Preview */}
          <div className="flex-1 bg-slate-900 flex items-center justify-center p-6">
            <div className="w-full max-w-md aspect-[3/4] bg-slate-800 rounded-xl border-2 border-green-500/50 relative overflow-hidden">
              {/* Simulated X-Ray */}
              <div className="absolute inset-0 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 opacity-50"></div>

              {/* Chest X-Ray Simulation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Activity className="w-32 h-32 text-slate-600" />
              </div>

              {/* Quality Badge */}
              <div className="absolute top-4 right-4 bg-green-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-green-500 text-xs font-medium">Good Quality</span>
              </div>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Patient</span>
                  <span className="text-white font-medium">John Doe • MRN-5643</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Captured</span>
                  <span className="text-white font-medium">Just now</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Resolution</span>
                  <span className="text-white font-medium">2048 × 2560</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quality Indicators */}
          <div className="bg-black px-6 py-4">
            <div className="max-w-md mx-auto grid grid-cols-3 gap-3 mb-4">
              <div className="bg-slate-800 rounded-lg p-3 text-center">
                <div className="text-green-500 text-xl font-bold">95%</div>
                <div className="text-slate-400 text-xs mt-1">Clarity</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3 text-center">
                <div className="text-green-500 text-xl font-bold">92%</div>
                <div className="text-slate-400 text-xs mt-1">Contrast</div>
              </div>
              <div className="bg-slate-800 rounded-lg p-3 text-center">
                <div className="text-green-500 text-xl font-bold">98%</div>
                <div className="text-slate-400 text-xs mt-1">Position</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="max-w-md mx-auto space-y-3">
              <button
                onClick={() => navigate(31)}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Approve & Send to AI
              </button>
              <button
                onClick={() => navigate(29)}
                className="w-full h-12 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Retake X-Ray
              </button>
            </div>
          </div>
        </div>
      );

    // 31. Upload & Send to AI Screen
    case 31:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(30)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">Send to AI Analysis</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-8 pb-8 overflow-y-auto flex flex-col items-center">
            {/* AI Icon */}
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative">
              <Zap className="w-12 h-12 text-[#2563EB]" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Ready for AI Analysis</h2>
            <p className="text-slate-400 text-sm text-center mb-8 max-w-xs">
              X-ray scan has been validated and is ready to be processed by AI
            </p>

            {/* Scan Summary */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4 mb-6">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div className="w-16 h-20 bg-slate-800 rounded-lg flex items-center justify-center">
                  <Image className="w-8 h-8 text-slate-400" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 mb-1">Chest X-Ray (PA)</div>
                  <div className="text-xs text-slate-400">2048 × 2560 pixels • 2.4 MB</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Patient</span>
                  <span className="text-sm font-medium text-slate-900">John Doe</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">MRN</span>
                  <span className="text-sm font-medium text-slate-900">MRN-5643</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Quality Score</span>
                  <span className="text-sm font-medium text-green-600">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Technician</span>
                  <span className="text-sm font-medium text-slate-900">{profileName}</span>
                </div>
              </div>
            </div>

            {/* Processing Info */}
            <div className="w-full max-w-md bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 mb-8">
              <Zap className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-blue-900 mb-1">AI Processing</div>
                <div className="text-xs text-blue-700">The scan will be analyzed for potential abnormalities. Results will be available to doctors shortly.</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-md space-y-3">
              <button
                onClick={() => navigate(32)}
                className="w-full h-12 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-sm rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Upload & Send to AI
              </button>
              <button
                onClick={() => navigate(30)}
                className="w-full h-12 bg-white border border-slate-200 hover:bg-gray-50 text-slate-900 font-medium text-sm rounded-xl transition-all active:scale-[0.98]"
              >
                Review Again
              </button>
            </div>
          </div>
        </div>
      );

    // 32. Upload Progress Screen
    case 32:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <h1 className="text-lg font-medium mx-auto">Uploading...</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-16 pb-8 overflow-y-auto flex flex-col items-center">
            {/* Upload Animation */}
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 relative">
              <Upload className="w-12 h-12 text-[#2563EB] animate-pulse" />
              <div className="absolute inset-0 border-4 border-transparent border-t-[#2563EB] rounded-full animate-spin"></div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Uploading X-Ray</h2>
            <p className="text-slate-400 text-sm text-center mb-12">
              Sending scan to AI analysis system...
            </p>

            {/* Progress Bar */}
            <div className="w-full max-w-md mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Upload Progress</span>
                <span className="text-[#2563EB] font-semibold">{uploadProgress}%</span>
              </div>
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2563EB] rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="text-xs text-slate-400 mb-12">
              {uploadProgress < 30 && 'Preparing file...'}
              {uploadProgress >= 30 && uploadProgress < 60 && 'Uploading to server...'}
              {uploadProgress >= 60 && uploadProgress < 90 && 'Processing data...'}
              {uploadProgress >= 90 && 'Finalizing...'}
            </div>

            {/* Upload Stats */}
            <div className="w-full max-w-md space-y-3">
              <div className="bg-white rounded-xl border border-slate-100 px-4 py-3 flex justify-between">
                <span className="text-sm text-slate-500">File Size</span>
                <span className="text-sm font-medium text-slate-900">2.4 MB</span>
              </div>
              <div className="bg-white rounded-xl border border-slate-100 px-4 py-3 flex justify-between">
                <span className="text-sm text-slate-500">Connection</span>
                <span className="text-sm font-medium text-green-600">5G • Excellent</span>
              </div>
              <div className="bg-white rounded-xl border border-slate-100 px-4 py-3 flex justify-between">
                <span className="text-sm text-slate-500">Estimated Time</span>
                <span className="text-sm font-medium text-slate-900">
                  {uploadProgress < 100 ? `${Math.ceil((100 - uploadProgress) / 10)}s` : 'Complete'}
                </span>
              </div>
            </div>

            <div className="mt-12 text-xs text-slate-400 text-center max-w-xs">
              Please do not close this screen or navigate away during upload
            </div>
          </div>
        </div>
      );

    // 33. Upload Success Screen
    case 33:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <h1 className="text-lg font-medium mx-auto">Upload Complete</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-16 pb-8 overflow-y-auto flex flex-col items-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-2">Upload Successful!</h2>
            <p className="text-slate-400 text-sm text-center mb-12 max-w-xs">
              X-ray has been sent to AI analysis. Doctors will be notified when results are ready.
            </p>

            {/* Success Details */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4 mb-8">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Scan Uploaded</div>
                  <div className="text-xs text-slate-400">AI analysis in progress</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Scan ID</span>
                  <span className="text-sm font-medium text-[#2563EB]">SCN-{Math.floor(Math.random() * 10000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Patient</span>
                  <span className="text-sm font-medium text-slate-900">John Doe</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Uploaded</span>
                  <span className="text-sm font-medium text-slate-900">Just now</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Status</span>
                  <span className="text-sm font-medium text-yellow-600">Processing</span>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="w-full max-w-md bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 mb-8">
              <Activity className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-semibold text-blue-900 mb-1">What's Next?</div>
                <div className="text-xs text-blue-700">AI will analyze the scan for abnormalities. Estimated processing time: 2-5 minutes.</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-md space-y-3">
              <button
                onClick={() => {
                  // Simulate AI analysis with random priority
                  const priorities: ('Normal' | 'Urgent' | 'Critical')[] = ['Normal', 'Urgent', 'Critical'];
                  const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
                  setAiPriority(randomPriority);
                  setTimeout(() => navigate(62), 2000); // Simulate processing time
                }}
                className="w-full h-12 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-sm rounded-xl transition-all active:scale-[0.98]"
              >
                View AI Analysis Results
              </button>
              <button
                onClick={() => navigate(25)}
                className="w-full h-12 bg-white border border-slate-200 hover:bg-gray-50 text-slate-900 font-medium text-sm rounded-xl transition-all active:scale-[0.98]"
              >
                Register New Patient
              </button>
              <button
                onClick={() => navigate(23)}
                className="w-full h-12 text-slate-400 hover:text-slate-600 font-medium text-sm transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      );

    // 34. Scan History List Screen
    case 34:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold">Scan History</h1>
              <button className="hover:bg-white/10 rounded-full p-2 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium">
                All
              </button>
              <button className="px-4 py-2 bg-transparent hover:bg-white/10 rounded-lg text-sm text-blue-100">
                Processing
              </button>
              <button className="px-4 py-2 bg-transparent hover:bg-white/10 rounded-lg text-sm text-blue-100">
                Completed
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-4 pb-24 overflow-y-auto">
            <div className="space-y-3">
              {[
                { id: 'SCN-8472', patient: 'Sarah Wilson', mrn: 'MRN-4521', date: 'Today, 11:20 AM', status: 'Processing', statusColor: 'yellow' },
                { id: 'SCN-8471', patient: 'John Davis', mrn: 'MRN-3892', date: 'Today, 10:15 AM', status: 'Completed', statusColor: 'green' },
                { id: 'SCN-8470', patient: 'Emily Chen', mrn: 'MRN-7234', date: 'Today, 09:30 AM', status: 'Completed', statusColor: 'green' },
                { id: 'SCN-8469', patient: 'Michael Brown', mrn: 'MRN-2156', date: 'Yesterday, 4:45 PM', status: 'Completed', statusColor: 'green' },
                { id: 'SCN-8468', patient: 'Lisa Anderson', mrn: 'MRN-9823', date: 'Yesterday, 3:20 PM', status: 'Completed', statusColor: 'green' },
                { id: 'SCN-8467', patient: 'David Martinez', mrn: 'MRN-6547', date: 'Yesterday, 2:10 PM', status: 'Completed', statusColor: 'green' }
              ].map((scan, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(35)}
                  className="w-full bg-white rounded-xl border border-slate-100 p-4 shadow-sm hover:border-blue-400 transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{scan.patient}</div>
                        <div className="text-xs text-slate-400">{scan.mrn}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Scan ID</div>
                      <div className="text-sm font-medium text-[#2563EB]">{scan.id}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs font-medium px-2 py-1 rounded-full mb-1 ${scan.statusColor === 'yellow' ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'
                        }`}>
                        {scan.status}
                      </div>
                      <div className="text-xs text-slate-400">{scan.date}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3">
            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => navigate(23)} className="flex flex-col items-center py-2 text-slate-400">
                <Layout className="w-6 h-6 mb-1" />
                <span className="text-xs">Home</span>
              </button>
              <button onClick={() => navigate(25)} className="flex flex-col items-center py-2 text-slate-400">
                <UserPlus className="w-6 h-6 mb-1" />
                <span className="text-xs">Register</span>
              </button>
              <button className="flex flex-col items-center py-2 text-[#2563EB]">
                <History className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">History</span>
              </button>
              <button onClick={() => navigate(61)} className="flex flex-col items-center py-2 text-slate-400">
                <Settings className="w-6 h-6 mb-1" />
                <span className="text-xs">Settings</span>
              </button>
            </div>
          </div>
        </div>
      );

    // 35. Scan History Detail Screen (with Processing Timeline)
    case 35:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(34)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">Scan Details</h1>
            <button className="ml-auto hover:bg-white/10 rounded-full p-2 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-6 pb-8 overflow-y-auto">
            {/* Scan ID Badge */}
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-2 bg-blue-50 rounded-full mb-2">
                <span className="text-sm font-bold text-[#2563EB]">SCN-8472</span>
              </div>
              <div className="text-xs text-slate-400">Scan Identification Number</div>
            </div>

            {/* Patient Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-[#2563EB]" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">Sarah Wilson</div>
                  <div className="text-sm text-slate-400">MRN-4521</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Date of Birth</div>
                  <div className="text-sm font-medium text-slate-900">Mar 15, 1985</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Gender</div>
                  <div className="text-sm font-medium text-slate-900">Female</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Scan Date</div>
                  <div className="text-sm font-medium text-slate-900">Today, 11:20 AM</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Technician</div>
                  <div className="text-sm font-medium text-slate-900">{profileName}</div>
                </div>
              </div>
            </div>

            {/* Processing Timeline */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Processing Timeline</h3>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-slate-200"></div>

                {/* Timeline Steps */}
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0 relative z-10">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="font-semibold text-slate-900 text-sm mb-1">X-Ray Captured</div>
                      <div className="text-xs text-slate-400">Today at 11:20 AM</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0 relative z-10">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="font-semibold text-slate-900 text-sm mb-1">Quality Validated</div>
                      <div className="text-xs text-slate-400">Today at 11:21 AM</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0 relative z-10">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="font-semibold text-slate-900 text-sm mb-1">Uploaded to Server</div>
                      <div className="text-xs text-slate-400">Today at 11:22 AM</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center shrink-0 relative z-10">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="font-semibold text-slate-900 text-sm mb-1">AI Analysis in Progress</div>
                      <div className="text-xs text-slate-400">Estimated completion: 2-3 minutes</div>
                      <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full animate-pulse" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center shrink-0 relative z-10">
                      <Clock className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="font-semibold text-slate-400 text-sm mb-1">Doctor Review</div>
                      <div className="text-xs text-slate-400">Pending AI completion</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scan Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Scan Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">View Type</span>
                  <span className="text-sm font-medium text-slate-900">PA Chest</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Resolution</span>
                  <span className="text-sm font-medium text-slate-900">2048 × 2560</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">File Size</span>
                  <span className="text-sm font-medium text-slate-900">2.4 MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Quality Score</span>
                  <span className="text-sm font-medium text-green-600">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Exposure</span>
                  <span className="text-sm font-medium text-slate-900">75 kVp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // 61. Technician Settings Screen
    case 61:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(23)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">Settings</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-6 pb-24 overflow-y-auto">
            {/* Profile Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-[#2563EB]" />
                  </div>
                  <button
                    onClick={() => navigate(98)}
                    className="absolute bottom-0 right-0 w-7 h-7 bg-[#2563EB] rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-blue-700 transition-colors"
                  >
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg">{profileName}</h3>
                  <p className="text-sm text-slate-400">X-Ray Technician</p>
                  <div className="mt-1 inline-block px-2 py-0.5 bg-blue-50 rounded-full">

                  </div>
                </div>
                <button
                  onClick={() => navigate(98)}
                  className="hover:bg-gray-50 rounded-full p-2 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Preferences */}
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 px-1">Preferences</h2>

              {/* Theme */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-3">
                <button
                  onClick={() => navigate(90)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                      {appTheme === 'dark' ? <Moon className="w-5 h-5 text-purple-600" /> : <Sun className="w-5 h-5 text-purple-600" />}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-900 text-sm">Theme</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {appTheme === 'light' ? 'Light Mode' : appTheme === 'dark' ? 'Dark Mode' : 'System Default'}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-3">
                <button
                  onClick={() => navigate(91)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                      <Bell className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-900 text-sm">Notifications</div>
                      <div className="text-xs text-slate-400 mt-0.5">Manage alerts & sounds</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Language */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                <button
                  onClick={() => navigate(92)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                      <Globe className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-900 text-sm">Language</div>
                      <div className="text-xs text-slate-400 mt-0.5">{selectedLanguage}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Security */}
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 px-1">Security & Privacy</h2>

              {/* Privacy Settings */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-3">
                <button
                  onClick={() => navigate(93)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-900 text-sm">Privacy & Security</div>
                      <div className="text-xs text-slate-400 mt-0.5">Manage your data & access</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Biometric Authentication */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center">
                      <Fingerprint className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-900 text-sm">Biometric Login</div>
                      <div className="text-xs text-slate-400 mt-0.5">Use fingerprint to login</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Support & Info */}
            <div className="mb-6">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 px-1">Support & Information</h2>

              {/* Help & Support */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-3">
                <button
                  onClick={() => navigate(94)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-900 text-sm">Help & Support</div>
                      <div className="text-xs text-slate-400 mt-0.5">FAQs, tutorials & contact us</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* About App */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-3">
                <button
                  onClick={() => navigate(96)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-900 text-sm">About App</div>
                      <div className="text-xs text-slate-400 mt-0.5">Version 2.4.1 • Terms & Privacy</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Feedback */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100">
                <button
                  onClick={() => navigate(97)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-pink-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-slate-900 text-sm">Send Feedback</div>
                      <div className="text-xs text-slate-400 mt-0.5">Help us improve the app</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Logout */}
            <div className="mb-4">
              <button
                onClick={() => navigate(95)}
                className="w-full bg-white rounded-2xl shadow-sm border border-red-200 px-5 py-4 flex items-center justify-between hover:bg-red-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-red-600 text-sm">Logout</div>
                    <div className="text-xs text-red-400 mt-0.5">Sign out from your account</div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-red-600" />
              </button>
            </div>

            {/* Version Footer */}
            <div className="text-center pt-2 pb-4">
              <p className="text-xs text-slate-400">CXRT AI • Version 2.4.1</p>
              <p className="text-xs text-slate-300 mt-1">© 2026 MediScan Technologies</p>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3">
            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => navigate(23)} className="flex flex-col items-center py-2 text-slate-400">
                <Layout className="w-6 h-6 mb-1" />
                <span className="text-xs">Home</span>
              </button>
              <button onClick={() => navigate(25)} className="flex flex-col items-center py-2 text-slate-400">
                <UserPlus className="w-6 h-6 mb-1" />
                <span className="text-xs">Register</span>
              </button>
              <button onClick={() => navigate(34)} className="flex flex-col items-center py-2 text-slate-400">
                <History className="w-6 h-6 mb-1" />
                <span className="text-xs">History</span>
              </button>
              <button className="flex flex-col items-center py-2 text-[#2563EB]">
                <Settings className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>
      );

    // 62. AI Analysis Results Screen - Priority Determination
    case 62:
      const priorityConfig = {
        Critical: {
          color: 'red',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-500',
          textColor: 'text-red-600',
          icon: AlertTriangle,
          message: 'Immediate medical attention required',
          description: 'High-risk findings detected. This case has been automatically escalated to senior doctors.',
          confidence: '96%',
          findings: ['Possible pneumothorax', 'Enlarged cardiac silhouette', 'Abnormal lung opacity']
        },
        Urgent: {
          color: 'orange',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-500',
          textColor: 'text-orange-600',
          icon: AlertCircle,
          message: 'Prompt medical review recommended',
          description: 'Moderate-risk findings detected. This case requires doctor review within the next few hours.',
          confidence: '89%',
          findings: ['Mild infiltrates detected', 'Possible early-stage infection', 'Minor pleural effusion']
        },
        Normal: {
          color: 'green',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-500',
          textColor: 'text-green-600',
          icon: CheckCircle,
          message: 'No critical findings detected',
          description: 'AI analysis shows normal patterns. This case will be added to the standard doctor review queue.',
          confidence: '92%',
          findings: ['Clear lung fields', 'Normal cardiac size', 'No acute abnormalities']
        }
      };

      const config = priorityConfig[aiPriority];
      const PriorityIcon = config.icon;

      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(33)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">AI Analysis Complete</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-8 pb-8 overflow-y-auto">
            {/* Priority Badge */}
            <div className="text-center mb-6">
              <div className={`w-24 h-24 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 border-4 ${config.borderColor}`}>
                <PriorityIcon className={`w-12 h-12 ${config.textColor}`} />
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 ${config.bgColor} ${config.borderColor} border-2 rounded-full mb-2`}>
                <div className={`w-2 h-2 ${config.textColor.replace('text', 'bg')} rounded-full animate-pulse`}></div>
                <span className={`${config.textColor} font-bold text-lg uppercase`}>{aiPriority} Priority</span>
              </div>
              <p className="text-slate-500 text-sm">{config.message}</p>
            </div>

            {/* Analysis Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-4">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-900">AI Analysis Summary</h3>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#2563EB]" />
                  <span className="text-sm text-[#2563EB] font-medium">Confidence: {config.confidence}</span>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-4">{config.description}</p>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Key Findings:</div>
                {config.findings.map((finding, index) => (
                  <div key={index} className="flex items-start gap-3 bg-slate-50 rounded-lg p-3">
                    <div className={`w-1.5 h-1.5 ${config.textColor.replace('text', 'bg')} rounded-full mt-1.5 shrink-0`}></div>
                    <span className="text-sm text-slate-700">{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient & Scan Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-4">
              <h3 className="font-semibold text-slate-900 mb-4">Scan Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Patient</span>
                  <span className="text-sm font-medium text-slate-900">John Doe (MRN-5643)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Scan Type</span>
                  <span className="text-sm font-medium text-slate-900">Chest X-Ray (PA)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Analysis Time</span>
                  <span className="text-sm font-medium text-slate-900">3.2 seconds</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Technician</span>
                  <span className="text-sm font-medium text-slate-900">{profileName}</span>
                </div>
              </div>
            </div>

            {/* Doctor Notification Status */}
            <div className={`${config.bgColor} border ${config.borderColor} rounded-xl p-4 flex gap-3 mb-6`}>
              <Bell className={`w-5 h-5 ${config.textColor} shrink-0 mt-0.5`} />
              <div>
                <div className={`text-sm font-semibold ${config.textColor} mb-1`}>
                  {aiPriority === 'Critical' ? 'Doctors Notified Immediately' :
                    aiPriority === 'Urgent' ? 'Doctors Will Be Notified' :
                      'Added to Review Queue'}
                </div>
                <div className="text-xs text-slate-600">
                  {aiPriority === 'Critical' ? 'Senior doctors and on-call staff have been alerted via emergency notification.' :
                    aiPriority === 'Urgent' ? 'Assigned doctors will receive a priority notification for review.' :
                      'This scan will appear in the standard doctor review dashboard.'}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => navigate(34)}
                className="w-full h-12 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-sm rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <History className="w-5 h-5" />
                View in Scan History
              </button>
              <button
                onClick={() => navigate(25)}
                className="w-full h-12 bg-white border border-slate-200 hover:bg-gray-50 text-slate-900 font-medium text-sm rounded-xl transition-all active:scale-[0.98]"
              >
                Register New Patient
              </button>
              <button
                onClick={() => navigate(23)}
                className="w-full h-12 text-slate-400 hover:text-slate-600 font-medium text-sm transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      );

    // 90. App Appearance Screen
    case 90:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(61)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">App Appearance</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-6 pb-8 overflow-y-auto">
            {/* Theme Options */}
            <div className="space-y-3 mb-6">
              {/* Light Mode */}
              <button
                onClick={() => setAppTheme('light')}
                className={`w-full bg-white rounded-2xl border-2 p-4 transition-all ${appTheme === 'light' ? 'border-[#2563EB] shadow-lg shadow-blue-100' : 'border-slate-100'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all ${appTheme === 'light' ? 'bg-blue-50' : 'bg-gray-100'
                    }`}>
                    <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 shadow-sm"></div>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-slate-900 text-base">Light</div>
                  </div>
                  {appTheme === 'light' && (
                    <div className="w-6 h-6 bg-[#2563EB] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>

              {/* Dark Mode */}
              <button
                onClick={() => setAppTheme('dark')}
                className={`w-full bg-white rounded-2xl border-2 p-4 transition-all ${appTheme === 'dark' ? 'border-[#2563EB] shadow-lg shadow-blue-100' : 'border-slate-100'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all ${appTheme === 'dark' ? 'bg-blue-50' : 'bg-gray-100'
                    }`}>
                    <div className="w-12 h-12 bg-slate-800 rounded-lg shadow-sm"></div>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-slate-900 text-base">Dark</div>
                  </div>
                  {appTheme === 'dark' && (
                    <div className="w-6 h-6 bg-[#2563EB] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>

              {/* System Mode */}
              <button
                onClick={() => setAppTheme('system')}
                className={`w-full bg-white rounded-2xl border-2 p-4 transition-all ${appTheme === 'system' ? 'border-[#2563EB] shadow-lg shadow-blue-100' : 'border-slate-100'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center transition-all ${appTheme === 'system' ? 'bg-blue-50' : 'bg-gray-100'
                    }`}>
                    <div className="w-12 h-12 rounded-lg flex overflow-hidden">
                      <div className="w-1/2 bg-white border-r border-gray-200"></div>
                      <div className="w-1/2 bg-slate-800"></div>
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-slate-900 text-base">System</div>
                  </div>
                  {appTheme === 'system' && (
                    <div className="w-6 h-6 bg-[#2563EB] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
            </div>

            {/* Dark Mode Recommended Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3">
              <div className="shrink-0">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 text-sm mb-1">Dark Mode Recommended</h3>
                <p className="text-blue-700 text-xs leading-relaxed">
                  Dark mode helps maintain visual clarity and reduces eye strain during diagnostic imaging reviews.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    // 91. Notifications Screen
    case 91:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(61)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">Notifications</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-6 pb-8 overflow-y-auto">
            {/* Notification Options */}
            <div className="space-y-3">
              {/* Shift Alerts */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">Shift Alerts</div>
                      <div className="text-xs text-slate-400 mt-0.5">Upcoming shift reminders</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                      onChange={(e) => {
                        // Toggle logic here
                      }}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>

              {/* New Assignments */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center shrink-0">
                      <UserPlus className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">New Assignments</div>
                      <div className="text-xs text-slate-400 mt-0.5">When new patients are allocated to you</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                      onChange={(e) => {
                        // Toggle logic here
                      }}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>

              {/* Urgent Scans */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">Urgent Scans</div>
                      <div className="text-xs text-slate-400 mt-0.5">Priority & STAT requests</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                      onChange={(e) => {
                        // Toggle logic here
                      }}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // 92. Language Selection Screen
    case 92:
      const languages = [
        { code: 'EN', name: 'English (US)', suggested: true },
        { code: 'SP', name: 'Spanish (Español)', suggested: true },
        { code: 'CH', name: 'Chinese (Simplified)', suggested: false },
        { code: 'FR', name: 'French (Français)', suggested: false },
        { code: 'DE', name: 'German (Deutsch)', suggested: false },
        { code: 'HI', name: 'Hindi (हिंदी)', suggested: false },
        { code: 'JA', name: 'Japanese (日本語)', suggested: false },
        { code: 'KO', name: 'Korean (한국어)', suggested: false },
      ];

      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(61)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">Language</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-6 pb-8 overflow-y-auto">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search languages..."
                  className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                />
              </div>
            </div>

            {/* Suggested Languages */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 px-1">Suggested</h3>
              <div className="space-y-2">
                {languages.filter(l => l.suggested).map((lang, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedLanguage(lang.name)}
                    className={`w-full bg-white rounded-xl border p-4 flex items-center gap-4 transition-all ${selectedLanguage === lang.name
                        ? 'border-[#2563EB] shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-xs ${selectedLanguage === lang.name
                        ? 'bg-blue-50 text-[#2563EB]'
                        : 'bg-gray-100 text-slate-500'
                      }`}>
                      {lang.code}
                    </div>
                    <div className="flex-1 text-left">
                      <span className="text-sm font-medium text-slate-900">{lang.name}</span>
                    </div>
                    {selectedLanguage === lang.name && (
                      <div className="w-6 h-6 bg-[#2563EB] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* All Languages */}
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 px-1">All Languages</h3>
              <div className="space-y-2">
                {languages.filter(l => !l.suggested).map((lang, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedLanguage(lang.name)}
                    className={`w-full bg-white rounded-xl border p-4 flex items-center gap-4 transition-all ${selectedLanguage === lang.name
                        ? 'border-[#2563EB] shadow-md'
                        : 'border-slate-200 hover:border-slate-300'
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold text-xs ${selectedLanguage === lang.name
                        ? 'bg-blue-50 text-[#2563EB]'
                        : 'bg-gray-100 text-slate-500'
                      }`}>
                      {lang.code}
                    </div>
                    <div className="flex-1 text-left">
                      <span className="text-sm font-medium text-slate-900">{lang.name}</span>
                    </div>
                    {selectedLanguage === lang.name && (
                      <div className="w-6 h-6 bg-[#2563EB] rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    // 93. Privacy & Security Screen
    case 93:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(61)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">Privacy & Security</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-6 pb-8 overflow-y-auto">
            <div className="space-y-4">
              {/* HIPAA Compliant */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 text-sm mb-1">HIPAA Compliant</div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Your data is encrypted with enterprise-grade encryption
                    </p>
                  </div>
                </div>
              </div>

              {/* Usage Analytics */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center shrink-0">
                      <Activity className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">Usage Analytics</div>
                      <div className="text-xs text-slate-400 mt-0.5">Help improve the app</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
                  </label>
                </div>
              </div>

              {/* Show Status */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                      <Eye className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">Show Status</div>
                      <div className="text-xs text-slate-400 mt-0.5">Visible to other staff</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
                  </label>
                </div>
              </div>

              {/* Biometric Login */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center shrink-0">
                      <Fingerprint className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">Biometric Login</div>
                      <div className="text-xs text-slate-400 mt-0.5">Face ID / Touch ID</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // 94. Help & Support Screen
    case 94:
      const helpTopics = [
        'Scanner Connection Failed',
        'Patient ID Not Found',
        'Image Upload Error',
        'Shift Scheduling',
        'Reset Password'
      ];

      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(61)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">Help & Support</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-6 pb-24 overflow-y-auto">
            {/* Need Immediate Help Card */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 mb-6 shadow-lg">
              <div className="flex flex-col items-center text-center text-white">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Need Immediate Help?</h3>
                <p className="text-sm text-blue-50 mb-5 leading-relaxed">
                  Our support team is available 24/7 for critical issues
                </p>
                <button className="w-full bg-white text-blue-600 py-3 px-6 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors shadow-md">
                  Start Live Chat
                </button>
              </div>
            </div>

            {/* Common Topics */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 px-1">Common Topics</h3>

              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search help articles..."
                    className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Help Topics List */}
              <div className="space-y-2">
                {helpTopics.map((topic, idx) => (
                  <button
                    key={idx}
                    className="w-full bg-white rounded-xl border border-slate-100 p-4 flex items-center justify-between hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
                  >
                    <span className="text-sm font-medium text-slate-900">{topic}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Contact Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-4 flex gap-3 shadow-lg">
            <button className="flex-1 bg-blue-50 text-blue-600 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
              <Phone className="w-4 h-4" />
              Call IT
            </button>
            <button className="flex-1 bg-blue-50 text-blue-600 py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
              <Mail className="w-4 h-4" />
              Email
            </button>
          </div>
        </div>
      );

    // 95. Sign Out Modal (overlay on Settings)
    case 95:
      return (
        <div className="flex flex-col h-full bg-white font-sans relative">
          {/* Background Settings Screen (dimmed) */}
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-10"></div>

          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Settings Header (behind modal) */}
          <div className="bg-[#2563EB] text-white px-6 py-5 shrink-0">
            <h1 className="text-2xl font-semibold">Settings</h1>
          </div>

          {/* Greyed out content behind */}
          <div className="flex-1 bg-gray-50 px-6 pt-6 relative">
            <div className="opacity-30">
              <div className="mb-6">
                <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 px-1">Preferences</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 mb-3 p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-50 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">Appearance</div>
                      <div className="text-xs text-slate-400">Theme & Display</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-amber-50 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">Notifications</div>
                      <div className="text-xs text-slate-400">Alerts & Sounds</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign Out Modal */}
            <div className="absolute inset-0 flex items-center justify-center px-6 z-20">
              <div className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-sm">
                <h2 className="text-xl font-bold text-slate-900 text-center mb-2">Sign Out</h2>
                <p className="text-sm text-slate-500 text-center mb-6">
                  Are you sure you want to sign out?
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setRole(null);
                      navigate(2);
                    }}
                    className="w-full bg-[#2563EB] text-white py-3.5 px-6 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-md"
                  >
                    Yes, Log Out
                  </button>
                  <button
                    onClick={() => navigate(61)}
                    className="w-full bg-gray-100 text-slate-700 py-3.5 px-6 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Nav (greyed out) */}
          <div className="opacity-30">
            <TechNav currentScreen={61} navigate={navigate} />
          </div>
        </div>
      );

    // 96. About App Screen
    case 96:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(61)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">About App</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-6 pb-8 overflow-y-auto">
            {/* App Icon & Name */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mb-4 shadow-lg">
                <Activity className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">CXRT AI</h2>
              <p className="text-sm text-slate-500">Chest X-Ray Triage System</p>
            </div>

            {/* Version Info */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 px-1">Version Information</h3>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100">
                <div className="px-5 py-4 flex items-center justify-between">
                  <span className="text-sm text-slate-600">Version</span>
                  <span className="text-sm font-semibold text-slate-900">2.4.1</span>
                </div>
                <div className="px-5 py-4 flex items-center justify-between">
                  <span className="text-sm text-slate-600">Build Number</span>
                  <span className="text-sm font-semibold text-slate-900">20240312</span>
                </div>
                <div className="px-5 py-4 flex items-center justify-between">
                  <span className="text-sm text-slate-600">Last Updated</span>
                  <span className="text-sm font-semibold text-slate-900">Mar 2, 2026</span>
                </div>
                <div className="px-5 py-4 flex items-center justify-between">
                  <span className="text-sm text-slate-600">AI Model</span>
                  <span className="text-sm font-semibold text-slate-900">v3.2.1</span>
                </div>
              </div>
            </div>

            {/* App Info */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 px-1">Application</h3>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-2xl border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-slate-900">Terms of Service</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>

                <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-slate-900">Privacy Policy</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>

                <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-b-2xl">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-slate-900">Open Source Licenses</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center">
              <p className="text-xs text-slate-400 leading-relaxed">
                © 2026 CXRT AI Healthcare Solutions<br />
                All rights reserved. HIPAA Compliant.
              </p>
            </div>
          </div>
        </div>
      );

    // 97. Send Feedback Screen
    case 97:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center gap-3">
            <button onClick={() => navigate(61)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
              <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <h1 className="text-lg font-medium">Send Feedback</h1>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-6 pb-24 overflow-y-auto">
            {/* Feedback Type */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 block px-1">
                Feedback Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['Bug Report', 'Feature Request', 'General Feedback', 'Complaint'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFeedbackType(type)}
                    className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${feedbackType === type
                        ? 'bg-[#2563EB] text-white shadow-md'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300'
                      }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 block px-1">
                Subject
              </label>
              <input
                type="text"
                placeholder="Brief description of your feedback"
                className="w-full h-12 px-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 block px-1">
                Description
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Please provide detailed feedback..."
                rows={8}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none"
              />
              <div className="text-xs text-slate-400 mt-2 px-1">
                {feedbackText.length}/500 characters
              </div>
            </div>

            {/* Attach Screenshot */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 block px-1">
                Attach Screenshot (Optional)
              </label>
              <button className="w-full bg-white border-2 border-dashed border-slate-300 rounded-xl py-8 flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50/30 transition-all">
                <Image className="w-8 h-8 text-slate-400 mb-2" />
                <span className="text-sm font-medium text-slate-600">Tap to upload screenshot</span>
                <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</span>
              </button>
            </div>

            {/* Contact Info */}
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-blue-900 font-medium mb-1">We value your feedback!</p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Our team will review your submission and respond within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Submit Button */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-4 shadow-lg">
            <button
              onClick={() => {
                toast.success('Feedback submitted successfully!');
                navigate(61);
              }}
              className="w-full bg-[#2563EB] text-white py-3.5 px-6 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Feedback
            </button>
          </div>
        </div>
      );

    // 98. Edit Profile Screen
    case 98:
      return (
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Status Bar */}
          <div className="bg-[#2563EB] text-white px-6 pt-3 pb-2 text-xs flex items-center justify-between font-medium">
            <span>12:30</span>
            <span>5G 100%</span>
          </div>

          {/* Blue Header */}
          <div className="bg-[#2563EB] text-white px-4 py-4 shrink-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate(61)} className="hover:bg-white/10 rounded-full p-1 transition-colors">
                <ChevronLeft className="w-6 h-6" strokeWidth={2.5} />
              </button>
              <h1 className="text-lg font-medium">Edit Profile</h1>
            </div>
            <button
              onClick={() => {
                toast.success('Profile updated successfully!');
                navigate(61);
              }}
              className="text-sm font-semibold hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors"
            >
              Save
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50 px-6 pt-6 pb-8 overflow-y-auto">
            {/* Profile Photo Section - Separate Card */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 px-1">Profile Photo</h3>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <div className="flex items-center gap-6">
                  {/* Photo Display */}
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-[#2563EB]" />
                    </div>
                    <button
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            toast.success('Photo uploaded successfully!');
                          }
                        };
                        input.click();
                      }}
                      className="absolute bottom-0 right-0 w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-blue-700 transition-colors"
                    >
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Photo Actions */}
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-900 mb-1">Update your photo</h4>
                    <p className="text-xs text-slate-500 mb-4">Recommended: Square image, at least 400x400px</p>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              toast.success('Photo uploaded successfully!');
                            }
                          };
                          input.click();
                        }}
                        className="text-xs font-semibold text-[#2563EB] hover:text-blue-700 transition-colors px-3 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100"
                      >
                        Upload New
                      </button>
                      <button
                        onClick={() => {
                          toast.success('Profile photo removed');
                        }}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors px-3 py-1.5 bg-red-50 rounded-lg hover:bg-red-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 px-1">Personal Information</h3>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100">
                {/* Full Name */}
                <div className="px-5 py-4">
                  <label className="text-xs text-slate-400 font-medium mb-2 block">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full text-sm text-slate-900 font-medium focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Department */}
                <div className="px-5 py-4">
                  <label className="text-xs text-slate-400 font-medium mb-2 block">Department</label>
                  <input
                    type="text"
                    value={profileDepartment}
                    onChange={(e) => setProfileDepartment(e.target.value)}
                    className="w-full text-sm text-slate-900 font-medium focus:outline-none"
                    placeholder="Enter your department"
                  />
                </div>

                {/* Job Title */}
                <div className="px-5 py-4">
                  <label className="text-xs text-slate-400 font-medium mb-2 block">Job Title</label>
                  <input
                    type="text"
                    value="X-Ray Technician"
                    className="w-full text-sm text-slate-900 font-medium focus:outline-none bg-gray-50"
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 px-1">Contact Information</h3>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100">
                {/* Email */}
                <div className="px-5 py-4">
                  <label className="text-xs text-slate-400 font-medium mb-2 block">Email Address</label>
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full text-sm text-slate-900 font-medium focus:outline-none"
                    placeholder="your.email@hospital.org"
                  />
                </div>

                {/* Phone */}
                <div className="px-5 py-4">
                  <label className="text-xs text-slate-400 font-medium mb-2 block">Phone Number</label>
                  <input
                    type="tel"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full text-sm text-slate-900 font-medium focus:outline-none"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 px-1">Account Actions</h3>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                <button
                  onClick={() => navigate(67)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-t-2xl border-b border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-slate-900">Change Password</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>

                <button className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-b-2xl">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-slate-900">Two-Factor Authentication</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
                  </label>
                </button>
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-blue-900 font-medium mb-1">Profile Changes</p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    Changes to your email or phone number may require verification. Some information is managed by your administrator.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
