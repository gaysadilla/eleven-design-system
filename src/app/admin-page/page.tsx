'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Zap, Download, Settings, RefreshCw } from 'lucide-react';
import FigmaSync from '@/components/FigmaSync';

export default function AdminPage() {
  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your design system documentation and integrations
        </p>
      </div>

      <div className="grid gap-6">
        {/* TinaCMS Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              TinaCMS Admin
            </CardTitle>
            <CardDescription>
              Access the visual content editor to manage your documentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Content Management</p>
                <p className="text-sm text-muted-foreground">
                  Edit pages, components, and navigation using the visual editor
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Active</Badge>
                <a
                  href="/admin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80"
                >
                  Open Admin
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Figma Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Figma Integration
            </CardTitle>
            <CardDescription>
              Sync components and design tokens from your Figma design system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FigmaSync />
          </CardContent>
        </Card>

        {/* Cache Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Cache Management
            </CardTitle>
            <CardDescription>
              Manage Figma asset cache for faster loading
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Figma Asset Cache</p>
                  <p className="text-sm text-muted-foreground">
                    Clear cached Figma images to force fresh downloads
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    if (confirm('Clear all Figma cache? This will force fresh downloads on next page load.')) {
                      try {
                        const response = await fetch('/api/figma/cache', { method: 'DELETE' });
                        const result = await response.json();
                        alert(result.message || 'Cache cleared successfully');
                      } catch (error) {
                        alert('Failed to clear cache');
                      }
                    }
                  }}
                >
                  Clear Cache
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground border-t pt-3">
                <p><strong>Note:</strong> When editing content in TinaCMS, scroll to the "Cache Management" section at the bottom of each page form and click the "Refresh Figma Cache" button to refresh assets for that specific page.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks for managing your design system documentation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Development</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• <code>npm run dev:safe</code> - Start dev servers</li>
                  <li>• <code>npm run dev:cleanup</code> - Kill all processes</li>
                  <li>• <code>npm run dev:status</code> - Check port status</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Content</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Visit <code>/admin</code> for TinaCMS editor</li>
                  <li>• Components in <code>content/pages/</code></li>
                  <li>• Navigation in <code>content/navigation/</code></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current status of your documentation platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Next.js</p>
                  <p className="text-xs text-muted-foreground">Port 3000</p>
                </div>
                <Badge variant="default">Running</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">TinaCMS</p>
                  <p className="text-xs text-muted-foreground">Port 4001</p>
                </div>
                <Badge variant="default">Running</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">Figma API</p>
                  <p className="text-xs text-muted-foreground">Integration</p>
                </div>
                <Badge variant="default">Configured</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 