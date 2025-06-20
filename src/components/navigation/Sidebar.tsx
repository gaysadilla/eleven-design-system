'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, Layout, Code, Archive, Palette, Grid, MonitorSpeaker, Menu, X } from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  status?: string;
  componentGroup?: string;
}

interface Category {
  title: string;
  slug: string;
  items: NavItem[];
  isExpandable?: boolean;
  componentGroup?: string;
}

interface ComponentGroup {
  title: string;
  slug: string;
  description: string;
  order: number;
  categories: Category[];
  individualComponents: NavItem[];
}

interface SidebarProps {
  section: string;
}

// Icon mapping for component groups
const getGroupIcon = (slug: string) => {
  switch (slug) {
    case 'deprecated-components':
      return Archive;
    case 'engineering-components':
      return Code;
    case 'components':
    default:
      return Layout;
  }
};

// Section icons
const getSectionIcon = (section: string) => {
  switch (section) {
    case 'foundations':
      return Palette;
    case 'components':
      return Layout;
    case 'patterns':
      return Grid;
    case 'development':
      return MonitorSpeaker;
    default:
      return Layout;
  }
};

export default function Sidebar({ section }: SidebarProps) {
  const pathname = usePathname();
  const [componentGroups, setComponentGroups] = useState<ComponentGroup[]>([]);
  const [sectionPages, setSectionPages] = useState<NavItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'actions': true, // Default expanded
  });
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    'components': true, // Default expanded
  });

  useEffect(() => {
    if (section === 'components') {
      fetchComponentData();
    } else {
      fetchSectionData();
    }
  }, [section]);

  const fetchComponentData = async () => {
    try {
      setLoading(true);
      
      // Fetch component groups
      const groupsResponse = await fetch('/api/content/component-groups');
      const groups = await groupsResponse.json();
      
      // Fetch categories
      const categoriesResponse = await fetch('/api/content/categories');
      const categories = await categoriesResponse.json();
      
      // Fetch pages
      const pagesResponse = await fetch('/api/content/pages');
      const pages = await pagesResponse.json();

      // Build component groups structure
      const groupsData = groups.map((group: any) => {
        const groupCategories = categories
          .filter((cat: any) => cat.componentGroup && cat.componentGroup === `content/component-groups/${group.slug}.json`)
          .map((cat: any) => {
            const categoryPages = pages
              .filter((page: any) => 
                page.category && page.category.includes(cat.slug) &&
                page.componentGroup && page.componentGroup === `content/component-groups/${group.slug}.json`
              )
              .map((page: any) => ({
                title: page.title,
                href: `/components/${page.slug}`,
                status: page.status,
                componentGroup: group.slug
              }));

            return {
              title: cat.title,
              slug: cat.slug,
              items: categoryPages,
              isExpandable: cat.isExpandable,
              componentGroup: group.slug
            };
          })
          .sort((a: any, b: any) => a.title.localeCompare(b.title)); // Sort categories alphabetically

        // Individual components (not in categories) - ONLY for this specific group
        const individualComponents = pages
          .filter((page: any) => 
            page.componentGroup && page.componentGroup === `content/component-groups/${group.slug}.json` && 
            !page.category && 
            page.section && page.section.includes('components')
          )
          .map((page: any) => ({
            title: page.title,
            href: `/components/${page.slug}`,
            status: page.status,
            componentGroup: group.slug
          }))
          .sort((a: any, b: any) => a.title.localeCompare(b.title)); // Sort components alphabetically

        return {
          title: group.title,
          slug: group.slug,
          description: group.description,
          order: group.order,
          categories: groupCategories,
          individualComponents
        };
      });

      setComponentGroups(groupsData);
    } catch (error) {
      console.error('Failed to fetch component data:', error);
      setComponentGroups([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSectionData = async () => {
    try {
      setLoading(true);
      
      // For non-component sections, create mock navigation structure
      // TODO: This should eventually come from TinaCMS as well
      const mockSectionPages = getSectionPages(section);
      setSectionPages(mockSectionPages);
    } catch (error) {
      console.error('Failed to fetch section data:', error);
      setSectionPages([]);
    } finally {
      setLoading(false);
    }
  };

  const getSectionPages = (section: string): NavItem[] => {
    switch (section) {
      case 'foundations':
        return [
          { title: 'Design Tokens', href: '/foundations/design-tokens' },
          { title: 'Color System', href: '/foundations/color' },
          { title: 'Typography', href: '/foundations/typography' },
          { title: 'Spacing & Layout', href: '/foundations/spacing' },
          { title: 'Iconography', href: '/foundations/icons' },
          { title: 'Elevation', href: '/foundations/elevation' },
          { title: 'Motion', href: '/foundations/motion' },
        ];
      case 'patterns':
        return [
          { title: 'Layout Patterns', href: '/patterns/layouts' },
          { title: 'Navigation Patterns', href: '/patterns/navigation' },
          { title: 'Data Display', href: '/patterns/data-display' },
          { title: 'Form Patterns', href: '/patterns/forms' },
          { title: 'Feedback Patterns', href: '/patterns/feedback' },
          { title: 'Content Patterns', href: '/patterns/content' },
        ];
      case 'development':
        return [
          { title: 'Getting Started', href: '/development/getting-started' },
          { title: 'Installation', href: '/development/installation' },
          { title: 'React Components', href: '/development/react' },
          { title: 'Design Tokens', href: '/development/tokens' },
          { title: 'Contributing', href: '/development/contributing' },
          { title: 'Changelog', href: '/development/changelog' },
          { title: 'Migration Guide', href: '/development/migration' },
        ];
      default:
        return [];
    }
  };

  const toggleCategory = (categorySlug: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categorySlug]: !prev[categorySlug]
    }));
  };

  const toggleGroup = (groupSlug: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupSlug]: !prev[groupSlug]
    }));
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const getStatusBadge = (status: string) => {
    if (status === 'deprecated') {
      return <span className="text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded ml-2">Deprecated</span>;
    }
    if (status === 'beta') {
      return <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded ml-2">Beta</span>;
    }
    if (status === 'experimental') {
      return <span className="text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded ml-2">Experimental</span>;
    }
    return null;
  };

  const getSectionTitle = () => {
    switch (section) {
      case 'foundations':
        return 'Foundations';
      case 'components':
        return 'Components';
      case 'patterns':
        return 'Patterns';
      case 'development':
        return 'Development';
      default:
        return 'Navigation';
    }
  };

  if (loading) {
    return (
      <aside className={`${isCollapsed ? 'w-20' : 'w-80'} transition-all duration-300 ease-in-out h-full p-4`}>
        <div className="bg-card border border-border rounded-xl shadow-lg h-full overflow-hidden">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  const SectionIcon = getSectionIcon(section);

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-80'} transition-all duration-300 ease-in-out h-full ${isCollapsed ? 'p-2' : 'p-4'} relative`}>
      <div className="bg-card border border-border rounded-xl shadow-lg h-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-b border-border bg-gradient-to-r from-background to-muted/30`}>
          <div className={`flex items-center ${isCollapsed ? 'flex-col space-y-2' : 'justify-between'}`}>
            {!isCollapsed && (
              <div className="flex-1">
                <div className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-2">
            Design System
          </div>
                <Link href={`/${section}`} className="text-lg font-semibold text-foreground hover:text-primary flex items-center transition-colors">
                  <SectionIcon className="w-5 h-5 mr-3" />
            {getSectionTitle()}
          </Link>
              </div>
            )}
            {isCollapsed && (
              <Link href={`/${section}`} className="text-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-accent" title={getSectionTitle()}>
                <SectionIcon className="w-6 h-6" />
              </Link>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-2 rounded-lg hover:bg-accent transition-colors ${isCollapsed ? '' : 'ml-2'}`}
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Navigation Content */}
        <div className={`flex-1 overflow-y-auto ${isCollapsed ? 'px-1 py-2' : 'px-4 py-4'}`}>
          {/* Components Section - Show Component Groups */}
        {section === 'components' && (
            <nav className={`${isCollapsed ? 'space-y-1' : 'space-y-3'}`}>
              {componentGroups
                .sort((a, b) => a.order - b.order) // Sort groups by their defined order
                .map((group) => {
              const GroupIcon = getGroupIcon(group.slug);
              const isGroupExpanded = expandedGroups[group.slug];
              
              return (
                <div key={group.slug}>
                  {/* Component Group Header */}
                  <button
                        onClick={() => !isCollapsed && toggleGroup(group.slug)}
                        className={`flex items-center w-full ${isCollapsed ? 'p-2 justify-center' : 'px-3 py-3 justify-between'} text-sm font-medium text-foreground bg-gradient-to-r from-accent/20 to-accent/10 hover:from-accent/30 hover:to-accent/20 rounded-lg transition-all duration-200`}
                        title={isCollapsed ? group.title : undefined}
                  >
                        {isCollapsed ? (
                          <GroupIcon className="w-5 h-5 text-primary" />
                        ) : (
                          <>
                    <div className="flex items-center">
                              <GroupIcon className="w-4 h-4 mr-3 text-primary" />
                              <span className="font-semibold">{group.title}</span>
                    </div>
                            <div className="flex items-center">
                    {isGroupExpanded ? (
                                <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    ) : (
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                              )}
                            </div>
                          </>
                    )}
                  </button>

                  {/* Group Content */}
                      {!isCollapsed && isGroupExpanded && (
                        <div className="ml-4 mt-3 space-y-2">
                          {/* Create alphabetical list of all items in this group */}
                          {(() => {
                            const groupItems: Array<{
                              type: 'component' | 'category';
                              title: string;
                              data: any;
                            }> = [];

                            // Add individual components from this group
                            group.individualComponents.forEach(component => {
                              groupItems.push({
                                type: 'component',
                                title: component.title,
                                data: component
                              });
                            });

                            // Add categories from this group
                            group.categories.forEach(category => {
                              groupItems.push({
                                type: 'category',
                                title: category.title,
                                data: category
                              });
                            });

                            // Sort alphabetically
                            groupItems.sort((a, b) => a.title.localeCompare(b.title));

                            return groupItems.map((item) => {
                              if (item.type === 'component') {
                                const component = item.data;
                                return (
                          <Link
                                    key={`group-${group.slug}-${component.href}`}
                                    href={component.href}
                                    className={`flex items-center justify-between px-3 py-2.5 text-sm rounded-lg transition-all duration-200 hover:shadow-sm ${
                                      isActive(component.href)
                                        ? 'bg-primary text-primary-foreground font-medium shadow-md'
                                        : `text-muted-foreground hover:text-foreground hover:bg-accent/70 ${
                                            component.status === 'deprecated' ? 'line-through opacity-60' : ''
                                  }`
                            }`}
                          >
                                    <span>{component.title}</span>
                                    {component.status && getStatusBadge(component.status)}
                          </Link>
                                );
                              }

                              if (item.type === 'category') {
                                const category = item.data;
                        const isCategoryExpanded = expandedCategories[category.slug];
                        
                        return (
                                  <div key={`group-${group.slug}-category-${category.slug}`}>
                            {/* Category Header */}
                            {category.isExpandable && category.items.length > 0 ? (
                              <button
                                onClick={() => toggleCategory(category.slug)}
                                        className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200"
                              >
                                        <span className="font-medium">{category.title}</span>
                                {isCategoryExpanded ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronRight className="w-4 h-4" />
                                )}
                              </button>
                            ) : category.items.length > 0 ? (
                                      <div className="px-3 py-2.5 text-sm font-medium text-muted-foreground">
                                {category.title}
                              </div>
                            ) : null}

                                    {/* Category Items - sorted alphabetically */}
                            {(!category.isExpandable || isCategoryExpanded) && category.items.length > 0 && (
                                      <ul className="ml-4 mt-2 space-y-1">
                                        {category.items
                                          .sort((a: NavItem, b: NavItem) => a.title.localeCompare(b.title))
                                          .map((categoryItem: NavItem) => (
                                            <li key={`group-${group.slug}-category-${category.slug}-${categoryItem.href}`}>
                                    <Link
                                                href={categoryItem.href}
                                                className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:shadow-sm ${
                                                  isActive(categoryItem.href)
                                                    ? 'bg-primary text-primary-foreground font-medium shadow-md'
                                                    : `text-muted-foreground hover:text-foreground hover:bg-accent/70 ${
                                                        categoryItem.status === 'deprecated' ? 'line-through opacity-60' : ''
                                            }`
                                      }`}
                                    >
                                                <span>{categoryItem.title}</span>
                                                {categoryItem.status && getStatusBadge(categoryItem.status)}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                              }

                              return null;
                            });
                          })()}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        )}

        {/* Other Sections - Show Simple List */}
        {section !== 'components' && (
              <nav className={`${isCollapsed ? 'space-y-1' : 'space-y-2'}`}>
            {sectionPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                    className={`flex items-center ${isCollapsed ? 'p-2 justify-center' : 'px-3 py-2.5'} text-sm rounded-lg transition-all duration-200 hover:shadow-sm ${
                  isActive(page.href)
                        ? 'bg-primary text-primary-foreground font-medium shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/70'
                }`}
                    title={isCollapsed ? page.title : undefined}
              >
                    {!isCollapsed && page.title}
              </Link>
            ))}
          </nav>
        )}
          </div>


      </div>
    </aside>
  );
} 