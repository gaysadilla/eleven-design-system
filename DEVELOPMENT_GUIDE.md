# Eleven Design System - Development Guide

## 🚀 Quick Start

**Use this command to start everything:**
```bash
npm run dev:safe
```

This automatically:
- Cleans up any existing processes
- Starts both Next.js and TinaCMS simultaneously
- Shows colored output for easy monitoring

## 📋 Available Commands

### Primary Development Commands
- `npm run dev:safe` - **RECOMMENDED** - Clean start of both services
- `npm run dev:full` - Start both services (without cleanup)
- `npm run dev:cleanup` - Kill all development processes
- `npm run dev:status` - Check what's running on ports 3000, 4001, 9001

### Individual Services
- `npm run dev` - Start Next.js only (port 3000)
- `npm run tina:dev` - Start TinaCMS only (ports 4001, 9001)

## 🌐 URLs

- **Website**: http://localhost:3000
- **TinaCMS Admin**: http://localhost:4001/admin/index.html
- **GraphQL API**: http://localhost:4001/graphql

## 🔍 Troubleshooting

### If you get port conflicts:
```bash
npm run dev:cleanup
npm run dev:safe
```

### If services won't start:
```bash
npm run dev:status  # Check what's running
npm run dev:cleanup # Kill everything
npm run dev:safe    # Clean restart
```

### If you see "connection refused":
- Check `npm run dev:status` to see if servers are running
- Make sure you're using the correct URLs above
- Try `npm run dev:cleanup && npm run dev:safe`

## 🏗️ Content Structure

### TinaCMS Collections
- **Sections** - Top-level organization (Foundations, Components, etc.)
- **Categories** - Sub-organization (Actions, Blocks, Cards, etc.)  
- **Documentation Pages** - Individual component pages with tabs
- **Navigation** - Header and sidebar configuration

### Content Location
```
content/
├── sections/      # Foundation, Components, Patterns, Development
├── categories/    # Actions, Blocks, Cards, etc.
├── pages/         # Individual documentation pages
└── navigation/    # Navigation configuration
```

## 🎯 Creating Content

1. Go to http://localhost:4001/admin/index.html
2. Use the visual editor to create:
   - New sections and categories
   - Documentation pages with Overview/Specs/Guidelines/Code tabs
   - Navigation structure

## 🔧 Technical Notes

- **React Version**: Next.js uses React 19, TinaCMS uses React 18 (this is expected)
- **Port Management**: Automated cleanup prevents conflicts
- **Process Monitoring**: Built-in status checking
- **Content Management**: All content editable through TinaCMS admin

## 📚 Next Steps

1. **Access TinaCMS Admin**: http://localhost:4001/admin/index.html
2. **Create your first component page** using the comprehensive schema
3. **Build frontend routing** to display pages with tab system
4. **Customize the schema** as your design system grows

---

**Remember**: Always use `npm run dev:safe` to avoid port conflicts! 