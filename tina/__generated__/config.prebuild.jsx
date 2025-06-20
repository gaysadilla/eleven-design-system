// tina/config.ts
import { defineConfig } from "tinacms";

// tina/templates/blocks.ts
var richTextBlock = {
  name: "RichTextBlock",
  label: "Rich Text",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Section Title (Optional)"
    },
    {
      type: "rich-text",
      name: "content",
      label: "Content",
      description: "Rich text content with formatting"
    }
  ]
};
var figmaSyncBlock = {
  name: "FigmaSyncBlock",
  label: "Figma Sync",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Section Title",
      description: "Title for this Figma sync section"
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      description: "Optional description or instructions"
    },
    {
      type: "string",
      name: "figmaUrl",
      label: "Figma URL",
      description: "Direct link to Figma file or component"
    },
    {
      type: "string",
      name: "componentName",
      label: "Component Name",
      description: "Name of the component in Figma (optional)"
    },
    {
      type: "boolean",
      name: "showInstructions",
      label: "Show Instructions",
      description: 'Display the "How to use" instructions card when no URL is provided'
    }
  ]
};
var liveExampleBlock = {
  name: "LiveExampleBlock",
  label: "Live Example",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Example Title"
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      description: "Brief description of this example"
    },
    {
      type: "string",
      name: "code",
      label: "Code Example",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      name: "language",
      label: "Code Language",
      options: ["tsx", "jsx", "typescript", "javascript", "html", "css"]
    },
    {
      type: "boolean",
      name: "showPreview",
      label: "Show Live Preview",
      description: "Render a live preview of the component"
    },
    {
      type: "boolean",
      name: "copyable",
      label: "Enable Copy Button",
      description: "Show copy to clipboard button"
    }
  ]
};
var componentApiBlock = {
  name: "ComponentApiBlock",
  label: "Component API",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Section Title"
    },
    {
      type: "object",
      name: "properties",
      label: "Properties",
      list: true,
      fields: [
        {
          type: "string",
          name: "name",
          label: "Property Name"
        },
        {
          type: "string",
          name: "type",
          label: "Type"
        },
        {
          type: "string",
          name: "default",
          label: "Default Value"
        },
        {
          type: "string",
          name: "description",
          label: "Description"
        },
        {
          type: "boolean",
          name: "required",
          label: "Required"
        }
      ]
    }
  ]
};
var designSpecsBlock = {
  name: "DesignSpecsBlock",
  label: "Design Specifications",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Section Title"
    },
    {
      type: "object",
      name: "measurements",
      label: "Measurements",
      fields: [
        {
          type: "string",
          name: "minHeight",
          label: "Minimum Height"
        },
        {
          type: "string",
          name: "padding",
          label: "Padding"
        },
        {
          type: "string",
          name: "margin",
          label: "Margin"
        },
        {
          type: "string",
          name: "borderRadius",
          label: "Border Radius"
        }
      ]
    },
    {
      type: "object",
      name: "tokens",
      label: "Design Tokens",
      list: true,
      fields: [
        {
          type: "string",
          name: "name",
          label: "Token Name"
        },
        {
          type: "string",
          name: "value",
          label: "Value"
        },
        {
          type: "string",
          name: "description",
          label: "Description"
        }
      ]
    }
  ]
};
var guidelinesBlock = {
  name: "GuidelinesBlock",
  label: "Guidelines",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Section Title"
    },
    {
      type: "object",
      name: "dos",
      label: "Do's",
      list: true,
      fields: [
        {
          type: "string",
          name: "text",
          label: "Do This"
        },
        {
          type: "string",
          name: "example",
          label: "Example (optional)"
        }
      ]
    },
    {
      type: "object",
      name: "donts",
      label: "Don'ts",
      list: true,
      fields: [
        {
          type: "string",
          name: "text",
          label: "Don't Do This"
        },
        {
          type: "string",
          name: "example",
          label: "Example (optional)"
        }
      ]
    }
  ]
};
var calloutBlock = {
  name: "CalloutBlock",
  label: "Callout",
  fields: [
    {
      type: "string",
      name: "type",
      label: "Callout Type",
      options: ["info", "warning", "error", "success", "note"]
    },
    {
      type: "string",
      name: "title",
      label: "Title (Optional)"
    },
    {
      type: "rich-text",
      name: "content",
      label: "Content"
    }
  ]
};
var contentBlocks = [
  richTextBlock,
  figmaSyncBlock,
  liveExampleBlock,
  componentApiBlock,
  designSpecsBlock,
  guidelinesBlock,
  calloutBlock
];

