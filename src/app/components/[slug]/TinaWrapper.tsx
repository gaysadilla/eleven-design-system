'use client';

import React from 'react';
import { useTina } from 'tinacms/dist/react';
import ComponentTabs from './ComponentTabs';

interface TinaWrapperProps {
  query: string;
  variables: any;
  data: any;
}

export default function TinaWrapper({ query, variables, data }: TinaWrapperProps) {
  // Use TinaCMS hook for visual editing
  const tina = useTina({
    query,
    variables,
    data,
  });

  // Render ComponentTabs with TinaCMS data
  return <ComponentTabs data={tina.data.page} />;
} 