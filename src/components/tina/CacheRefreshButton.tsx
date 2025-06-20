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
      const baseUrl = getApiUrl();
      const response = await fetch(`${baseUrl}/api/health`);
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
      
      // Use the deployed API endpoint
      const baseUrl = getApiUrl();
      const apiUrl = `${baseUrl}/api/figma/refresh-page`;
      console.log(`🔍 Attempting request to: ${apiUrl}`);
      console.log(`🔍 Sending data:`, JSON.stringify({ pageData: formData }, null, 2));
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageData: formData
        }),
      });
      
      console.log(`🔍 Response status: ${response.status}`);

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

  // Try to get the API endpoint from environment or current host
  const getApiUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return process.env.NEXT_PUBLIC_VERCEL_URL 
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'https://eleven-design-system.vercel.app';
  };

  // Detect the current port from the browser URL
  const getPortFromUrl = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      return url.port || (url.protocol === 'https:' ? '443' : '80');
    }
    return '443'; // Default to HTTPS port
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