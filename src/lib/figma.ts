/**
 * Figma API utilities for fetching design system data
 */

import fs from 'fs';
import path from 'path';

// Figma API types
export interface FigmaFile {
  document: FigmaNode;
  components: Record<string, FigmaComponent>;
  componentSets: Record<string, FigmaComponentSet>;
  schemaVersion: number;
  styles: Record<string, FigmaStyle>;
}

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  componentPropertyDefinitions?: Record<string, FigmaComponentProperty>;
  styles?: Record<string, string>;
}

export interface FigmaComponent {
  key: string;
  name: string;
  description: string;
  componentSetId?: string;
  documentationLinks: FigmaDocumentationLink[];
}

export interface FigmaComponentSet {
  key: string;
  name: string;
  description: string;
  documentationLinks: FigmaDocumentationLink[];
}

export interface FigmaStyle {
  key: string;
  name: string;
  description: string;
  styleType: 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
}

export interface FigmaComponentProperty {
  type: 'BOOLEAN' | 'INSTANCE_SWAP' | 'TEXT' | 'VARIANT';
  defaultValue: any;
  variantOptions?: string[];
}

export interface FigmaDocumentationLink {
  uri: string;
}

export interface FigmaFileImages {
  images: Record<string, string>;
}

// API functions
export class FigmaAPI {
  private baseUrl = 'https://api.figma.com/v1';
  private accessToken: string;

  constructor(accessToken?: string) {
    this.accessToken = accessToken || process.env.FIGMA_ACCESS_TOKEN || '';
    if (!this.accessToken) {
      console.warn('Figma access token not found. Please set FIGMA_ACCESS_TOKEN in your environment variables.');
      // Don't throw error in constructor, let individual methods handle it
    }
  }

