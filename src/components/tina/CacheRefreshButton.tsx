import React, { useState } from 'react';

const CacheRefreshButton = (props: any) => {
  console.log('🔍 CacheRefreshButton props:', props);
  
  // TinaCMS custom components receive different props structure
  const form = props.form || props.tinaForm;
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Test function to verify API connectivity
  const testApiConnectivity = async () => {
    console.log('🧪 Testing API connectivity...');
    try {
      const response = await fetch('http://localhost:3000/api/health');
      console.log('🧪 Health check response:', response.status);
      const data = await response.json();
      console.log('🧪 Health check data:', data);
    } catch (error) {
      console.log('🧪 Health check failed:', error);
    }
  };

  const handleRefresh = async () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    
    try {
      console.log('🔄 Refreshing Figma cache from TinaCMS...');
      console.log('🔍 Form object:', form);
      console.log('🔍 Form getState:', form?.getState);
      
      if (!form || !form.getState) {
        throw new Error('TinaCMS form not available');
      }
      
      const formData = form.getState().values;
      console.log('🔍 Form data:', formData);
      
      // Determine the correct API URL (TinaCMS runs on different port than Next.js)
      // Check if we're in TinaCMS admin interface
      const isTinaCMS = window.location.port === '4001' || window.location.port === '9001' || window.location.pathname.startsWith('/admin');
      
      let response;
      if (isTinaCMS) {
        // Try multiple common Next.js ports (start with most likely)
        const possiblePorts = [
          process.env.NEXT_PUBLIC_NEXTJS_PORT, // Custom env var if set
          '3000', // Default Next.js port (try first)
          '3001', // Most common when 3000 is taken
          '3002', '3003', '3004' // Other common alternatives
        ].filter(Boolean); // Remove undefined values
        
        let lastError;
        
                 for (const port of possiblePorts) {
           try {
             console.log(`🔍 Trying Next.js API on port ${port}...`);
             
             // First do a quick health check to see if the port is responding
             const healthUrl = `http://localhost:${port}/api/health`;
             try {
               await fetch(healthUrl, { method: 'HEAD' });
             } catch {
               // If health check fails, skip to the main API call
             }
             
             const apiUrl = `http://localhost:${port}/api/figma/refresh-page`;
             console.log(`🔍 Attempting request to: ${apiUrl}`);
             console.log(`🔍 Sending data:`, JSON.stringify({ pageData: formData }, null, 2));
             
             response = await fetch(apiUrl, {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                 pageData: formData
               }),
             });
             
             console.log(`🔍 Response status: ${response.status}`);
             console.log(`🔍 Response headers:`, Object.fromEntries(response.headers.entries()));
             
             if (response.ok) {
               console.log(`✅ Successfully connected to Next.js on port ${port}`);
               break;
             } else {
               const errorText = await response.text();
               console.log(`❌ Port ${port} responded but with error: ${response.status}`);
               console.log(`❌ Error response:`, errorText);
             }
           } catch (error) {
             const errorMessage = error instanceof Error ? error.message : 'Unknown error';
             console.log(`❌ Port ${port} failed: ${errorMessage}`);
             lastError = error;
             continue;
           }
         }
         
         if (!response || !response.ok) {
           const lastErrorMessage = lastError instanceof Error ? lastError.message : 'Unknown error';
           throw new Error(`Could not connect to Next.js API on any port. Last error: ${lastErrorMessage}`);
         }
      } else {
        // We're on the Next.js site, use relative URL
        response = await fetch('/api/figma/refresh-page', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pageData: formData
          }),
        });
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('✅ Cache refresh completed:', result.message);
        
        if (result.details.total > 0) {
          alert(`Cache refreshed! Updated ${result.details.successful} Figma asset${result.details.successful !== 1 ? 's' : ''}.`);
        } else {
          alert('No Figma assets found on this page to refresh.');
        }
      } else {
        console.error('❌ Cache refresh failed:', result.error);
        alert('Failed to refresh cache. Please try again.');
      }
    } catch (error) {
      console.error('❌ Cache refresh error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to refresh cache: ${errorMessage}\n\nPlease check the browser console for more details.`);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div style={{ padding: '1rem', borderTop: '1px solid #e1e5e9' }}>
      <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
        <button
          type="button"
          onClick={testApiConnectivity}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500'
          }}
        >
          🧪 Test API Connection
        </button>
        
        <button
          type="button"
          onClick={handleRefresh}
          disabled={isRefreshing}
          style={{
            backgroundColor: '#0084ff',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: isRefreshing ? 'not-allowed' : 'pointer',
            opacity: isRefreshing ? 0.6 : 1,
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {isRefreshing ? (
            <>
              <span style={{ animation: 'spin 1s linear infinite' }}>🔄</span>
              Refreshing...
            </>
          ) : (
            <>
              🔄 Refresh Figma Cache
            </>
          )}
        </button>
      </div>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default CacheRefreshButton; 