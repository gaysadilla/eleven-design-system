'use client';

import React, { ReactNode } from 'react';
import { useTina } from 'tinacms/dist/react';

interface TinaWrapperProps {
  children: (data: any) => ReactNode;
  query: string;
  variables: any;
  data: any;
}

export default function TinaWrapper({ children, query, variables, data }: TinaWrapperProps) {
  // Use TinaCMS hook for visual editing
  const tina = useTina({
    query,
    variables,
    data,
  });

  // Call children as render prop with TinaCMS data
  return <>{children(tina.data.page)}</>;
} 