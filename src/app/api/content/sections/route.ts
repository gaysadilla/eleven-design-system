import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const contentDir = join(process.cwd(), 'content', 'sections');
    const files = ['components.json', 'foundations.json', 'patterns.json', 'development.json'];
    
    const sections = files.map(file => {
      try {
        const filePath = join(contentDir, file);
        const content = readFileSync(filePath, 'utf8');
        return JSON.parse(content);
      } catch (error) {
        console.warn(`Failed to read section file: ${file}`, error);
        return null;
      }
    }).filter(Boolean);

    return NextResponse.json(sections);
  } catch (error) {
    console.error('Error fetching sections:', error);
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
  }
} 