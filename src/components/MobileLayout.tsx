import { ReactNode } from 'react';

interface MobileLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MobileLayout({ children, className = '' }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className={`w-full max-w-[428px] min-h-screen bg-white relative overflow-hidden ${className}`}>
        {children}
      </div>
    </div>
  );
}
