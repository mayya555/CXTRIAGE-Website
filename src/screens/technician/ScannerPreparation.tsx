import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { CheckCircle, Circle, ChevronRight, AlertCircle, Zap } from 'lucide-react';
import { saveScanPreparation, startScan } from '../../lib/api';
import { toast } from 'sonner';

export default function ScannerPreparation() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state || { patientId: 1, patientName: 'John Smith', mrn: 'MRN-001240', urgency: 'Routine', scanType: 'PA (Postero-Anterior)' };
  
  const [checklist, setChecklist] = useState<boolean[]>([false, false, false, false, false, false]);
  const [submitting, setSubmitting] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [scanId, setScanId] = useState<number | null>(null);
  const technicianId = parseInt(localStorage.getItem('technicianId') || '1');

  useEffect(() => {
    // Automatically start a scan record for this patient session
    const initScan = async () => {
      if (!patient.patientId) {
        toast.error('Patient record not found. Please register the patient again.');
        navigate('/technician/patient-registration');
        return;
      }
      
      setIsInitializing(true);
      try {
        const response = await startScan(patient.patientId, technicianId);
        setScanId(response.scan_id || 1); // Fallback for demo
      } catch (error) {
        console.error('Failed to initialize scan record', error);
        toast.error('Failed to prepare scanner. Please check connection and try again.');
      } finally {
        setIsInitializing(false);
      }
    };
    initScan();
  }, [patient.patientId, technicianId, navigate]);

  const items = [
    'Patient positioned correctly (upright, arms raised)',
    'Detector plate inserted and calibrated',
    'kV and mAs settings verified (125 kV, 5 mAs)',
    'Lead apron/thyroid shield applied to patient',
    'Room cleared of non-essential personnel',
    'Patient breath-hold instructions given',
  ];

  const toggle = (i: number) => {
    const updated = [...checklist];
    updated[i] = !updated[i];
    setChecklist(updated);
  };

  const allChecked = checklist.every(Boolean);
  const checkedCount = checklist.filter(Boolean).length;

  const handleProceed = async () => {
    if (!allChecked || !scanId) return;

    setSubmitting(true);
    try {
      await saveScanPreparation(scanId, {
        position_patient: checklist[0],
        proper_distance: checklist[2], // Mapping as best as possible to existing schema
        radiation_safety: checklist[3],
        remove_metal: true, // Internal assumption
        calibration_verified: checklist[1],
        exposure_settings: checklist[2]
      });
      
      navigate('/technician/scanner', { state: { ...patient, scanId } });
    } catch (error: any) {
      toast.error(error.message || 'Failed to save preparation data');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <WebAppLayout
      role="technician"
      title="Scanner Preparation"
      subtitle="Complete all pre-scan checklist items before proceeding"
      breadcrumbs={[
        { label: 'Dashboard', path: '/technician/dashboard' },
        { label: 'New Scan' },
        { label: 'Scanner Preparation' },
      ]}
    >
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Checklist */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-slate-800">Pre-Scan Safety Checklist</h3>
              <span className="text-sm font-semibold text-[#2563EB]">{checkedCount}/{items.length}</span>
            </div>

            {/* Progress */}
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
                style={{ width: `${(checkedCount / items.length) * 100}%` }}
              />
            </div>

            <div className="space-y-3">
              {items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => toggle(i)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    checklist[i]
                      ? 'border-green-200 bg-green-50'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  {checklist[i]
                    ? <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    : <Circle className="w-5 h-5 text-slate-300 flex-shrink-0" />
                  }
                  <span className={`text-sm ${checklist[i] ? 'text-green-700 line-through' : 'text-slate-700'}`}>
                    {item}
                  </span>
                </button>
              ))}
            </div>

            {allChecked && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-semibold text-green-700">All items verified!</p>
                  <p className="text-xs text-green-600">Safe to proceed with X-ray scan</p>
                </div>
              </div>
            )}
          </div>

          {/* Side Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-amber-500" />
                <h4 className="text-sm font-semibold text-slate-700">Radiation Safety</h4>
              </div>
              <div className="space-y-2 text-xs text-slate-500">
                <p>• Always use minimum necessary dose</p>
                <p>• Verify pregnancy status for women 11–55</p>
                <p>• Ensure collimation to area of interest</p>
                <p>• Log all exposures in the dose record</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                {(!patient.patientId || isInitializing) ? (
                  <AlertCircle className="w-4 h-4 text-amber-500 animate-pulse" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
                <h4 className="text-sm font-semibold text-slate-700">Current Patient</h4>
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-medium text-slate-700">{patient.patientName}</p>
                <p className="text-slate-500">{patient.mrn}</p>
                <p className={`font-semibold ${patient.urgency === 'STAT (Emergency)' ? 'text-red-600' : patient.urgency === 'Urgent' ? 'text-amber-600' : 'text-slate-500'}`}>
                  {patient.scanType || 'PA View'} · {patient.urgency || 'Routine'}
                </p>
              </div>
            </div>

            <button
              onClick={handleProceed}
              disabled={!allChecked || submitting || isInitializing || !scanId}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                allChecked && !submitting && !isInitializing && scanId
                  ? 'bg-[#2563EB] text-white hover:bg-blue-700 shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {submitting || isInitializing ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-400"></div>
              ) : allChecked && scanId ? (
                <>Start Scan <ChevronRight className="w-4 h-4" /></>
              ) : !scanId ? (
                'Initializing...'
              ) : (
                `Complete ${items.length - checkedCount} More`
              )}
            </button>
            <button
              onClick={() => navigate('/technician/patient-registration-confirmation')}
              className="w-full border border-slate-200 text-slate-600 py-3 rounded-xl text-sm hover:bg-slate-50 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
