'use client';

import { client } from '../../../../tina/__generated__/client';
import { useTina } from 'tinacms/dist/react';
import ComponentTabs from './ComponentTabs';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ComponentPageProps {
  params: Promise<{ slug: string }>;
}

export default function ComponentPage({ params }: ComponentPageProps) {
  const [slug, setSlug] = useState<string>('');
  const [pageData, setPageData] = useState<any>(null);
  const [query, setQuery] = useState<string>('');
  const [variables, setVariables] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    loadParams();
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    const loadPageData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try different case variations for file names
        const variations = [
          slug,
          slug.toLowerCase(), 
          slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase(),
          slug.toUpperCase(),
          slug.charAt(0).toUpperCase() + slug.slice(1)
        ];

        let pageResponse = null;
        for (const variation of variations) {
          try {
            pageResponse = await client.queries.page({
              relativePath: `${variation}.mdx`,
            });
            if (pageResponse?.data?.page) {
              break;
            }
          } catch (err) {
            continue;
          }
        }

        if (!pageResponse?.data?.page) {
          setError('Page not found');
          return;
        }

        setPageData(pageResponse.data);
        setQuery(pageResponse.query);
        setVariables(pageResponse.variables);
      } catch (err) {
        console.error('Error loading page data:', err);
        setError('Failed to load page data');
      } finally {
        setLoading(false);
      }
    };

    loadPageData();
  }, [slug]);

  // Use standard TinaCMS hook
  const tina = pageData ? useTina({
    query,
    variables,
    data: pageData,
  }) : null;

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !pageData) {
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

  // Use the data from TinaCMS (will be reactive in edit mode)
  const data = tina?.data?.page || pageData.page;

  return (
    <ErrorBoundary>
      <ComponentTabs data={data} />
    </ErrorBoundary>
  );
} 