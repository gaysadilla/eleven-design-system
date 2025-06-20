import React from 'react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { tinaField } from 'tinacms/dist/react';
import FigmaSync from '@/components/FigmaSync';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Info, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle, 
  Copy,
  ExternalLink,
  Check,
  X 
} from 'lucide-react';

// Rich Text Block Component
export const RichTextBlockComponent = ({ data, tinaField: tinaFieldProp }: { data: any; tinaField?: string }) => {

  
  // Helper function to convert plain text with asterisks to markdown
  const processContent = (content: any) => {
    if (typeof content === 'string') {
      // Convert lines starting with * to proper markdown list items
      const processedContent = content
        .split('\n')
        .map(line => {
          if (line.trim().startsWith('* ')) {
            return line.replace(/^\* /, '- ');
          }
          return line;
        })
        .join('\n');
      
      // Create a simple markdown object structure that TinaMarkdown can handle
      return {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: processedContent.split('\n').map(line => {
              if (line.trim().startsWith('- ')) {
                return {
                  type: 'text',
                  text: line.replace(/^- /, '• '),
                };
              }
              return {
                type: 'text',
                text: line,
              };
            }).filter(item => item.text.trim() !== ''),
          }
        ],
      };
    }
    return content;
  };

  return (
    <div className="my-8" data-tina-field={tinaFieldProp}>

      {data.title && (
        <h3 className="text-xl font-semibold mb-4 text-foreground" data-tina-field={tinaFieldProp ? tinaField(data, 'title') : undefined}>
          {data.title}
        </h3>
      )}
      <div 
        className="prose prose-gray max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-muted-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground prose-blockquote:text-muted-foreground prose-li:text-foreground"
        data-tina-field={tinaFieldProp ? tinaField(data, 'content') : undefined}
      >
        {data.content && typeof data.content === 'object' ? (
          <TinaMarkdown content={data.content} />
        ) : data.content && typeof data.content === 'string' ? (
          <div className="space-y-2">
            {data.content.split('\n').map((line: string, index: number) => {
              if (line.trim().startsWith('* ')) {
                return (
                  <div key={index} className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>{line.replace(/^\* /, '')}</span>
                  </div>
                );
              } else if (line.trim()) {
                return <p key={index}>{line}</p>;
              }
              return null;
            })}
          </div>
        ) : (
          <p className="text-muted-foreground italic">No content available</p>
        )}
      </div>
    </div>
  );
};

