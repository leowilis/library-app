import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EndPoints, Query_Keys } from '@/constants';
import type { CreateReviewPayload, Review } from '@/types/review';
import { api } from '@/lib/api';
import { toast } from 'sonner';

type ReviewsCache = {
  data?: {
    reviews?: Review[];
  };
};

/**
 * Fetches paginated reviews for a specific book
 * Query is disabled until a valid `bookId` is provided
 */
export const useBookReviews = (
  bookId: number,
  params?: { page?: number; limit?: number },
) => {
  return useQuery({
    queryKey: [Query_Keys.ReviewsBook, bookId, params],
    queryFn: async () => {
      const res = await api.get(EndPoints.ReviewsBook(bookId), { params });
      return res.data;
    },
    enabled: !!bookId,
  });
};

/**
 * Submits a new review with optimistic UI
 * On mutate: immediately prepends a temporary review to `MeReviews` cache
 * On error: rolls back to previous reviews and shows a toast
 * On success: invalidates book reviews, user reviews, and book detail queries
 */
export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateReviewPayload) => {
      const res = await api.post(EndPoints.Reviews, payload);
      return res.data;
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: [Query_Keys.MeReviews] });
      const previousReviews = queryClient.getQueryData([Query_Keys.MeReviews]);

      queryClient.setQueryData(
        [Query_Keys.MeReviews],
        (old: ReviewsCache | undefined) => {
          if (!old) return old;
          const newReview: Review = {
            id: Date.now(),
            star: payload.star,
            comment: payload.comment ?? '',
            bookId: payload.bookId,
            createdAt: new Date().toISOString(),
            book: {
              id: payload.bookId,
              title: '',
              coverImage: '',
              author: { name: '' },
              category: { name: '' },
            },
          };
          return {
            ...old,
            data: {
              ...old.data,
              reviews: [newReview, ...(old.data?.reviews ?? [])],
            },
          };
        },
      );

      return { previousReviews };
    },
    // Rollback on failure
    onError: (_err, _payload, context) => {
      queryClient.setQueryData(
        [Query_Keys.MeReviews],
        context?.previousReviews,
      );
      toast.error('Failed to submit review');
    },
    // Sync server state after success
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.ReviewsBook, variables.bookId],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.MeReviews],
        exact: false,
      });
      queryClient.invalidateQueries({ queryKey: [Query_Keys.BooksDetail] });
    },
  });
};

/**
 * Deletes a review with optimistic UI
 * On mutate: immediately removes the review from `MeReviews` cache
 * On error: rolls back to previous reviews and shows a toast
 * On success: invalidates book reviews and user reviews queries
 */
export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete(EndPoints.Review(id));
      return res.data;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [Query_Keys.MeReviews] });
      const previousReviews = queryClient.getQueryData([Query_Keys.MeReviews]);

      // Optimistically remove the review from cache
      queryClient.setQueryData(
        [Query_Keys.MeReviews],
        (old: ReviewsCache | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              reviews: (old.data?.reviews ?? []).filter((r) => r.id !== id),
            },
          };
        },
      );

      return { previousReviews };
    },
    // Rollback on failure
    onError: (_err, _id, context) => {
      queryClient.setQueryData(
        [Query_Keys.MeReviews],
        context?.previousReviews,
      );
      toast.error('Failed to delete review');
    },
    // Sync server state after success
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.ReviewsBook],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.MeReviews],
        exact: false,
      });
    },
  });
};
