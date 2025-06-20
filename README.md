# Eleven Design System Documentation

A comprehensive design system documentation platform built as a ZeroHeight replacement ($12,000/year savings). Features visual editing, Figma API integration, professional theming system, hierarchical information architecture, and production-ready UI components.

## 🎯 **Project Status: PRODUCTION READY**

**Last Updated**: January 2025  
**Current State**: Fully functional with advanced Information Architecture, section-specific navigation, tabbed component documentation, Figma API integration, and complete theming system

### ✅ **Completed Features**

#### **🏗️ Information Architecture & Navigation**
- 🎨 **Hierarchical IA Structure** - Sections → Component Groups → Categories → Components
- 🧭 **Section-Specific Sidebars** - Unique navigation for Foundations, Components, Patterns, Development
- 📑 **4-Tab Component Documentation** - Overview, Specs, Guidelines, Code tabs for each component
- 🔗 **Component Groups** - Components, Engineering Components, Deprecated Components
- 📊 **Expandable Categories** - Actions, Blocks, Cards, Loaders, Progress, Selectors, etc.
- 🎯 **Landing Pages** - Section-specific landing pages with rich content and tab support

#### **🎨 Advanced Theming & Design System**
- 🎨 **Complete ShadCN Theme** - OKLCH colors, semantic variables, light/dark mode support
- 🔍 **Style Audit Completion** - All components use semantic theme variables
- 🎨 **Visual Content Editor** - TinaCMS with WYSIWYG interface
- 🔗 **Figma API Integration** - Automatic component syncing and PNG embedding
- 🏗️ **Professional UI** - ShadCN components with custom theme system

#### **📋 Content Management & Documentation**
- 🎭 **Enhanced TinaCMS Schema** - Support for component groups, landing pages, and rich content
- 🧩 **Component Documentation Templates** - Standardized 4-tab system with rich content support
- 📱 **Status Management** - Component lifecycle tracking (Stable, Beta, Deprecated, etc.)
- 🔒 **Migration Guides** - Deprecation warnings and upgrade paths
- 📊 **Properties Tables** - Comprehensive API documentation with types and defaults

#### **🔧 Development & Infrastructure**
- 🔧 **Robust Development Tooling** - npm scripts for server management
- 🌐 **API Endpoints** - RESTful content APIs for sections, categories, component groups, pages
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🔒 **Environment Security** - Proper .env handling and .gitignore
- ⚡ **Performance Optimizations** - Static generation and optimized content loading

### 🚧 **Next Steps**

- [ ] Populate additional component documentation
- [ ] Add Storybook iframe embedding for live examples
- [ ] Implement design token sync from Figma
- [ ] Set up deployment pipeline (Vercel/Netlify)
- [ ] Configure TinaCMS Cloud for team collaboration
- [ ] Add search functionality across documentation
- [ ] Implement component usage analytics

## 🏗️ **Information Architecture**

### **Hierarchical Structure**
```
Eleven Design System
├── 🎨 Foundations
│   ├── Design Tokens
│   ├── Color System
│   ├── Typography
│   ├── Spacing & Layout
│   ├── Iconography
│   ├── Elevation
│   └── Motion
├── 🧩 Components
│   ├── 📦 Components (Core UI)
│   │   ├── 🎯 Actions (expandable)
│   │   │   ├── Primary Button
│   │   │   └── [other action components]
│   │   ├── 🧱 Blocks (expandable)
│   │   │   ├── Simple Block
│   │   │   └── [other block components]
│   │   ├── 🃏 Cards (expandable)
│   │   ├── ⚡ Loaders (expandable)
│   │   ├── 📊 Progress (expandable)
│   │   ├── 🔘 Selectors (expandable)
│   │   ├── 📄 Text Fields (expandable)
│   │   └── 💬 Tooltips (expandable)
│   ├── ⚙️ Engineering Components
│   │   └── [developer-focused components]
│   └── 📁 Deprecated Components
│       ├── Avatar (deprecated)
│       └── Badge (deprecated)
├── 🔄 Patterns
│   ├── Layout Patterns
│   ├── Navigation Patterns
│   ├── Data Display
│   ├── Form Patterns
│   ├── Feedback Patterns
│   └── Content Patterns
└── 💻 Development
    ├── Getting Started
    ├── Installation
    ├── React Components
    ├── Design Tokens
    ├── Contributing
    ├── Changelog
    └── Migration Guide
```

### **Component Documentation Structure**
Each component page includes 4 comprehensive tabs:

#### **📄 Overview Tab**
- Component description and purpose
- When to use guidelines
- Live examples with code snippets
- Status warnings (deprecated, beta, etc.)
- Key features and benefits

