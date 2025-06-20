# TinaCMS Templates Guide

## Overview

This guide explains how to embed React components (like FigmaSync) directly within your TinaCMS rich-text content. This allows you to add interactive elements inline with your documentation content.

## Available Templates

### 1. FigmaSync Template
Embeds the FigmaSync component for importing component data from Figma.

**Fields:**
- `title` (string, optional): Section title to display above the component
- `description` (string, optional): Description or instructions
- `showInstructions` (boolean, optional): Whether to show the "How to use" instructions

### 2. Live Example Template
Creates a code example card with syntax highlighting and optional live preview.

**Fields:**
- `title` (string, required): Example title
- `description` (string, optional): Example description
- `code` (string, optional): Code example to display
- `language` (string, optional): Programming language for syntax highlighting (tsx, jsx, typescript, javascript, html, css)
- `showPreview` (boolean, optional): Whether to show a live preview area

### 3. Component Preview Template
Shows a preview of a component with configurable props.

**Fields:**
- `componentName` (string, required): Name of the component to preview
- `props` (object, optional): Component props to display and use
  - `variant` (string): Component variant
  - `size` (string): Component size
  - `children` (string): Component content/children
  - `disabled` (boolean): Whether component is disabled
- `title` (string, optional): Preview title
- `description` (string, optional): Preview description

### 4. Callout Template
Creates an alert/callout box for important information.

**Fields:**
- `type` (string, optional): Type of callout (info, warning, error, success)
- `title` (string, optional): Callout title
- `content` (rich-text, optional): Callout content

## How to Use Templates

### Step 1: Access the Rich-Text Editor
1. Open TinaCMS admin panel (`/admin`)
2. Navigate to a page (e.g., Action component)
3. Go to the Overview, Specs, or Guidelines tab
4. Click in the content area to open the rich-text editor

### Step 2: Add a Template Component
1. In the rich-text editor, click the "+" button to add content
2. Select "Templates" from the dropdown
3. Choose the template you want to add:
   - **Figma Sync**: For importing component data from Figma
   - **Live Example**: For code examples with preview
   - **Component Preview**: For showing component demonstrations
   - **Callout**: For important notes or warnings

### Step 3: Configure the Template
1. Fill in the template fields in the sidebar
2. For FigmaSync example:
   - Title: "Import from Figma"
   - Description: "Use this tool to sync the latest component data from our Figma library"
   - Show Instructions: ✓ (checked)

### Step 4: Save and Preview
1. Save your changes in TinaCMS
2. View the page on the frontend to see your embedded component

## Example Usage Scenarios

### Adding FigmaSync to Action Overview
Perfect for allowing content editors to sync the latest Action component specifications directly from Figma within the documentation.

### Adding Live Examples
Great for showing code examples with interactive previews in the Overview or Specs tabs.

### Adding Component Previews
Useful for demonstrating different component states and variants inline with the documentation.

### Adding Callouts
Perfect for highlighting important information, warnings, or tips throughout the documentation.

## Technical Implementation

### Template Definition
Templates are defined in `tina/templates/index.ts` and exported as `richTextTemplates`.

### Component Rendering
Template components are implemented in `src/components/tina/TinaComponents.tsx` and rendered through the `renderRichContent` function in `ComponentTabs.tsx`.

### Schema Integration
Templates are added to rich-text fields in the TinaCMS schema (`tina/config.ts`) using the `templates` property.

## Extending Templates

To add new templates:

1. **Define the template** in `tina/templates/index.ts`:
```typescript
export const myNewTemplate: Template = {
  name: 'MyNewTemplate',
  label: 'My New Template',
  fields: [
    // Define your fields here
  ]
};
```

2. **Create the React component** in `src/components/tina/TinaComponents.tsx`:
```typescript
export const MyNewTemplateComponent = ({ ...props }) => {
  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};
```

3. **Add to TinaComponents export**:
```typescript
export const TinaComponents = {
  // ... existing components
  MyNewTemplate: MyNewTemplateComponent,
};
```

4. **Add rendering case** in `ComponentTabs.tsx`:
```typescript
case 'MyNewTemplate':
  const MyNewTemplateComponent = TinaComponents.MyNewTemplate;
  return <MyNewTemplateComponent key={index} {...child.props} />;
```

5. **Update the richTextTemplates array** in `tina/templates/index.ts`:
```typescript
export const richTextTemplates = [
  // ... existing templates
  myNewTemplate
];
```

## Best Practices

1. **Keep templates focused**: Each template should serve a specific purpose
2. **Make fields optional when possible**: Provide sensible defaults
3. **Use descriptive labels**: Help content editors understand what each field does
4. **Test thoroughly**: Ensure templates work in all tabs and contexts
5. **Consider responsive design**: Templates should work on mobile and desktop
6. **Handle edge cases**: What happens when required data is missing?

## Troubleshooting

### Template not appearing in editor
- Check that the template is included in `richTextTemplates` array
- Verify the template is properly imported in `tina/config.ts`
- Ensure TinaCMS is restarted after schema changes

### Component not rendering on frontend
- Check that the component is added to `TinaComponents` export
- Verify the rendering case is added to `renderRichContent` function
- Check browser console for any errors

### Styling issues
- Ensure components use the design system's CSS classes
- Test in both light and dark modes
- Verify responsive behavior on different screen sizes 