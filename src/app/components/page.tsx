import { readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';

interface Tab {
  title: string;
  slug: string;
  content: any;
}

interface SectionData {
  title: string;
  slug: string;
  description: string;
  hasLandingPage: boolean;
  landingPage?: {
    overview: any;
    tabs: Tab[];
  };
}

// This would normally be fetched from an API or TinaCMS
async function getSectionData(): Promise<SectionData> {
  try {
    const filePath = join(process.cwd(), 'content', 'sections', 'components.json');
    const content = readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Failed to load section data:', error);
    throw new Error('Failed to load section data');
  }
}

function renderContent(content: any): React.ReactNode {
  if (!content || !content.children) return null;

  return content.children.map((child: any, index: number) => {
    switch (child.type) {
      case 'h2':
        return <h2 key={index} className="text-2xl font-bold text-foreground mb-4">{child.children[0]?.text}</h2>;
      case 'h3':
        return <h3 key={index} className="text-xl font-semibold text-foreground mb-3">{child.children[0]?.text}</h3>;
      case 'h4':
        return <h4 key={index} className="text-lg font-medium text-foreground mb-2">{child.children[0]?.text}</h4>;
      case 'p':
        return <p key={index} className="text-muted-foreground mb-4 leading-relaxed">{child.children[0]?.text}</p>;
      case 'ul':
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
            {child.children.map((li: any, liIndex: number) => (
              <li key={liIndex}>{li.children[0]?.text}</li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  });
}



// Server Component
export default async function Page() {
  const sectionData = await getSectionData();
  
  // Since this is a server component, we need to convert it to a client component for state management
  // For now, let's create a simple version that shows the content
  
  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-foreground">{sectionData.title}</h1>
        {sectionData.landingPage?.overview && (
          <div className="prose prose-gray max-w-none">
            {renderContent(sectionData.landingPage.overview)}
          </div>
        )}
      </div>

      {/* Simple Tab Display */}
      {sectionData.landingPage?.tabs && (
        <div className="space-y-8">
          {sectionData.landingPage.tabs.map((tab) => (
            <div key={tab.slug} className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-foreground">{tab.title}</h2>
              <div className="prose prose-gray max-w-none">
                {renderContent(tab.content)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <div className="bg-accent/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Browse Components</h3>
          <p className="text-muted-foreground mb-4">
            Explore our component library organized by category and functionality.
          </p>
          <Link 
            href="#" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            View All Components
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-accent/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Design Guidelines</h3>
          <p className="text-muted-foreground mb-4">
            Learn about our design principles and best practices for component usage.
          </p>
          <Link 
            href="/patterns" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            View Guidelines
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 