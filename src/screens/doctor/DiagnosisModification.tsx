import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { Edit3, Plus, Trash2, ChevronRight, AlertCircle } from 'lucide-react';
import { getCaseById, updateCaseDiagnosis } from '../../lib/api';
import { toast } from 'sonner';

export default function DiagnosisModification() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [caseData, setCaseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [diagnoses, setDiagnoses] = useState<any[]>([]);
  const [reason, setReason] = useState('');

  useEffect(() => {
    const fetchCase = async () => {
      if (!id) return;
      try {
        const data = await getCaseById(id);
        setCaseData(data);
        if (data.findings) {
          setDiagnoses(data.findings.map((f: any, i: number) => ({
            id: i,
            finding: f.name,
            icd: f.icd_code || '',
            severity: f.severity,
            modified: false
          })));
        }
      } catch (error: any) {
        toast.error(error.message || 'Failed to fetch case details');
      } finally {
        setLoading(false);
      }
    };
    fetchCase();
  }, [id]);

  const removeDiagnosis = (diagId: number) => {
    setDiagnoses(prev => prev.filter(d => d.id !== diagId));
  };

  const addDiagnosis = () => {
    setDiagnoses(prev => [...prev, {
      id: Date.now(), finding: 'New Finding', icd: '', severity: 'MEDIUM', modified: true
    }]);
  };

  const updateDiagnosis = (diagId: number, field: string, value: string) => {
    setDiagnoses(prev => prev.map(d => d.id === diagId ? { ...d, [field]: value, modified: true } : d));
  };

  const handleProceed = async () => {
    if (!id) return;
    setSubmitting(true);
    try {
      await updateCaseDiagnosis(id, {
        status: 'COMPLETED',
        confirmed_findings: diagnoses.map(d => d.finding),
        clinical_notes: reason,
        icd_code: diagnoses[0]?.icd || '', // Taking first as primary for now or we could sum them
      });
      toast.success('Modified diagnosis saved successfully!');
      navigate(`/doctor/report-generation/${id}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to save modifications');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <WebAppLayout role="doctor" title="Loading..." breadcrumbs={[]}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB]"></div>
        </div>
      </WebAppLayout>
    );
  }

  if (!caseData) return null;

  return (
    <WebAppLayout
      role="doctor"
      title="Modify Diagnosis"
      subtitle={`Override AI findings for ${caseData.patient_name}`}
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
              You are modifying the AI-generated diagnosis. All changes will be recorded in the audit log for clinical responsibility.
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
                        <option value="CRITICAL">Critical</option>
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="NORMAL">Normal</option>
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
            onClick={handleProceed}
            disabled={!reason || submitting}
            className={`flex-1 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              reason ? 'bg-[#2563EB] text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            } disabled:opacity-50`}
          >
            {submitting ? 'Saving...' : 'Proceed to Report'} {!submitting && <ChevronRight className="w-4 h-4" />}
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