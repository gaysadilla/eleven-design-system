# Content Format Guide

## Overview

This document explains the content format used in the Eleven Design System Documentation and the fixes implemented to ensure proper content rendering.

## The Problem

Initially, the TinaCMS rich-text content was not displaying on the frontend due to format inconsistencies between:

1. **Legacy Format**: Plain markdown strings
2. **Incorrect Rich-Text Format**: Using `type: "root"` instead of `type: "doc"`
3. **Correct TinaCMS Format**: Using `type: "doc"` with proper node structure

## The Solution

### 1. Updated Component Rendering

The `renderRichContent` function in `ComponentTabs.tsx` now handles both legacy and current formats:

- **String content**: Renders as plain text with basic markdown parsing
- **Rich-text content**: Renders proper TinaCMS structured content with `type: "doc"`

### 2. Content Conversion

All existing documentation pages were converted to use the proper TinaCMS format:

- ✅ **Before**: `type: "root"` → **After**: `type: "doc"`
- ✅ **Before**: `{type: "text", text: "content"}` → **After**: `{text: "content"}`
- ✅ Added `tableOfContents` configuration to all pages

### 3. New Page Template

TinaCMS now creates new pages with the correct format by default:

```javascript
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
        type: "doc", // ← Correct format
        children: [
          {
            type: "p",
            children: [
              { text: "Add your component description here." }
            ]
          }
        ]
      }
    }
  }
}
```

## Content Structure

### Rich-Text Format

All rich-text content should follow this structure:

```yaml
content:
  type: "doc"
  children:
    - type: "p"
      children:
        - text: "Paragraph content"
    - type: "h2" 
      children:
        - text: "Heading content"
    - type: "ul"
      children:
        - type: "li"
          children:
            - text: "List item content"
```

### Table of Contents

All pages now include TOC configuration:

```yaml
tableOfContents:
  enabled: true      # Show/hide TOC
  maxDepth: 4       # Maximum heading level (H4)
  minDepth: 2       # Minimum heading level (H2)
  sticky: true      # Sticky positioning
```

## Features Added

### ✅ Responsive Table of Contents
- **Desktop**: Right sidebar with sticky positioning
- **Mobile**: Floating Action Button (FAB) that expands to overlay
- **Active Section Highlighting**: Current section highlighted
- **Smooth Scrolling**: Animated navigation to sections

### ✅ Hierarchical Structure
- **H2**: Main categories (no indentation)
- **H3**: Nested under H2 (0.75rem indent)  
- **H4**: Nested under H3 (1.5rem indent)

### ✅ Backward Compatibility
- Handles both old and new content formats
- Graceful fallback for missing content
- Preserves existing functionality

## Issues Resolved

### ✅ **Issue 1: TinaCMS Editor Showing Empty Content**
- **Problem**: Content displayed on frontend but TinaCMS editor showed empty fields
- **Cause**: YAML folded scalar syntax (`>-`) that TinaCMS couldn't parse
- **Solution**: Converted to single-line text format that TinaCMS can edit

### ✅ **Issue 2: Duplicate Content**
- **Problem**: Same description appearing in page header AND overview content
- **Cause**: Overview content repeating the page description
- **Solution**: Made overview content unique and complementary to description

### ✅ **Issue 3: Content Not Rendering**
- **Problem**: Rich-text content not appearing on frontend
- **Cause**: Format mismatch between stored data and component expectations
- **Solution**: Enhanced renderRichContent to handle multiple formats

## Result

🎉 **All issues resolved - documentation system fully functional!**

- ✅ Content appears correctly in all tabs (Overview, Specs, Guidelines, Code)
- ✅ TinaCMS editor can now edit content properly (no more empty fields)
- ✅ No duplicate content between description and overview
- ✅ Table of Contents generates automatically from headings
- ✅ New pages created in TinaCMS use the correct format
- ✅ Backward compatibility maintained for existing content

## Future Considerations

- New content created in TinaCMS will automatically use the correct format
- The rendering function supports both formats for maximum compatibility
- Table of Contents is enabled by default but can be disabled per page 