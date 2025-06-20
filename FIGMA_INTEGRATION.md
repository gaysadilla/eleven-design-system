# Figma Integration Guide

This guide explains how to integrate your Figma design system with the Eleven documentation platform.

## Setup

### 1. Get Your Figma Personal Access Token

1. Go to your [Figma Account Settings](https://www.figma.com/settings)
2. Scroll down to "Personal access tokens"
3. Click "Create a new personal access token"
4. Give it a name like "Eleven Design System"
5. Copy the generated token

### 2. Configure Environment Variables

Add your Figma PAT to the `.env.local` file:

```bash
# Figma API Configuration
FIGMA_ACCESS_TOKEN=your_figma_personal_access_token_here
```

⚠️ **Important**: Never commit your `.env.local` file to version control. It's already added to `.gitignore`.

## Features

### 1. Component Sync API

The integration provides two main API endpoints:

#### POST `/api/figma/sync`
Sync a specific component from Figma to your documentation.

**Request Body:**
```json
{
  "figmaUrl": "https://www.figma.com/file/ABC123/Design-System?node-id=1%3A2",
  "componentName": "Button"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "Button",
    "description": "Primary button component",
    "figmaUrl": "https://www.figma.com/file/...",
    "imageUrl": "https://figma-alpha-api.s3.us-west-2.amazonaws.com/...",
    "properties": {}
  }
}
```

#### GET `/api/figma/sync?fileKey=ABC123`
Get all components and design tokens from a Figma file.

**Response:**
```json
{
  "success": true,
  "data": {
    "components": [...],
    "tokens": {
      "colors": {...},
      "typography": {...},
      "spacing": {...}
    }
  }
}
```

### 2. Figma Sync Component

The `FigmaSync` React component provides a user-friendly interface for syncing components:

```tsx
import FigmaSync from '@/components/FigmaSync';

<FigmaSync onSync={(data) => {
  // Handle synced component data
  console.log('Synced:', data);
}} />
```

## Usage Examples

### 1. Sync a Single Component

```javascript
// Using the API directly
const response = await fetch('/api/figma/sync', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    figmaUrl: 'https://www.figma.com/file/ABC123/Design-System?node-id=1%3A2',
    componentName: 'Button'
  })
});

const data = await response.json();
console.log('Component data:', data.data);
```

### 2. Get All Components from a File

```javascript
const fileKey = 'ABC123'; // Extract from Figma URL
const response = await fetch(`/api/figma/sync?fileKey=${fileKey}`);
const data = await response.json();

console.log('All components:', data.data.components);
console.log('Design tokens:', data.data.tokens);
```

### 3. Using Utility Functions

```typescript
import { FigmaAPI, syncFigmaComponent } from '@/lib/figma';

// Initialize Figma API
const figma = new FigmaAPI();

// Extract file key from URL
const fileKey = FigmaAPI.extractFileKey('https://www.figma.com/file/ABC123/...');

// Extract node ID from URL
const nodeId = FigmaAPI.extractNodeId('https://www.figma.com/file/ABC123/...?node-id=1%3A2');

// Get file data
const fileData = await figma.getFile(fileKey);

// Get component metadata
const components = await figma.getComponentMetadata(fileKey);

// Get design tokens
const tokens = await figma.getDesignTokens(fileKey);

// Sync specific component
const componentData = await syncFigmaComponent(figmaUrl, 'Button');
```

## URL Formats

The integration supports various Figma URL formats:

### File URLs
```
https://www.figma.com/file/ABC123/Design-System
https://www.figma.com/design/ABC123/Design-System
```

### Component URLs (with node-id)
```
https://www.figma.com/file/ABC123/Design-System?node-id=1%3A2
https://www.figma.com/design/ABC123/Design-System?node-id=1%3A2&mode=dev
```

## Error Handling

Common errors and solutions:

### "Figma access token is required"
- Ensure `FIGMA_ACCESS_TOKEN` is set in `.env.local`
- Verify the token is valid and hasn't expired

### "Invalid Figma URL: Could not extract file key"
- Check that the URL follows the correct Figma format
- Ensure the file key (the string after `/file/`) is present

### "Component not found in Figma file"
- Verify the component name matches exactly (case-sensitive)
- Ensure the component exists in the specified file
- Try using the component's exact name from Figma

### "403 Forbidden"
- Check that your Figma token has access to the file
- Ensure the file is not private or you have proper permissions

## Integration with TinaCMS

The Figma integration is designed to work seamlessly with TinaCMS:

1. **Component Pages**: Use the sync data to populate component documentation
2. **Design Tokens**: Import colors, typography, and spacing from Figma
3. **Images**: Automatically fetch component previews
4. **Metadata**: Sync descriptions and properties

### Example TinaCMS Integration

```typescript
// In your TinaCMS form configuration
{
  type: 'object',
  name: 'figmaData',
  label: 'Figma Integration',
  fields: [
    {
      type: 'string',
      name: 'figmaUrl',
      label: 'Figma URL'
    },
    {
      type: 'string',
      name: 'componentName',
      label: 'Component Name'
    }
  ],
  ui: {
    component: FigmaSync
  }
}
```

## Best Practices

1. **Naming Convention**: Use consistent component names between Figma and your documentation
2. **Access Control**: Use a dedicated service account token for production
3. **Caching**: Consider caching Figma data to reduce API calls
4. **Error Handling**: Always handle API errors gracefully
5. **Rate Limiting**: Be mindful of Figma's API rate limits

## Troubleshooting

### Check Your Configuration

```bash
# Verify environment variables are loaded
echo $FIGMA_ACCESS_TOKEN
```

### Test API Connection

```javascript
// Test basic API connectivity
const response = await fetch('/api/figma/sync?fileKey=test');
console.log(response.status); // Should not be 500 if token is valid
```

### Enable Debug Logging

Add logging to track API calls:

```javascript
// In your API route
console.log('Figma API request:', { fileKey, nodeId });
```

## API Reference

For detailed API documentation, see the [Figma REST API docs](https://www.figma.com/developers/api).

Key endpoints used:
- `GET /v1/files/:key` - Get file data
- `GET /v1/images/:key` - Get component images 