// src/components/tina/CacheRefreshButton.tsx
import React, { useState } from "react";
var CacheRefreshButton = (props) => {
  console.log("\u{1F50D} CacheRefreshButton props:", props);
  const form = props.form || props.tinaForm;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const testApiConnectivity = async () => {
    console.log("\u{1F9EA} Testing API connectivity...");
    try {
      const response = await fetch("http://localhost:3000/api/health");
      console.log("\u{1F9EA} Health check response:", response.status);
      const data = await response.json();
      console.log("\u{1F9EA} Health check data:", data);
    } catch (error) {
      console.log("\u{1F9EA} Health check failed:", error);
    }
  };
  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      console.log("\u{1F504} Refreshing Figma cache from TinaCMS...");
      console.log("\u{1F50D} Form object:", form);
      console.log("\u{1F50D} Form getState:", form?.getState);
      if (!form || !form.getState) {
        throw new Error("TinaCMS form not available");
      }
      const formData = form.getState().values;
      console.log("\u{1F50D} Form data:", formData);
      const isTinaCMS = window.location.port === "4001" || window.location.port === "9001" || window.location.pathname.startsWith("/admin");
      let response;
      if (isTinaCMS) {
        const possiblePorts = [
          process.env.NEXT_PUBLIC_NEXTJS_PORT,
          // Custom env var if set
          "3000",
          // Default Next.js port (try first)
          "3001",
          // Most common when 3000 is taken
          "3002",
          "3003",
          "3004"
          // Other common alternatives
        ].filter(Boolean);
        let lastError;
        for (const port of possiblePorts) {
          try {
            console.log(`\u{1F50D} Trying Next.js API on port ${port}...`);
            const healthUrl = `http://localhost:${port}/api/health`;
            try {
              await fetch(healthUrl, { method: "HEAD" });
            } catch {
            }
            const apiUrl = `http://localhost:${port}/api/figma/refresh-page`;
            console.log(`\u{1F50D} Attempting request to: ${apiUrl}`);
            console.log(`\u{1F50D} Sending data:`, JSON.stringify({ pageData: formData }, null, 2));
            response = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                pageData: formData
              })
            });
            console.log(`\u{1F50D} Response status: ${response.status}`);
            console.log(`\u{1F50D} Response headers:`, Object.fromEntries(response.headers.entries()));
            if (response.ok) {
              console.log(`\u2705 Successfully connected to Next.js on port ${port}`);
              break;
            } else {
              const errorText = await response.text();
              console.log(`\u274C Port ${port} responded but with error: ${response.status}`);
              console.log(`\u274C Error response:`, errorText);
            }
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.log(`\u274C Port ${port} failed: ${errorMessage}`);
            lastError = error;
            continue;
          }
        }
        if (!response || !response.ok) {
          const lastErrorMessage = lastError instanceof Error ? lastError.message : "Unknown error";
          throw new Error(`Could not connect to Next.js API on any port. Last error: ${lastErrorMessage}`);
        }
      } else {
        response = await fetch("/api/figma/refresh-page", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            pageData: formData
          })
        });
      }
      const result = await response.json();
      if (result.success) {
        console.log("\u2705 Cache refresh completed:", result.message);
        if (result.details.total > 0) {
          alert(`Cache refreshed! Updated ${result.details.successful} Figma asset${result.details.successful !== 1 ? "s" : ""}.`);
        } else {
          alert("No Figma assets found on this page to refresh.");
        }
      } else {
        console.error("\u274C Cache refresh failed:", result.error);
        alert("Failed to refresh cache. Please try again.");
      }
    } catch (error) {
      console.error("\u274C Cache refresh error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(`Failed to refresh cache: ${errorMessage}

Please check the browser console for more details.`);
    } finally {
      setIsRefreshing(false);
    }
  };
  return React.createElement("div", { style: { padding: "1rem", borderTop: "1px solid #e1e5e9" } }, React.createElement("div", { style: { display: "flex", gap: "8px", flexDirection: "column" } }, React.createElement(
    "button",
    {
      type: "button",
      onClick: testApiConnectivity,
      style: {
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        padding: "6px 12px",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "12px",
        fontWeight: "500"
      }
    },
    "\u{1F9EA} Test API Connection"
  ), React.createElement(
    "button",
    {
      type: "button",
      onClick: handleRefresh,
      disabled: isRefreshing,
      style: {
        backgroundColor: "#0084ff",
        color: "white",
        border: "none",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: isRefreshing ? "not-allowed" : "pointer",
        opacity: isRefreshing ? 0.6 : 1,
        fontSize: "14px",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }
    },
    isRefreshing ? React.createElement(React.Fragment, null, React.createElement("span", { style: { animation: "spin 1s linear infinite" } }, "\u{1F504}"), "Refreshing...") : React.createElement(React.Fragment, null, "\u{1F504} Refresh Figma Cache")
  )), React.createElement("style", { jsx: true }, `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `));
};
var CacheRefreshButton_default = CacheRefreshButton;

// tina/config.ts
var config_default = defineConfig({
  branch: "main",
  // For local development, these can be empty
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  // Enhanced schema for ZeroHeight-style documentation
  schema: {
    collections: [
      // Top-level sections (Foundations, Components, etc.)
      {
        name: "section",
        label: "Sections",
        path: "content/sections",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Section Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description"
          },
          {
            type: "number",
            name: "order",
            label: "Display Order"
          },
          {
            type: "boolean",
            name: "enabled",
            label: "Enabled",
            required: true
          },
          {
            type: "string",
            name: "icon",
            label: "Icon (Lucide React)",
            description: "Icon name from lucide-react (e.g., 'palette', 'layout', 'code')"
          },
          // New: Section landing page content with tabs
          {
            type: "boolean",
            name: "hasLandingPage",
            label: "Has Landing Page",
            description: "Enable if this section should have a dedicated landing page with tabs"
          },
          {
            type: "object",
            name: "landingPage",
            label: "Landing Page Content",
            fields: [
              {
                type: "rich-text",
                name: "overview",
                label: "Overview Content",
                description: "Main content for the section overview"
              },
              {
                type: "object",
                name: "tabs",
                label: "Landing Page Tabs",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Tab Title",
                    required: true
                  },
                  {
                    type: "string",
                    name: "slug",
                    label: "Tab Slug",
                    required: true
                  },
                  {
                    type: "rich-text",
                    name: "content",
                    label: "Tab Content"
                  }
                ]
              }
            ]
          }
        ]
      },
      // Component grouping types (Component, Engineering Components, Deprecated)
      {
        name: "componentGroup",
        label: "Component Groups",
        path: "content/component-groups",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Group Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description"
          },
          {
            type: "number",
            name: "order",
            label: "Display Order"
          },
          {
            type: "boolean",
            name: "enabled",
            label: "Enabled",
            required: true
          },
          {
            type: "string",
            name: "icon",
            label: "Icon (Lucide React)"
          },
          {
            type: "rich-text",
            name: "content",
            label: "Landing Page Content",
            description: "Content for the component group landing page"
          }
        ]
      },
      // Categories within sections (Actions, Blocks, Cards, etc.)
      {
        name: "category",
        label: "Categories",
        path: "content/categories",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Category Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true
          },
          {
            type: "reference",
            name: "section",
            label: "Parent Section",
            collections: ["section"],
            required: true
          },
          // New: Component group reference
          {
            type: "reference",
            name: "componentGroup",
            label: "Component Group",
            collections: ["componentGroup"],
            description: "Optional: Assign to a component group (Component, Engineering, Deprecated)"
          },
          {
            type: "string",
            name: "description",
            label: "Description"
          },
          {
            type: "number",
            name: "order",
            label: "Display Order"
          },
          {
            type: "boolean",
            name: "enabled",
            label: "Enabled",
            required: true
          },
          {
            type: "string",
            name: "icon",
            label: "Icon (Lucide React)"
          },
          // New: Category behavior
          {
            type: "boolean",
            name: "isExpandable",
            label: "Is Expandable Category",
            description: "Enable if this category should expand to show subcategories/components"
          },
          {
            type: "boolean",
            name: "hasLandingPage",
            label: "Has Landing Page",
            description: "Enable if this category should have its own landing page"
          },
          {
            type: "rich-text",
            name: "landingContent",
            label: "Landing Page Content",
            description: "Content for category landing page (if enabled)"
          }
        ]
      },
      // Individual documentation pages/components
      {
        name: "page",
        label: "Documentation Pages",
        path: "content/pages",
        format: "mdx",
        defaultItem: () => {
          return {
            title: "New Component",
            slug: "new-component",
            description: "A brief description of the component",
            status: "in-progress",
            enabled: true,
            tableOfContents: {
              enabled: true,
              maxDepth: 4,
              minDepth: 2,
              sticky: true
            },
            overview: {
              content: {
                type: "doc",
                children: [
                  {
                    type: "p",
                    children: [
                      {
                        text: "Add your component description here."
                      }
                    ]
                  }
                ]
              }
            }
          };
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true
          },
          {
            type: "reference",
            name: "section",
            label: "Section",
            collections: ["section"],
            required: true
          },
          {
            type: "reference",
            name: "category",
            label: "Category",
            collections: ["category"]
          },
          {
            type: "reference",
            name: "componentGroup",
            label: "Component Group",
            collections: ["componentGroup"],
            description: "Optional: Assign to a component group (Component, Engineering, Deprecated)"
          },
          {
            type: "string",
            name: "description",
            label: "Short Description"
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            options: [
              { label: "Stable", value: "stable" },
              { label: "Beta", value: "beta" },
              { label: "Experimental", value: "experimental" },
              { label: "Deprecated", value: "deprecated" },
              { label: "In Progress", value: "in-progress" },
              { label: "Ready", value: "ready" }
            ]
          },
          {
            type: "string",
            name: "version",
            label: "Version"
          },
          {
            type: "number",
            name: "order",
            label: "Display Order"
          },
          {
            type: "boolean",
            name: "enabled",
            label: "Published",
            required: true
          },
          // Cache Management - moved here for better visibility
          {
            type: "string",
            name: "cacheRefresh",
            label: "\u{1F504} Cache Management",
            description: "Use the button below to refresh all Figma assets on this page",
            ui: {
              component: CacheRefreshButton_default
            }
          },
          // Links and references
          {
            type: "object",
            name: "links",
            label: "External Links",
            fields: [
              {
                type: "string",
                name: "figmaUrl",
                label: "Figma URL"
              },
              {
                type: "string",
                name: "storybookUrl",
                label: "Storybook URL"
              },
              {
                type: "string",
                name: "githubUrl",
                label: "GitHub URL"
              },
              {
                type: "string",
                name: "npmUrl",
                label: "NPM Package URL"
              }
            ]
          },
          // Package info for components
          {
            type: "object",
            name: "packageInfo",
            label: "Package Information",
            fields: [
              {
                type: "string",
                name: "packageName",
                label: "Package Name"
              },
              {
                type: "string",
                name: "importPath",
                label: "Import Path"
              },
              {
                type: "string",
                name: "dependencies",
                label: "Dependencies",
                ui: {
                  component: "textarea"
                }
              }
            ]
          },
          // Tab Content - Overview
          {
            type: "object",
            name: "overview",
            label: "Overview Tab",
            fields: [
              {
                type: "object",
                name: "blocks",
                label: "Content Blocks",
                list: true,
                templates: contentBlocks,
                ui: {
                  visualSelector: true
                }
              }
            ]
          },
          // Tab Content - Specs
          {
            type: "object",
            name: "specs",
            label: "Specs Tab",
            fields: [
              {
                type: "object",
                name: "blocks",
                label: "Content Blocks",
                list: true,
                templates: contentBlocks,
                ui: {
                  visualSelector: true
                }
              }
            ]
          },
          // Tab Content - Guidelines
          {
            type: "object",
            name: "guidelines",
            label: "Guidelines Tab",
            fields: [
              {
                type: "object",
                name: "blocks",
                label: "Content Blocks",
                list: true,
                templates: contentBlocks,
                ui: {
                  visualSelector: true
                }
              }
            ]
          },
          // Tab Content - Code
          {
            type: "object",
            name: "code",
            label: "Code Tab",
            fields: [
              {
                type: "rich-text",
                name: "content",
                label: "Code Documentation"
              },
              {
                type: "object",
                name: "installation",
                label: "Installation",
                fields: [
                  {
                    type: "string",
                    name: "command",
                    label: "Install Command"
                  },
                  {
                    type: "rich-text",
                    name: "instructions",
                    label: "Installation Instructions"
                  }
                ]
              },
              {
                type: "object",
                name: "codeExamples",
                label: "Code Examples",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Example Title"
                  },
                  {
                    type: "string",
                    name: "language",
                    label: "Language",
                    options: ["tsx", "jsx", "typescript", "javascript", "html", "css", "scss"]
                  },
                  {
                    type: "string",
                    name: "code",
                    label: "Code",
                    ui: {
                      component: "textarea"
                    }
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description"
                  }
                ]
              },
              {
                type: "object",
                name: "api",
                label: "API Reference",
                fields: [
                  {
                    type: "rich-text",
                    name: "content",
                    label: "API Documentation"
                  }
                ]
              }
            ]
          },
          // SEO and metadata
          {
            type: "object",
            name: "seo",
            label: "SEO & Metadata",
            fields: [
              {
                type: "string",
                name: "metaTitle",
                label: "Meta Title"
              },
              {
                type: "string",
                name: "metaDescription",
                label: "Meta Description"
              },
              {
                type: "string",
                name: "keywords",
                label: "Keywords (comma-separated)"
              }
            ]
          },
          // Table of Contents Configuration
          {
            type: "object",
            name: "tableOfContents",
            label: "Table of Contents",
            fields: [
              {
                type: "boolean",
                name: "enabled",
                label: "Enable Table of Contents",
                description: "Show table of contents for this page"
              },
              {
                type: "number",
                name: "maxDepth",
                label: "Maximum Depth",
                description: "Maximum heading level to include (1-6)"
              },
              {
                type: "number",
                name: "minDepth",
                label: "Minimum Depth",
                description: "Minimum heading level to include (1-6)"
              },
              {
                type: "boolean",
                name: "sticky",
                label: "Sticky Position",
                description: "Keep table of contents visible while scrolling"
              }
            ]
          },
          // Main content body
          {
            type: "rich-text",
            name: "body",
            label: "Main Content",
            isBody: true
          }
        ]
      },
      // Navigation configuration
      {
        name: "navigation",
        label: "Navigation",
        path: "content/navigation",
        format: "json",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Navigation Title",
            isTitle: true,
            required: true
          },
          {
            type: "object",
            name: "header",
            label: "Header Navigation",
            fields: [
              {
                type: "object",
                name: "items",
                label: "Header Items",
                list: true,
                fields: [
                  {
                    type: "reference",
                    name: "section",
                    label: "Section",
                    collections: ["section"]
                  },
                  {
                    type: "string",
                    name: "customLabel",
                    label: "Custom Label (optional)"
                  },
                  {
                    type: "string",
                    name: "customUrl",
                    label: "Custom URL (optional)"
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "sidebar",
            label: "Sidebar Navigation Structure",
            list: true,
            fields: [
              {
                type: "reference",
                name: "section",
                label: "Section",
                collections: ["section"]
              },
              {
                type: "object",
                name: "categories",
                label: "Categories in Section",
                list: true,
                fields: [
                  {
                    type: "reference",
                    name: "category",
                    label: "Category",
                    collections: ["category"]
                  },
                  {
                    type: "object",
                    name: "pages",
                    label: "Pages in Category",
                    list: true,
                    fields: [
                      {
                        type: "reference",
                        name: "page",
                        label: "Page",
                        collections: ["page"]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
