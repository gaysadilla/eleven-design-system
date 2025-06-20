import { client } from '../../../../tina/__generated__/client';
import ComponentTabs from './ComponentTabs';
import ErrorBoundary from '@/components/ErrorBoundary';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import TinaWrapper from './TinaWrapper';

// Configure page behavior
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ComponentPageData {
  frontmatter: any;
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

  // Try TinaCMS with different case variations
  for (const variation of variations) {
    try {
      const tinaData = await client.queries.page({
        relativePath: `${variation}.mdx`,
      });
      
      if (tinaData?.data?.page) {
        return {
          frontmatter: tinaData.data.page,
          tinaData
        };
      }
    } catch (error) {
      console.error(`Failed to fetch ${variation}.mdx:`, error);
      continue;
    }
  }

  return null;
}

export async function generateStaticParams() {
  const params: { slug: string }[] = [];

  // Get pages from TinaCMS
  try {
    const pages = await client.queries.pageConnection();
    const tinaPages = pages.data.pageConnection.edges?.map((edge: any) => ({
      slug: edge?.node?._sys.filename.replace(/\.mdx?$/, '').toLowerCase() || ''
    })).filter(Boolean) || [];
    params.push(...tinaPages);
  } catch (error) {
    console.error('Failed to get TinaCMS pages:', error);
  }

  return params;
}

export default async function ComponentPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  try {
    // Await the params promise (Next.js 15 requirement)
    const { slug } = await params;
    
    console.log('Fetching component data for slug:', slug);
    const data = await getComponentData(slug);
    
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

    return (
      <ErrorBoundary>
        <TinaWrapper 
          query={data.tinaData.query}
          variables={data.tinaData.variables}
          data={data.tinaData.data}
        >
          {(tinaData) => <ComponentTabs data={tinaData} />}
        </TinaWrapper>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error('Error in ComponentPage:', error);
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Error Loading Component</h1>
          <p className="text-muted-foreground mb-6">An error occurred while loading this component.</p>
          <Link href="/components">
            <Button>Back to Components</Button>
          </Link>
        </div>
      </div>
    );
  }
} 