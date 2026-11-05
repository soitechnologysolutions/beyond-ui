// Blog system TypeScript interfaces and types
export interface BlogAttachment {
  id: string;
  url: string;
  originalName: string;
  mimeType?: string;
  extension?: string;
  category?: 'image' | 'video' | 'audio' | 'pdf' | 'document' | 'archive';
  size?: number;
  uploadedAt?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  attachments?: BlogAttachment[];
  author: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  category: string;
  readingTime: number;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  seoMeta: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
  };
  stats: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface BlogComment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
  updatedAt?: string;
  parentId?: string; // For nested replies
  likes: number;
  dislikes: number;
  isModerated: boolean;
  isReported: boolean;
  replies?: BlogComment[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
  color?: string;
}

export interface BlogFilters {
  search: string;
  tags: string[];
  categories: string[];
  authors: string[];
  dateRange: {
    start?: string;
    end?: string;
  };
  sortBy: 'newest' | 'oldest' | 'popular' | 'trending';
}

export interface BlogPagination {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  anchor: string;
}