import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export async function GET(request: NextRequest) {
  try {
    const contentDir = join(process.cwd(), 'content', 'pages');
    const files = readdirSync(contentDir).filter(file => file.endsWith('.mdx'));
    
    const pages = files.map(file => {
      try {
        const filePath = join(contentDir, file);
        const content = readFileSync(filePath, 'utf8');
        const { data } = matter(content);
        return data;
      } catch (error) {
        console.warn(`Failed to read page file: ${file}`, error);
        return null;
      }
    }).filter(Boolean);

    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
} 