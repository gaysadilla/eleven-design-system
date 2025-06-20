import React from 'react';
import FigmaSync from '@/components/FigmaSync';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

// FigmaSync Template Component - simplified
export const FigmaSyncTemplate = ({ title, description, showInstructions = true }: {
  title?: string;
  description?: string;
  showInstructions?: boolean;
}) => {
  return (
    <div className="my-8 space-y-4">
      {title && (
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      )}
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
      <FigmaSync />
      {showInstructions && (
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <CardTitle className="text-base">How to use Figma Sync</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>1. Copy the URL of your Figma component or file</p>
              <p>2. Enter the exact component name as it appears in Figma</p>
              <p>3. Click "Sync Component" to import the latest design data</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Live Example Template Component
export const LiveExampleTemplate = ({ 
  title, 
  description, 
  code, 
  language = 'tsx', 
  showPreview = true 
}: {
  title: string;
  description?: string;
  code?: string;
  language?: string;
  showPreview?: boolean;
}) => {
  return (
    <div className="my-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              {description && (
                <CardDescription>{description}</CardDescription>
              )}
            </div>
            <Badge variant="outline">{language}</Badge>
          </div>
        </CardHeader>
        {code && (
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{code}</code>
            </pre>
            {showPreview && (
              <div className="mt-4 p-4 border rounded-lg bg-background">
                <div className="text-sm text-muted-foreground mb-2">Preview:</div>
                {/* This would be where you'd render the actual component preview */}
                <div className="text-sm text-muted-foreground italic">
                  Component preview would render here based on the code
                </div>
              </div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
};

// Component Preview Template Component
export const ComponentPreviewTemplate = ({ 
  componentName, 
  props = {}, 
  title, 
  description 
}: {
  componentName: string;
  props?: Record<string, any>;
  title?: string;
  description?: string;
}) => {
  return (
    <div className="my-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {title || `${componentName} Preview`}
          </CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Props display */}
            {Object.keys(props).length > 0 && (
              <div>
                <div className="text-sm font-medium mb-2">Props:</div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(props).map(([key, value]) => (
                    <Badge key={key} variant="secondary">
                      {key}: {String(value)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Component preview area */}
            <div className="p-6 border rounded-lg bg-background">
              <div className="text-sm text-muted-foreground mb-2">Component Preview:</div>
              <div className="text-sm text-muted-foreground italic">
                {componentName} component would render here with the specified props
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Simplified Callout Template Component
export const CalloutTemplate = ({ 
  type = 'info', 
  title, 
  content 
}: {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  content?: string;
}) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'error':
        return 'border-l-red-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'success':
        return 'border-l-green-500';
      default:
        return 'border-l-blue-500';
    }
  };

  return (
    <div className="my-6">
      <Card className={`border-l-4 ${getBorderColor()}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            {getIcon()}
            {title && <CardTitle className="text-base">{title}</CardTitle>}
          </div>
        </CardHeader>
        {content && (
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p>{content}</p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

// Export template components
export const TinaComponents = {
  FigmaSync: FigmaSyncTemplate,
  LiveExample: LiveExampleTemplate,
  ComponentPreview: ComponentPreviewTemplate,
  Callout: CalloutTemplate,
}; 