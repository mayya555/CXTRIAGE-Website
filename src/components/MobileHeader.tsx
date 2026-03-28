import { ArrowLeft, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router';

interface MobileHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export function MobileHeader({ title, showBack = true, onBack, showMenu = false, onMenuClick }: MobileHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="bg-[#2563EB] text-white px-4 py-4 flex items-center justify-between">
      {showBack ? (
        <button onClick={handleBack} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-10" />
      )}
      <h1 className="flex-1 text-center font-medium">{title}</h1>
      {showMenu ? (
        <button onClick={onMenuClick} className="p-2 -mr-2">
          <MoreVertical className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-10" />
      )}
    </div>
  );
}
