'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/navigation/Sidebar';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Determine which section we're in
  const getSection = () => {
    if (pathname.startsWith('/components')) return 'components';
    if (pathname.startsWith('/foundations')) return 'foundations';
    if (pathname.startsWith('/patterns')) return 'patterns';
    if (pathname.startsWith('/development')) return 'development';
    return null;
  };
  
  const currentSection = getSection();
  const showSidebar = currentSection !== null;

  return (
    <div className="flex flex-1">
      {/* Section-Specific Sidebar Navigation */}
      {showSidebar && <Sidebar section={currentSection} />}
      
      {/* Main Content */}
      <main className="flex-1 overflow-x-auto bg-background">
        {children}
      </main>
    </div>
  );
} 