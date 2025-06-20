'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, ExternalLink, Figma, Github } from "lucide-react";

export default function ButtonComponentPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: 'Specs' },
    { id: 'guidelines', label: 'Guidelines' },
    { id: 'code', label: 'Code' }
  ];

  const installCode = `npm install @your-org/button`;
  const basicUsageCode = `import { Button } from '@your-org/button';

<Button variant="default">Click me</Button>`;

  return (
    <div className="flex-1 bg-background">
      {/* Page Header */}
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">Button</h1>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Stable v1.2.0
                </Badge>
              </div>
              <p className="text-lg text-muted-foreground">A versatile button component for user interactions</p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Figma className="w-4 h-4" />
                Figma
                <ExternalLink className="w-3 h-3" />
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4" />
                Storybook
              </Button>
              <Button variant="outline" size="sm">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="border-b border-border">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
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
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Live Examples</CardTitle>
                    <CardDescription>Interactive button variants in action</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    {/* Default Variant */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Default</h3>
                      <div className="flex items-center gap-4">
                        <Button>Primary Action</Button>
                        <Button size="sm">Small</Button>
                        <Button size="lg">Large</Button>
                      </div>
                    </div>

                    {/* Secondary Variant */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Secondary</h3>
                      <div className="flex items-center gap-4">
                        <Button variant="secondary">Secondary Action</Button>
                        <Button variant="secondary" size="sm">Small</Button>
                        <Button variant="secondary" size="lg">Large</Button>
                      </div>
                    </div>

                    {/* Outline Variant */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Outline</h3>
                      <div className="flex items-center gap-4">
                        <Button variant="outline">Outline Button</Button>
                        <Button variant="outline" size="sm">Small</Button>
                        <Button variant="outline" size="lg">Large</Button>
                      </div>
                    </div>

                    {/* Destructive Variant */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Destructive</h3>
                      <div className="flex items-center gap-4">
                        <Button variant="destructive">Delete Item</Button>
                        <Button variant="destructive" size="sm">Small</Button>
                        <Button variant="destructive" size="lg">Large</Button>
                      </div>
                    </div>

                    {/* Ghost & Link Variants */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Ghost & Link</h3>
                      <div className="flex items-center gap-4">
                        <Button variant="ghost">Ghost Button</Button>
                        <Button variant="link">Link Button</Button>
                      </div>
                    </div>

                    {/* Disabled State */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Disabled State</h3>
                      <div className="flex items-center gap-4">
                        <Button disabled>Disabled Button</Button>
                        <Button variant="secondary" disabled>Disabled Secondary</Button>
                        <Button variant="outline" disabled>Disabled Outline</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Specs Tab */}
            {activeTab === 'specs' && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Component Properties</CardTitle>
                    <CardDescription>API reference for the Button component</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-3 font-semibold text-foreground">Property</th>
                            <th className="text-left py-2 px-3 font-semibold text-foreground">Type</th>
                            <th className="text-left py-2 px-3 font-semibold text-foreground">Default</th>
                            <th className="text-left py-2 px-3 font-semibold text-foreground">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border">
                            <td className="py-2 px-3 font-mono text-sm text-foreground">variant</td>
                            <td className="py-2 px-3 text-sm text-muted-foreground">string</td>
                            <td className="py-2 px-3 text-sm text-muted-foreground">default</td>
                            <td className="py-2 px-3 text-sm text-muted-foreground">Visual style variant</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="py-2 px-3 font-mono text-sm text-foreground">size</td>
                            <td className="py-2 px-3 text-sm text-muted-foreground">string</td>
                            <td className="py-2 px-3 text-sm text-muted-foreground">default</td>
                            <td className="py-2 px-3 text-sm text-muted-foreground">Size variant</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="py-2 px-3 font-mono text-sm text-foreground">disabled</td>
                            <td className="py-2 px-3 text-sm text-muted-foreground">boolean</td>
                            <td className="py-2 px-3 text-sm text-muted-foreground">false</td>
                            <td className="py-2 px-3 text-sm text-muted-foreground">Disable the button</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="py-2 px-3 font-mono text-sm text-foreground">asChild</td>
                            <td className="py-2 px-3 text-sm text-muted-foreground">boolean</td>
                            <td className="py-2 px-3 text-sm text-muted-foreground">false</td>
                            <td className="py-2 px-3 text-sm text-muted-foreground">Change the default rendered element</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Design Measurements</CardTitle>
                    <CardDescription>Standard measurements and spacing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-foreground">Minimum Height:</span>
                        <span className="ml-2 text-muted-foreground">44px</span>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">Padding:</span>
                        <span className="ml-2 text-muted-foreground">8px 16px</span>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">Border Radius:</span>
                        <span className="ml-2 text-muted-foreground">6px</span>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">Margin:</span>
                        <span className="ml-2 text-muted-foreground">0</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Guidelines Tab */}
            {activeTab === 'guidelines' && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Usage Guidelines</CardTitle>
                    <CardDescription>Best practices for using buttons effectively</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    {/* Do's */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-primary">✅ Do's</h3>
                      <ul className="space-y-2 text-foreground">
                        <li>• Use primary buttons sparingly - typically one per page or section</li>
                        <li>• Keep button text concise and action-oriented ("Save", "Delete", "Continue")</li>
                        <li>• Ensure buttons have adequate touch targets (minimum 44px height)</li>
                        <li>• Provide visual feedback for hover and active states</li>
                        <li>• Use destructive variant for potentially harmful actions</li>
                      </ul>
                    </div>

                    {/* Don'ts */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-destructive">❌ Don'ts</h3>
                      <ul className="space-y-2 text-foreground">
                        <li>• Don't use multiple primary buttons in the same section</li>
                        <li>• Don't use vague labels like "Click here" or "Submit"</li>
                        <li>• Don't make buttons too small for mobile interaction</li>
                        <li>• Don't use destructive buttons for non-destructive actions</li>
                        <li>• Don't disable buttons without explaining why</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Accessibility</CardTitle>
                    <CardDescription>Ensuring buttons are accessible to all users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-foreground">Must be keyboard accessible</span>
                        <Badge variant="secondary">WCAG AA</Badge>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-foreground">Must have sufficient color contrast (4.5:1)</span>
                        <Badge variant="secondary">WCAG AA</Badge>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-foreground">Must provide clear focus indicators</span>
                        <Badge variant="secondary">WCAG AA</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Code Tab */}
            {activeTab === 'code' && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Code Examples</CardTitle>
                    <CardDescription>Copy and paste these examples into your project</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    
                    {/* Basic Usage */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Basic Usage</h3>
                      <div className="relative">
                        <pre className="bg-muted text-foreground p-4 rounded-md text-sm overflow-x-auto border">
                          <code>{basicUsageCode}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 h-8"
                          onClick={() => copyToClipboard(basicUsageCode, 'basic')}
                        >
                          {copiedCode === 'basic' ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* All Variants */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">All Variants</h3>
                      <div className="relative">
                        <pre className="bg-muted text-foreground p-4 rounded-md text-sm overflow-x-auto border">
                          <code>{`<div className="flex gap-4">
  <Button variant="default">Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>`}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 h-8"
                          onClick={() => copyToClipboard(`<div className="flex gap-4">
  <Button variant="default">Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="link">Link</Button>
</div>`, 'variants')}
                        >
                          {copiedCode === 'variants' ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Installation */}
            <Card>
              <CardHeader>
                <CardTitle>Installation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted text-foreground p-3 rounded-md text-sm border">
                    <code>{installCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 h-7"
                    onClick={() => copyToClipboard(installCode, 'install')}
                  >
                    {copiedCode === 'install' ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Component Info */}
            <Card>
              <CardHeader>
                <CardTitle>Component Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Package</span>
                  <span className="font-mono text-foreground">@your-org/button</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version</span>
                  <span className="text-foreground">1.2.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-primary">Stable</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="text-foreground">2 days ago</span>
                </div>
              </CardContent>
            </Card>

            {/* Related Components */}
            <Card>
              <CardHeader>
                <CardTitle>Related Components</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start h-8 text-sm">
                    → Input
                  </Button>
                  <Button variant="ghost" className="w-full justify-start h-8 text-sm">
                    → Form
                  </Button>
                  <Button variant="ghost" className="w-full justify-start h-8 text-sm">
                    → Dialog
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 