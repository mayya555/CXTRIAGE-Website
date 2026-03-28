import { useState } from 'react';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { Settings, Bell, Lock, Globe, Moon, Monitor, Volume2, Save, Brain, AlertCircle } from 'lucide-react';
import { updateLanguage } from '../../lib/api';
import { toast } from 'sonner';

export default function DoctorSettings() {
  const [submitting, setSubmitting] = useState(false);
  // Simulated doctor ID - in real app this comes from auth context
  const doctorId = 1;

  const [notifications, setNotifications] = useState({
    criticalAlerts: true,
    newCases: true,
    aiAnalysisComplete: true,
    emailNotifications: false,
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'English',
    soundEffects: true,
    autoSave: true,
  });

  const [aiSettings, setAiSettings] = useState({
    showConfidenceScores: true,
    autoLoadHeatmaps: true,
    criticalThreshold: '85',
  });

  const handleSave = async () => {
    setSubmitting(true);
    try {
      await updateLanguage(doctorId, preferences.language);
      toast.success('Settings saved successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update settings');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <WebAppLayout
      role="doctor"
      title="Settings"
      subtitle="Manage your preferences and account settings"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Notifications Settings */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Notifications</h3>
              <p className="text-xs text-slate-600">Manage how you receive notifications</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-900">Critical Alerts</p>
                <p className="text-xs text-slate-500">Urgent findings requiring immediate attention</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.criticalAlerts}
                  onChange={(e) => setNotifications({ ...notifications, criticalAlerts: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-900">New Cases</p>
                <p className="text-xs text-slate-500">Notify when new cases are assigned to you</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.newCases}
                  onChange={(e) => setNotifications({ ...notifications, newCases: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-900">AI Analysis Complete</p>
                <p className="text-xs text-slate-500">Get notified when AI finishes processing</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.aiAnalysisComplete}
                  onChange={(e) => setNotifications({ ...notifications, aiAnalysisComplete: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">Email Notifications</p>
                <p className="text-xs text-slate-500">Receive updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications.emailNotifications}
                  onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* AI Assistance Settings */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">AI Assistance</h3>
              <p className="text-xs text-slate-600">Configure AI analysis preferences</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-900">Show Confidence Scores</p>
                <p className="text-xs text-slate-500">Display AI confidence percentages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={aiSettings.showConfidenceScores}
                  onChange={(e) => setAiSettings({ ...aiSettings, showConfidenceScores: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-900">Auto-Load Heatmaps</p>
                <p className="text-xs text-slate-500">Automatically display AI heatmap overlays</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={aiSettings.autoLoadHeatmaps}
                  onChange={(e) => setAiSettings({ ...aiSettings, autoLoadHeatmaps: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                <AlertCircle className="w-4 h-4 inline mr-2 text-slate-600" />
                Critical Finding Threshold
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="70"
                  max="95"
                  step="5"
                  value={aiSettings.criticalThreshold}
                  onChange={(e) => setAiSettings({ ...aiSettings, criticalThreshold: e.target.value })}
                  className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                />
                <span className="text-sm font-semibold text-[#2563EB] min-w-[50px]">
                  {aiSettings.criticalThreshold}%
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Cases with confidence above this threshold will be marked as critical
              </p>
            </div>
          </div>
        </div>

        {/* Display & Preferences */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Monitor className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Display & Preferences</h3>
              <p className="text-xs text-slate-600">Customize your interface experience</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                <Moon className="w-4 h-4 inline mr-2 text-slate-600" />
                Theme
              </label>
              <select
                value={preferences.theme}
                onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                <Globe className="w-4 h-4 inline mr-2 text-slate-600" />
                Language
              </label>
              <select
                value={preferences.language}
                onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-slate-600" />
                  Sound Effects
                </p>
                <p className="text-xs text-slate-500">Play sounds for actions and alerts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.soundEffects}
                  onChange={(e) => setPreferences({ ...preferences, soundEffects: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-slate-100">
              <div>
                <p className="text-sm font-medium text-slate-900">Auto-Save Drafts</p>
                <p className="text-xs text-slate-500">Automatically save your work in progress</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.autoSave}
                  onChange={(e) => setPreferences({ ...preferences, autoSave: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2563EB]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Security</h3>
              <p className="text-xs text-slate-600">Manage your password and security settings</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <p className="text-sm font-medium text-slate-900">Change Password</p>
              <p className="text-xs text-slate-500">Update your account password</p>
            </button>

            <button className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <p className="text-sm font-medium text-slate-900">Two-Factor Authentication</p>
              <p className="text-xs text-slate-500">Add an extra layer of security</p>
            </button>

            <button className="w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <p className="text-sm font-medium text-slate-900">Active Sessions</p>
              <p className="text-xs text-slate-500">Manage devices where you're signed in</p>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#2563EB] text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </WebAppLayout>
  );
}
