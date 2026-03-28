import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { CheckCircle, Edit3, ChevronRight, AlertCircle, Brain } from 'lucide-react';
import { mockFindings, mockCases } from '../../lib/data';

export default function DiagnosisConfirmation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const caseData = mockCases.find(c => c.id === id) || mockCases[0];
  const [selectedFindings, setSelectedFindings] = useState<Set<number>>(new Set([0, 1, 2]));
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [icdCode, setIcdCode] = useState('J18.9');
  const [decision, setDecision] = useState<'confirm' | 'modify' | null>(null);

  const toggleFinding = (i: number) => {
    const updated = new Set(selectedFindings);
    updated.has(i) ? updated.delete(i) : updated.add(i);
    setSelectedFindings(updated);
  };

  const handleProceed = () => {
    if (decision === 'confirm') navigate(`/doctor/report-generation/${id}`);
    if (decision === 'modify') navigate(`/doctor/diagnosis-modification/${id}`);
  };

  return (
    <WebAppLayout
      role="doctor"
      title="Diagnosis Confirmation"
      subtitle={`Review and confirm AI findings for ${caseData.patient}`}
      breadcrumbs={[
        { label: 'Dashboard', path: '/doctor/dashboard' },
        { label: 'AI Analysis', path: `/doctor/ai-analysis/${id}` },
        { label: 'Diagnosis Confirmation' },
      ]}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Findings */}
        <div className="lg:col-span-2 space-y-4">
          {/* AI Summary Banner */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-5 text-white flex items-center gap-4">
            <Brain className="w-8 h-8 flex-shrink-0" />
            <div>
              <p className="font-bold text-sm">AI Critical Findings Detected</p>
              <p className="text-red-100 text-xs mt-0.5">
                Review each finding below and confirm or modify the diagnosis before generating the report.
              </p>
            </div>
          </div>

          {/* Patient Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Patient', value: caseData.patient },
                { label: 'Age / Sex', value: `${caseData.age}y / ${caseData.gender}` },
                { label: 'Case ID', value: caseData.mrn, mono: true },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-xs text-slate-400 uppercase tracking-wide">{item.label}</p>
                  <p className={`text-sm font-semibold text-slate-800 mt-1 ${item.mono ? 'font-mono' : ''}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Findings Selection */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-slate-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              AI Findings — Select to Confirm
            </h3>
            <div className="space-y-3">
              {mockFindings.map((f, i) => {
                const isSelected = selectedFindings.has(i);
                const severityColors = {
                  Critical: 'border-red-300 bg-red-50',
                  High: 'border-orange-300 bg-orange-50',
                  Medium: 'border-amber-300 bg-amber-50',
                  Normal: 'border-green-300 bg-green-50',
                };
                const selBg = severityColors[f.severity as keyof typeof severityColors] || 'border-slate-300 bg-slate-50';
                return (
                  <button
                    key={i}
                    onClick={() => toggleFinding(i)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      isSelected ? selBg : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isSelected ? 'bg-[#2563EB] border-[#2563EB]' : 'border-slate-300'
                      }`}>
                        {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-800">{f.name}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            f.severity === 'Critical' ? 'bg-red-100 text-red-700'
                              : f.severity === 'High' ? 'bg-orange-100 text-orange-700'
                              : f.severity === 'Medium' ? 'bg-amber-100 text-amber-700'
                              : 'bg-green-100 text-green-700'
                          }`}>{f.severity}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">Region: {f.region}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${
                              f.severity === 'Critical' ? 'bg-red-500' : f.severity === 'High' ? 'bg-orange-500' : f.severity === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                            }`} style={{ width: `${f.confidence}%` }} />
                          </div>
                          <span className="text-xs font-bold text-slate-600">{f.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="text-slate-800 mb-4">Clinical Notes</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">ICD-10 Code</label>
                <input
                  value={icdCode}
                  onChange={e => setIcdCode(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-2">Diagnosis Type</label>
                <select className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]">
                  <option>Confirmed</option>
                  <option>Provisional</option>
                  <option>Differential</option>
                </select>
              </div>
            </div>
            <textarea
              value={additionalNotes}
              onChange={e => setAdditionalNotes(e.target.value)}
              placeholder="Add clinical observations, differential diagnoses, or additional context..."
              rows={3}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] resize-none"
            />
          </div>
        </div>

        {/* Right: Decision Panel */}
        <div className="space-y-4">
          {/* Summary */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Confirmation Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total AI Findings</span>
                <span className="font-bold text-slate-700">{mockFindings.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Confirmed</span>
                <span className="font-bold text-green-600">{selectedFindings.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Excluded</span>
                <span className="font-bold text-slate-400">{mockFindings.length - selectedFindings.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">ICD-10</span>
                <span className="font-bold font-mono text-[#2563EB]">{icdCode}</span>
              </div>
            </div>
          </div>

          {/* Decision */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Your Decision</h4>
            <div className="space-y-2 mb-4">
              <button
                onClick={() => setDecision('confirm')}
                className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all text-left ${
                  decision === 'confirm' ? 'border-green-400 bg-green-50' : 'border-slate-200 hover:border-green-200'
                }`}
              >
                <CheckCircle className={`w-5 h-5 ${decision === 'confirm' ? 'text-green-500' : 'text-slate-300'}`} />
                <div>
                  <p className="text-sm font-semibold text-slate-700">Confirm AI Diagnosis</p>
                  <p className="text-xs text-slate-400">Agree with selected findings</p>
                </div>
              </button>
              <button
                onClick={() => setDecision('modify')}
                className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all text-left ${
                  decision === 'modify' ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:border-blue-200'
                }`}
              >
                <Edit3 className={`w-5 h-5 ${decision === 'modify' ? 'text-[#2563EB]' : 'text-slate-300'}`} />
                <div>
                  <p className="text-sm font-semibold text-slate-700">Modify Diagnosis</p>
                  <p className="text-xs text-slate-400">Override with clinical judgment</p>
                </div>
              </button>
            </div>

            <button
              onClick={handleProceed}
              disabled={!decision}
              className={`w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                decision
                  ? 'bg-[#2563EB] text-white hover:bg-blue-700 shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {decision === 'confirm' ? 'Generate Report' : decision === 'modify' ? 'Modify Diagnosis' : 'Select Decision'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Warning */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-xs font-bold text-amber-700 mb-1">Clinical Responsibility</p>
            <p className="text-xs text-amber-600">
              By confirming, you take clinical responsibility for this diagnosis. The AI provides decision support only.
            </p>
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
