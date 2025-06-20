'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, Download, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { getStatusColors } from '@/lib/theme-utils';

interface FigmaComponentData {
  name: string;
  description: string;
  figmaUrl: string;
  imageUrl?: string;
  properties?: Record<string, any>;
}

interface FigmaSyncProps {
  onSync?: (data: FigmaComponentData) => void;
}

export default function FigmaSync({ onSync }: FigmaSyncProps) {
  const [figmaUrl, setFigmaUrl] = useState('');
  const [componentName, setComponentName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FigmaComponentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSync = async () => {
    if (!figmaUrl || !componentName) {
      setError('Please provide both Figma URL and component name');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Temporarily disabled - Figma API needs FIGMA_ACCESS_TOKEN configuration
      setError('Figma sync is temporarily disabled. Please configure FIGMA_ACCESS_TOKEN environment variable to enable this feature.');
      return;

      /* Commented out until Figma token is configured
      const response = await fetch('/api/figma/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          figmaUrl,
          componentName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to sync component');
      }

      setResult(data.data);
      onSync?.(data.data);
      */
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const extractFileKey = (url: string) => {
    const match = url.match(/\/file\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
  };

  const errorColors = getStatusColors('error');
  const successColors = getStatusColors('success');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Sync from Figma
          </CardTitle>
          <CardDescription>
            Import component data from your Figma design system library
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="figma-url">Figma URL</Label>
              <Input
                id="figma-url"
                placeholder="https://www.figma.com/file/..."
                value={figmaUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFigmaUrl(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Paste the URL of your Figma file or specific component
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="component-name">Component Name</Label>
              <Input
                id="component-name"
                placeholder="Button"
                value={componentName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComponentName(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                The exact name of the component in Figma
              </p>
            </div>

            <Button 
              onClick={handleSync} 
              disabled={loading || !figmaUrl || !componentName}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Sync Component
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className={`${errorColors.border} ${errorColors.background}`}>
          <CardContent className="pt-6">
            <div className={`flex items-center gap-2 ${errorColors.strong}`}>
              <AlertCircle className="h-4 w-4" />
              <p className="font-medium">Error</p>
            </div>
            <p className={`text-sm mt-1 ${errorColors.text}`}>{error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className={`${successColors.border} ${successColors.background}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${successColors.strong}`}>
              <CheckCircle className="h-5 w-5" />
              Component Synced Successfully
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label className="text-sm font-medium">Name</Label>
                <p className="text-sm text-muted-foreground">{result.name}</p>
              </div>
              
              {result.description && (
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-muted-foreground">{result.description}</p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Figma Link</Label>
                <Button variant="outline" size="sm" asChild>
                  <a 
                    href={result.figmaUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Open in Figma
                  </a>
                </Button>
              </div>

              {result.imageUrl && (
                <div>
                  <Label className="text-sm font-medium">Preview</Label>
                  <div className="mt-2 border rounded-lg p-4 bg-background">
                    <img 
                      src={result.imageUrl} 
                      alt={result.name}
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>
              )}

              {result.properties && Object.keys(result.properties).length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Properties</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.keys(result.properties).map((prop) => (
                      <Badge key={prop} variant="secondary">
                        {prop}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">How to use</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>1. Copy the URL from your Figma file or component</p>
          <p>2. Enter the exact component name as it appears in Figma</p>
          <p>3. Click "Sync Component" to import the data</p>
          <p>4. The component information will be automatically populated in your documentation</p>
        </CardContent>
      </Card>
    </div>
  );
} 