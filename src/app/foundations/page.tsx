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
    const filePath = join(process.cwd(), 'content', 'sections', 'foundations.json');
    const content = readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Failed to load foundations data:', error);
    throw new Error('Failed to load foundations data');
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

export default async function FoundationsPage() {
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

      {/* Foundation Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <div className="bg-accent/50 rounded-lg p-6 hover:bg-accent/70 transition-colors">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Color System</h3>
          <p className="text-muted-foreground mb-4">
            Primary palette, semantic colors, and accessibility guidelines for consistent color usage.
          </p>
          <Link 
            href="/foundations/color" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            Learn More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-accent/50 rounded-lg p-6 hover:bg-accent/70 transition-colors">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Typography</h3>
          <p className="text-muted-foreground mb-4">
            Font families, scales, and text hierarchy for readable and consistent typography.
          </p>
          <Link 
            href="/foundations/typography" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            Learn More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-accent/50 rounded-lg p-6 hover:bg-accent/70 transition-colors">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Spacing & Layout</h3>
          <p className="text-muted-foreground mb-4">
            Grid systems, spacing tokens, and layout principles for structured designs.
          </p>
          <Link 
            href="/foundations/spacing" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            Learn More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-accent/50 rounded-lg p-6 hover:bg-accent/70 transition-colors">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Iconography</h3>
          <p className="text-muted-foreground mb-4">
            Icon library, usage guidelines, and best practices for visual communication.
          </p>
          <Link 
            href="/foundations/icons" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            Learn More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-accent/50 rounded-lg p-6 hover:bg-accent/70 transition-colors">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Elevation</h3>
          <p className="text-muted-foreground mb-4">
            Shadow system and depth guidelines for creating visual hierarchy.
          </p>
          <Link 
            href="/foundations/elevation" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            Learn More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-accent/50 rounded-lg p-6 hover:bg-accent/70 transition-colors">
          <h3 className="text-lg font-semibold mb-2 text-foreground">Motion</h3>
          <p className="text-muted-foreground mb-4">
            Animation principles, timing, and easing for delightful interactions.
          </p>
          <Link 
            href="/foundations/motion" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            Learn More
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Getting Started */}
      <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border">
        <h2 className="text-2xl font-semibold text-foreground mb-4">Getting Started with Foundations</h2>
        <p className="text-muted-foreground mb-6">
          Learn how to implement and use our design foundations in your projects. Start with the basics and work your way through each foundation element.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/foundations/design-tokens">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Start with Design Tokens
            </button>
          </Link>
          <Link href="/development/installation">
            <button className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-accent transition-colors">
              Installation Guide
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 