import { NextResponse } from 'next/server';
import { syncFigmaComponent } from '@/lib/figma';

// GET /api/figma/debug?url=<figma-url> - Debug Figma sync
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const figmaUrl = searchParams.get('url');
    
    if (!figmaUrl) {
      return NextResponse.json(
        { error: 'Figma URL is required' }, 
        { status: 400 }
      );
    }

    console.log(`🔍 DEBUG: Testing Figma URL: ${figmaUrl}`);

    // First, try without cache busting
    const normalResult = await syncFigmaComponent(figmaUrl, 'Debug Test', false);
    
    // Then, try with cache busting
    const bustCacheResult = await syncFigmaComponent(figmaUrl, 'Debug Test', true);
    
    return NextResponse.json({
      success: true,
      figmaUrl,
      timestamp: new Date().toISOString(),
      results: {
        normal: {
          imageUrl: normalResult.imageUrl,
          cached: normalResult.properties?.cached || false,
          nodeId: normalResult.properties?.nodeId,
        },
        bustCache: {
          imageUrl: bustCacheResult.imageUrl,
          cached: bustCacheResult.properties?.cached || false,
          nodeId: bustCacheResult.properties?.nodeId,
        }
      },
      comparison: {
        sameImageUrl: normalResult.imageUrl === bustCacheResult.imageUrl,
        bothFromCache: (normalResult.properties?.cached && bustCacheResult.properties?.cached),
        message: normalResult.imageUrl === bustCacheResult.imageUrl 
          ? 'Same image URL returned - either content unchanged or Figma API cached'
          : 'Different image URLs - cache busting worked'
      }
    });
  } catch (error) {
    console.error('Error in debug endpoint:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
} 