  private async request<T>(endpoint: string): Promise<T> {
    if (!this.accessToken) {
      throw new Error('Figma access token is required. Please set FIGMA_ACCESS_TOKEN in your .env.local file. Get your token from https://www.figma.com/developers/api#access-tokens');
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'X-Figma-Token': this.accessToken,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid Figma access token. Please check your FIGMA_ACCESS_TOKEN in .env.local');
      } else if (response.status === 403) {
        throw new Error('Access denied. Please ensure your Figma token has the correct permissions');
      } else if (response.status === 404) {
        throw new Error('Figma file not found. Please check the file URL and ensure it\'s accessible');
      }
      throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get file data including components and styles
   */
  async getFile(fileKey: string): Promise<FigmaFile> {
    return this.request<FigmaFile>(`/files/${fileKey}`);
  }

  /**
   * Get component images as PNG exports
   */
  async getImages(fileKey: string, nodeIds: string[], scale = 2): Promise<FigmaFileImages> {
    const nodeIdsParam = nodeIds.join(',');
    return this.request<FigmaFileImages>(
      `/images/${fileKey}?ids=${nodeIdsParam}&format=png&scale=${scale}`
    );
  }

  /**
   * Extract design tokens from Figma styles
   */
  async getDesignTokens(fileKey: string): Promise<{
    colors: Record<string, string>;
    typography: Record<string, any>;
    spacing: Record<string, string>;
  }> {
    const file = await this.getFile(fileKey);
    
    const tokens = {
      colors: {} as Record<string, string>,
      typography: {} as Record<string, any>,
      spacing: {} as Record<string, string>,
    };

    // Process styles to extract design tokens
    Object.values(file.styles || {}).forEach(style => {
      const name = style.name.toLowerCase().replace(/\s+/g, '-');
      
      switch (style.styleType) {
        case 'FILL':
          // Extract color tokens
          tokens.colors[name] = style.description || '#000000';
          break;
        case 'TEXT':
          // Extract typography tokens
          tokens.typography[name] = {
            description: style.description,
            // Additional typography properties would be extracted from the actual style data
          };
          break;
      }
    });

    return tokens;
  }

  /**
   * Get component metadata for design system documentation
   */
  async getComponentMetadata(fileKey: string): Promise<Array<{
    id: string;
    name: string;
    description: string;
    type: 'component' | 'component-set';
    properties?: Record<string, FigmaComponentProperty>;
    documentationLinks: string[];
  }>> {
    const file = await this.getFile(fileKey);
    const metadata: Array<{
      id: string;
      name: string;
      description: string;
      type: 'component' | 'component-set';
      properties?: Record<string, FigmaComponentProperty>;
      documentationLinks: string[];
    }> = [];

    // Process components
    Object.entries(file.components || {}).forEach(([key, component]) => {
      metadata.push({
        id: key,
        name: component.name,
        description: component.description,
        type: 'component' as const,
        documentationLinks: component.documentationLinks.map(link => link.uri),
      });
    });

    // Process component sets (variants)
    Object.entries(file.componentSets || {}).forEach(([key, componentSet]) => {
      metadata.push({
        id: key,
        name: componentSet.name,
        description: componentSet.description,
        type: 'component-set' as const,
        documentationLinks: componentSet.documentationLinks.map(link => link.uri),
      });
    });

    return metadata;
  }

  /**
   * Helper to extract file key from Figma URL
   */
  static extractFileKey(figmaUrl: string): string | null {
    // Support both old /file/ and new /design/ URL formats
    const match = figmaUrl.match(/\/(file|design)\/([a-zA-Z0-9]+)/);
    return match ? match[2] : null;
  }

  /**
   * Helper to extract node ID from Figma URL
   */
  static extractNodeId(figmaUrl: string): string | null {
    const match = figmaUrl.match(/node-id=([^&]+)/);
    if (!match) return null;
    
    // Decode URL encoding and handle different formats
    let nodeId = decodeURIComponent(match[1]);
    
    // Convert %3A to : if present
    nodeId = nodeId.replace(/%3A/g, ':');
    
    // Figma node IDs are typically in format like "123:456" but URLs might have "123-456"
    // Keep the original format from URL for now, we'll try both formats in the sync function
    return nodeId;
  }
}

// Utility functions for TinaCMS integration
export async function syncFigmaComponent(figmaUrl: string, componentName: string, bustCache: boolean = false): Promise<{
  name: string;
  description: string;
  figmaUrl: string;
  imageUrl?: string;
  properties?: Record<string, any>;
}> {
  const figma = new FigmaAPI();
  const fileKey = FigmaAPI.extractFileKey(figmaUrl);
  const nodeId = FigmaAPI.extractNodeId(figmaUrl);

  if (!fileKey) {
    throw new Error('Invalid Figma URL: Could not extract file key');
  }

  // Check cache first (unless cache busting is requested)
  const cacheKey = getCacheKey(figmaUrl);
  const cachedImageUrl = getCachedImageUrl(cacheKey, bustCache);
  
  if (cachedImageUrl) {
    // Return cached result immediately
    const displayName = componentName && componentName !== 'Component' ? componentName : 'Figma Asset';
    return {
      name: displayName,
      description: '',
      figmaUrl,
      imageUrl: cachedImageUrl,
      properties: {
        nodeId: nodeId,
        type: nodeId ? 'frame' : 'component',
        cached: true
      },
    };
  }

  const file = await figma.getFile(fileKey);
  
  console.log('Node ID from URL:', nodeId);
  
  // For frames/groups, we'll use the node ID directly for image generation
  // and create a descriptive name based on the component name or a default
  let displayName = componentName && componentName !== 'Component' ? componentName : 'Figma Asset';
  let description = '';
  let actualNodeId = nodeId;

  // If we have a node ID (which should be the case for frames/groups)
  if (nodeId) {
    console.log(`Using node ID for frame/group: ${nodeId}`);
    actualNodeId = nodeId;
    
    // Try to get a more descriptive name if one wasn't provided
    if (!componentName || componentName === 'Component') {
      // Look for any component in the file to get context about what this might be
      const availableComponents = Object.values(file.components || {});
      if (availableComponents.length > 0) {
        // Use the first component name as context, but make it clear it's a design example
        const firstComponent = availableComponents[0];
        displayName = `${firstComponent.name} - Design Example`;
        description = `Design example or showcase frame containing ${firstComponent.name} and related elements`;
        console.log(`Generated display name: ${displayName}`);
      } else {
        displayName = 'Design Example';
        description = 'Design example or showcase frame from Figma';
      }
    }
  } else {
    // Fallback: if no node ID, try to find a component (old behavior)
    console.log('No node ID found, falling back to component search');
    let componentData: FigmaComponent | null = null;
    
    if (componentName && componentName !== 'Component') {
      componentData = Object.values(file.components || {}).find(
        comp => comp.name.toLowerCase().includes(componentName.toLowerCase())
      ) || null;
    }

    if (!componentData) {
      const availableComponents = Object.values(file.components || {});
      if (availableComponents.length > 0) {
        componentData = availableComponents[0];
        console.log(`Using first available component: ${componentData.name}`);
      }
    }

    if (componentData) {
      displayName = componentData.name;
      description = componentData.description || '';
      actualNodeId = componentData.key;
    } else {
      throw new Error('No node ID provided and no components found in Figma file');
    }
  }

  // Get image for the frame/group/component
  let imageUrl;
  if (actualNodeId) {
    // Try multiple node ID formats for image generation
    const nodeIdFormats = [
      actualNodeId, // Original format (e.g., "235-123442")
      actualNodeId.replace(/-/g, ':'), // Convert dashes to colons (e.g., "235:123442")
      actualNodeId.replace(/:/g, '-'), // Convert colons to dashes (e.g., "235-123442")
    ];

    console.log(`Attempting to get image for node ID formats:`, nodeIdFormats);

    for (const nodeIdFormat of nodeIdFormats) {
      try {
        console.log(`Trying node ID format: ${nodeIdFormat}`);
        const images = await figma.getImages(fileKey, [nodeIdFormat], 2);
        console.log(`Raw images response:`, images);
        
        if (images.images && images.images[nodeIdFormat]) {
          imageUrl = images.images[nodeIdFormat];
          console.log(`✅ Success! Image URL found:`, imageUrl);
          break;
        } else {
          console.log(`❌ No image found for format: ${nodeIdFormat}`);
          console.log(`Available keys in response:`, Object.keys(images.images || {}));
        }
      } catch (error) {
        console.warn(`❌ Failed to fetch image with format ${nodeIdFormat}:`, error);
        
        // Log more details about the error
        if (error instanceof Error) {
          console.warn(`Error details: ${error.message}`);
        }
      }
    }

         // If still no image URL found, log helpful debugging info
     if (!imageUrl) {
       console.warn(`⚠️  No image URL found for any format. This could be due to:`);
       console.warn(`   1. Node is not accessible/public`);
       console.warn(`   2. Node ID format is incorrect`);
       console.warn(`   3. Figma API permissions issue`);
       console.warn(`   4. Node doesn't exist in the file`);
     } else {
       // Cache the successful result
       setCachedImageUrl(cacheKey, imageUrl);
     }
   }

  return {
    name: displayName,
    description: description,
    figmaUrl,
    imageUrl,
    properties: {
      nodeId: actualNodeId,
      type: nodeId ? 'frame' : 'component',
      cached: false
    },
  };
}

// Cache configuration
const CACHE_DIR = path.join(process.cwd(), '.figma-cache');
const DEFAULT_CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds (more reasonable default)

// Ensure cache directory exists
function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

// Generate cache key from Figma URL
function getCacheKey(figmaUrl: string): string {
  const fileKey = FigmaAPI.extractFileKey(figmaUrl);
  const nodeId = FigmaAPI.extractNodeId(figmaUrl);
  return `${fileKey}_${nodeId}`.replace(/[^a-zA-Z0-9_-]/g, '_');
}

// Get cached image URL with optional cache busting
function getCachedImageUrl(cacheKey: string, bustCache: boolean = false): string | null {
  try {
    ensureCacheDir();
    const cacheFile = path.join(CACHE_DIR, `${cacheKey}.json`);
    
    if (bustCache && fs.existsSync(cacheFile)) {
      console.log(`🗑️  Cache busted for ${cacheKey}`);
      fs.unlinkSync(cacheFile);
      return null;
    }
    
    if (!fs.existsSync(cacheFile)) {
      return null;
    }
    
    const cacheData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    const now = Date.now();
    const cacheAge = now - cacheData.timestamp;
    const cacheAgeDays = Math.round(cacheAge / (24 * 60 * 60 * 1000));
    
    // Check if cache is still valid
    if (cacheAge < DEFAULT_CACHE_DURATION) {
      console.log(`✅ Cache hit for ${cacheKey} (${cacheAgeDays} days old)`);
      return cacheData.imageUrl;
    } else {
      console.log(`⏰ Cache expired for ${cacheKey} (${cacheAgeDays} days old)`);
      // Clean up expired cache
      fs.unlinkSync(cacheFile);
      return null;
    }
  } catch (error) {
    console.warn(`❌ Cache read error for ${cacheKey}:`, error);
    return null;
  }
}

// Save image URL to cache with metadata
function setCachedImageUrl(cacheKey: string, imageUrl: string): void {
  try {
    ensureCacheDir();
    const cacheFile = path.join(CACHE_DIR, `${cacheKey}.json`);
    const cacheData = {
      imageUrl,
      timestamp: Date.now(),
      created: new Date().toISOString(),
    };
    
    fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2));
    console.log(`💾 Cached image URL for ${cacheKey}`);
  } catch (error) {
    console.warn(`❌ Cache write error for ${cacheKey}:`, error);
  }
}

