# How to Access Visual Editing in TinaCloud

## The Key Issue

You're currently in the **Form Editor** (what you see in your screenshot). Visual editing is a different interface that shows your site with a sidebar.

## How to Access Visual Editing

### Method 1: Look for Preview/Visual Button
In your TinaCloud admin, when viewing a page:
1. Look for a **"Preview"** or **"Visual Editor"** button
2. It might be in the top-right corner
3. Or as a toggle between "Form" and "Visual" modes

### Method 2: Direct Visual Editor URL
The visual editor might be at a different URL pattern:
```
https://app.tina.io/projects/[PROJECT_ID]/visual/[COLLECTION]/[DOCUMENT]
```

### Method 3: Click the Preview Icon
In your collection list:
1. Instead of clicking the page title
2. Look for an **eye icon** or **preview icon** next to each page
3. Click that instead

### Method 4: Enable Visual Editing Mode
1. In TinaCloud, go to your project settings
2. Look for **"Editor Settings"** or **"Preview Settings"**
3. Ensure **"Visual Editing"** is enabled
4. Set **"Default Editor"** to "Visual" instead of "Form"

## What Visual Editing Should Look Like

When properly accessed, you should see:
- Your website on the left (or center)
- TinaCMS sidebar on the right
- Clickable blue outlines on editable content
- Real-time preview as you type

## If Visual Editing is Not Available

Check these settings in TinaCloud:
1. **Project Settings** → **Preview**
2. Ensure your Site URL is set (you have this ✓)
3. Look for any "Enable Visual Editing" toggle
4. Check if there's a "Preview Mode" setting

## Alternative Access Methods

Try these URLs directly:
1. `https://app.tina.io/[YOUR-ORG]/eleven-design-system/preview`
2. `https://app.tina.io/[YOUR-ORG]/eleven-design-system/visual`
3. Look for a "Open in Editor" button when viewing your site

## Quick Test

1. Go to your deployed site: https://eleven-design-system.vercel.app
2. Add `?tina=true` to any page URL
3. See if the TinaCMS interface appears 