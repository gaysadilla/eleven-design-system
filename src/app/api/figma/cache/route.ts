import { NextResponse } from 'next/server';
import { clearFigmaCache, getFigmaCacheStats } from '@/lib/figma';

// GET /api/figma/cache - Get cache statistics
export async function GET() {
  try {
    const stats = getFigmaCacheStats();
    
    return NextResponse.json({
      success: true,
      cache: {
        files: stats.files,
        totalSizeBytes: stats.totalSize,
        totalSizeKB: Math.round(stats.totalSize / 1024),
        oldestFile: stats.oldestFile
      }
    });
  } catch (error) {
    console.error('Error getting cache stats:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
}

// DELETE /api/figma/cache - Clear all cache
export async function DELETE() {
  try {
    clearFigmaCache();
    
    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
} 