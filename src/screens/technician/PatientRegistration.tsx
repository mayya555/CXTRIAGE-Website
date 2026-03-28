import { useState } from 'react';
import { useNavigate } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { User, Calendar, Phone, MapPin, ChevronRight, AlertCircle } from 'lucide-react';
import { registerPatient } from '../../lib/api';
import { toast } from 'sonner';

export default function PatientRegistration() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', dob: '', gender: 'Male',
    mrn: '', phone: '', address: '', clinicalNotes: '',
    referringDoctor: '', scanType: 'PA (Postero-Anterior)', urgency: 'Routine',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.dob) e.dob = 'Required';
    if (!form.mrn.trim()) e.mrn = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    
    setSubmitting(true);
    try {
      const response = await registerPatient({
        full_name: `${form.firstName} ${form.lastName}`,
        date_of_birth: form.dob,
        gender: form.gender,
        mrn: form.mrn,
        reason_for_xray: form.clinicalNotes || 'N/A'
      });
      
      toast.success(response.message || 'Patient registered successfully');
      navigate('/technician/patient-registration-confirmation', { 
        state: { patientId: response.id, patientName: response.full_name, mrn: response.mrn } 
      });
    } catch (error: any) {
      toast.error(error.message || 'Failed to register patient');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-slate-50 focus:bg-white'
    }`;

  return (
    <WebAppLayout
      role="technician"
      title="Patient Registration"
      subtitle="Register a new patient and configure the X-ray scan"
      breadcrumbs={[
        { label: 'Dashboard', path: '/technician/dashboard' },
        { label: 'New Scan' },
        { label: 'Patient Registration' },
      ]}
    >
      <div className="max-w-4xl mx-auto">
        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {['Patient Info', 'Scan Setup', 'Scanner', 'Quality Check', 'Upload'].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                i === 0 ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  i === 0 ? 'bg-white/20' : 'bg-slate-200'
                }`}>{i + 1}</span>
                {step}
              </div>
              {i < 4 && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-5">
            {/* Patient Information */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-[#2563EB]" />
                </div>
                <h3 className="text-slate-800">Patient Information</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">First Name *</label>
                  <input value={form.firstName} onChange={e => handleChange('firstName', e.target.value)} className={inputClass('firstName')} placeholder="John" />
                  {errors.firstName && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Last Name *</label>
                  <input value={form.lastName} onChange={e => handleChange('lastName', e.target.value)} className={inputClass('lastName')} placeholder="Smith" />
                  {errors.lastName && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.lastName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1"><Calendar className="w-3 h-3" /> Date of Birth *</label>
                  <input type="date" value={form.dob} onChange={e => handleChange('dob', e.target.value)} className={inputClass('dob')} />
                  {errors.dob && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.dob}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Gender</label>
                  <select value={form.gender} onChange={e => handleChange('gender', e.target.value)} className={inputClass('gender')}>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">MRN (Medical Record #) *</label>
                  <input value={form.mrn} onChange={e => handleChange('mrn', e.target.value)} className={inputClass('mrn')} placeholder="MRN-XXXXXX" />
                  {errors.mrn && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.mrn}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1"><Phone className="w-3 h-3" /> Phone</label>
                  <input value={form.phone} onChange={e => handleChange('phone', e.target.value)} className={inputClass('phone')} placeholder="+1 (555) 000-0000" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1"><MapPin className="w-3 h-3" /> Address</label>
                  <input value={form.address} onChange={e => handleChange('address', e.target.value)} className={inputClass('address')} placeholder="123 Main St, City, State" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Referring Doctor</label>
                  <input value={form.referringDoctor} onChange={e => handleChange('referringDoctor', e.target.value)} className={inputClass('referringDoctor')} placeholder="Dr. Name" />
                </div>
              </div>
            </div>

            {/* Scan Configuration */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-[#2563EB]" />
                </div>
                <h3 className="text-slate-800">Scan Configuration</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Scan Type</label>
                  <select value={form.scanType} onChange={e => handleChange('scanType', e.target.value)} className={inputClass('scanType')}>
                    <option>PA (Postero-Anterior)</option>
                    <option>AP (Antero-Posterior)</option>
                    <option>Lateral</option>
                    <option>PA + Lateral</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Urgency Level</label>
                  <select value={form.urgency} onChange={e => handleChange('urgency', e.target.value)} className={inputClass('urgency')}>
                    <option>Routine</option>
                    <option>Urgent</option>
                    <option>STAT (Emergency)</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Clinical Notes</label>
                  <textarea
                    value={form.clinicalNotes}
                    onChange={e => handleChange('clinicalNotes', e.target.value)}
                    rows={3}
                    placeholder="Relevant clinical history, symptoms, or special instructions..."
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all bg-slate-50 focus:bg-white resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {/* Urgency Guide */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Urgency Guidelines</h4>
              <div className="space-y-2.5">
                {[
                  { level: 'Routine', color: 'bg-green-100 text-green-700', desc: 'Non-emergency, standard queue' },
                  { level: 'Urgent', color: 'bg-amber-100 text-amber-700', desc: 'Priority processing within 2h' },
                  { level: 'STAT', color: 'bg-red-100 text-red-700', desc: 'Immediate — life threatening' },
                ].map((u) => (
                  <div key={u.level} className="flex items-start gap-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold flex-shrink-0 mt-0.5 ${u.color}`}>{u.level}</span>
                    <p className="text-xs text-slate-500">{u.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Scan Types */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Scan Type Info</h4>
              <div className="space-y-2">
                {[
                  { type: 'PA', desc: 'Standard — patient stands, beam from back' },
                  { type: 'AP', desc: 'Bedside/ICU — patient supine' },
                  { type: 'Lateral', desc: 'Side view for depth assessment' },
                ].map((s) => (
                  <div key={s.type} className="text-xs">
                    <span className="font-semibold text-slate-700">{s.type}</span>
                    <span className="text-slate-400"> — {s.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#2563EB] text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
            >
              Continue to Scanner
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/technician/dashboard')}
              className="w-full border border-slate-200 text-slate-600 py-3 rounded-xl text-sm hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
