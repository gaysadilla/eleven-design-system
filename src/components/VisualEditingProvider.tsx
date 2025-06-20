'use client';

import React from 'react';
import { useTina } from 'tinacms/dist/react';

interface VisualEditingProviderProps {
  children: React.ReactNode;
  query?: string;
  variables?: any;
  data?: any;
}

export default function VisualEditingProvider({ 
  children, 
  query,
  variables,
  data 
}: VisualEditingProviderProps) {
  // Use TinaCMS for visual editing if we have the required props
  const tinaProps = query && data ? useTina({
    query,
    variables,
    data,
  }) : { data };

  // Check if we're in editing mode (when accessed from TinaCMS)
  const isEditing = typeof window !== 'undefined' && 
    (window.location.search.includes('tina-edit') || 
     window.location.search.includes('edit=true') ||
     window.parent !== window); // iframe detection



  // Add TinaCMS editing styles and behavior
  React.useEffect(() => {
    if (isEditing && typeof window !== 'undefined') {
      // Add visual editing styles
      const style = document.createElement('style');
      style.textContent = `
        [data-tina-field] {
          position: relative;
          outline: 2px dashed transparent;
          transition: outline-color 0.2s ease;
        }
        
        [data-tina-field]:hover {
          outline-color: #3b82f6;
          cursor: pointer;
        }
        
        [data-tina-field]:focus-within {
          outline-color: #1d4ed8;
          outline-style: solid;
        }
        
        [data-tina-field]::before {
          content: "Click to edit";
          position: absolute;
          top: -24px;
          left: 0;
          background: #3b82f6;
          color: white;
          padding: 2px 8px;
          font-size: 12px;
          border-radius: 4px;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
          z-index: 10;
        }
        
        [data-tina-field]:hover::before {
          opacity: 1;
        }
        
        .tina-editing-mode {
          border: 2px dashed #3b82f6;
          border-radius: 8px;
          padding: 16px;
          margin: 8px 0;
          background: rgba(59, 130, 246, 0.05);
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [isEditing]);

  // Pass the Tina data to children
  if (React.isValidElement(children)) {
    return (
      <>
        {isEditing && (
          <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white px-4 py-2 text-sm">
            <div className="flex items-center justify-between">
              <span>🎨 Visual Editing Mode - Click on content to edit inline</span>
              <div className="flex items-center space-x-4">
                <span className="text-xs opacity-75">
                  Hover over content to see edit options
                </span>
                <a 
                  href={window.location.pathname}
                  className="bg-white text-blue-600 px-3 py-1 rounded text-xs hover:bg-gray-100"
                >
                  Exit Editing
                </a>
              </div>
            </div>
          </div>
        )}
        <div className={isEditing ? 'pt-12' : ''}>
          {React.cloneElement(children as React.ReactElement<any>, {
            data: tinaProps.data,
            isEditing,
            tinaProps: tinaProps
          })}
        </div>
      </>
    );
  }

  return <>{children}</>;
} 