#### **📋 Specs Tab**
- Complete properties table with types and defaults
- Design specifications and measurements
- Component variants and configurations
- Technical requirements

#### **✅ Guidelines Tab**
- Do's and Don'ts with visual examples
- Accessibility requirements (WCAG compliance)
- Best practices and usage patterns
- Design principles and rationale

#### **💻 Code Tab**
- Installation instructions
- Import statements and usage
- Advanced code examples
- API reference and TypeScript definitions

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ and npm
- Git for version control

### **Installation & Setup**
```bash
# Clone the repository
git clone [your-repo-url]
cd Eleven

# Install dependencies
npm install

# Set up environment variables (optional for Figma integration)
cp .env.example .env.local
# Add your Figma token if needed: FIGMA_ACCESS_TOKEN=your_token_here
```

### **Development Servers**

#### **Start Both Servers (Recommended)**
```bash
# Start both Next.js and TinaCMS servers
npm run dev:safe
```

#### **Manual Server Management**
```bash
# Start Next.js only
npm run dev

# Start TinaCMS only (in separate terminal)
npx tinacms dev --datalayer-port 9001
```

#### **Server Management Commands**
```bash
# Check server status
npm run dev:status

# Kill all development servers
npm run dev:cleanup

# Restart servers if needed
npm run dev:restart
```

