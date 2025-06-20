# TinaCMS Template Troubleshooting Guide

## Issue: Template Edit Interface Not Opening

### Symptoms
- You can add templates via the "Embed" button
- Templates appear in the rich-text editor
- Clicking the three dots (⋯) and "Edit" does nothing
- No edit modal or sidebar appears

### Troubleshooting Steps

#### 1. Check Browser Console
Open browser developer tools (F12) and check the Console tab for errors:
- Look for JavaScript errors when clicking "Edit"
- Look for network errors or failed API calls
- Common errors might include missing component definitions or template configuration issues

#### 2. Verify Server Restart
TinaCMS requires a full server restart when templates are added/modified:
```bash
# Kill all processes
pkill -f "next\|npm\|node"

# Clear TinaCMS cache
rm -rf tina/__generated__

# Restart development server
npm run dev
```

#### 3. Clear Browser Cache
- Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
- Or clear browser cache completely
- Try in incognito/private browsing mode

#### 4. Test with Simple Template
Try the "Test Component" template first (simpler than FigmaSync):
1. Go to `/admin`
2. Open Action component page
3. Edit Overview content
4. Click "+" → "Embed" → "Test Component"
5. Try to edit it

#### 5. Check Template Configuration
Verify template structure in `tina/templates/index.ts`:
- All required fields are present
- Field types are correct
- No TypeScript errors

#### 6. Verify Component Registration
Check that templates are properly registered:
- `tina/config.ts` imports templates
- `TinaComponents.tsx` exports template components
- `ComponentTabs.tsx` handles template rendering

#### 7. Check TinaCMS Version Compatibility
```bash
npm list tinacms @tinacms/cli
```
Ensure both packages are on compatible versions.

### Expected Behavior

When working correctly:
1. Click "+" in rich-text editor
2. Select "Embed" → Choose template (e.g., "Figma Sync")
3. Template appears in editor with placeholder content
4. Click three dots (⋯) → "Edit"
5. **Edit sidebar should open on the right** with template fields
6. Fill in fields (Title, Description, etc.)
7. Click "Save" or outside to close
8. Template updates with your content

### Debug Information to Collect

If the issue persists, check:

1. **Browser Console Errors** (F12 → Console)
2. **Network Tab** (F12 → Network) - look for failed requests when clicking Edit
3. **TinaCMS Version**: `npm list tinacms`
4. **Node Version**: `node --version`
5. **Browser**: Chrome/Firefox/Safari version

### Common Solutions

#### Solution 1: Template Field Issues
Make sure template fields don't use reserved names or invalid types:
```typescript
// ❌ Don't use reserved names
fields: [{ name: 'children', type: 'string' }]

// ✅ Use valid field names
fields: [{ name: 'content', type: 'string' }]
```

#### Solution 2: Component Props Mismatch
Ensure template component accepts the same props as defined in template fields:
```typescript
// Template definition
fields: [{ name: 'title', type: 'string' }]

// Component should accept
const MyTemplate = ({ title }: { title?: string }) => { ... }
```

#### Solution 3: Missing Template Import
Check that templates are properly imported in config:
```typescript
// tina/config.ts
import { richTextTemplates } from "./templates";

// In rich-text field
templates: richTextTemplates,
```

### Test Commands

```bash
# Check for TypeScript errors
npm run type-check

# Check TinaCMS schema
npx tinacms audit

# Rebuild TinaCMS
npx tinacms build
```

### Still Not Working?

If templates still don't work after trying these steps:

1. **Create a minimal reproduction** with just one simple template
2. **Check TinaCMS Discord/GitHub issues** for similar problems
3. **Try the official TinaCMS starter** to compare behavior
4. **Consider reverting to a working state** and adding templates one by one

### Working Test Case

Use this minimal template to verify basic functionality:

```typescript
// tina/templates/minimal-test.ts
export const minimalTestTemplate = {
  name: 'MinimalTest',
  label: 'Minimal Test',
  fields: [
    {
      type: 'string',
      name: 'text',
      label: 'Text',
      required: true
    }
  ]
};
```

If this simple template doesn't work, the issue is with the basic TinaCMS template setup, not our specific templates. 