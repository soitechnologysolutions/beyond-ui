import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Grid2x2 as Grid,
  List,
  Calendar,
  Tag,
  Eye,
  Heart,
  MessageCircle,
  Paperclip,
  X,
  Clock,
} from 'lucide-react';
import { Button } from '../Button';
import { Input } from '../Input';
import { Card, CardHeader, CardTitle, CardContent } from '../Card';
import { Badge } from '../Badge';
import { Avatar, AvatarImage, AvatarFallback } from '../Avatar';
import { Skeleton } from '../Skeleton';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalFooter,
} from '../Modal';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useBlog } from './hooks/useBlog';
import type { BlogPost, BlogFilters, BlogCategory } from './types';
import { sampleBlogCategories } from './data/sampleData';

export interface AllBlogsViewProps {
  posts?: BlogPost[];
  categories?: BlogCategory[];
  popularTags?: string[];
  loading?: boolean;
  error?: string | null;
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
  onPostClick?: (post: BlogPost) => void;
  className?: string;
  maxWidth?: '7xl' | 'full' | 'none';
  noPadding?: boolean;
}

export const AllBlogsView: React.FC<AllBlogsViewProps> = ({
  posts: externalPosts,
  categories: externalCategories,
  popularTags: externalTags,
  loading: externalLoading,
  error: externalError,
  title = 'Blog & Editorial Insights',
  subtitle = 'Discover wellness rituals, skincare guides, and stories from our community',
  headerActions,
  onPostClick,
  className = '',
  maxWidth = '7xl',
  noPadding = false,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showDesktopSidebar, setShowDesktopSidebar] = useState(false);
  const { isAbove, isBelow } = useBreakpoint();

  const {
    posts,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    clearFilters,
    loadMore,
    searchPosts,
  } = useBlog({
    pageSize: 12,
    initialPosts: externalPosts,
    externalLoading,
    externalError,
  });

  const resolvedCategories: BlogCategory[] = useMemo(() => {
    if (Array.isArray(externalCategories) && externalCategories.length > 0) {
      return externalCategories;
    }
    if (Array.isArray(externalPosts) && externalPosts.length > 0) {
      const counts = new Map<string, number>();
      externalPosts.forEach(p => {
        const cat = p.category || 'Wellness';
        counts.set(cat, (counts.get(cat) || 0) + 1);
      });
      return Array.from(counts.entries()).map(([name, postCount]) => ({
        id: name,
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        postCount,
      }));
    }
    return sampleBlogCategories;
  }, [externalCategories, externalPosts]);

  const resolvedTags: string[] = useMemo(() => {
    if (Array.isArray(externalTags) && externalTags.length > 0) {
      return externalTags;
    }
    if (Array.isArray(externalPosts) && externalPosts.length > 0) {
      const tagSet = new Set<string>();
      externalPosts.forEach(p => {
        (p.tags || []).forEach(t => tagSet.add(t));
      });
      if (tagSet.size > 0) return Array.from(tagSet).slice(0, 10);
    }
    return ['Wellness', 'Skincare', 'Massage', 'Holistic', 'Self-Care', 'Beauty'];
  }, [externalTags, externalPosts]);

  const handleFilterChange = (filterType: keyof BlogFilters, value: any) => {
    updateFilters({ [filterType]: value });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getGridColumns = () => {
    if (viewMode === 'list') return 'grid-cols-1';
    if (showDesktopSidebar) {
      return 'grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3';
    }
    return 'grid-cols-1 md:grid-cols-2 2xl:grid-cols-3';
  };

  const BlogPostCard: React.FC<{
    post: BlogPost;
    viewMode: 'grid' | 'list';
    isFeaturedHero?: boolean;
  }> = ({ post, viewMode, isFeaturedHero = false }) => {
    const attachmentsCount = Array.isArray(post.attachments)
      ? post.attachments.length
      : 0;
    const coverImg =
      post.coverImage ||
      post.seoMeta?.ogImage ||
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80';

    if (isFeaturedHero && viewMode === 'grid') {
      return (
        <Card
          className="group hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border border-gray-200/90 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden rounded-3xl md:col-span-2 2xl:col-span-3 flex flex-col lg:flex-row"
          onClick={() => onPostClick?.(post)}
        >
          <div className="w-full lg:w-1/2 aspect-[16/10] lg:aspect-auto bg-gray-100 dark:bg-gray-800 overflow-hidden relative shrink-0">
            <img
              src={coverImg}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-1.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge variant="warning" className="text-xs shadow-sm font-bold">
                  Featured Story
                </Badge>
                <Badge variant="default" className="text-xs shadow-sm">
                  {post.category}
                </Badge>
              </div>
              {attachmentsCount > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-900/75 text-white backdrop-blur-md">
                  <Paperclip className="h-3 w-3" />
                  {attachmentsCount} {attachmentsCount === 1 ? 'file' : 'files'}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary-600 dark:text-primary-400">
                <span>{post.category}</span>
                <span>•</span>
                <span>{post.readingTime || 4} min read</span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                {post.title}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed line-clamp-3 lg:line-clamp-4">
                {post.excerpt}
              </p>

              {(post.tags || []).length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(post.tags || []).slice(0, 4).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-3 mt-6">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Avatar size="md" className="shrink-0">
                  <AvatarImage src={post.author?.avatar} />
                  <AvatarFallback>{(post.author?.name || 'E')[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {post.author?.name || 'Editorial Team'}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 truncate">
                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                    <span className="shrink-0">{formatDate(post.publishedAt)}</span>
                    <span className="shrink-0">•</span>
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    <span className="shrink-0">{post.readingTime || 4}m read</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 shrink-0">
                <span className="inline-flex items-center gap-1" title="Views">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{(post.stats?.views || 0).toLocaleString()}</span>
                </span>
                <span className="inline-flex items-center gap-1" title="Likes">
                  <Heart className="h-3.5 w-3.5 text-danger-500" />
                  <span>{post.stats?.likes || 0}</span>
                </span>
                <span className="inline-flex items-center gap-1" title="Comments">
                  <MessageCircle className="h-3.5 w-3.5 text-primary-500" />
                  <span>{post.stats?.comments || 0}</span>
                </span>
              </div>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card
        className={`group hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border border-gray-200/90 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden rounded-2xl ${
          viewMode === 'list'
            ? 'flex flex-col md:flex-row'
            : 'flex flex-col justify-between h-full'
        }`}
        onClick={() => onPostClick?.(post)}
      >
        <div
          className={`${
            viewMode === 'list'
              ? 'w-full md:w-72 lg:w-80 md:flex-shrink-0 aspect-[16/10] md:aspect-auto'
              : 'aspect-[16/10] w-full'
          } bg-gray-100 dark:bg-gray-800 overflow-hidden relative shrink-0`}
        >
          <img
            src={coverImg}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="default" className="text-xs shadow-sm">
                {post.category}
              </Badge>
              {post.featured && (
                <Badge variant="warning" className="text-xs shadow-sm">
                  Featured
                </Badge>
              )}
            </div>
            {attachmentsCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-900/75 text-white backdrop-blur-md">
                <Paperclip className="h-3 w-3" />
                {attachmentsCount} {attachmentsCount === 1 ? 'file' : 'files'}
              </span>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between p-5 sm:p-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2.5 line-clamp-2 leading-snug">
              {post.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm sm:text-[15px] leading-relaxed">
              {post.excerpt}
            </p>

            {(post.tags || []).length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {(post.tags || []).slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {(post.tags || []).length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{(post.tags || []).length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <Avatar size="sm" className="shrink-0">
                <AvatarImage src={post.author?.avatar} />
                <AvatarFallback>{(post.author?.name || 'E')[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {post.author?.name || 'Editorial Team'}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">
                  <Calendar className="h-3 w-3 shrink-0" />
                  <span className="shrink-0">{formatDate(post.publishedAt)}</span>
                  <span className="shrink-0">•</span>
                  <Clock className="h-3 w-3 shrink-0" />
                  <span className="shrink-0">{post.readingTime || 4}m</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 shrink-0">
              <span className="inline-flex items-center gap-1" title="Views">
                <Eye className="h-3.5 w-3.5" />
                <span>{(post.stats?.views || 0).toLocaleString()}</span>
              </span>
              <span className="inline-flex items-center gap-1" title="Likes">
                <Heart className="h-3.5 w-3.5 text-danger-500" />
                <span>{post.stats?.likes || 0}</span>
              </span>
              <span className="inline-flex items-center gap-1" title="Comments">
                <MessageCircle className="h-3.5 w-3.5 text-primary-500" />
                <span>{post.stats?.comments || 0}</span>
              </span>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const containerMaxWidthClass =
    maxWidth === 'full'
      ? 'w-full'
      : maxWidth === 'none'
      ? ''
      : 'max-w-7xl mx-auto';
  const containerPaddingClass = noPadding
    ? ''
    : 'px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8';

  return (
    <div
      className={`${containerMaxWidthClass} ${containerPaddingClass} ${className}`.trim()}
    >
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 mb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1.5">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search articles..."
              value={filters.search}
              onChange={e => searchPosts(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>

          <select
            value={filters.sortBy}
            onChange={e => handleFilterChange('sortBy', e.target.value)}
            className="border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
            <option value="trending">Trending</option>
          </select>

          {isAbove('sm') && (
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          )}

          {headerActions}

          <Button
            variant={showDesktopSidebar || showFilters ? 'primary' : 'outline'}
            size="sm"
            onClick={() => {
              if (isBelow('lg')) {
                setShowFilters(!showFilters);
              } else {
                setShowDesktopSidebar(!showDesktopSidebar);
              }
            }}
          >
            <Filter className="mr-1.5 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Horizontal Category Filter Pills for Uncramped Full-Width Browsing */}
      {resolvedCategories.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-gray-200/80 dark:border-gray-800">
          <button
            type="button"
            onClick={() => handleFilterChange('categories', [])}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              filters.categories.length === 0
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All Topics ({pagination.total})
          </button>
          {resolvedCategories.map(category => {
            const active =
              filters.categories.includes(category.id) ||
              filters.categories.includes(category.name);
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  const newCategories = active
                    ? filters.categories.filter(
                        c => c !== category.id && c !== category.name
                      )
                    : [category.name];
                  handleFilterChange('categories', newCategories);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span>{category.name}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200/80 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {category.postCount}
                </span>
              </button>
            );
          })}
          {(filters.categories.length > 0 ||
            filters.tags.length > 0 ||
            filters.search) && (
            <button
              type="button"
              onClick={clearFilters}
              className="ml-auto text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}

      <div className="flex gap-6 lg:gap-8">
        {/* Optional Collapsible Desktop Filters Sidebar */}
        {showDesktopSidebar && (
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base text-gray-900 dark:text-gray-100">
                    <span>Filter Articles</span>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Clear
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowDesktopSidebar(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 text-sm">
                      Categories
                    </h4>
                    <div className="space-y-2">
                      {resolvedCategories.map(category => {
                        const checked =
                          filters.categories.includes(category.id) ||
                          filters.categories.includes(category.name);
                        return (
                          <label
                            key={category.id}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={e => {
                                const newCategories = e.target.checked
                                  ? [...filters.categories, category.name]
                                  : filters.categories.filter(
                                      c =>
                                        c !== category.id && c !== category.name
                                    );
                                handleFilterChange('categories', newCategories);
                              }}
                              className="rounded border-gray-300 dark:border-gray-700 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {category.name}
                            </span>
                            <Badge variant="outline" className="text-xs ml-auto">
                              {category.postCount}
                            </Badge>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 text-sm">
                      Popular Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {resolvedTags.map(tag => (
                        <Badge
                          key={tag}
                          variant={
                            filters.tags.includes(tag) ? 'default' : 'outline'
                          }
                          className="cursor-pointer text-xs hover:bg-primary-50 dark:hover:bg-primary-950/50 transition-colors"
                          onClick={() => {
                            const newTags = filters.tags.includes(tag)
                              ? filters.tags.filter(t => t !== tag)
                              : [...filters.tags, tag];
                            handleFilterChange('tags', newTags);
                          }}
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className={`grid gap-6 lg:gap-8 ${getGridColumns()}`}>
              {Array.from({ length: 6 }).map((_, i) => (
                <Card
                  key={i}
                  className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden"
                >
                  <div className="aspect-[16/10] bg-gray-100 dark:bg-gray-800">
                    <Skeleton className="w-full h-full" />
                  </div>
                  <CardContent className="p-5 sm:p-6">
                    <Skeleton className="h-4 w-20 mb-3" />
                    <Skeleton className="h-6 w-full mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-danger-500 mb-4">
                <MessageCircle className="h-12 sm:h-16 w-12 sm:w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Error Loading Posts
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
                {error}
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <Search className="h-12 sm:h-16 w-12 sm:w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
                Try adjusting your search or filter criteria
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className={`grid gap-6 lg:gap-8 ${getGridColumns()}`}>
                {posts.map((post, idx) => {
                  const isFeaturedHero =
                    Boolean(post.featured) &&
                    idx === 0 &&
                    !filters.search &&
                    filters.categories.length === 0 &&
                    filters.tags.length === 0;
                  return (
                    <BlogPostCard
                      key={post.id}
                      post={post}
                      viewMode={viewMode}
                      isFeaturedHero={isFeaturedHero}
                    />
                  );
                })}
              </div>

              {pagination.hasNext && (
                <div className="text-center mt-8 sm:mt-12">
                  <Button
                    variant="outline"
                    onClick={loadMore}
                    disabled={loading}
                    size={isBelow('sm') ? 'sm' : 'md'}
                    className="w-full sm:w-auto"
                  >
                    {loading ? 'Loading...' : 'Load More Posts'}
                  </Button>
                </div>
              )}

              <div className="mt-6 sm:mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                Showing {posts.length} of {pagination.total} posts
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <Modal open={showFilters && isBelow('lg')} onOpenChange={setShowFilters}>
        <ModalHeader>
          <ModalTitle>Filter Posts</ModalTitle>
        </ModalHeader>
        <ModalContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                Categories
              </h4>
              <div className="space-y-2">
                {resolvedCategories.map(category => {
                  const checked =
                    filters.categories.includes(category.id) ||
                    filters.categories.includes(category.name);
                  return (
                    <label
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={e => {
                          const newCategories = e.target.checked
                            ? [...filters.categories, category.name]
                            : filters.categories.filter(
                                c => c !== category.id && c !== category.name
                              );
                          handleFilterChange('categories', newCategories);
                        }}
                        className="rounded border-gray-300 dark:border-gray-700"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {category.name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {category.postCount}
                      </Badge>
                    </label>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {resolvedTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={filters.tags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => {
                      const newTags = filters.tags.includes(tag)
                        ? filters.tags.filter(t => t !== tag)
                        : [...filters.tags, tag];
                      handleFilterChange('tags', newTags);
                    }}
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="outline" onClick={clearFilters}>
            Clear All
          </Button>
          <Button variant="primary" onClick={() => setShowFilters(false)}>
            Apply Filters
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
