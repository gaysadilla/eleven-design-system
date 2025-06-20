'use client';

import { useEffect, useState } from 'react';

export default function TinaDebugInfo() {
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      const params = Object.fromEntries(url.searchParams.entries());
      
      // Check for various TinaCMS indicators
      const info = {
        currentUrl: window.location.href,
        queryParams: params,
        hasTinaParam: url.searchParams.has('tina'),
        hasEditParam: url.searchParams.has('edit'),
        hasPreviewParam: url.searchParams.has('preview'),
        isInIframe: window.parent !== window,
        referrer: document.referrer,
        // Check for TinaCMS in window object
        hasTinaGlobal: typeof (window as any).tina !== 'undefined',
        // Check localStorage for TinaCMS data
        tinaLocalStorage: Object.keys(localStorage)
          .filter(key => key.toLowerCase().includes('tina'))
          .reduce((acc, key) => ({ ...acc, [key]: localStorage.getItem(key) }), {}),
      };

      setDebugInfo(info);
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-black/80 text-white text-xs max-w-md rounded-lg shadow-lg z-50">
      <h3 className="font-bold mb-2">TinaCMS Debug Info</h3>
      <pre className="overflow-auto max-h-64">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
} 