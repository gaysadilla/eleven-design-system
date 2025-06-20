import { NextRequest, NextResponse } from 'next/server';
import { FigmaAPI, syncFigmaComponent } from '@/lib/figma';

export async function POST(request: NextRequest) {
  // Temporarily disabled - return early to prevent errors
  return NextResponse.json({
    success: false,
    error: 'Figma sync is temporarily disabled. Please configure FIGMA_ACCESS_TOKEN environment variable.'
  }, { status: 503 });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const fileKey = searchParams.get('fileKey');

    if (!fileKey) {
      return NextResponse.json(
        { error: 'fileKey parameter is required' },
        { status: 400 }
      );
    }

    const figma = new FigmaAPI();
    
    // Get all components from the Figma file
    const metadata = await figma.getComponentMetadata(fileKey);
    
    // Get design tokens
    const tokens = await figma.getDesignTokens(fileKey);

    return NextResponse.json({
      success: true,
      data: {
        components: metadata,
        tokens,
      },
    });
  } catch (error) {
    console.error('Error fetching Figma data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch data from Figma',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 