// Figma Preview Component - displays Figma content directly
const FigmaPreview = ({ figmaUrl, componentName }: { figmaUrl: string; componentName?: string }) => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchFigmaPreview = async () => {
      if (!figmaUrl) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/figma/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            figmaUrl,
            componentName: componentName || 'Component',
          }),
        });

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || 'Failed to fetch Figma preview');
        }

        if (responseData.data?.imageUrl) {
          setData(responseData.data);
        } else {
          setError('No preview image available');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load Figma preview';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchFigmaPreview();
  }, [figmaUrl, componentName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
        <span className="ml-3 text-sm text-muted-foreground">Loading preview...</span>
      </div>
    );
  }

  if (error) {
    const isTokenError = error.includes('access token') || error.includes('FIGMA_ACCESS_TOKEN');
    
    return (
      <div className="border rounded-lg p-4 bg-muted/20 border-muted">
        <div className="space-y-3">
          <div className="flex items-center text-muted-foreground text-sm">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span>{isTokenError ? 'Figma Setup Required' : 'Preview Unavailable'}</span>
          </div>
          
          {isTokenError ? (
            <p className="text-xs text-muted-foreground">
              Configure FIGMA_ACCESS_TOKEN to display previews.{' '}
              <a href="https://www.figma.com/developers/api#access-tokens" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Get token
              </a>
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">{error}</p>
          )}
          
          <Button variant="outline" size="sm" asChild>
            <a href={figmaUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3 h-3 mr-2" />
              View in Figma
            </a>
          </Button>
        </div>
      </div>
    );
  }

  if (data?.imageUrl) {
    // Add cache-busting parameter to force browser to fetch updated images
    // This is important because Figma keeps the same URL even when content changes
    // We use a timestamp that changes only when the cache is refreshed
    const cacheBustingUrl = data?.properties?.cached === false 
      ? `${data.imageUrl}?cb=${Date.now()}`
      : data.imageUrl;
    
    return (
      <div className="my-6">
        <img 
          src={cacheBustingUrl} 
          alt={componentName || 'Figma Asset'}
          className="max-w-full h-auto rounded-lg shadow-sm border border-border/50"
        />
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-muted/20 border-muted text-center">
      <p className="text-sm text-muted-foreground mb-2">No preview available</p>
      <Button variant="outline" size="sm" asChild>
        <a href={figmaUrl} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-3 h-3 mr-2" />
          View in Figma
        </a>
      </Button>
    </div>
  );
};

// Figma Sync Block Component
export const FigmaSyncBlockComponent = ({ data, tinaField: tinaFieldProp }: { data: any; tinaField?: string }) => {

  
  return (
    <div className="my-8" data-tina-field={tinaFieldProp}>

      {data.title && (
        <h3 className="text-xl font-semibold mb-4 text-foreground" data-tina-field={tinaFieldProp ? tinaField(data, 'title') : undefined}>
          {data.title}
        </h3>
      )}
      {data.description && (
        <p className="text-muted-foreground mb-6" data-tina-field={tinaFieldProp ? tinaField(data, 'description') : undefined}>
          {data.description}
        </p>
      )}
      
      <div data-tina-field={tinaFieldProp ? tinaField(data, 'figmaUrl') : undefined}>
        {data.figmaUrl ? (
          <FigmaPreview figmaUrl={data.figmaUrl} componentName={data.componentName} />
        ) : (
          <div className="border rounded-lg p-6 bg-card">
            <FigmaSync />
          </div>
        )}
      </div>
    </div>
  );
};

// Live Example Block Component
export const LiveExampleBlockComponent = ({ data, tinaField: tinaFieldProp }: { data: any; tinaField?: string }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    if (data.code) {
      await navigator.clipboard.writeText(data.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-foreground">{data.title}</h3>
          {data.description && (
            <p className="text-muted-foreground mt-1">{data.description}</p>
          )}
        </div>
        {data.copyable && (
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            {copied ? (
              <CheckCircle className="w-4 h-4 mr-2" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {data.showPreview && (
          <div className="border rounded-lg p-6 bg-card">
            <div className="text-sm text-muted-foreground mb-2">Preview</div>
            <div className="preview-area">
              {/* This would render the actual component preview */}
              <div className="text-muted-foreground italic">
                Live preview would render here based on the code
              </div>
            </div>
          </div>
        )}

        {data.code && (
          <div className="border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-muted border-b">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">{data.language || 'code'}</Badge>
              </div>
            </div>
            <pre className="p-4 overflow-x-auto bg-card">
              <code className="text-sm">{data.code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

// Component API Block Component
export const ComponentApiBlockComponent = ({ data, tinaField: tinaFieldProp }: { data: any; tinaField?: string }) => {
  return (
    <div className="my-8">
      <h3 className="text-xl font-semibold mb-4 text-foreground">{data.title}</h3>
      
      {data.properties && data.properties.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-medium">Property</th>
                <th className="text-left p-4 font-medium">Type</th>
                <th className="text-left p-4 font-medium">Default</th>
                <th className="text-left p-4 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {data.properties.map((prop: any, index: number) => (
                <tr key={index} className="border-b last:border-b-0">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        {prop.name}
                      </code>
                      {prop.required && (
                        <Badge variant="destructive" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <code className="text-sm font-mono text-muted-foreground">
                      {prop.type}
                    </code>
                  </td>
                  <td className="p-4">
                    <code className="text-sm font-mono text-muted-foreground">
                      {prop.default || '-'}
                    </code>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Design Specs Block Component
export const DesignSpecsBlockComponent = ({ data, tinaField: tinaFieldProp }: { data: any; tinaField?: string }) => {
  return (
    <div className="my-8">
      <h3 className="text-xl font-semibold mb-4 text-foreground">{data.title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.measurements && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Measurements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(data.measurements).map(([key, value]) => 
                value ? (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <code className="text-sm font-mono">{value as string}</code>
                  </div>
                ) : null
              )}
            </CardContent>
          </Card>
        )}

        {data.tokens && data.tokens.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Design Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.tokens.map((token: any, index: number) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <code className="text-sm font-mono">{token.name}</code>
                    <code className="text-sm font-mono text-muted-foreground">
                      {token.value}
                    </code>
                  </div>
                  {token.description && (
                    <p className="text-xs text-muted-foreground">{token.description}</p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Guidelines Block Component
export const GuidelinesBlockComponent = ({ data, tinaField: tinaFieldProp }: { data: any; tinaField?: string }) => {
  return (
    <div className="my-8">
      <h3 className="text-xl font-semibold mb-4 text-foreground">{data.title}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.dos && data.dos.length > 0 && (
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-green-700 dark:text-green-300">
                <Check className="w-5 h-5 mr-2" />
                Do's
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.dos.map((item: any, index: number) => (
                <div key={index} className="space-y-1">
                  <p className="text-sm">{item.text}</p>
                  {item.example && (
                    <code className="text-xs bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                      {item.example}
                    </code>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {data.donts && data.donts.length > 0 && (
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-red-700 dark:text-red-300">
                <X className="w-5 h-5 mr-2" />
                Don'ts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.donts.map((item: any, index: number) => (
                <div key={index} className="space-y-1">
                  <p className="text-sm">{item.text}</p>
                  {item.example && (
                    <code className="text-xs bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                      {item.example}
                    </code>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

// Callout Block Component
export const CalloutBlockComponent = ({ data, tinaField: tinaFieldProp }: { data: any; tinaField?: string }) => {

  
  const getCalloutIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getCalloutStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200';
      case 'error':
        return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950 text-red-800 dark:text-red-200';
      case 'success':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950 text-green-800 dark:text-green-200';
      default:
        return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950 text-blue-800 dark:text-blue-200';
    }
  };

  return (
    <div className="my-8" data-tina-field={tinaFieldProp}>

      <div className={`border rounded-lg p-4 ${getCalloutStyles(data.type)}`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5" data-tina-field={tinaFieldProp ? tinaField(data, 'type') : undefined}>
            {getCalloutIcon(data.type)}
          </div>
          <div className="flex-1">
            {data.title && (
              <h4 className="font-semibold mb-2" data-tina-field={tinaFieldProp ? tinaField(data, 'title') : undefined}>
                {data.title}
              </h4>
            )}
            <div className="prose prose-sm max-w-none" data-tina-field={tinaFieldProp ? tinaField(data, 'content') : undefined}>
              {data.content && typeof data.content === 'object' ? (
                <TinaMarkdown content={data.content} />
              ) : data.content && typeof data.content === 'string' ? (
                <div className="space-y-2">
                  {data.content.split('\n').map((line: string, index: number) => {
                    if (line.trim().startsWith('* ')) {
                      return (
                        <div key={index} className="flex items-start">
                          <span className="mr-2 mt-1">•</span>
                          <span>{line.replace(/^\* /, '')}</span>
                        </div>
                      );
                    } else if (line.trim()) {
                      return <p key={index}>{line}</p>;
                    }
                    return null;
                  })}
                </div>
              ) : (
                <p className="italic opacity-70">No content available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Transform TinaCMS GraphQL data to BlockRenderer format
export const transformTinaBlocks = (blocks: any[]): any[] => {
  if (!blocks || blocks.length === 0) return [];
  
  return blocks.map(block => {
    // Map TinaCMS __typename to _template
    let template = '';
    switch (block.__typename) {
      case 'PageOverviewBlocksRichTextBlock':
      case 'PageSpecsBlocksRichTextBlock':
      case 'PageGuidelinesBlocksRichTextBlock':
        template = 'RichTextBlock';
        break;
      case 'PageOverviewBlocksFigmaSyncBlock':
      case 'PageSpecsBlocksFigmaSyncBlock':
      case 'PageGuidelinesBlocksFigmaSyncBlock':
        template = 'FigmaSyncBlock';
        break;
      case 'PageOverviewBlocksLiveExampleBlock':
      case 'PageSpecsBlocksLiveExampleBlock':
      case 'PageGuidelinesBlocksLiveExampleBlock':
        template = 'LiveExampleBlock';
        break;
      case 'PageOverviewBlocksComponentApiBlock':
      case 'PageSpecsBlocksComponentApiBlock':
      case 'PageGuidelinesBlocksComponentApiBlock':
        template = 'ComponentApiBlock';
        break;
      case 'PageOverviewBlocksDesignSpecsBlock':
      case 'PageSpecsBlocksDesignSpecsBlock':
      case 'PageGuidelinesBlocksDesignSpecsBlock':
        template = 'DesignSpecsBlock';
        break;
      case 'PageOverviewBlocksGuidelinesBlock':
      case 'PageSpecsBlocksGuidelinesBlock':
      case 'PageGuidelinesBlocksGuidelinesBlock':
        template = 'GuidelinesBlock';
        break;
      case 'PageOverviewBlocksCalloutBlock':
      case 'PageSpecsBlocksCalloutBlock':
      case 'PageGuidelinesBlocksCalloutBlock':
        template = 'CalloutBlock';
        break;
      default:
        console.warn(`Unknown TinaCMS block type: ${block.__typename}`, block);
        return null;
    }
    
    // Return block with _template field
    return {
      ...block,
      _template: template
    };
  }).filter(Boolean);
};

// Main Block Renderer Component
export const BlockRenderer = ({ blocks, tinaField: tinaFieldProp }: { blocks: any[]; tinaField?: string }) => {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  // Transform TinaCMS blocks if they have __typename instead of _template
  const transformedBlocks = blocks.some(block => block.__typename && !block._template) 
    ? transformTinaBlocks(blocks)
    : blocks;
  


  return (
    <div className="space-y-6">
      {transformedBlocks.map((block, index) => {
        const blockTinaField = tinaFieldProp ? `${tinaFieldProp}.${index}` : undefined;
        
        switch (block._template) {
          case 'RichTextBlock':
            return <RichTextBlockComponent key={index} data={block} tinaField={blockTinaField} />;
          case 'FigmaSyncBlock':
            return <FigmaSyncBlockComponent key={index} data={block} tinaField={blockTinaField} />;
          case 'LiveExampleBlock':
            return <LiveExampleBlockComponent key={index} data={block} tinaField={blockTinaField} />;
          case 'ComponentApiBlock':
            return <ComponentApiBlockComponent key={index} data={block} tinaField={blockTinaField} />;
          case 'DesignSpecsBlock':
            return <DesignSpecsBlockComponent key={index} data={block} tinaField={blockTinaField} />;
          case 'GuidelinesBlock':
            return <GuidelinesBlockComponent key={index} data={block} tinaField={blockTinaField} />;
          case 'CalloutBlock':
            return <CalloutBlockComponent key={index} data={block} tinaField={blockTinaField} />;
          default:
            console.warn(`Unknown block type: ${block._template}`, block);
            return null;
        }
      })}
    </div>
  );
}; 