// Utility function to clear all cache (useful for development)
export function clearFigmaCache(): void {
  try {
    ensureCacheDir();
    const files = fs.readdirSync(CACHE_DIR);
    let cleared = 0;
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        fs.unlinkSync(path.join(CACHE_DIR, file));
        cleared++;
      }
    }
    
    console.log(`🗑️  Cleared ${cleared} cache files`);
  } catch (error) {
    console.warn('❌ Error clearing cache:', error);
  }
}

// Utility function to get cache stats
export function getFigmaCacheStats(): { files: number; totalSize: number; oldestFile: string | null } {
  try {
    ensureCacheDir();
    const files = fs.readdirSync(CACHE_DIR).filter(f => f.endsWith('.json'));
    let totalSize = 0;
    let oldestTimestamp = Infinity;
    let oldestFile = null;
    
    for (const file of files) {
      const filePath = path.join(CACHE_DIR, file);
      const stats = fs.statSync(filePath);
      totalSize += stats.size;
      
      try {
        const cacheData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (cacheData.timestamp < oldestTimestamp) {
          oldestTimestamp = cacheData.timestamp;
          oldestFile = file;
        }
      } catch (e) {
        // Skip invalid cache files
      }
    }
    
    return {
      files: files.length,
      totalSize,
      oldestFile
    };
  } catch (error) {
    return { files: 0, totalSize: 0, oldestFile: null };
  }
} 