'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Github, Package, Figma, AlertTriangle, Info } from 'lucide-react';
import TableOfContents from '@/components/ui/table-of-contents';
import { TinaComponents } from '@/components/tina/TinaComponents';
import { BlockRenderer } from '@/components/tina/BlockRenderer';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { tinaField } from 'tinacms/dist/react';

interface ComponentTabsProps {
  data: any;
}

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  
  const variants: Record<string, { color: string; text: string; icon?: any }> = {
    stable: { color: 'bg-green-100 text-green-800 border-green-300', text: 'Stable' },
    beta: { color: 'bg-blue-100 text-blue-800 border-blue-300', text: 'Beta' },
    experimental: { color: 'bg-purple-100 text-purple-800 border-purple-300', text: 'Experimental' },
    deprecated: { color: 'bg-yellow-100 text-yellow-800 border-yellow-300', text: 'Deprecated', icon: AlertTriangle },
    'in-progress': { color: 'bg-orange-100 text-orange-800 border-orange-300', text: 'In Progress' }
  };
  
  const variant = variants[status] || variants.stable;
  const IconComponent = variant.icon;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variant.color}`}>
      {IconComponent && <IconComponent className="w-3 h-3 mr-1" />}
      {variant.text}
    </span>
  );
}

function renderRichContent(content: any): React.ReactNode {
  // Handle both string content (legacy) and rich-text content (TinaCMS format)
  if (!content) return null;
  
  // If content is a string (legacy markdown format), render as markdown
  if (typeof content === 'string') {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i];
      
      if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-2xl font-bold text-foreground mb-4">{line.substring(3)}</h2>);
      } else if (line.startsWith('# ')) {
        elements.push(<h1 key={i} className="text-3xl font-bold text-foreground mb-6">{line.substring(2)}</h1>);
      } else if (line.startsWith('* ')) {
        // Collect consecutive bullet points into a single list
        const listItems: string[] = [];
        while (i < lines.length && lines[i].startsWith('* ')) {
          listItems.push(lines[i].substring(2));
          i++;
        }
        i--; // Adjust because the outer loop will increment
        
        elements.push(
          <ul key={i} className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
            {listItems.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        );
      } else if (line.trim() === '') {
        elements.push(<br key={i} />);
      } else {
        elements.push(<p key={i} className="mb-4 leading-relaxed text-muted-foreground">{line}</p>);
      }
      i++;
    }
    
    return <div className="prose prose-gray max-w-none">{elements}</div>;
  }
  
  // Handle rich-text format (TinaCMS)
  // Support both "doc" and "root" types (legacy compatibility)
  if (!content.children) return null;

  return content.children.map((child: any, index: number) => {
    // Generate heading ID for TOC
    const generateHeadingId = (text: string) => {
      return text.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
    };

    switch (child.type) {
      case 'h1':
        const h1Text = child.children[0]?.text || '';
        const h1Id = generateHeadingId(h1Text);
        return <h1 key={index} id={h1Id} className="text-3xl font-bold text-foreground mb-6">{h1Text}</h1>;
      case 'h2':
        const h2Text = child.children[0]?.text || '';
        const h2Id = generateHeadingId(h2Text);
        return <h2 key={index} id={h2Id} className="text-2xl font-bold text-foreground mb-4">{h2Text}</h2>;
      case 'h3':
        const h3Text = child.children[0]?.text || '';
        const h3Id = generateHeadingId(h3Text);
        return <h3 key={index} id={h3Id} className="text-xl font-semibold text-foreground mb-3">{h3Text}</h3>;
      case 'h4':
        const h4Text = child.children[0]?.text || '';
        const h4Id = generateHeadingId(h4Text);
        return <h4 key={index} id={h4Id} className="text-lg font-medium text-foreground mb-2">{h4Text}</h4>;
      case 'p':
        return (
          <p key={index} className={`mb-4 leading-relaxed ${child.props?.className || 'text-muted-foreground'}`}>
            {child.children[0]?.text}
          </p>
        );
      case 'ul':
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
            {child.children.map((li: any, liIndex: number) => (
              <li key={liIndex}>{li.children[0]?.text}</li>
            ))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={index} className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground">
            {child.children.map((li: any, liIndex: number) => (
              <li key={liIndex}>{li.children[0]?.text}</li>
            ))}
          </ol>
        );
      case 'div':
        return (
          <div key={index} className={child.props?.className || ''}>
            {child.children && renderRichContent({ children: child.children })}
          </div>
        );
      case 'pre':
        return (
          <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 text-sm">
            <code>{child.children[0]?.children[0]?.text}</code>
          </pre>
        );
      case 'code':
        return (
          <code key={index} className="bg-muted px-2 py-1 rounded text-sm font-mono">
            {child.children[0]?.text}
          </code>
        );
      case 'blockquote':
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-4 italic text-muted-foreground mb-4">
            {child.children[0]?.text}
          </blockquote>
        );
      
      // Handle TinaCMS template components
      case 'FigmaSync':
        const FigmaSyncComponent = TinaComponents.FigmaSync;
        return <FigmaSyncComponent key={index} {...child.props} />;
        
      case 'LiveExample':
        const LiveExampleComponent = TinaComponents.LiveExample;
        return <LiveExampleComponent key={index} {...child.props} />;
        
      case 'ComponentPreview':
        const ComponentPreviewComponent = TinaComponents.ComponentPreview;
        return <ComponentPreviewComponent key={index} {...child.props} />;
        
      case 'Callout':
        const CalloutComponent = TinaComponents.Callout;
        return <CalloutComponent key={index} {...child.props} />;
        
      default:
        return null;
    }
  });
}

function OverviewTab({ data }: { data: any }) {
  // Use the data directly - TinaCMS will handle editing automatically
  const blockData = data;
  
  // Ensure blocks is always an array to prevent length errors
  const safeBlocks = React.useMemo(() => {
    try {
      const blocks = blockData?.overview?.blocks;
      return Array.isArray(blocks) ? blocks : [];
    } catch (error) {
      console.warn('Error accessing overview blocks:', error);
      return [];
    }
  }, [blockData]);

  const tocConfig = {
    enabled: blockData.tableOfContents?.enabled ?? true,
    maxDepth: blockData.tableOfContents?.maxDepth ?? 4,
    minDepth: blockData.tableOfContents?.minDepth ?? 2,
    sticky: blockData.tableOfContents?.sticky ?? true
  };

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl space-y-6">
        {/* Deprecation Warning */}
        {blockData.status === 'deprecated' && (
          <div className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-yellow-800">Deprecated Component</div>
              <div className="text-yellow-700 text-sm mt-1">
                This component is deprecated and will be removed in a future version.
                {blockData.deprecationMessage && (
                  <span className="block mt-2">{blockData.deprecationMessage}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Content Blocks */}
        {safeBlocks.length > 0 && (
          <div className="space-y-6" data-tina-field={tinaField(data, 'overview.blocks')}>
            {safeBlocks.map((block: any, index: number) => (
              <div key={index} data-tina-field={tinaField(data, `overview.blocks.${index}`)}>
                <BlockRenderer 
                  blocks={[block]} 
                />
              </div>
            ))}
          </div>
        )}

        {/* Legacy Content Support */}
        {blockData.content && (
          <div className="prose prose-gray max-w-none">
            <TinaMarkdown content={blockData.content} />
          </div>
        )}

        {/* Fallback for pages without blocks or content */}
        {!blockData.overview?.blocks && !blockData.content && (
          <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <div className="text-gray-500">
              <div className="text-lg font-medium mb-2">Content coming soon</div>
              <div className="text-sm">This component documentation is being developed.</div>
            </div>
          </div>
        )}

        {/* External Links */}
        {blockData.externalLinks && blockData.externalLinks.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Related Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {blockData.externalLinks.map((link: any, index: number) => (
                <Link
                  key={index}
                  href={link.url}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  <div>
                    <div className="font-medium text-foreground">{link.title}</div>
                    {link.description && (
                      <div className="text-sm text-muted-foreground mt-1">{link.description}</div>
                    )}
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Table of Contents */}
      <TableOfContents 
        content={blockData.content || blockData.overview?.blocks} 
        config={tocConfig}
        className="ml-8"
      />
    </div>
  );
}

function SpecsTab({ data }: { data: any }) {
  const tocConfig = {
    enabled: data.tableOfContents?.enabled ?? true,
    maxDepth: data.tableOfContents?.maxDepth ?? 4,
    minDepth: data.tableOfContents?.minDepth ?? 2,
    sticky: data.tableOfContents?.sticky ?? true
  };

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl space-y-6">
        {/* Content */}
        {data.specs?.content && (
          <div className="prose prose-gray max-w-none">
            {renderRichContent(data.specs.content)}
          </div>
        )}

        {/* Properties */}
        {data.specs?.properties && data.specs.properties.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Properties</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border px-4 py-2 text-left">Name</th>
                    <th className="border border-border px-4 py-2 text-left">Type</th>
                    <th className="border border-border px-4 py-2 text-left">Default</th>
                    <th className="border border-border px-4 py-2 text-left">Description</th>
                    <th className="border border-border px-4 py-2 text-left">Required</th>
                  </tr>
                </thead>
                <tbody>
                  {data.specs.properties.map((prop: any, index: number) => (
                    <tr key={index}>
                      <td className="border border-border px-4 py-2 font-mono text-sm">{prop.name}</td>
                      <td className="border border-border px-4 py-2 font-mono text-sm text-muted-foreground">{prop.type}</td>
                      <td className="border border-border px-4 py-2 font-mono text-sm">{prop.default || '-'}</td>
                      <td className="border border-border px-4 py-2 text-sm">{prop.description}</td>
                      <td className="border border-border px-4 py-2 text-center">
                        {prop.required ? (
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full"></span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Measurements */}
        {data.specs?.measurements && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Measurements</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(data.specs.measurements).map(([key, value]) => (
                <div key={key} className="p-4 border border-border rounded-lg">
                  <div className="font-medium text-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  <div className="text-sm text-muted-foreground font-mono">{value as string}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Variants */}
        {data.specs?.variants && data.specs.variants.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Variants</h3>
            <div className="space-y-4">
              {data.specs.variants.map((variant: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base">{variant.name}</CardTitle>
                    <CardDescription>{variant.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Usage: </span>
                        <code className="text-sm bg-muted px-2 py-1 rounded">{variant.props}</code>
                      </div>
                      <div className="text-sm text-muted-foreground">{variant.usage}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Table of Contents */}
      <TableOfContents 
        content={data.specs?.content} 
        config={tocConfig}
        className="ml-8"
      />
    </div>
  );
}

function GuidelinesTab({ data }: { data: any }) {
  const tocConfig = {
    enabled: data.tableOfContents?.enabled ?? true,
    maxDepth: data.tableOfContents?.maxDepth ?? 4,
    minDepth: data.tableOfContents?.minDepth ?? 2,
    sticky: data.tableOfContents?.sticky ?? true
  };

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl space-y-6">
        {/* Content */}
        {data.guidelines?.content && (
          <div className="prose prose-gray max-w-none">
            {renderRichContent(data.guidelines.content)}
          </div>
        )}

        {/* Do's */}
        {data.guidelines?.dos && data.guidelines.dos.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">✅ Do</h3>
            <div className="space-y-3">
              {data.guidelines.dos.map((item: any, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <div>
                    <div className="font-medium text-green-800">{item.text}</div>
                    {item.example && (
                      <div className="text-sm text-green-700 mt-1 italic">{item.example}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Don'ts */}
        {data.guidelines?.donts && data.guidelines.donts.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">❌ Don't</h3>
            <div className="space-y-3">
              {data.guidelines.donts.map((item: any, index: number) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">✕</span>
                  </div>
                  <div>
                    <div className="font-medium text-red-800">{item.text}</div>
                    {item.example && (
                      <div className="text-sm text-red-700 mt-1 italic">{item.example}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accessibility */}
        {data.guidelines?.accessibility && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">♿ Accessibility</h3>
            
            {data.guidelines.accessibility.content && (
              <div className="prose prose-gray max-w-none mb-6">
                {renderRichContent(data.guidelines.accessibility.content)}
              </div>
            )}
            
            {data.guidelines.accessibility.requirements && data.guidelines.accessibility.requirements.length > 0 && (
              <div>
                <h4 className="font-medium text-foreground mb-3">Requirements</h4>
                <div className="space-y-2">
                  {data.guidelines.accessibility.requirements.map((req: any, index: number) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                      <Badge variant={req.level === 'AA' ? 'default' : 'secondary'}>
                        WCAG {req.level}
                      </Badge>
                      <span className="text-sm">{req.requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Table of Contents */}
      <TableOfContents 
        content={data.guidelines?.content} 
        config={tocConfig}
        className="ml-8"
      />
    </div>
  );
}

function CodeTab({ data }: { data: any }) {
  const tocConfig = {
    enabled: data.tableOfContents?.enabled ?? true,
    maxDepth: data.tableOfContents?.maxDepth ?? 4,
    minDepth: data.tableOfContents?.minDepth ?? 2,
    sticky: data.tableOfContents?.sticky ?? true
  };

  return (
    <div className="flex gap-8">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl space-y-6">
        {/* Content */}
        {data.code?.content && (
          <div className="prose prose-gray max-w-none">
            {renderRichContent(data.code.content)}
          </div>
        )}
      
      {/* Installation */}
      {data.code?.installation && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Installation</h3>
          {data.code.installation.command && (
            <div className="mb-4">
              <div className="text-sm text-muted-foreground mb-2">Package Manager</div>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{data.code.installation.command}</code>
              </pre>
            </div>
          )}
          {data.code.installation.instructions && (
            <div className="prose prose-gray max-w-none">
              {renderRichContent(data.code.installation.instructions)}
            </div>
          )}
        </div>
      )}
      
      {/* Code Examples */}
      {data.code?.codeExamples && data.code.codeExamples.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Code Examples</h3>
          <div className="space-y-4">
            {data.code.codeExamples.map((example: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">{example.title}</CardTitle>
                      {example.description && (
                        <CardDescription>{example.description}</CardDescription>
                      )}
                    </div>
                    {example.language && (
                      <Badge variant="outline">{example.language}</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{example.code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Import Statement */}
      {data.code?.import && (
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Import</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{data.code.import}</code>
          </pre>
        </div>
      )}

        {/* API Reference */}
        {data.code?.api && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">API Reference</h3>
            {data.code.api.content && (
              <div className="prose prose-gray max-w-none">
                {renderRichContent(data.code.api.content)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Table of Contents */}
      <TableOfContents 
        content={data.code?.content} 
        config={tocConfig}
        className="ml-8"
      />
    </div>
  );
}

export default function ComponentTabs({ data }: ComponentTabsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
      // Use the data directly (TinaCMS will handle editing automatically)
    const enhancedData = data;
  



  


  const tabs = [
    { id: 'overview', label: 'Overview', component: OverviewTab },
    { id: 'specs', label: 'Specs', component: SpecsTab },
    { id: 'guidelines', label: 'Guidelines', component: GuidelinesTab },
    { id: 'code', label: 'Code', component: CodeTab },
  ];

  const ActiveTabComponent = tabs.find(tab => tab.id === activeTab)?.component || OverviewTab;

  return (
    <div className="container mx-auto py-8">


      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-foreground" data-tina-field={tinaField(enhancedData, 'title')}>
              {enhancedData.title}
            </h1>
            <StatusBadge status={enhancedData.status} />
          </div>
          <div className="flex items-center space-x-4">
            {enhancedData.version && (
              <div className="text-sm text-muted-foreground">
                v{enhancedData.version}
              </div>
            )}
          </div>
        </div>
        
        {enhancedData.description && (
          <p className="text-lg text-muted-foreground mb-6" data-tina-field={tinaField(enhancedData, 'description')}>
            {enhancedData.description}
          </p>
        )}
        
        {/* Links */}
        {enhancedData.links && (
          <div className="flex items-center space-x-4">
            {enhancedData.links.figmaUrl && (
              <Link href={enhancedData.links.figmaUrl} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground">
                <Figma className="w-4 h-4" />
                <span>Figma</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            )}
            {enhancedData.links.storybookUrl && (
              <Link href={enhancedData.links.storybookUrl} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground">
                <Package className="w-4 h-4" />
                <span>Storybook</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            )}
            {enhancedData.links.githubUrl && (
              <Link href={enhancedData.links.githubUrl} className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mb-12">
        <ActiveTabComponent data={enhancedData} />
      </div>

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-border">
        <div className="flex items-center justify-between">
          <Link href="/components">
            <Button variant="outline">← Back to Components</Button>
          </Link>
          <div className="flex items-center space-x-4">
            {enhancedData.links?.figmaUrl && (
              <Link href={enhancedData.links.figmaUrl}>
                <Button>
                  <Figma className="w-4 h-4 mr-2" />
                  View in Figma
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 