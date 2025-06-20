'use client';

import React from 'react';
import { useTina } from 'tinacms/dist/react';

interface TinaWrapperProps {
  query: string;
  variables: any;
  data: any;
  pageData: any;
}

export default function TinaWrapper({ query, variables, data, pageData }: TinaWrapperProps) {
  // Use TinaCMS hook for visual editing
  const tina = useTina({
    query,
    variables,
    data,
  });

  // Simple debug display instead of render props
  return (
    <div className="bg-green-50 p-4 rounded">
      <p>✅ TinaWrapper is working!</p>
      <p><strong>Data title:</strong> {tina.data.page?.title}</p>
      <p><strong>Tina enabled:</strong> {tina.isClient ? 'Yes (Client)' : 'No (Server)'}</p>
      <p><strong>Original title:</strong> {pageData?.title}</p>
    </div>
  );
} 