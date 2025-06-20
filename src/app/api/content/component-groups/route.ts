import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const contentDir = join(process.cwd(), 'content', 'component-groups');
    const files = readdirSync(contentDir).filter(file => file.endsWith('.json'));
    
    const componentGroups = files.map(file => {
      try {
        const filePath = join(contentDir, file);
        const content = readFileSync(filePath, 'utf8');
        return JSON.parse(content);
      } catch (error) {
        console.warn(`Failed to read component group file: ${file}`, error);
        return null;
      }
    }).filter(Boolean);

    return NextResponse.json(componentGroups);
  } catch (error) {
    console.error('Error fetching component groups:', error);
    return NextResponse.json({ error: 'Failed to fetch component groups' }, { status: 500 });
  }
} 