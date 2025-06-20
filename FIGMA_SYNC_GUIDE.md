# Figma Sync Template Guide

## Overview

The Figma Sync template allows you to embed Figma component sync functionality directly within your documentation content. This provides a seamless way to keep your design system documentation synchronized with your Figma files.

## Expected Behavior

### 1. Adding a Figma Sync Template

1. **Open TinaCMS Editor**: Navigate to `http://localhost:4001/admin/index.html`
2. **Select a Page**: Choose any documentation page (e.g., Action.mdx)
3. **Edit Rich Text Content**: Click on the Overview tab content area
4. **Add Template**: Click the "Embed" button in the rich text toolbar
5. **Choose Template**: Select "Figma Sync" from the template dropdown
6. **Template Added**: The template appears in your content with default settings

### 2. Editing Template Properties

1. **Locate Template**: Find the embedded Figma Sync component in your content
2. **Access Edit Menu**: Click the three dots (⋯) on the template
3. **Open Edit Interface**: Click "Edit" to open the template properties modal
4. **Edit Fields**: You should see:
   - **Title**: Optional title to display above the component
   - **Description**: Optional description or instructions
   - **Show Instructions**: Checkbox to show/hide the "How to use" card
5. **Save Changes**: Click "Save" to apply your changes

### 3. Multiple Sync Examples

You can add multiple Figma Sync templates across different pages:

- **Per Page**: Each page can have multiple Figma Sync instances
- **Per Tab**: Different tabs (Overview, Specs, Guidelines) can each have their own sync components
- **Unique Configuration**: Each instance can have different titles, descriptions, and instruction visibility

## Template Configuration

### Available Fields

```typescript
{
  title?: string;           // Section title (optional)
  description?: string;     // Description text (optional)
  showInstructions?: boolean; // Show usage instructions (default: true)
}
```

### Example Configurations

#### Basic Configuration
- **Title**: "Design Tokens"
- **Description**: "Sync color and typography tokens from Figma"
- **Show Instructions**: true

#### Minimal Configuration
- **Title**: "" (empty)
- **Description**: "" (empty)
- **Show Instructions**: false

#### Advanced Configuration
- **Title**: "Component Variants"
- **Description**: "Import all button variants and their specifications"
- **Show Instructions**: true

## Troubleshooting

### Template Edit Interface Not Opening

If clicking "Edit" doesn't open the modal:

1. **Check Browser Console**: Open DevTools and look for JavaScript errors
2. **Verify Template Registration**: Ensure templates are properly imported in `tina/config.ts`
3. **Clear Browser Cache**: Hard refresh the TinaCMS admin interface
4. **Restart TinaCMS**: Stop and restart the TinaCMS development server

### Template Not Rendering

If the template appears but doesn't render properly:

1. **Check Component Import**: Verify `FigmaSync` component is properly imported
2. **Verify Template Components**: Ensure `TinaComponents` exports the template
3. **Check Console Errors**: Look for React component errors in browser console

### Template Fields Not Saving

If changes to template fields don't persist:

1. **Check TinaCMS Connection**: Ensure TinaCMS is connected to the content files
2. **Verify File Permissions**: Check that content files are writable
3. **Check Git Status**: Ensure files aren't locked by version control

## Implementation Details

### Template Definition

```typescript
// tina/templates/index.ts
export const figmaSyncTemplate: Template = {
  name: 'FigmaSync',
  label: 'Figma Sync',
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Section Title',
      description: 'Optional title to display above the Figma sync component'
    },
    {
      type: 'string', 
      name: 'description',
      label: 'Description',
      description: 'Optional description or instructions'
    },
    {
      type: 'boolean',
      name: 'showInstructions',
      label: 'Show Instructions',
      description: 'Display the "How to use" instructions card'
    }
  ]
};
```

### React Component

```typescript
// src/components/tina/TinaComponents.tsx
export const FigmaSyncTemplate = ({ title, description, showInstructions = true }) => {
  return (
    <div className="my-8 space-y-4">
      {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
      {description && <p className="text-muted-foreground">{description}</p>}
      <FigmaSync />
      {showInstructions && <InstructionsCard />}
    </div>
  );
};
```

## Usage Examples

### Example 1: Component Documentation
- **Page**: Action.mdx
- **Tab**: Overview
- **Title**: "Sync Action Component"
- **Description**: "Import the latest Action component specifications from Figma"
- **Show Instructions**: true

### Example 2: Design Token Documentation
- **Page**: Foundations → Colors
- **Tab**: Specs
- **Title**: "Color Tokens"
- **Description**: "Sync color palette and usage guidelines"
- **Show Instructions**: false

### Example 3: Pattern Library
- **Page**: Patterns → Navigation
- **Tab**: Guidelines
- **Title**: "Navigation Patterns"
- **Description**: "Import navigation component patterns and layouts"
- **Show Instructions**: true

## Best Practices

1. **Descriptive Titles**: Use clear, descriptive titles for each sync instance
2. **Context-Aware Descriptions**: Provide relevant context for what will be synced
3. **Strategic Instruction Display**: Show instructions for complex workflows, hide for simple ones
4. **Consistent Placement**: Place sync components in logical locations within your content
5. **Regular Updates**: Use the sync functionality regularly to keep documentation current

## API Integration

The Figma Sync component integrates with your Figma API to:

1. **Fetch Component Data**: Retrieve component specifications and metadata
2. **Download Assets**: Import images, icons, and other design assets
3. **Sync Properties**: Update component properties and variants
4. **Track Changes**: Monitor when components are updated in Figma

## Support

If you encounter issues with Figma Sync templates:

1. Check the browser console for errors
2. Verify your Figma API configuration
3. Ensure TinaCMS is running on the correct ports
4. Review the template configuration in `tina/config.ts`
5. Test with a simple template first before adding complex configurations 