### **Access Points**
- **📖 Documentation Site**: [http://localhost:3000](http://localhost:3000)
- **⚙️ TinaCMS Admin**: [http://localhost:4001/admin](http://localhost:4001/admin)
- **🎛️ Admin Dashboard**: [http://localhost:3000/admin-page](http://localhost:3000/admin-page)

## 🎨 **Theming System**

### **Advanced ShadCN Theme Implementation**
- **Color Format**: OKLCH (modern color space for better perceptual uniformity)
- **Brand Color**: `oklch(0.4430 0.1667 320.6392)` (purple/magenta)
- **Typography**: Inter (sans-serif), JetBrains Mono (monospace), Merriweather (serif)
- **Enhanced Features**: 
  - Comprehensive shadow system (--shadow-2xs to --shadow-2xl)
  - Letter spacing controls (--tracking-tighter to --tracking-widest)
  - Complete semantic color mappings
  - Advanced sidebar theming support

### **Theme Architecture**
```css
/* Color System */
:root {
  --background: oklch(0.9820 0.0089 106.4193);
  --foreground: oklch(0.0898 0.0000 0.0000);
  --primary: oklch(0.4430 0.1667 320.6392);
  /* ... complete semantic color system */
}

/* Typography */
--font-sans: "Inter", system-ui, sans-serif;
--font-mono: "JetBrains Mono", monospace;
--font-serif: "Merriweather", serif;

/* Enhanced Shadows & Spacing */
--shadow-2xs: 0 1px 2px 0 oklch(0.0898 0.0000 0.0000 / 0.05);
/* ... complete shadow system */
```

### **Custom Theme Installation**
```bash
npx shadcn@latest add https://tweakcn.com/r/themes/cmc2ftvdy000004l1hjufau97
```

**Theme Features**:
- OKLCH color space for better color accuracy
- Complete semantic variable system
- Enhanced shadow and typography scales
- Built-in light/dark mode support
- Advanced component theming

## 📁 **Project Architecture**

```
Eleven/
├── content/                           # TinaCMS content structure
│   ├── sections/                     # Top-level sections
│   │   ├── components.json           # Components section with landing page
│   │   ├── foundations.json          # Foundations section
│   │   ├── patterns.json             # Patterns section
│   │   └── development.json          # Development section
│   ├── component-groups/             # Component groupings
│   │   ├── components.json           # Core UI components
│   │   ├── engineering-components.json # Developer-focused
│   │   └── deprecated-components.json # Legacy components
│   ├── categories/                   # Component categories
│   │   ├── actions.json              # Action components (buttons, links)
│   │   ├── blocks.json               # Layout blocks
│   │   ├── cards.json                # Card components
│   │   ├── loaders.json              # Loading indicators
│   │   ├── progress.json             # Progress indicators
│   │   ├── selectors.json            # Form selectors
│   │   ├── text-fields.json          # Input components
│   │   └── tooltips.json             # Tooltip components
│   ├── pages/                        # Component documentation
│   │   ├── accordion.mdx             # Full 4-tab documentation
│   │   ├── alert.mdx                 # Rich content examples
│   │   ├── avatar.mdx                # Deprecated component example
│   │   ├── badge.mdx                 # Status badge examples
│   │   ├── button.mdx                # Core button documentation
│   │   ├── data-table.mdx            # Advanced component example
│   │   └── primary-button.mdx        # Category-specific component
│   └── navigation/
│       └── main.json                 # Main navigation configuration
├── src/
│   ├── app/
│   │   ├── components/               # Component documentation pages
│   │   │   ├── [slug]/
│   │   │   │   ├── page.tsx          # Dynamic component pages
│   │   │   │   └── ComponentTabs.tsx # 4-tab navigation component
│   │   │   └── page.tsx              # Components landing page
│   │   ├── foundations/
│   │   │   └── page.tsx              # Foundations landing page
│   │   ├── patterns/
│   │   │   └── page.tsx              # Patterns landing page
│   │   ├── development/
│   │   │   └── page.tsx              # Development landing page
│   │   ├── admin-page/               # Admin dashboard
│   │   ├── api/
│   │   │   ├── content/              # Content API endpoints
│   │   │   │   ├── sections/         # Sections API
│   │   │   │   ├── component-groups/ # Component groups API
│   │   │   │   ├── categories/       # Categories API
│   │   │   │   └── pages/            # Pages API with MDX parsing
│   │   │   └── figma/                # Figma API integration
│   │   ├── globals.css               # Complete theme CSS with OKLCH
│   │   └── layout.tsx                # Root layout with section-specific sidebars
│   ├── components/
│   │   ├── ui/                       # ShadCN components (theme-compliant)
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── label.tsx
│   │   ├── navigation/               # Navigation components
│   │   │   ├── HeaderNav.tsx         # Main header navigation
│   │   │   └── Sidebar.tsx           # Section-specific sidebars
│   │   └── FigmaSync.tsx             # Figma integration UI
│   └── lib/
│       ├── figma.ts                  # Figma API wrapper
│       ├── theme-utils.ts            # Semantic color utilities
│       └── utils.ts                  # General utilities
├── tina/                             # TinaCMS configuration
│   ├── config.ts                     # Enhanced schema with IA support
│   └── __generated__/                # Auto-generated TinaCMS files
├── public/
│   └── admin/                        # TinaCMS admin build
├── tailwind.config.js                # Tailwind config with theme integration
├── next.config.ts                    # Next.js configuration
├── .env.local                        # Environment variables (gitignored)
├── FIGMA_INTEGRATION.md              # Figma API documentation
├── THEMING_GUIDE.md                  # Comprehensive theming guide
└── DEVELOPMENT_GUIDE.md              # Development troubleshooting
```

## 🔧 **Technical Implementation**

### **Core Technologies**
- **Framework**: Next.js 15 with App Router and TypeScript
- **Styling**: Tailwind CSS + Custom ShadCN Theme (OKLCH-based)
- **Content Management**: TinaCMS with enhanced hierarchical schema
- **API Integration**: Figma REST API with custom wrapper
- **Content Parsing**: Gray-matter for MDX frontmatter parsing
- **Icons**: Lucide React with section-specific iconography
- **Theme System**: Semantic CSS variables with OKLCH color space

### **Key Features Implemented**

#### **1. Information Architecture System**
- ✅ **Hierarchical Content Structure**: Sections → Component Groups → Categories → Components
- ✅ **Section-Specific Navigation**: Unique sidebars for each major section
- ✅ **Component Grouping**: Logical organization of components by type and status
- ✅ **Expandable Categories**: Collapsible navigation with visual indicators
- ✅ **Landing Pages**: Rich content pages for each section with tab support

#### **2. Component Documentation System**
- ✅ **4-Tab Navigation**: Overview, Specs, Guidelines, Code tabs
- ✅ **Rich Content Support**: TinaCMS rich-text with custom rendering
- ✅ **Status Management**: Component lifecycle tracking and warnings
- ✅ **Interactive Examples**: Code snippets with preview placeholders
- ✅ **Comprehensive API Docs**: Properties tables with types and defaults

#### **3. Content Management APIs**
```typescript
// API Endpoints
GET /api/content/sections        // Section data with landing pages
GET /api/content/component-groups // Component group classifications
GET /api/content/categories      // Component categories with hierarchy
GET /api/content/pages          // Component documentation with MDX parsing
```

#### **4. Navigation System**
- ✅ **Header Navigation**: Main section links (Foundations, Components, Patterns, Development)
- ✅ **Section-Specific Sidebars**: Contextual navigation for each section
- ✅ **Hierarchical Display**: Visual hierarchy with icons and expand/collapse
- ✅ **Active State Management**: Current page highlighting and breadcrumbs

### **Enhanced TinaCMS Schema**

#### **Content Collections**
1. **Sections**: Top-level areas (Foundations, Components, Patterns, Development)
2. **Component Groups**: Classification system (Components, Engineering, Deprecated)
3. **Categories**: Organizational containers (Actions, Blocks, Cards, etc.)
4. **Pages**: Individual component documentation with full rich-text support

#### **Rich Content Support**
- ✅ **TinaCMS Rich-Text**: Visual content editing with structured data
- ✅ **Custom Rendering**: React components for rich content display
- ✅ **MDX Integration**: Frontmatter parsing for component metadata
- ✅ **Tab Content**: Separate content areas for each documentation tab

### **Figma Integration**
- ✅ **Token Authentication**: Secure API token handling
- ✅ **Component Syncing**: Automatic metadata and image fetching
- ✅ **Admin Interface**: Visual management of Figma connections
- ✅ **Error Handling**: Robust error reporting and retry logic

## 📝 **Content Structure**

### **Component Documentation Template**
Each component follows this standardized structure:

```yaml
# Component Metadata
title: "Component Name"
description: "Brief component description"
version: "2.0.0"
status: "stable" # stable, beta, deprecated, experimental
section: ["components"]
category: ["actions"] # or relevant category
componentGroup: ["components"] # components, engineering-components, deprecated-components

# 4-Tab Content Structure
overview:
  content: # Rich-text content
  examples: # Code examples with previews
  usage: # When to use guidelines

specs:
  content: # Technical specifications
  properties: # API documentation
  variants: # Component variations

guidelines:
  content: # Design guidelines
  dos: # Best practices
  donts: # Anti-patterns
  accessibility: # WCAG requirements

code:
  content: # Implementation notes
  installation: # Setup instructions
  codeExamples: # Advanced examples
  import: # Import statements
```

## 🌟 **Getting Started Examples**

### **1. Creating a New Component**
1. **Add to TinaCMS**: Visit [http://localhost:4001/admin](http://localhost:4001/admin)
2. **Create Page**: Add new page in the Pages collection
3. **Set Metadata**: Assign to appropriate section, category, and component group
4. **Add Content**: Fill in the 4-tab structure (Overview, Specs, Guidelines, Code)
5. **Publish**: Save and view at `http://localhost:3000/components/[slug]`

### **2. Managing Information Architecture**
- **Sections**: Control main navigation areas
- **Component Groups**: Organize components by type/status
- **Categories**: Create expandable navigation groups
- **Landing Pages**: Add rich content to section overview pages

### **3. Theme Customization**
```typescript
// src/lib/theme-utils.ts
export const semanticColors = {
  brand: 'text-primary',
  success: 'text-green-600 dark:text-green-400',
  error: 'text-destructive',
  warning: 'text-yellow-600 dark:text-yellow-400',
  info: 'text-blue-600 dark:text-blue-400'
};
```

## 🚀 **Deployment**

### **Production Deployment**
```bash
# Build for production
npm run build

# Start production server
npm start
```

### **Environment Variables**
```bash
# Required for Figma integration
FIGMA_ACCESS_TOKEN=your_figma_token_here

# TinaCMS (optional, for cloud features)
TINA_PUBLIC_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
```

### **Recommended Hosting**
- **Vercel** (recommended for Next.js)
- **Netlify** (with build command: `npm run build`)
- **AWS Amplify**
- **Railway** or **Render**

## 📚 **Documentation**

- **[THEMING_GUIDE.md](./THEMING_GUIDE.md)** - Comprehensive theming documentation
- **[FIGMA_INTEGRATION.md](./FIGMA_INTEGRATION.md)** - Figma API setup and usage
- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - Development troubleshooting

## 🤝 **Contributing**

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Follow the component documentation template**
4. **Test thoroughly**: Ensure all tabs work correctly
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open Pull Request**

## 📊 **Project Metrics**

- **💰 Cost Savings**: $12,000/year (ZeroHeight replacement)
- **📄 Documentation Pages**: 50+ components planned
- **🎨 Theme Variables**: 40+ semantic color variables
- **📋 Component Properties**: Comprehensive API documentation
- **⚡ Performance**: Static generation for optimal loading

## 🔮 **Roadmap**

### **Phase 1: Content Population** (Q1 2025)
- [ ] Complete all core component documentation
- [ ] Add comprehensive design token documentation
- [ ] Implement pattern library examples

### **Phase 2: Advanced Features** (Q2 2025)
- [ ] Live component previews with Storybook
- [ ] Design token sync from Figma
- [ ] Advanced search functionality
- [ ] Usage analytics and insights

### **Phase 3: Team Collaboration** (Q3 2025)
- [ ] TinaCMS Cloud integration
- [ ] Multi-user editing workflows
- [ ] Approval and publishing workflows
- [ ] Integration with design tools

---

**Built with ❤️ using Next.js, TinaCMS, and the power of semantic theming** 