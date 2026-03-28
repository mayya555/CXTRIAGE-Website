import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { Edit3, Plus, Trash2, ChevronRight, AlertCircle } from 'lucide-react';
import { mockCases } from '../../lib/data';

export default function DiagnosisModification() {
  const navigate = useNavigate();
  const { id } = useParams();
  const caseData = mockCases.find(c => c.id === id) || mockCases[0];

  const [diagnoses, setDiagnoses] = useState([
    { id: 1, finding: 'Pneumonia (Right Lower Lobe)', icd: 'J18.9', severity: 'Critical', modified: false },
    { id: 2, finding: 'Pleural Effusion', icd: 'J90', severity: 'High', modified: true },
    { id: 3, finding: 'Cardiomegaly', icd: 'I51.7', severity: 'Medium', modified: false },
  ]);
  const [reason, setReason] = useState('');

  const removeDiagnosis = (id: number) => {
    setDiagnoses(prev => prev.filter(d => d.id !== id));
  };

  const addDiagnosis = () => {
    setDiagnoses(prev => [...prev, {
      id: Date.now(), finding: 'New Finding', icd: '', severity: 'Medium', modified: true
    }]);
  };

  const updateDiagnosis = (id: number, field: string, value: string) => {
    setDiagnoses(prev => prev.map(d => d.id === id ? { ...d, [field]: value, modified: true } : d));
  };

  return (
    <WebAppLayout
      role="doctor"
      title="Modify Diagnosis"
      subtitle={`Override AI findings for ${caseData.patient}`}
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'Diagnosis', path: `/doctor/diagnosis-confirmation/${id}` },
        { label: 'Modify' },
      ]}
    >
      <div className="max-w-3xl mx-auto space-y-5">
        {/* Warning */}
        <div className="p-5 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-700">Clinical Override</p>
            <p className="text-xs text-amber-600 mt-1">
              You are modifying the AI-generated diagnosis. All changes will be attributed to Dr. Michael Chen and recorded in the audit log.
            </p>
          </div>
        </div>

        {/* Diagnoses */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-800 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-[#2563EB]" />
              Diagnoses
            </h3>
            <button
              onClick={addDiagnosis}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#2563EB] rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Finding
            </button>
          </div>
          <div className="space-y-3">
            {diagnoses.map((d) => (
              <div key={d.id} className={`p-4 rounded-xl border-2 ${d.modified ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-slate-50'}`}>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Finding</label>
                    <input
                      value={d.finding}
                      onChange={e => updateDiagnosis(d.id, 'finding', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">ICD-10</label>
                    <input
                      value={d.icd}
                      onChange={e => updateDiagnosis(d.id, 'icd', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Severity</label>
                    <div className="flex gap-2">
                      <select
                        value={d.severity}
                        onChange={e => updateDiagnosis(d.id, 'severity', e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 bg-white"
                      >
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Normal">Normal</option>
                      </select>
                      <button
                        onClick={() => removeDiagnosis(d.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                {d.modified && (
                  <p className="text-[10px] text-amber-600 mt-2 font-medium">⚠ Modified from AI suggestion</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Override Reason */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-slate-800 mb-3">Reason for Modification *</h3>
          <textarea
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Explain your clinical reasoning for modifying the AI diagnosis..."
            rows={4}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/doctor/report-generation/${id}`)}
            disabled={!reason}
            className={`flex-1 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              reason ? 'bg-[#2563EB] text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            Proceed to Report <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate(`/doctor/diagnosis-confirmation/${id}`)}
            className="flex-1 border border-slate-200 text-slate-600 py-3.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </WebAppLayout>
  );
}