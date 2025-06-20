'use client';

// TinaCMS visual editing is handled by the useTina hook on individual pages
// This component is kept for potential future use but currently just passes children through
export default function TinaProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
} 