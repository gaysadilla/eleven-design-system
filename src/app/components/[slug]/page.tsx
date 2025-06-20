import { client } from '../../../../tina/__generated__/client';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ComponentTabs from './ComponentTabs';
import VisualEditingProvider from '@/components/VisualEditingProvider';
import ErrorBoundary from '@/components/ErrorBoundary';

interface ComponentPageData {
  frontmatter: any;
  content: string;
  source: 'tina' | 'file';
  tinaData?: any;
}

async function getComponentData(slug: string): Promise<ComponentPageData | null> {
  // Try different case variations for file names
  const variations = [
    slug,
    slug.toLowerCase(), 
    slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase(),
    slug.toUpperCase(),
    slug.charAt(0).toUpperCase() + slug.slice(1)
  ];

  // First try TinaCMS with different case variations
  for (const variation of variations) {
    try {
      console.log(`🔍 Attempting TinaCMS query for: ${variation}.mdx`);
      
      const tinaData = await client.queries.page({
        relativePath: `${variation}.mdx`,
      });
      
      console.log('🔍 TinaCMS Query Result - variation:', variation);
      console.log('🔍 TinaCMS Query Result - success:', !!tinaData);
      console.log('🔍 TinaCMS Query Result - hasData:', !!tinaData?.data);
      console.log('🔍 TinaCMS Query Result - hasPage:', !!tinaData?.data?.page);
      console.log('🔍 TinaCMS Query Result - tinaData:', tinaData);
      console.log('🔍 TinaCMS Query Result - tinaData?.data:', tinaData?.data);
      console.log('🔍 TinaCMS Query Result - tinaData?.data?.page:', tinaData?.data?.page);
      console.log('🔍 TinaCMS Query Result - tinaData?.data?.page?.overview:', tinaData?.data?.page?.overview);
      console.log('🔍 TinaCMS Query Result - tinaData?.data?.page?.overview?.blocks:', tinaData?.data?.page?.overview?.blocks);
      
      if (tinaData?.data?.page) {
        console.log('✅ TinaCMS query successful, returning data');
        return {
          frontmatter: tinaData.data.page,
          content: '',
          source: 'tina',
          tinaData
        };
      } else {
        console.log('❌ TinaCMS query returned no page data');
      }
    } catch (error) {
      // Continue to next variation
      console.error(`❌ TinaCMS failed for ${variation}.mdx:`, error);
      continue;
    }
  }

  // Fallback to file-based content if TinaCMS fails
  try {
    const contentDir = join(process.cwd(), 'content', 'pages');
    
    for (const variation of variations) {
      try {
        const filePath = join(contentDir, `${variation}.mdx`);
        const fileContent = readFileSync(filePath, 'utf8');
        const { data: frontmatter, content } = matter(fileContent);
        
        console.log(`Using file-based fallback for ${variation}.mdx`);
        return {
          frontmatter,
          content,
          source: 'file'
        };
      } catch (error) {
        continue;
      }
    }
  } catch (error) {
    console.error(`Failed to load component: ${slug}`, error);
  }

  return null;
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];

  // Get pages from TinaCMS
  try {
    const pages = await client.queries.pageConnection();
    const tinaPages = pages.data.pageConnection.edges?.map((edge: any) => ({
      slug: edge?.node?._sys.filename.toLowerCase() || ''
    })).filter(Boolean) || [];
    params.push(...tinaPages);
  } catch (error) {
    console.error('Failed to get TinaCMS pages:', error);
  }

  // Get pages from file system as fallback
  try {
    const contentDir = join(process.cwd(), 'content', 'pages');
    const files = readdirSync(contentDir);
    const filePages = files
      .filter(file => file.endsWith('.mdx'))
      .map(file => ({
        slug: file.replace('.mdx', '').toLowerCase()
      }));
    
    // Merge and deduplicate
    const existingSlugs = new Set(params.map(p => p.slug));
    filePages.forEach(page => {
      if (!existingSlugs.has(page.slug)) {
        params.push(page);
      }
    });
  } catch (error) {
    console.error('Failed to get file-based pages:', error);
  }

  return params;
}

export default async function ComponentPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug: string }>; 
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }> 
}) {
  const { slug } = await params;
  const search = await searchParams;
  const data = await getComponentData(slug);
  
  // Check if we're in visual editing mode
  const isEditing = search?.edit === 'true' || search?.tina === 'true' || 
                   (typeof window !== 'undefined' && window.parent !== window); // iframe detection
  
  if (!data) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Component Not Found</h1>
          <p className="text-muted-foreground mb-6">The component "{slug}" could not be found.</p>
          <Link href="/components">
            <Button>Back to Components</Button>
          </Link>
        </div>
      </div>
    );
  }

  // If we have TinaCMS data, use visual editing provider
  if (data.source === 'tina' && data.tinaData) {
    return (
      <ErrorBoundary>
        <VisualEditingProvider
          query={data.tinaData.query}
          variables={data.tinaData.variables}
          data={data.tinaData.data}
        >
          <ComponentTabs 
            data={data.frontmatter} 
            isEditing={isEditing} 
            query={data.tinaData.query}
            variables={data.tinaData.variables}
          />
        </VisualEditingProvider>
      </ErrorBoundary>
    );
  }

  // Otherwise use regular component tabs (file-based fallback)
  return (
    <ErrorBoundary>
      <ComponentTabs data={data.frontmatter} isEditing={isEditing} />
    </ErrorBoundary>
  );
} 