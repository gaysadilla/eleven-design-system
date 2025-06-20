import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Semantic color mappings for different UI states and contexts
 * These functions help maintain consistency when applying colors semantically
 */
export const themeColors = {
  // Status colors using only ShadCN theme variables
  success: {
    background: 'bg-accent',
    border: 'border-border',
    text: 'text-accent-foreground',
    strong: 'text-foreground'
  },
  warning: {
    background: 'bg-muted',
    border: 'border-border',
    text: 'text-muted-foreground',
    strong: 'text-foreground'
  },
  error: {
    background: 'bg-destructive/10',
    border: 'border-destructive/20',
    text: 'text-destructive',
    strong: 'text-destructive'
  },
  info: {
    background: 'bg-accent',
    border: 'border-border',
    text: 'text-accent-foreground',
    strong: 'text-foreground'
  },
  
  // Component-specific semantic colors
  code: {
    background: 'bg-muted',
    text: 'text-muted-foreground',
    inline: 'bg-muted px-1.5 py-0.5 rounded text-sm font-mono'
  },
  
  // Navigation states
  navigation: {
    active: 'bg-accent text-accent-foreground',
    hover: 'hover:bg-accent/50 hover:text-foreground',
    inactive: 'text-muted-foreground'
  }
} as const;

/**
 * Helper function to get status color classes
 */
export function getStatusColors(status: 'success' | 'warning' | 'error' | 'info') {
  return themeColors[status];
}

/**
 * Typography scale using ShadCN theme
 */
export const typography = {
  h1: 'text-4xl font-bold text-foreground',
  h2: 'text-3xl font-semibold text-foreground',
  h3: 'text-2xl font-semibold text-foreground',
  h4: 'text-xl font-semibold text-foreground',
  h5: 'text-lg font-semibold text-foreground',
  h6: 'text-base font-semibold text-foreground',
  body: 'text-base text-foreground',
  small: 'text-sm text-muted-foreground',
  muted: 'text-muted-foreground',
  lead: 'text-lg text-muted-foreground'
} as const; 