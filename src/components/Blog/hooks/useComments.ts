import { useState, useCallback, useMemo, useEffect } from 'react';
import type { BlogComment } from '../types';
import { sampleBlogComments } from '../data/sampleData';
import { showToast } from '../../Toast';

export interface UseCommentsProps {
  postId: string;
  initialComments?: BlogComment[];
}

export interface UseCommentsReturn {
  comments: BlogComment[];
  loading: boolean;
  error: string | null;
  addComment: (content: string, parentId?: string) => Promise<void>;
  likeComment: (commentId: string) => void;
  dislikeComment: (commentId: string) => void;
  reportComment: (commentId: string) => void;
  deleteComment: (commentId: string) => void;
  getCommentCount: () => number;
}

/**
 * Custom hook for managing blog comments
 * Handles comment CRUD operations, moderation, and nested replies
 */
export const useComments = ({
  postId,
  initialComments,
}: UseCommentsProps): UseCommentsReturn => {
  const [comments, setComments] = useState<BlogComment[]>(() =>
    Array.isArray(initialComments)
      ? initialComments
      : sampleBlogComments.filter(comment => comment.postId === postId)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (Array.isArray(initialComments)) {
      setComments(initialComments);
    } else {
      setComments(sampleBlogComments.filter(comment => comment.postId === postId));
    }
  }, [postId, initialComments]);

  // Organize comments into tree structure
  const organizedComments = useMemo(() => {
    const commentMap = new Map<string, BlogComment>();
    const rootComments: BlogComment[] = [];

    comments.forEach(comment => {
      commentMap.set(String(comment.id), {
        ...comment,
        replies: Array.isArray(comment.replies) ? [...comment.replies] : [],
      });
    });

    comments.forEach(comment => {
      const commentWithReplies = commentMap.get(String(comment.id))!;

      if (comment.parentId) {
        const parent = commentMap.get(String(comment.parentId));
        if (parent) {
          parent.replies = parent.replies || [];
          if (!parent.replies.some(r => String(r.id) === String(commentWithReplies.id))) {
            parent.replies.push(commentWithReplies);
          }
        } else {
          rootComments.push(commentWithReplies);
        }
      } else {
        rootComments.push(commentWithReplies);
      }
    });

    return rootComments;
  }, [comments]);

  const addComment = useCallback(
    async (content: string, parentId?: string) => {
      setLoading(true);
      setError(null);

      try {
        await new Promise(resolve => setTimeout(resolve, 300));

        const newComment: BlogComment = {
          id: `c${Date.now()}`,
          postId,
          parentId,
          author: {
            id: 'current-user',
            name: 'Guest Reader',
          },
          content,
          createdAt: new Date().toISOString(),
          likes: 0,
          dislikes: 0,
          isModerated: true,
          isReported: false,
        };

        setComments(prev => [...prev, newComment]);
        showToast.success('Comment added successfully!');
      } catch {
        setError('Failed to add comment');
        showToast.error('Failed to add comment');
      } finally {
        setLoading(false);
      }
    },
    [postId]
  );

  const likeComment = useCallback((commentId: string) => {
    setComments(prev =>
      prev.map(comment =>
        String(comment.id) === String(commentId)
          ? { ...comment, likes: (comment.likes || 0) + 1 }
          : comment
      )
    );
  }, []);

  const dislikeComment = useCallback((commentId: string) => {
    setComments(prev =>
      prev.map(comment =>
        String(comment.id) === String(commentId)
          ? { ...comment, dislikes: (comment.dislikes || 0) + 1 }
          : comment
      )
    );
  }, []);

  const reportComment = useCallback((commentId: string) => {
    setComments(prev =>
      prev.map(comment =>
        String(comment.id) === String(commentId)
          ? { ...comment, isReported: true }
          : comment
      )
    );
    showToast.info('Comment reported for moderation');
  }, []);

  const deleteComment = useCallback((commentId: string) => {
    setComments(prev => prev.filter(comment => String(comment.id) !== String(commentId)));
    showToast.info('Comment deleted');
  }, []);

  const getCommentCount = useCallback(() => {
    return comments.length;
  }, [comments.length]);

  return {
    comments: organizedComments,
    loading,
    error,
    addComment,
    likeComment,
    dislikeComment,
    reportComment,
    deleteComment,
    getCommentCount,
  };
};
