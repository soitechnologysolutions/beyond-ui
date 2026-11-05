import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import type { BlogPost, BlogFilters, BlogPagination } from '../types';
import { sampleBlogPosts } from '../data/sampleData';

export interface UseBlogProps {
  initialFilters?: Partial<BlogFilters>;
  pageSize?: number;
  initialPosts?: BlogPost[];
  externalLoading?: boolean;
  externalError?: string | null;
}

export interface UseBlogReturn {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  filters: BlogFilters;
  pagination: BlogPagination;
  updateFilters: (newFilters: Partial<BlogFilters>) => void;
  clearFilters: () => void;
  loadMore: () => void;
  refreshPosts: () => void;
  searchPosts: (query: string) => void;
}

const defaultFilters: BlogFilters = {
  search: '',
  tags: [],
  categories: [],
  authors: [],
  dateRange: {},
  sortBy: 'newest',
};

/**
 * Custom hook for blog data management and filtering
 * Handles search, filtering, pagination, and data fetching
 */
export const useBlog = ({
  initialFilters = {},
  pageSize = 10,
  initialPosts,
  externalLoading,
  externalError,
}: UseBlogProps = {}): UseBlogReturn => {
  const sourcePosts = useMemo(
    () => (Array.isArray(initialPosts) ? initialPosts : sampleBlogPosts),
    [initialPosts]
  );

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(
    externalLoading !== undefined ? externalLoading : !Array.isArray(initialPosts)
  );
  const [error, setError] = useState<string | null>(externalError || null);
  const [filters, setFilters] = useState<BlogFilters>({
    ...defaultFilters,
    ...initialFilters,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchQuery = useDebounce(filters.search, 250);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = [...sourcePosts];

    // Search filter
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          (post.excerpt || '').toLowerCase().includes(query) ||
          (post.content || '').toLowerCase().includes(query) ||
          (post.category || '').toLowerCase().includes(query) ||
          (post.tags || []).some(tag => tag.toLowerCase().includes(query)) ||
          (post.author?.name || '').toLowerCase().includes(query)
      );
    }

    // Category filter (match by category id, slug, or name case-insensitively)
    if (filters.categories.length > 0) {
      const lowerSelected = filters.categories.map(c => c.toLowerCase());
      filtered = filtered.filter(post => {
        const postCat = (post.category || '').toLowerCase();
        const postCatSlug = postCat.replace(/[^a-z0-9]+/g, '-');
        return (
          lowerSelected.includes(postCat) ||
          lowerSelected.includes(postCatSlug) ||
          filters.categories.includes(post.category)
        );
      });
    }

    // Tags filter
    if (filters.tags.length > 0) {
      const lowerTags = filters.tags.map(t => t.toLowerCase());
      filtered = filtered.filter(post =>
        (post.tags || []).some(tag => lowerTags.includes(tag.toLowerCase()))
      );
    }

    // Author filter
    if (filters.authors.length > 0) {
      filtered = filtered.filter(post =>
        filters.authors.includes(post.author?.id)
      );
    }

    // Date range filter
    if (filters.dateRange.start || filters.dateRange.end) {
      filtered = filtered.filter(post => {
        const postDate = new Date(post.publishedAt);
        const startDate = filters.dateRange.start
          ? new Date(filters.dateRange.start)
          : null;
        const endDate = filters.dateRange.end
          ? new Date(filters.dateRange.end)
          : null;

        if (startDate && postDate < startDate) return false;
        if (endDate && postDate > endDate) return false;
        return true;
      });
    }

    // Sort posts
    switch (filters.sortBy) {
      case 'oldest':
        filtered.sort(
          (a, b) =>
            new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        );
        break;
      case 'popular':
        filtered.sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0));
        break;
      case 'trending':
        filtered.sort(
          (a, b) =>
            (b.stats?.likes || 0) +
            (b.stats?.shares || 0) -
            ((a.stats?.likes || 0) + (a.stats?.shares || 0))
        );
        break;
      default: // newest
        filtered.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
        break;
    }

    return filtered;
  }, [debouncedSearchQuery, filters, sourcePosts]);

  // Pagination
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredPosts.slice(0, startIndex + pageSize);
  }, [filteredPosts, currentPage, pageSize]);

  const pagination: BlogPagination = useMemo(
    () => ({
      page: currentPage,
      limit: pageSize,
      total: filteredPosts.length,
      hasNext: currentPage * pageSize < filteredPosts.length,
      hasPrev: currentPage > 1,
    }),
    [currentPage, pageSize, filteredPosts.length]
  );

  useEffect(() => {
    if (Array.isArray(initialPosts)) {
      setPosts(paginatedPosts);
      setLoading(Boolean(externalLoading));
      setError(externalError || null);
      return;
    }

    let cancelled = false;
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 200));
        if (!cancelled) setPosts(paginatedPosts);
      } catch {
        if (!cancelled) setError('Failed to load blog posts');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, [paginatedPosts, initialPosts, externalLoading, externalError]);

  const updateFilters = useCallback((newFilters: Partial<BlogFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
    setCurrentPage(1);
  }, []);

  const loadMore = useCallback(() => {
    if (pagination.hasNext) {
      setCurrentPage(prev => prev + 1);
    }
  }, [pagination.hasNext]);

  const refreshPosts = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const searchPosts = useCallback(
    (query: string) => {
      updateFilters({ search: query });
    },
    [updateFilters]
  );

  return {
    posts,
    loading,
    error,
    filters,
    pagination,
    updateFilters,
    clearFilters,
    loadMore,
    refreshPosts,
    searchPosts,
  };
};
