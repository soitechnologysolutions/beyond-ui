import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeHighlight } from '../CodeHighlight/CodeHighlight';
import {
  Calendar,
  Clock,
  Tag,
  Share2,
  Heart,
  MessageCircle,
  Eye,
  ChevronLeft,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Paperclip,
  Download,
  FileText,
  Music,
  Video,
  Archive,
  Image as ImageIcon,
} from 'lucide-react';
import { Button } from '../Button';
import { Card, CardContent } from '../Card';
import { Badge } from '../Badge';
import { Avatar, AvatarImage, AvatarFallback } from '../Avatar';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { showToast } from '../Toast';
import { useBlogNavigation } from './hooks/useBlogNavigation';
import { BlogCommentSection } from './BlogCommentSection';
import { BlogSidebar } from './BlogSidebar';
import type { BlogPost, BlogCategory, BlogComment, BlogAttachment } from './types';
import { sampleBlogPosts } from './data/sampleData';

export interface SingleBlogViewProps {
  postId?: string | number;
  post?: BlogPost;
  allPosts?: BlogPost[];
  categories?: BlogCategory[];
  comments?: BlogComment[];
  onBackClick?: () => void;
  onPostClick?: (post: BlogPost) => void;
  onLikePost?: (postId: string) => void;
  onSharePost?: (postId: string, platform: string) => void;
  onAddComment?: (content: string, parentId?: string) => Promise<void>;
  onLikeComment?: (commentId: string) => void;
  onDislikeComment?: (commentId: string) => void;
  onReportComment?: (commentId: string) => void;
  className?: string;
  maxWidth?: '7xl' | 'full' | 'none';
  noPadding?: boolean;
}

