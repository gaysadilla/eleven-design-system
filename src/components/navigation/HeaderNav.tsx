'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Section {
  title: string;
  slug: string;
  enabled: boolean;
}

// For now using static data, later we'll fetch from TinaCMS
const sections: Section[] = [
  { title: 'Foundations', slug: 'foundations', enabled: true },
  { title: 'Components', slug: 'components', enabled: true },
  { title: 'Patterns', slug: 'patterns', enabled: true },
  { title: 'Development', slug: 'development', enabled: true },
];

export default function HeaderNav() {
  const [activeSection, setActiveSection] = useState('components');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
          {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <span className="ml-3 text-xl font-semibold text-foreground">
                Eleven
              </span>
            </Link>

          {/* Navigation Tabs */}
            <nav className="hidden md:flex">
            {sections
              .filter(section => section.enabled)
              .map((section) => (
                <Link
                  key={section.slug}
                  href={`/${section.slug}`}
                    className={`px-4 py-4 text-sm font-medium transition-colors relative ${
                    activeSection === section.slug
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setActiveSection(section.slug)}
                >
                  {section.title}
                    {/* Active state border */}
                    {activeSection === section.slug && (
                      <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary" />
                    )}
                </Link>
              ))}
          </nav>
          </div>

          {/* Right Side - Search */}
          <div className="flex items-center">
            {/* Collapsible Search */}
            <div className="relative">
              {!isSearchOpen ? (
                /* Search Icon Button */
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2"
                >
                  <Search className="h-4 w-4" />
                </Button>
              ) : (
                /* Expanded Search Input */
                <div className="flex items-center animate-in slide-in-from-right-2 duration-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Search components..."
                      className="pl-10 w-64 focus:w-80 transition-all duration-200"
                      autoFocus
                      onBlur={() => setIsSearchOpen(false)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 ml-2"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 