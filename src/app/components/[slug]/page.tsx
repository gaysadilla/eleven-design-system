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
  // Check if client is properly initialized
  if (!client) {
    console.error('TinaCMS client is not initialized');
    return null;
  }

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
      console.log(`Trying to fetch: ${variation}.mdx`);
      
      const tinaData = await client.queries.page({
        relativePath: `${variation}.mdx`,
      });
      
      if (tinaData?.data?.page) {
        console.log(`Successfully fetched data for: ${variation}.mdx`);
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

  console.error(`No data found for any variation of slug: ${slug}`);
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
    
    if (!slug) {
      console.error('No slug provided');
      throw new Error('Missing slug parameter');
    }
    
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

    // Validate the data structure
    if (!data.tinaData?.query || !data.tinaData?.variables || !data.tinaData?.data) {
      console.error('Invalid TinaCMS data structure:', {
        hasQuery: !!data.tinaData?.query,
        hasVariables: !!data.tinaData?.variables,
        hasData: !!data.tinaData?.data
      });
      throw new Error('Invalid TinaCMS data structure');
    }

    // DEBUG: Return a simple version first to isolate the issue
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Debug: Component Data</h1>
        <div className="bg-gray-100 p-4 rounded mb-4">
          <p><strong>Slug:</strong> {slug}</p>
          <p><strong>Title:</strong> {data.frontmatter?.title || 'No title'}</p>
          <p><strong>Description:</strong> {data.frontmatter?.description || 'No description'}</p>
          <p><strong>Status:</strong> {data.frontmatter?.status || 'No status'}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded mb-4">
          <h2 className="font-bold mb-2">TinaCMS Data Structure:</h2>
          <p>Has Query: {data.tinaData?.query ? '✅' : '❌'}</p>
          <p>Has Variables: {data.tinaData?.variables ? '✅' : '❌'}</p>
          <p>Has Data: {data.tinaData?.data ? '✅' : '❌'}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Now Testing TinaWrapper (Fixed):</h2>
          <ErrorBoundary>
            <TinaWrapper 
              query={data.tinaData.query}
              variables={data.tinaData.variables}
              data={data.tinaData.data}
              pageData={data.frontmatter}
            />
          </ErrorBoundary>
        </div>
        
        <Link href="/components" className="inline-block mt-4">
          <Button>Back to Components</Button>
        </Link>
      </div>
    );

    // Original complex component (commented out for debugging)
    /*
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
    */
  } catch (error) {
    console.error('Error in ComponentPage:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Error Loading Component</h1>
          <p className="text-muted-foreground mb-6">An error occurred while loading this component.</p>
          {process.env.NODE_ENV === 'development' && error instanceof Error && (
            <pre className="text-left bg-gray-100 p-4 rounded mb-6 overflow-auto">
              {error.message}
            </pre>
          )}
          <Link href="/components">
            <Button>Back to Components</Button>
          </Link>
        </div>
      </div>
    );
  }
} 