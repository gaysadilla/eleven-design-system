'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TOCItem {
  id: string;
  text: string;
  level: number;
  children: TOCItem[];
}

interface TableOfContentsProps {
  content: any; // Rich text content from TinaCMS
  config?: {
    enabled?: boolean;
    maxDepth?: number;
    minDepth?: number;
    sticky?: boolean;
  };
  className?: string;
}

// Extract headings from rich text content
function extractHeadings(content: any, minDepth = 2, maxDepth = 4): TOCItem[] {
  if (!content || !content.children) return [];

  const headings: TOCItem[] = [];
  const stack: TOCItem[] = [];

  function processNode(node: any) {
    if (node.type && node.type.match(/^h[2-6]$/)) {
      const level = parseInt(node.type.substring(1));
      
      if (level >= minDepth && level <= maxDepth) {
        const text = node.children?.[0]?.text || '';
        const id = text.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim();

        const tocItem: TOCItem = {
          id,
          text,
          level,
          children: []
        };

        // Find the correct parent based on heading hierarchy
        while (stack.length > 0 && stack[stack.length - 1].level >= level) {
          stack.pop();
        }

        if (stack.length === 0) {
          headings.push(tocItem);
        } else {
          stack[stack.length - 1].children.push(tocItem);
        }

        stack.push(tocItem);
      }
    }

    // Recursively process children
    if (node.children) {
      node.children.forEach(processNode);
    }
  }

  content.children.forEach(processNode);
  return headings;
}

// Hook for scroll spy functionality
function useActiveSection(headings: TOCItem[]) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0
      }
    );

    // Collect all heading IDs
    const collectIds = (items: TOCItem[]): string[] => {
      return items.reduce((acc, item) => {
        acc.push(item.id);
        acc.push(...collectIds(item.children));
        return acc;
      }, [] as string[]);
    };

    const headingIds = collectIds(headings);
    
    // Observe all headings
    headingIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  return activeId;
}

// TOC Item Component
function TOCItemComponent({ 
  item, 
  activeId, 
  onItemClick, 
  level = 0 
}: { 
  item: TOCItem; 
  activeId: string; 
  onItemClick: () => void;
  level?: number;
}) {
  const isActive = activeId === item.id;
  const hasChildren = item.children.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(item.id);
    if (element) {
      const headerOffset = 80; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    onItemClick();
  };

  return (
    <li className="relative">
      <a
        href={`#${item.id}`}
        onClick={handleClick}
        className={`block py-1.5 text-sm transition-colors duration-200 hover:text-foreground ${
          isActive 
            ? 'text-primary font-medium border-l-2 border-primary bg-primary/5 pl-3' 
            : 'text-muted-foreground hover:text-foreground pl-3'
        } ${level > 0 ? `ml-${level * 4}` : ''}`}
        style={{ paddingLeft: `${0.75 + (level * 0.75)}rem` }}
      >
        {item.text}
      </a>
      {hasChildren && (
        <ul className="mt-1 space-y-1">
          {item.children.map((child) => (
            <TOCItemComponent
              key={child.id}
              item={child}
              activeId={activeId}
              onItemClick={onItemClick}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// Mobile FAB Component
function MobileTOCFAB({ 
  headings, 
  activeId 
}: { 
  headings: TOCItem[]; 
  activeId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = () => {
    setIsOpen(false);
  };

  if (headings.length === 0) return null;

  return (
    <>
      {/* FAB Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg md:hidden"
        size="icon"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile TOC Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          
          {/* TOC Panel */}
          <div className="fixed top-20 right-4 bottom-4 z-50 w-80 max-w-[calc(100vw-2rem)] bg-background border border-border rounded-lg shadow-xl md:hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Contents</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[calc(100%-4rem)]">
              <nav>
                <ul className="space-y-1">
                  {headings.map((item) => (
                    <TOCItemComponent
                      key={item.id}
                      item={item}
                      activeId={activeId}
                      onItemClick={handleItemClick}
                    />
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// Main TableOfContents Component
export default function TableOfContents({ 
  content, 
  config = {}, 
  className = '' 
}: TableOfContentsProps) {
  const {
    enabled = true,
    maxDepth = 4,
    minDepth = 2,
    sticky = true
  } = config;

  const headings = extractHeadings(content, minDepth, maxDepth);
  const activeId = useActiveSection(headings);

  if (!enabled || headings.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop TOC - Right Sidebar */}
      <aside 
        className={`hidden md:block w-64 ${sticky ? 'sticky top-24' : ''} ${className}`}
        style={{ maxHeight: sticky ? 'calc(100vh - 7rem)' : 'auto' }}
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-border">
            <Menu className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-sm text-foreground uppercase tracking-wide">
              Contents
            </h3>
          </div>
          
          <nav className="overflow-y-auto">
            <ul className="space-y-1">
              {headings.map((item) => (
                <TOCItemComponent
                  key={item.id}
                  item={item}
                  activeId={activeId}
                  onItemClick={() => {}}
                />
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile FAB */}
      <MobileTOCFAB headings={headings} activeId={activeId} />
    </>
  );
} 