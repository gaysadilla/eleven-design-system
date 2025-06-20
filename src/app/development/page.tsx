import { readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import { Code, Download, BookOpen, Terminal, Package, GitBranch } from 'lucide-react';

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
    const filePath = join(process.cwd(), 'content', 'sections', 'development.json');
    const content = readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Failed to load development data:', error);
    throw new Error('Failed to load development data');
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

export default async function DevelopmentPage() {
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

      {/* Quick Start */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border p-8 mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
          <Terminal className="w-6 h-6 mr-3" />
          Quick Start
        </h2>
        <p className="text-muted-foreground mb-6">
          Get up and running with the Eleven Design System in your project in minutes.
        </p>
        <div className="bg-muted rounded-lg p-4 mb-6">
          <code className="text-sm font-mono">npm install @eleven/design-system</code>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/development/installation">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Installation Guide
            </button>
          </Link>
          <Link href="/development/getting-started">
            <button className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-accent transition-colors flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Getting Started
            </button>
          </Link>
        </div>
      </div>

      {/* Development Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-accent/50 rounded-lg p-6 hover:bg-accent/70 transition-colors">
          <div className="flex items-center mb-4">
            <Package className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-lg font-semibold text-foreground">React Components</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Pre-built React components with TypeScript support and comprehensive API documentation.
          </p>
          <Link 
            href="/development/react" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            View Components
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-accent/50 rounded-lg p-6 hover:bg-accent/70 transition-colors">
          <div className="flex items-center mb-4">
            <Code className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-lg font-semibold text-foreground">Design Tokens</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            CSS custom properties, Tailwind config, and JavaScript tokens for consistent styling.
          </p>
          <Link 
            href="/development/tokens" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            View Tokens
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="bg-accent/50 rounded-lg p-6 hover:bg-accent/70 transition-colors">
          <div className="flex items-center mb-4">
            <GitBranch className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-lg font-semibold text-foreground">Contributing</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Guidelines for contributing to the design system, submitting PRs, and reporting issues.
          </p>
          <Link 
            href="/development/contributing" 
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            Contribute
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Framework Support */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-8">Framework Support</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">React</h3>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Full Support</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Complete component library with TypeScript definitions, hooks, and utilities.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Components:</span>
                <span className="font-medium">50+</span>
              </div>
              <div className="flex justify-between">
                <span>TypeScript:</span>
                <span className="font-medium text-green-600">✓</span>
              </div>
              <div className="flex justify-between">
                <span>Tree Shaking:</span>
                <span className="font-medium text-green-600">✓</span>
              </div>
            </div>
            <Link href="/development/react" className="text-primary hover:text-primary/80 font-medium text-sm mt-4 inline-block">
              React Documentation →
            </Link>
          </div>

          <div className="border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Vue.js</h3>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Coming Soon</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Vue component library in development. Design tokens and CSS are already available.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Components:</span>
                <span className="font-medium text-muted-foreground">In Progress</span>
              </div>
              <div className="flex justify-between">
                <span>Design Tokens:</span>
                <span className="font-medium text-green-600">✓</span>
              </div>
              <div className="flex justify-between">
                <span>CSS Classes:</span>
                <span className="font-medium text-green-600">✓</span>
              </div>
            </div>
            <Link href="/development/vue" className="text-primary hover:text-primary/80 font-medium text-sm mt-4 inline-block">
              Vue Roadmap →
            </Link>
          </div>
        </div>
      </div>

      {/* Developer Tools */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-foreground mb-8">Developer Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 border border-border rounded-lg hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">VS Code Extension</h3>
            <p className="text-sm text-muted-foreground mb-4">
              IntelliSense support, component snippets, and design token autocomplete.
            </p>
            <Link href="/development/vscode" className="text-primary hover:text-primary/80 font-medium text-sm">
              Download Extension →
            </Link>
          </div>

          <div className="text-center p-6 border border-border rounded-lg hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Storybook</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Interactive component playground with stories, controls, and documentation.
            </p>
            <Link href="https://storybook.eleven-design.com" className="text-primary hover:text-primary/80 font-medium text-sm">
              View Storybook →
            </Link>
          </div>

          <div className="text-center p-6 border border-border rounded-lg hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Terminal className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibent text-foreground mb-2">CLI Tools</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Command-line utilities for scaffolding, theming, and component generation.
            </p>
            <Link href="/development/cli" className="text-primary hover:text-primary/80 font-medium text-sm">
              CLI Documentation →
            </Link>
          </div>
        </div>
      </div>

      {/* Release Notes */}
      <div className="border border-border rounded-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Latest Release</h2>
          <span className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full font-medium">v2.1.0</span>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-3">What's New</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Added new Data Table component with sorting and filtering</li>
              <li>• Improved accessibility for form components</li>
              <li>• Enhanced TypeScript definitions</li>
              <li>• New color tokens for better semantic meaning</li>
              <li>• Performance improvements for large lists</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3">Breaking Changes</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Deprecated <code className="bg-muted px-1 rounded text-xs">Button.variant="ghost"</code></li>
              <li>• Updated default spacing values</li>
              <li>• Renamed <code className="bg-muted px-1 rounded text-xs">theme.colors</code> structure</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href="/development/changelog">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              View Full Changelog
            </button>
          </Link>
          <Link href="/development/migration">
            <button className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-accent transition-colors">
              Migration Guide
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 