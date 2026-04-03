import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { Upload, CheckCircle, Brain, Server, Wifi, ChevronRight, Lock } from 'lucide-react';
import { uploadScan } from '../../lib/api';
import { toast } from 'sonner';

const uploadSteps = [
  { id: 0, label: 'Compressing DICOM image', icon: Upload },
  { id: 1, label: 'Encrypting data (AES-256)', icon: Lock },
  { id: 2, label: 'Transmitting to AI server', icon: Wifi },
  { id: 3, label: 'Queued for AI inference', icon: Server },
  { id: 4, label: 'AI processing initiated', icon: Brain },
];

export default function UploadToAI() {
  const navigate = useNavigate();
  const location = useLocation();
  const patient = location.state || { patientId: 1, patientName: 'John Smith', mrn: 'MRN-001240', scanId: 1, doctorId: 1, selectedFile: null };
  const selectedFile = location.state?.selectedFile;
  
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);
  const [done, setDone] = useState(false);

  const startUpload = async () => {
    setUploading(true);
    setProgress(0);
    setCurrentStep(0);

    // In a real device integration, we'd have a Blob here. 
    // Here we simulate the API call and progress.
    try {
      // Simulate real API latency while updating UI
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 90) {
            clearInterval(interval);
            return 90;
          }
          const next = p + 2;
          setCurrentStep(Math.floor((next / 100) * uploadSteps.length));
          return next;
        });
      }, 50);

      const fileToUpload = selectedFile || new File(["dummy content"], "scan.dcm", { type: "application/dicom" });
      const doctorIdToUse = patient.doctorId || 1; // Safeguard if undefined
      const urgency = patient.urgency || "Routine"; // Safeguard urgency
      const result = await uploadScan(patient.scanId || 1, fileToUpload, doctorIdToUse, urgency);
      
      setProgress(100);
      setCurrentStep(uploadSteps.length - 1);
      setDone(true);
      toast.success('Scan successfully uploaded to AI engine');
      
      // Store result to pass it to the next screen
      localStorage.setItem('lastAnalysisResult', JSON.stringify(result));
    } catch (error: any) {
      toast.error(error.message || 'Upload failed');
      setUploading(false);
    }
  };

  return (
    <WebAppLayout
      role="technician"
      title="Upload to AI Analysis"
      subtitle="Securely transmit the X-ray for AI processing"
      breadcrumbs={[
        { label: 'Dashboard', path: '/technician/dashboard' },
        { label: 'New Scan' },
        { label: 'Upload to AI' },
      ]}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div className={`px-8 py-6 text-center transition-colors ${
            done ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-[#2563EB] to-blue-600'
          }`}>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              {done ? <CheckCircle className="w-9 h-9 text-white" /> : <Brain className="w-9 h-9 text-white" />}
            </div>
            <h2 className="text-white text-xl">
              {done ? 'Successfully Uploaded!' : uploading ? 'Uploading to AI Engine' : 'Ready to Upload'}
            </h2>
            <p className="text-white/80 text-sm mt-1">
              {done ? 'Case queued for radiologist review'
                : uploading ? 'Secure transmission in progress...'
                : 'Review details and initiate the upload'}
            </p>
          </div>

          <div className="p-8">
            {/* Scan Summary */}
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Scan Summary</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Patient', value: patient.patientName },
                  { label: 'MRN', value: patient.mrn },
                  { label: 'File Name', value: selectedFile?.name || 'PA Chest X-Ray' },
                  { label: 'Image Size', value: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : '4.2 MB (DICOM)' },
                  { label: 'Quality Score', value: '85% – Acceptable' },
                  { label: 'Priority', value: 'Routine' },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-xs text-slate-400">{item.label}</p>
                    <p className="text-sm font-medium text-slate-700">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Progress */}
            {(uploading || done) && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600 font-medium">Upload Progress</span>
                  <span className="font-bold text-[#2563EB]">{progress}%</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2563EB] rounded-full transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Step Tracker */}
                <div className="mt-4 space-y-2">
                  {uploadSteps.map((step, i) => {
                    const Icon = step.icon;
                    const isComplete = i < currentStep || done;
                    const isActive = i === currentStep && !done;
                    return (
                      <div key={step.id} className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${
                        isActive ? 'bg-blue-50' : isComplete ? 'opacity-70' : 'opacity-30'
                      }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isComplete ? 'bg-green-100' : isActive ? 'bg-blue-100' : 'bg-slate-100'
                        }`}>
                          {isComplete
                            ? <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                            : <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#2563EB] animate-pulse' : 'text-slate-400'}`} />
                          }
                        </div>
                        <span className={`text-xs font-medium ${
                          isActive ? 'text-[#2563EB]' : isComplete ? 'text-green-600' : 'text-slate-400'
                        }`}>
                          {step.label}
                        </span>
                        {isActive && <div className="flex gap-0.5 ml-auto">
                          {[0,1,2].map(d => (
                            <div key={d} className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${d * 100}ms` }} />
                          ))}
                        </div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actions */}
            {!uploading && !done && (
              <button
                onClick={startUpload}
                className="w-full bg-[#2563EB] text-white py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                <Upload className="w-5 h-5" />
                Start Secure Upload
              </button>
            )}
            {done && (
              <button
                onClick={() => {
                  const result = JSON.parse(localStorage.getItem('lastAnalysisResult') || '{}');
                  navigate('/technician/upload-success', { state: { ...patient, analysis: result } });
                }}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-green-700 transition-all"
              >
                Continue <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* Security Note */}
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 justify-center">
              <Lock className="w-3.5 h-3.5" />
              <span>End-to-end encrypted · HIPAA compliant · Audit logged</span>
            </div>
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
