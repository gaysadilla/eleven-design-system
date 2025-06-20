import { readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';

interface SectionData {
  title: string;
  slug: string;
  description: string;
  hasLandingPage: boolean;
  landingPage?: {
    overview: any;
    tabs: any[];
  };
}

async function getSectionData(): Promise<SectionData> {
  try {
    const filePath = join(process.cwd(), 'content', 'sections', 'patterns.json');
    const content = readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Failed to load patterns data:', error);
    throw new Error('Failed to load patterns data');
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

export default async function PatternsPage() {
  const sectionData = await getSectionData();
  
  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-foreground">{sectionData.title}</h1>
        <p className="text-lg text-muted-foreground mb-6">{sectionData.description}</p>
        
        {sectionData.landingPage?.overview && (
          <div className="prose prose-gray max-w-none">
            {renderContent(sectionData.landingPage.overview)}
          </div>
        )}
      </div>

      {/* Pattern Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <div className="bg-accent/50 rounded-lg p-6 hover:bg-accent/70 transition-colors">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Layout Patterns</h3>
          <p className="text-muted-foreground mb-4">
            Common layout structures and templates for building consistent page layouts.
          </p>
          <Link 
            href="/patterns/layouts" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            View Patterns
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-accent/50 rounded-lg p-6 hover:bg-accent/70 transition-colors">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Navigation Patterns</h3>
          <p className="text-muted-foreground mb-4">
            Navigation structures, breadcrumbs, and wayfinding solutions for complex interfaces.
          </p>
          <Link 
            href="/patterns/navigation" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            View Patterns
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-accent/50 rounded-lg p-6 hover:bg-accent/70 transition-colors">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Data Display</h3>
          <p className="text-muted-foreground mb-4">
            Tables, lists, and data visualization patterns for presenting information effectively.
          </p>
          <Link 
            href="/patterns/data-display" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            View Patterns
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-accent/50 rounded-lg p-6 hover:bg-accent/70 transition-colors">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Form Patterns</h3>
          <p className="text-muted-foreground mb-4">
            Form layouts, validation patterns, and input grouping strategies for better UX.
          </p>
          <Link 
            href="/patterns/forms" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            View Patterns
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-accent/50 rounded-lg p-6 hover:bg-accent/70 transition-colors">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Feedback Patterns</h3>
          <p className="text-muted-foreground mb-4">
            Loading states, error handling, and success messaging patterns for clear communication.
          </p>
          <Link 
            href="/patterns/feedback" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            View Patterns
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-accent/50 rounded-lg p-6 hover:bg-accent/70 transition-colors">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Content Patterns</h3>
          <p className="text-muted-foreground mb-4">
            Article layouts, media presentation, and content organization patterns.
          </p>
          <Link 
            href="/patterns/content" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            View Patterns
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Featured Patterns */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8">Featured Patterns</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="border border-border rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">Master-Detail Layout</h3>
              <p className="text-muted-foreground text-sm">
                A flexible pattern for displaying hierarchical content with a list view and detailed view.
              </p>
            </div>
            <div className="bg-muted rounded p-4 mb-4">
              <div className="text-xs text-muted-foreground mb-2">Preview</div>
              <div className="flex space-x-2 text-xs">
                <div className="bg-background rounded p-2 flex-1">List</div>
                <div className="bg-background rounded p-2 flex-2">Detail</div>
              </div>
            </div>
            <Link 
              href="/patterns/master-detail" 
              className="text-primary hover:text-primary/80 font-medium text-sm"
            >
              View Pattern →
            </Link>
          </div>

          <div className="border border-border rounded-lg p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">Progressive Disclosure</h3>
              <p className="text-muted-foreground text-sm">
                Reveal information progressively to reduce cognitive load and improve user experience.
              </p>
            </div>
            <div className="bg-muted rounded p-4 mb-4">
              <div className="text-xs text-muted-foreground mb-2">Interactive Example</div>
              <div className="space-y-2 text-xs">
                <div className="bg-background rounded p-2">Summary</div>
                <div className="bg-background/50 rounded p-2">→ More Details</div>
                <div className="bg-background/25 rounded p-2">→ Advanced Options</div>
              </div>
            </div>
            <Link 
              href="/patterns/progressive-disclosure" 
              className="text-primary hover:text-primary/80 font-medium text-sm"
            >
              View Pattern →
            </Link>
          </div>
        </div>
      </div>

      {/* Pattern Guidelines */}
      <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Pattern Guidelines</h2>
        <p className="text-muted-foreground mb-6">
          Learn how to effectively apply design patterns to create consistent and intuitive user experiences across your applications.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-3">When to Use Patterns</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Solving common user interface problems</li>
              <li>• Ensuring consistency across products</li>
              <li>• Reducing design and development time</li>
              <li>• Improving user familiarity and usability</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">Best Practices</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Choose patterns based on user context</li>
              <li>• Test patterns with real users</li>
              <li>• Document pattern variations and exceptions</li>
              <li>• Keep patterns flexible for different use cases</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/patterns/getting-started">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Getting Started Guide
            </button>
          </Link>
          <Link href="/patterns/contribute">
            <button className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-accent transition-colors">
              Contribute a Pattern
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 