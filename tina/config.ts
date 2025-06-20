import { defineConfig } from "tinacms";
import { richTextTemplates } from "./templates";
import { contentBlocks } from "./templates/blocks";
import CacheRefreshButton from "../src/components/tina/CacheRefreshButton";



export default defineConfig({
  branch: "main",
  // For local development, these can be empty
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
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
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "number",
            name: "order",
            label: "Display Order",
          },
          {
            type: "boolean",
            name: "enabled",
            label: "Enabled",
            required: true,
          },
          {
            type: "string",
            name: "icon",
            label: "Icon (Lucide React)",
            description: "Icon name from lucide-react (e.g., 'palette', 'layout', 'code')",
          },
          // New: Section landing page content with tabs
          {
            type: "boolean",
            name: "hasLandingPage",
            label: "Has Landing Page",
            description: "Enable if this section should have a dedicated landing page with tabs",
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
                description: "Main content for the section overview",
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
                    required: true,
                  },
                  {
                    type: "string",
                    name: "slug",
                    label: "Tab Slug",
                    required: true,
                  },
                  {
                    type: "rich-text",
                    name: "content",
                    label: "Tab Content",
                  },
                ],
              },
            ],
          },
        ],
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
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "number",
            name: "order",
            label: "Display Order",
          },
          {
            type: "boolean",
            name: "enabled",
            label: "Enabled",
            required: true,
          },
          {
            type: "string",
            name: "icon",
            label: "Icon (Lucide React)",
          },
          {
            type: "rich-text",
            name: "content",
            label: "Landing Page Content",
            description: "Content for the component group landing page",
          },
        ],
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
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "reference",
            name: "section",
            label: "Parent Section",
            collections: ["section"],
            required: true,
          },
          // New: Component group reference
          {
            type: "reference",
            name: "componentGroup",
            label: "Component Group",
            collections: ["componentGroup"],
            description: "Optional: Assign to a component group (Component, Engineering, Deprecated)",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "number",
            name: "order",
            label: "Display Order",
          },
          {
            type: "boolean",
            name: "enabled",
            label: "Enabled",
            required: true,
          },
          {
            type: "string",
            name: "icon",
            label: "Icon (Lucide React)",
          },
          // New: Category behavior
          {
            type: "boolean",
            name: "isExpandable",
            label: "Is Expandable Category",
            description: "Enable if this category should expand to show subcategories/components",
          },
          {
            type: "boolean",
            name: "hasLandingPage",
            label: "Has Landing Page",
            description: "Enable if this category should have its own landing page",
          },
          {
            type: "rich-text",
            name: "landingContent",
            label: "Landing Page Content",
            description: "Content for category landing page (if enabled)",
          },
        ],
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
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Page Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "reference",
            name: "section",
            label: "Section",
            collections: ["section"],
            required: true,
          },
          {
            type: "reference",
            name: "category",
            label: "Category",
            collections: ["category"],
          },
          {
            type: "reference",
            name: "componentGroup",
            label: "Component Group",
            collections: ["componentGroup"],
            description: "Optional: Assign to a component group (Component, Engineering, Deprecated)",
          },
          {
            type: "string",
            name: "description",
            label: "Short Description",
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
              { label: "Ready", value: "ready" },
            ],
          },
          {
            type: "string",
            name: "version",
            label: "Version",
          },
          {
            type: "number",
            name: "order",
            label: "Display Order",
          },
          {
            type: "boolean",
            name: "enabled",
            label: "Published",
            required: true,
          },

          // Cache Management - moved here for better visibility
          {
            type: "string",
            name: "cacheRefresh",
            label: "🔄 Cache Management",
            description: "Use the button below to refresh all Figma assets on this page",
            ui: {
              component: CacheRefreshButton,
            },
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
                label: "Figma URL",
              },
              {
                type: "string",
                name: "storybookUrl",
                label: "Storybook URL",
              },
              {
                type: "string",
                name: "githubUrl",
                label: "GitHub URL",
              },
              {
                type: "string",
                name: "npmUrl",
                label: "NPM Package URL",
              },
            ],
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
                label: "Package Name",
              },
              {
                type: "string",
                name: "importPath",
                label: "Import Path",
              },
              {
                type: "string",
                name: "dependencies",
                label: "Dependencies",
                ui: {
                  component: "textarea",
                },
              },
            ],
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
                  visualSelector: true,
                  },
              },
            ],
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
                  visualSelector: true,
                  },
              },
            ],
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
                  visualSelector: true,
                      },
              },
            ],
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
                label: "Code Documentation",
              },
              {
                type: "object",
                name: "installation",
                label: "Installation",
                fields: [
                  {
                    type: "string",
                    name: "command",
                    label: "Install Command",
                  },
                  {
                    type: "rich-text",
                    name: "instructions",
                    label: "Installation Instructions",
                  },
                ],
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
                    label: "Example Title",
                  },
                  {
                    type: "string",
                    name: "language",
                    label: "Language",
                    options: ["tsx", "jsx", "typescript", "javascript", "html", "css", "scss"],
                  },
                  {
                    type: "string",
                    name: "code",
                    label: "Code",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Description",
                  },
                ],
              },
              {
                type: "object",
                name: "api",
                label: "API Reference",
                fields: [
                  {
                    type: "rich-text",
                    name: "content",
                    label: "API Documentation",
                  },
                ],
              },
            ],
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
                label: "Meta Title",
              },
              {
                type: "string",
                name: "metaDescription",
                label: "Meta Description",
              },
              {
                type: "string",
                name: "keywords",
                label: "Keywords (comma-separated)",
              },
            ],
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
                description: "Show table of contents for this page",
              },
              {
                type: "number",
                name: "maxDepth",
                label: "Maximum Depth",
                description: "Maximum heading level to include (1-6)",
              },
              {
                type: "number",
                name: "minDepth",
                label: "Minimum Depth",
                description: "Minimum heading level to include (1-6)",
              },
              {
                type: "boolean",
                name: "sticky",
                label: "Sticky Position",
                description: "Keep table of contents visible while scrolling",
              },
            ],
          },

          // Main content body
          {
            type: "rich-text",
            name: "body",
            label: "Main Content",
            isBody: true,
          },
        ],
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
            required: true,
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
                    collections: ["section"],
                  },
                  {
                    type: "string",
                    name: "customLabel",
                    label: "Custom Label (optional)",
                  },
                  {
                    type: "string",
                    name: "customUrl",
                    label: "Custom URL (optional)",
                  },
                ],
              },
            ],
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
                collections: ["section"],
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
                    collections: ["category"],
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
                        collections: ["page"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}); 