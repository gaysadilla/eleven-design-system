# Block-Based CMS Guide

## Overview

The Eleven Design System now uses a **block-based content architecture** instead of rich-text with embedded templates. This provides a much better content editing experience that's more flexible and easier to use.

## What Changed

### Before (Rich-Text + Templates)
- Single rich-text editor with embedded templates
- Templates were hard to edit (clicking "Edit" didn't work properly)
- Limited layout flexibility
- Content was mixed together in one field

### After (Block-Based System)
- Multiple content blocks that can be added, removed, and reordered
- Each block type has its own dedicated editing interface
- Visual block selector for easy content creation
- Clean separation of different content types
- Full frontend rendering with proper styling

## Available Block Types

### 1. **Rich Text Block**
- **Purpose**: Standard text content with formatting
- **Fields**: 
  - Section Title (optional)
  - Rich text content with formatting
- **Use Case**: Paragraphs, lists, basic formatting

### 2. **Figma Sync Block**
- **Purpose**: Embed Figma synchronization functionality
- **Fields**:
  - Section Title
  - Description
  - Show Instructions (checkbox)
  - Figma URL (optional)
- **Use Case**: Component sync with Figma files

### 3. **Live Example Block**
- **Purpose**: Code examples with optional live previews
- **Fields**:
  - Example Title
  - Description
  - Code Example (textarea)
  - Code Language (dropdown)
  - Show Live Preview (checkbox)
  - Enable Copy Button (checkbox)
- **Use Case**: Component usage examples, code snippets

### 4. **Component API Block**
- **Purpose**: Document component properties and API
- **Fields**:
  - Section Title
  - Properties (list):
    - Property Name
    - Type
    - Default Value
    - Description
    - Required (checkbox)
- **Use Case**: Component prop documentation

### 5. **Design Specs Block**
- **Purpose**: Design specifications and measurements
- **Fields**:
  - Section Title
  - Measurements:
    - Minimum Height
    - Padding
    - Margin
    - Border Radius
  - Design Tokens (list):
    - Token Name
    - Value
    - Description
- **Use Case**: Design system specifications

### 6. **Guidelines Block**
- **Purpose**: Do's and Don'ts for component usage
- **Fields**:
  - Section Title
  - Do's (list):
    - Text
    - Example (optional)
  - Don'ts (list):
    - Text
    - Example (optional)
- **Use Case**: Usage guidelines and best practices

### 7. **Callout Block**
- **Purpose**: Important notes, warnings, alerts
- **Fields**:
  - Callout Type (info, warning, error, success, note)
  - Title (optional)
  - Rich text content
- **Use Case**: Important notices, warnings, tips

## How to Use the Block System

### 1. **Access TinaCMS**
```
http://localhost:4001/admin/index.html
```

### 2. **Navigate to a Component Page**
- Go to "Documentation" → "Page" → Select a component (e.g., "Action")

### 3. **Edit Content Blocks**
- Click on any tab (Overview, Specs, Guidelines)
- You'll see a "Content Blocks" section
- Click "Add Item" to add a new block

### 4. **Choose Block Type**
- A visual selector will appear with all available block types
- Click on the block type you want to add
- The block will be added to your content

### 5. **Edit Block Content**
- Each block has its own editing interface
- Fill in the fields as needed
- Use the drag handles to reorder blocks
- Use the delete button to remove blocks

### 6. **Save Changes**
- Click "Save" to save your changes
- Changes will appear immediately on the frontend

## Frontend Rendering

### **Automatic Styling**
- All blocks render with proper ShadCN styling
- Responsive design built-in
- Dark mode support
- Consistent spacing and typography

### **Interactive Features**
- Copy-to-clipboard buttons on code examples
- Expandable/collapsible sections
- Smooth scrolling and animations
- Table of contents integration

### **Layout System**
- Blocks stack vertically with proper spacing
- Cards and containers for visual separation
- Grid layouts for specs and guidelines
- Responsive breakpoints

## Migration from Legacy Content

### **Backward Compatibility**
- Existing content still works (fallback rendering)
- No data loss during migration
- Gradual migration possible

### **Legacy Support**
- Rich-text content still renders properly
- Old template embeds still work
- Examples and properties still display

## Best Practices

### **Content Organization**
1. **Start with Rich Text**: Use for introductory content
2. **Add Figma Sync**: For component synchronization
3. **Include Examples**: Use Live Example blocks for code
4. **Document API**: Use Component API blocks for props
5. **Specify Design**: Use Design Specs for measurements
6. **Add Guidelines**: Use Guidelines blocks for do's/don'ts
7. **Use Callouts**: For important notes and warnings

### **Block Ordering**
1. Introduction (Rich Text)
2. Figma Sync (if applicable)
3. Live Examples
4. Component API
5. Design Specifications
6. Guidelines
7. Callouts (as needed)

### **Content Writing**
- Keep block titles descriptive but concise
- Use consistent terminology across blocks
- Include examples in code blocks
- Add descriptions to API properties
- Use callouts sparingly for important information

## Troubleshooting

### **Block Not Saving**
- Make sure all required fields are filled
- Check for validation errors (red text)
- Try refreshing the page and editing again

### **Content Not Appearing**
- Check that the block is enabled/visible
- Verify the content is saved in TinaCMS
- Clear browser cache and reload

### **Styling Issues**
- All styling is automatic - no custom CSS needed
- If something looks off, it might be a component issue
- Check the browser console for errors

## Technical Implementation

### **File Structure**
```
tina/templates/blocks.ts          # Block template definitions
src/components/tina/BlockRenderer.tsx  # Frontend rendering components
src/app/components/[slug]/ComponentTabs.tsx  # Integration with tabs
```

### **Data Structure**
Each tab now has a `blocks` field that contains an array of block objects:
```json
{
  "overview": {
    "blocks": [
      {
        "_template": "RichTextBlock",
        "title": "Introduction",
        "content": { ... }
      },
      {
        "_template": "FigmaSyncBlock",
        "title": "Sync with Figma",
        "description": "Keep this component in sync with Figma",
        "showInstructions": true
      }
    ]
  }
}
```

### **Adding New Block Types**
1. Define the template in `tina/templates/blocks.ts`
2. Create the React component in `src/components/tina/BlockRenderer.tsx`
3. Add the case to the BlockRenderer switch statement
4. Rebuild TinaCMS schema: `npm run tina:build`

## Next Steps

1. **Test the System**: Try creating content with different block types
2. **Migrate Existing Content**: Gradually move from rich-text to blocks
3. **Customize Blocks**: Add new block types as needed
4. **Train Content Editors**: Share this guide with your team

The block-based system provides a much more flexible and user-friendly content editing experience while maintaining all the functionality of the previous template system. 