function formatFileSize(bytes?: number): string {
  if (!bytes || bytes <= 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const SingleBlogView: React.FC<SingleBlogViewProps> = ({
  postId = '1',
  post: externalPost,
  allPosts,
  categories,
  comments: externalComments,
  onBackClick,
  onPostClick,
  onLikePost,
  onSharePost,
  onAddComment,
  onLikeComment,
  onDislikeComment,
  onReportComment,
  className = '',
  maxWidth = '7xl',
  noPadding = false,
}) => {
  const { generateTableOfContents } = useBlogNavigation();
  const { isAbove, isBelow } = useBreakpoint();

  const sourcePosts =
    Array.isArray(allPosts) && allPosts.length > 0 ? allPosts : sampleBlogPosts;

  const post =
    externalPost ||
    sourcePosts.find(p => String(p.id) === String(postId) || p.slug === postId) ||
    sourcePosts[0];

  const relatedPosts = sourcePosts
    .filter(
      p =>
        String(p.id) !== String(post.id) &&
        (p.category === post.category ||
          (p.tags || []).some(tag => (post.tags || []).includes(tag)))
    )
    .slice(0, 3);

  useEffect(() => {
    if (post?.content) {
      generateTableOfContents(post.content);
    }
  }, [post?.content, generateTableOfContents]);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    onSharePost?.(post.id, platform);

    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        showToast.success('Link copied to clipboard!');
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const attachments: BlogAttachment[] = Array.isArray(post.attachments)
    ? post.attachments
    : [];

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
      {/* Back Navigation */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <Button
          variant="ghost"
          onClick={onBackClick}
          className="mb-2 sm:mb-4 p-2 sm:p-3"
        >
          <ChevronLeft className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="text-sm sm:text-base">Back to Articles</span>
        </Button>

        {isAbove('md') && (
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <button
              type="button"
              onClick={onBackClick}
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
            >
              Journal
            </button>
            <span>/</span>
            <span className="text-primary-600 dark:text-primary-400 font-medium">
              {post.category}
            </span>
            <span>/</span>
            <span className="text-gray-900 dark:text-gray-100 truncate max-w-md">
              {post.title}
            </span>
          </nav>
        )}
      </div>

      {/* Main Spacious 2-Column Editorial Layout (8 cols article + 4 cols sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        {/* Article Body (8 Columns on Desktop for comfortable reading width) */}
        <div className="lg:col-span-8 min-w-0">
          <article className="prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none">
            <header className="mb-6 sm:mb-8 not-prose">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="default" className="text-xs sm:text-sm">
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge variant="warning" className="text-xs sm:text-sm">
                    Featured
                  </Badge>
                )}
                {(post.tags || []).slice(0, isBelow('sm') ? 2 : 4).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Author & Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-800 space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <Avatar size={isBelow('sm') ? 'sm' : 'lg'}>
                    <AvatarImage src={post.author?.avatar} />
                    <AvatarFallback>
                      {(post.author?.name || 'E')[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                      {post.author?.name || 'Editorial Team'}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{post.readingTime || 4} min read</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>
                          {(post.stats?.views || 0).toLocaleString()} views
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Sharing */}
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Button
                    variant="ghost"
                    size={isBelow('sm') ? 'sm' : 'md'}
                    onClick={() => handleShare('twitter')}
                    className="p-2"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size={isBelow('sm') ? 'sm' : 'md'}
                    onClick={() => handleShare('facebook')}
                    className="p-2"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size={isBelow('sm') ? 'sm' : 'md'}
                    onClick={() => handleShare('linkedin')}
                    className="p-2"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size={isBelow('sm') ? 'sm' : 'md'}
                    onClick={() => handleShare('copy')}
                    className="p-2"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Cover Image */}
              {(post.coverImage || post.seoMeta?.ogImage) && (
                <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl mb-6 sm:mb-8 overflow-hidden shadow-sm">
                  <img
                    src={post.coverImage || post.seoMeta?.ogImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </header>

            {/* Markdown Content */}
            <div className="prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:scroll-mt-20">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({
                    children,
                    ...props
                  }: {
                    children?: React.ReactNode;
                    [key: string]: any;
                  }) => (
                    <h1
                      id={String(children)
                        .toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-')}
                      className="scroll-mt-20"
                      {...props}
                    >
                      {children}
                    </h1>
                  ),
                  h2: ({
                    children,
                    ...props
                  }: {
                    children?: React.ReactNode;
                    [key: string]: any;
                  }) => (
                    <h2
                      id={String(children)
                        .toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-')}
                      className="scroll-mt-20"
                      {...props}
                    >
                      {children}
                    </h2>
                  ),
                  h3: ({
                    children,
                    ...props
                  }: {
                    children?: React.ReactNode;
                    [key: string]: any;
                  }) => (
                    <h3
                      id={String(children)
                        .toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-')}
                      className="scroll-mt-20"
                      {...props}
                    >
                      {children}
                    </h3>
                  ),
                  code: (props: {
                    inline?: boolean;
                    className?: string;
                    children?: React.ReactNode;
                  }) => {
                    const { inline, className, children } = props;
                    if (inline) {
                      return (
                        <code
                          className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200 dark:border-gray-700"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                    const match = /language-(\w+)/.exec(className || '');
                    return (
                      <div className="relative group">
                        <CodeHighlight
                          code={String(children).replace(/\n$/, '')}
                          language={match ? match[1] : 'javascript'}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600"
                          onClick={() => {
                            navigator.clipboard.writeText(String(children));
                            showToast.success('Code copied to clipboard!');
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Multi-Extension Attached Media, Audio, Video & Downloadable Documents */}
            {attachments.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 not-prose space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Paperclip className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    Attached Media, Guides & Resources ({attachments.length})
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {attachments.map(att => {
                    const cat = att.category || 'document';
                    const extBadge = (
                      att.extension ||
                      att.originalName?.split('.').pop() ||
                      'FILE'
                    )
                      .replace('.', '')
                      .toUpperCase();

                    if (cat === 'video') {
                      return (
                        <div
                          key={att.id || att.url}
                          className="sm:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 space-y-2.5"
                        >
                          <div className="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                            <span className="flex items-center gap-1.5 truncate">
                              <Video className="h-4 w-4 text-primary-500 shrink-0" />
                              {att.originalName}
                            </span>
                            <Badge variant="default">{extBadge}</Badge>
                          </div>
                          <video
                            controls
                            src={att.url}
                            className="w-full max-h-96 rounded-xl bg-black"
                          />
                        </div>
                      );
                    }

                    if (cat === 'audio') {
                      return (
                        <div
                          key={att.id || att.url}
                          className="sm:col-span-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 space-y-2.5"
                        >
                          <div className="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-gray-300">
                            <span className="flex items-center gap-1.5 truncate">
                              <Music className="h-4 w-4 text-secondary-500 shrink-0" />
                              {att.originalName}
                            </span>
                            <Badge variant="secondary">{extBadge}</Badge>
                          </div>
                          <audio controls src={att.url} className="w-full" />
                        </div>
                      );
                    }

                    if (cat === 'image') {
                      return (
                        <a
                          key={att.id || att.url}
                          href={att.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-md transition-all flex flex-col"
                        >
                          <div className="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
                            <img
                              src={att.url}
                              alt={att.originalName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="p-3 flex items-center justify-between text-xs">
                            <span className="font-medium text-gray-800 dark:text-gray-200 truncate flex items-center gap-1.5">
                              <ImageIcon className="h-3.5 w-3.5 text-primary-500 shrink-0" />
                              {att.originalName}
                            </span>
                            <Badge variant="outline">{extBadge}</Badge>
                          </div>
                        </a>
                      );
                    }

                    return (
                      <a
                        key={att.id || att.url}
                        href={att.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={att.originalName}
                        className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/70 dark:bg-gray-900 hover:border-primary-500 dark:hover:border-primary-500 p-4 flex items-center justify-between gap-3 transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                            {cat === 'archive' ? (
                              <Archive className="h-5 w-5" />
                            ) : (
                              <FileText className="h-5 w-5" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400">
                              {att.originalName}
                            </p>
                            <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                              <span className="font-semibold uppercase text-primary-600 dark:text-primary-400">
                                {extBadge}
                              </span>
                              {att.size ? (
                                <>
                                  <span>•</span>
                                  <span>{formatFileSize(att.size)}</span>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-200 shrink-0 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-colors">
                          <Download className="h-3.5 w-3.5" />
                          Download
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Article Footer */}
            <footer className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800 not-prose">
              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(post.tags || []).map(tag => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-950/50 text-xs sm:text-sm"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <Card className="mb-6 sm:mb-8 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                    <Avatar
                      size={isBelow('sm') ? 'md' : 'lg'}
                      className="mx-auto sm:mx-0"
                    >
                      <AvatarImage src={post.author?.avatar} />
                      <AvatarFallback>
                        {(post.author?.name || 'E')[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base">
                        About {post.author?.name || 'Editorial Team'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        {post.author?.bio ||
                          'Wellness specialists & editorial contributors sharing holistic health, skincare, and spa management insights.'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Article Stats & Like Button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 p-4 sm:p-6 bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-800 rounded-2xl space-y-4 sm:space-y-0">
                <div className="flex items-center justify-center sm:justify-start space-x-4 sm:space-x-6 text-gray-900 dark:text-gray-100">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-danger-500" />
                    <span className="font-medium text-sm sm:text-base">
                      {post.stats?.likes || 0}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary-500" />
                    <span className="font-medium text-sm sm:text-base">
                      {post.stats?.comments || 0}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Share2 className="h-4 w-4 sm:h-5 sm:w-5 text-success-500" />
                    <span className="font-medium text-sm sm:text-base">
                      {post.stats?.shares || 0}
                    </span>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size={isBelow('sm') ? 'sm' : 'md'}
                  onClick={() => {
                    if (onLikePost) {
                      onLikePost(post.id);
                    } else {
                      showToast.success('Post liked!');
                    }
                  }}
                  className="w-full sm:w-auto"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Like this article
                </Button>
              </div>
            </footer>
          </article>

          {/* Comments Section */}
          <BlogCommentSection
            postId={post.id}
            initialComments={externalComments}
            onAddComment={onAddComment}
            onLikeComment={onLikeComment}
            onDislikeComment={onDislikeComment}
            onReportComment={onReportComment}
          />
        </div>

        {/* Right Sidebar (4 Columns on Desktop: Table of Contents + Related Navigation) */}
        <div className="lg:col-span-4 space-y-6">
          <BlogSidebar type="tableOfContents" currentPost={post} />
          <BlogSidebar
            type="navigation"
            currentPost={post}
            relatedPosts={relatedPosts}
            allPosts={sourcePosts}
            categories={categories}
            onPostClick={onPostClick}
          />
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 sm:mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {relatedPosts.map(relatedPost => (
              <Card
                key={relatedPost.id}
                onClick={() => onPostClick?.(relatedPost)}
                className="hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <img
                      src={
                        relatedPost.coverImage ||
                        relatedPost.seoMeta?.ogImage ||
                        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
                      }
                      alt={relatedPost.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-5">
                    <Badge variant="outline" className="mb-2.5 text-xs">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 text-base leading-snug">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 line-clamp-2 leading-relaxed">
                      {relatedPost.excerpt}
                    </p>
                  </CardContent>
                </div>
                <div className="px-5 pb-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 shrink-0" />
                    {formatDate(relatedPost.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3 w-3 shrink-0" />
                    {relatedPost.readingTime || 4} min read
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
