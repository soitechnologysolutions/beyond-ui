import React, { useState } from 'react';
import { Menu, X, Search, PenTool, BookOpen, User, Home } from 'lucide-react';
import { Button } from '../Button';
import { Input } from '../Input';
import { Avatar, AvatarImage, AvatarFallback } from '../Avatar';
import { Badge } from '../Badge';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { cn } from '../../utils/cn';
import type { BlogPost } from './types';

export interface BlogLayoutProps {
  children: React.ReactNode;
  currentView?: 'allBlogs' | 'singleBlog' | 'category' | 'author';
  currentPost?: BlogPost;
  brandTitle?: string;
  brandSubtitle?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
  onWriteClick?: () => void;
  onNavigate?: (view: string, data?: any) => void;
  className?: string;
}

export const BlogLayout: React.FC<BlogLayoutProps> = ({
  children,
  currentView = 'allBlogs',
  currentPost,
  brandTitle = 'Beyond Blog',
  brandSubtitle = 'Insights & Wellness Journal',
  hideHeader = false,
  hideFooter = false,
  onWriteClick,
  onNavigate,
  className = '',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAbove, isBelow } = useBreakpoint();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onNavigate?.('search', { query });
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'blog', label: 'All Posts', icon: BookOpen, href: '/blog' },
    { id: 'categories', label: 'Categories', icon: PenTool, href: '/blog' },
    { id: 'authors', label: 'Editorial', icon: User, href: '/blog' },
  ];

  return (
    <div
      className={cn(
        'min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100',
        className
      )}
    >
      {!hideHeader && (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <div
                onClick={() => onNavigate?.('allBlogs')}
                className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <PenTool className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                    {brandTitle}
                  </span>
                  <div className="text-xs text-primary-600 dark:text-primary-400 font-medium hidden sm:block">
                    {brandSubtitle}
                  </div>
                </div>
              </div>

              {isAbove('lg') && (
                <nav className="flex items-center space-x-8">
                  {navigationItems.map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onNavigate?.(item.id)}
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors cursor-pointer"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              )}

              <div className="flex items-center space-x-2 sm:space-x-4">
                {isAbove('md') && (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={e => handleSearch(e.target.value)}
                      className="pl-10 w-48 lg:w-64 text-sm"
                    />
                  </div>
                )}

                {onWriteClick && (
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Button
                      variant="outline"
                      size={isBelow('sm') ? 'sm' : 'md'}
                      onClick={onWriteClick}
                    >
                      <PenTool className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Write</span>
                    </Button>
                  </div>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2"
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>

            {mobileMenuOpen && isBelow('lg') && (
              <div className="border-t border-gray-200 dark:border-gray-800 py-4">
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={e => handleSearch(e.target.value)}
                      className="pl-10 text-sm"
                    />
                  </div>
                  <nav className="space-y-2">
                    {navigationItems.map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onNavigate?.(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className="flex w-full items-center space-x-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            )}
          </div>
        </header>
      )}

      {currentView === 'singleBlog' && currentPost && !hideHeader && (
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="text-center">
              <Badge
                variant="default"
                className="mb-3 sm:mb-4 text-xs sm:text-sm"
              >
                {currentPost.category}
              </Badge>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight">
                {currentPost.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {currentPost.excerpt}
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">{children}</main>

      {!hideFooter && (
        <footer className="bg-gray-900 dark:bg-gray-950 text-white border-t border-gray-800 mt-12 sm:mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-400 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <PenTool className="h-4 w-4 text-primary-400" />
                <span className="font-bold text-white">{brandTitle}</span>
                <span>— {brandSubtitle}</span>
              </div>
              <p>
                &copy; {new Date().getFullYear()} {brandTitle}. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
