import React, { useEffect } from 'react';
import { Calendar, Clock, Eye, Hash } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../Card';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useBlogNavigation } from './hooks/useBlogNavigation';
import type { BlogPost, BlogCategory } from './types';
import { sampleBlogPosts, sampleBlogCategories } from './data/sampleData';

export interface BlogSidebarProps {
  type: 'navigation' | 'tableOfContents';
  currentPost?: BlogPost;
  relatedPosts?: BlogPost[];
  allPosts?: BlogPost[];
  categories?: BlogCategory[];
  onPostClick?: (post: BlogPost) => void;
  onCategoryClick?: (category: BlogCategory) => void;
  className?: string;
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({
  type,
  currentPost,
  relatedPosts = [],
  allPosts,
  categories,
  onPostClick,
  onCategoryClick,
  className = '',
}) => {
  const { tableOfContents, activeSection, scrollToSection, generateTableOfContents } =
    useBlogNavigation();
  const { isAbove } = useBreakpoint();

  useEffect(() => {
    if (currentPost?.content) {
      generateTableOfContents(currentPost.content);
    }
  }, [currentPost?.content, generateTableOfContents]);

  const sourcePosts = Array.isArray(allPosts) && allPosts.length > 0 ? allPosts : sampleBlogPosts;
  const sourceCategories =
    Array.isArray(categories) && categories.length > 0 ? categories : sampleBlogCategories;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const sidebarStyles = {
    position: isAbove('lg') ? ('sticky' as const) : ('static' as const),
    top: isAbove('lg') ? '1rem' : 'auto',
    maxHeight: isAbove('lg') ? 'calc(100vh - 2rem)' : 'auto',
    overflowY: isAbove('lg') ? ('auto' as const) : ('visible' as const),
  };

  if (type === 'tableOfContents') {
    return (
      <div className={`space-y-6 ${className}`} style={sidebarStyles}>
        <Card className="lg:sticky lg:top-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center text-base text-gray-900 dark:text-gray-100">
              <Hash className="h-4 w-4 mr-2 text-primary-600 dark:text-primary-400" />
              Table of Contents
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-80 lg:max-h-96 overflow-y-auto">
            {tableOfContents.length > 0 ? (
              <nav className="space-y-1">
                {tableOfContents.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.anchor)}
                    className={`
                      block w-full text-left px-3 py-2 text-sm rounded-lg transition-all duration-200 cursor-pointer
                      ${
                        activeSection === item.anchor
                          ? 'bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border-l-2 border-primary-600 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                      }
                      ${item.level === 1 ? 'font-medium' : ''}
                      ${item.level === 2 ? 'ml-4 text-xs' : ''}
                      ${item.level === 3 ? 'ml-8 text-xs' : ''}
                      ${item.level >= 4 ? 'ml-12 text-xs' : ''}
                    `}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                No headings found in this article
              </p>
            )}
          </CardContent>
        </Card>

        {currentPost && isAbove('lg') && (
          <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-base text-gray-900 dark:text-gray-100">
                Article Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-900 dark:text-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Views</span>
                <span className="font-medium text-sm">
                  {(currentPost.stats?.views || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Likes</span>
                <span className="font-medium text-sm">{currentPost.stats?.likes || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Comments</span>
                <span className="font-medium text-sm">{currentPost.stats?.comments || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Shares</span>
                <span className="font-medium text-sm">{currentPost.stats?.shares || 0}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  const recentPosts = (relatedPosts.length > 0 ? relatedPosts : sourcePosts).slice(0, 5);
  const popularPosts = [...sourcePosts]
    .sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0))
    .slice(0, 5);

  return (
    <div className={`space-y-6 ${className}`} style={sidebarStyles}>
      {/* Categories */}
      <Card className="lg:sticky lg:top-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-base text-gray-900 dark:text-gray-100">
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {sourceCategories.map(category => (
              <div key={category.id} className="flex items-center justify-between group">
                <button
                  type="button"
                  onClick={() => onCategoryClick?.(category)}
                  className="text-left text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm font-medium group-hover:underline cursor-pointer"
                >
                  {category.name}
                </button>
                <Badge variant="outline" className="text-xs">
                  {category.postCount}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Posts */}
      <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-base text-gray-900 dark:text-gray-100">
            Recent Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="max-h-80 overflow-y-auto">
          <div className="space-y-4">
            {recentPosts.map(post => (
              <div
                key={post.id}
                onClick={() => onPostClick?.(post)}
                className="group cursor-pointer"
              >
                <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1 line-clamp-2 text-sm leading-tight">
                  {post.title}
                </h4>
                <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>•</span>
                  <Clock className="h-3 w-3" />
                  <span>{post.readingTime} min</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Posts */}
      {isAbove('md') && (
        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-base text-gray-900 dark:text-gray-100">
              Popular Posts
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-80 overflow-y-auto">
            <div className="space-y-4">
              {popularPosts.map((post, index) => (
                <div
                  key={post.id}
                  onClick={() => onPostClick?.(post)}
                  className="flex items-start space-x-3 group cursor-pointer"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-primary-100 dark:bg-primary-950/60 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-1 line-clamp-2 text-sm leading-tight">
                      {post.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <Eye className="h-3 w-3" />
                      <span>{(post.stats?.views || 0).toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Newsletter Signup */}
      {isAbove('lg') && (
        <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-base text-gray-900 dark:text-gray-100">
              Stay Updated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Get the latest wellness insights and articles delivered right to your inbox.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
              <Button variant="primary" className="w-full" size="sm">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
