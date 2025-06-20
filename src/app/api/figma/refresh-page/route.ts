import { NextResponse } from 'next/server';
import { syncFigmaComponent } from '@/lib/figma';

// POST /api/figma/refresh-page - Refresh all Figma assets on a page
export async function POST(request: Request) {
  try {
    console.log('🔍 Cache refresh request received');
    console.log('🔍 Request headers:', Object.fromEntries(request.headers.entries()));
    
    const requestBody = await request.json();
    console.log('🔍 Request body:', JSON.stringify(requestBody, null, 2));
    
    const { pageData } = requestBody;
    
    if (!pageData) {
      console.log('❌ No pageData provided in request');
      const errorResponse = NextResponse.json(
        { error: 'Page data is required' }, 
        { status: 400 }
      );
      
      // Add CORS headers for TinaCMS
      errorResponse.headers.set('Access-Control-Allow-Origin', '*');
      errorResponse.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
      errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
      
      return errorResponse;
    }

    const refreshedAssets: Array<{url: string; success: boolean; error?: string}> = [];
    
    // Function to recursively find all Figma URLs in the page data
    function findFigmaUrls(obj: any, urls: string[] = []): string[] {
      if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
          obj.forEach(item => findFigmaUrls(item, urls));
        } else {
          Object.keys(obj).forEach(key => {
            if (key === 'figmaUrl' && typeof obj[key] === 'string' && obj[key].includes('figma.com')) {
              urls.push(obj[key]);
            } else {
              findFigmaUrls(obj[key], urls);
            }
          });
        }
      }
      return urls;
    }

    // Find all Figma URLs in the page
    const figmaUrls = findFigmaUrls(pageData);
    const uniqueUrls = [...new Set(figmaUrls)]; // Remove duplicates
    
    console.log(`🔄 Refreshing cache for ${uniqueUrls.length} Figma assets`);

    // Refresh each Figma asset with cache busting
    for (const figmaUrl of uniqueUrls) {
      try {
        await syncFigmaComponent(figmaUrl, 'Asset', true); // bustCache = true
        refreshedAssets.push({ url: figmaUrl, success: true });
        console.log(`✅ Refreshed: ${figmaUrl}`);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        refreshedAssets.push({ url: figmaUrl, success: false, error: errorMessage });
        console.error(`❌ Failed to refresh: ${figmaUrl}`, error);
      }
    }

    const successCount = refreshedAssets.filter(asset => asset.success).length;
    const failureCount = refreshedAssets.length - successCount;

    const response = NextResponse.json({
      success: true,
      message: `Refreshed ${successCount} assets${failureCount > 0 ? `, ${failureCount} failed` : ''}`,
      details: {
        total: refreshedAssets.length,
        successful: successCount,
        failed: failureCount,
        assets: refreshedAssets
      }
    });
    
    // Add CORS headers for TinaCMS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    console.error('Error refreshing page cache:', error);
    const errorResponse = NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, 
      { status: 500 }
    );
    
    // Add CORS headers for TinaCMS
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    errorResponse.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return errorResponse;
  }
}

// Handle preflight requests
export async function OPTIONS(request: Request) {
  const response = new NextResponse(null, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
} 