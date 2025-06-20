import { NextRequest, NextResponse } from 'next/server';
import { FigmaAPI, syncFigmaComponent } from '@/lib/figma';

export async function POST(request: NextRequest) {
  try {
    const { figmaUrl, componentName, debug, bustCache } = await request.json();
    
    if (debug) {
      // Debug mode: return file structure
      const figma = new FigmaAPI();
      const fileKey = FigmaAPI.extractFileKey(figmaUrl);
      
      if (!fileKey) {
        return NextResponse.json({ error: 'Invalid Figma URL' }, { status: 400 });
      }
      
      const file = await figma.getFile(fileKey);
      const nodeId = FigmaAPI.extractNodeId(figmaUrl);
      
      return NextResponse.json({
        success: true,
        debug: {
          fileKey,
          nodeId,
          componentCount: Object.keys(file.components || {}).length,
          componentKeys: Object.keys(file.components || {}),
          components: Object.values(file.components || {}).map(c => ({
            name: c.name,
            key: c.key,
            description: c.description
          }))
        }
      });
    }

    const result = await syncFigmaComponent(figmaUrl, componentName || 'Component', bustCache);
    
    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error syncing Figma component:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
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