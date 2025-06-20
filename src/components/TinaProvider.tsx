'use client';

import { useTina } from 'tinacms/dist/react';

// Simple TinaCMS provider for enabling live preview
export default function TinaProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
} 