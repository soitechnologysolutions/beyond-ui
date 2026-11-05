import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, Flag, Reply, Send } from 'lucide-react';
import { Button } from '../Button';
import { Card, CardHeader, CardTitle, CardContent } from '../Card';
import { Textarea } from '../Textarea';
import { Avatar, AvatarImage, AvatarFallback } from '../Avatar';
import { Badge } from '../Badge';
import { Alert, AlertDescription } from '../Alert';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { useComments } from './hooks/useComments';
import type { BlogComment } from './types';

export interface BlogCommentSectionProps {
  postId: string;
  initialComments?: BlogComment[];
  onAddComment?: (content: string, parentId?: string) => Promise<void>;
  onLikeComment?: (commentId: string) => void;
  onDislikeComment?: (commentId: string) => void;
  onReportComment?: (commentId: string) => void;
  className?: string;
}

interface CommentItemProps {
  comment: BlogComment;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  onReport: (commentId: string) => void;
  onReply: (content: string, parentId: string) => Promise<void> | void;
  level?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onLike,
  onDislike,
  onReport,
  onReply,
  level = 0,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isBelow } = useBreakpoint();

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      await onReply(replyContent, comment.id);
      setReplyContent('');
      setShowReplyForm(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: isBelow('sm') ? '2-digit' : 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`${
        level > 0
          ? 'ml-4 sm:ml-6 lg:ml-8 pl-3 sm:pl-4 border-l-2 border-gray-200 dark:border-gray-800'
          : ''
      }`}
    >
      <div className="flex items-start space-x-3 mb-4">
        <Avatar size={isBelow('sm') ? 'sm' : 'md'}>
          <AvatarImage src={comment.author?.avatar} />
          <AvatarFallback>{(comment.author?.name || 'G')[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-2">
            <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
              {comment.author?.name || 'Guest Reader'}
            </span>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              {formatDate(comment.createdAt)}
            </span>
            {comment.isReported && (
              <Badge variant="warning" className="text-xs">
                Reported
              </Badge>
            )}
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-3 leading-relaxed text-sm sm:text-base">
            {comment.content}
          </p>

          {/* Comment Actions */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(comment.id)}
              className="text-gray-500 dark:text-gray-400 hover:text-success-600 dark:hover:text-success-400 p-1 sm:p-2"
            >
              <ThumbsUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="text-xs sm:text-sm">{comment.likes || 0}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDislike(comment.id)}
              className="text-gray-500 dark:text-gray-400 hover:text-danger-600 dark:hover:text-danger-400 p-1 sm:p-2"
            >
              <ThumbsDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="text-xs sm:text-sm">{comment.dislikes || 0}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 p-1 sm:p-2"
            >
              <Reply className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="text-xs sm:text-sm">Reply</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onReport(comment.id)}
              className="text-gray-500 dark:text-gray-400 hover:text-warning-600 dark:hover:text-warning-400 p-1 sm:p-2"
            >
              <Flag className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="sr-only">Report</span>
            </Button>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={e => setReplyContent(e.target.value)}
                className="mb-3 text-sm sm:text-base"
                rows={3}
              />
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleReplySubmit}
                  disabled={!replyContent.trim() || isSubmitting}
                  className="w-full sm:w-auto"
                >
                  <Send className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  {isSubmitting ? 'Posting...' : 'Post Reply'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplyForm(false)}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4">
          {comment.replies.map(reply => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onLike={onLike}
              onDislike={onDislike}
              onReport={onReport}
              onReply={onReply}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const BlogCommentSection: React.FC<BlogCommentSectionProps> = ({
  postId,
  initialComments,
  onAddComment,
  onLikeComment,
  onDislikeComment,
  onReportComment,
  className = '',
}) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isBelow } = useBreakpoint();

  const {
    comments,
    loading,
    error,
    addComment,
    likeComment,
    dislikeComment,
    reportComment,
    getCommentCount,
  } = useComments({ postId, initialComments });

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      if (onAddComment) {
        await onAddComment(newComment);
      } else {
        await addComment(newComment);
      }
      setNewComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = async (content: string, parentId: string) => {
    if (onAddComment) {
      await onAddComment(content, parentId);
    } else {
      await addComment(content, parentId);
    }
  };

  const handleLike = (commentId: string) => {
    likeComment(commentId);
    onLikeComment?.(commentId);
  };

  const handleDislike = (commentId: string) => {
    dislikeComment(commentId);
    onDislikeComment?.(commentId);
  };

  const handleReport = (commentId: string) => {
    reportComment(commentId);
    onReportComment?.(commentId);
  };

  return (
    <div className={`mt-8 sm:mt-12 ${className}`}>
      <Card className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center text-lg sm:text-xl text-gray-900 dark:text-gray-100">
            <MessageCircle className="h-5 w-5 mr-2 text-primary-600 dark:text-primary-400" />
            Comments ({getCommentCount()})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Comment Form */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-start space-x-3">
              <Avatar size={isBelow('sm') ? 'sm' : 'md'}>
                <AvatarFallback>G</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Share your thoughts or questions..."
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  className="mb-3 text-sm sm:text-base"
                  rows={isBelow('sm') ? 3 : 4}
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Be respectful and constructive in your comments.
                  </p>
                  <Button
                    variant="primary"
                    onClick={handleSubmitComment}
                    disabled={!newComment.trim() || isSubmitting}
                    size={isBelow('sm') ? 'sm' : 'md'}
                    className="w-full sm:w-auto"
                  >
                    <Send className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <Alert variant="danger" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Comments List */}
          <div className="space-y-4 sm:space-y-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary-600 mx-auto"></div>
                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
                  Loading comments...
                </p>
              </div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  No comments yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Be the first to share your thoughts!
                </p>
              </div>
            ) : (
              comments.map(comment => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onLike={handleLike}
                  onDislike={handleDislike}
                  onReport={handleReport}
                  onReply={handleReply}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
