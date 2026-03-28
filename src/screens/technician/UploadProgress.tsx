import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { WebAppLayout } from '../../components/layout/WebAppLayout';
import { CheckCircle, Loader } from 'lucide-react';

export default function UploadProgress() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate('/technician/upload-success'), 500);
          return 100;
        }
        return p + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <WebAppLayout
      role="technician"
      title="Uploading..."
      breadcrumbs={[{ label: 'Dashboard', path: '/technician/dashboard' }, { label: 'Upload' }]}
    >
      <div className="max-w-lg mx-auto py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
            {progress >= 100
              ? <CheckCircle className="w-9 h-9 text-green-500" />
              : <Loader className="w-9 h-9 text-[#2563EB] animate-spin" />
            }
          </div>
          <h2 className="text-slate-900 text-xl mb-2">
            {progress >= 100 ? 'Upload Complete!' : 'Uploading X-Ray...'}
          </h2>
          <p className="text-slate-500 text-sm mb-6">{progress}% complete</p>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-3">
            <div className="h-full bg-[#2563EB] rounded-full transition-all duration-150" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </WebAppLayout>
  );
}
