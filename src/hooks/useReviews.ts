import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EndPoints } from '@/constants';
import type { CreateReviewPayload, Review } from '@/types/review';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { bookKeys, reviewKeys } from '@/lib/queryKeys';

// Types
interface ReviewContext {
  previous: Array<[readonly unknown[], Review[] | undefined]>;
}

// Helper

// Rolls back every snapshotted MeReviews cache entry (used by all 3 mutations below).
function rollbackReviews(
  queryClient: ReturnType<typeof useQueryClient>,
  previous: ReviewContext['previous'],
) {
  previous.forEach(([key, data]) => {
    queryClient.setQueryData(key, data);
  });
}

/**
 * Invalidation shared by create/update/delete: book's own reviews, every
 * cached "my reviews" variant, and book detail (rating/reviewCount change).
 */
function invalidateAfterReviewChange(
  queryClient: ReturnType<typeof useQueryClient>,
  bookId?: number,
) {
  if (bookId) {
    queryClient.invalidateQueries({ queryKey: reviewKeys.book(bookId) });
  }
  queryClient.invalidateQueries({ queryKey: reviewKeys.meAll() });
  queryClient.invalidateQueries({ queryKey: bookKeys.details() });
}

// Hooks

/**
 * Fetches paginated reviews for a specific book.
 * Query is disabled until a valid `bookId` is provided.
 */
export const useBookReviews = (
  bookId: number,
  params?: { page?: number; limit?: number },
) => {
  return useQuery<Review[]>({
    queryKey: [...reviewKeys.book(bookId), params],
    queryFn: async () => {
      const res = await api.get<{ data: { reviews: Review[] } }>(
        EndPoints.ReviewsBook(bookId),
        { params },
      );
      return res.data.data.reviews;
    },
    enabled: !!bookId,
  });
};

// Submits a new review with optimistic UI.
export const useSubmitReview = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, CreateReviewPayload, ReviewContext>({
    mutationFn: async (payload) => {
      const res = await api.post(EndPoints.Reviews, payload);
      return res.data;
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: reviewKeys.meAll() });

      const previous = queryClient.getQueriesData<Review[]>({
        queryKey: reviewKeys.meAll(),
      });

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

      queryClient.setQueriesData<Review[]>(
        { queryKey: reviewKeys.meAll() },
        (old) => {
          if (!old) return [newReview];

          const existingIndex = old.findIndex(
            (review) => review.bookId === payload.bookId,
          );

          if (existingIndex === -1) {
            return [newReview, ...old];
          }

          return old.map((review) =>
            review.bookId === payload.bookId
              ? {
                  ...review,
                  star: payload.star,
                  comment: payload.comment ?? '',
                }
              : review,
          );
        },
      );

      return { previous };
    },
    onError: (_err, _payload, context) => {
      if (context) rollbackReviews(queryClient, context.previous);
      toast.error('Failed to submit review');
    },
    onSuccess: (_, variables) => {
      invalidateAfterReviewChange(queryClient, variables.bookId);
    },
  });
};

// Deletes a review with optimistic UI.
export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, number, ReviewContext>({
    mutationFn: async (id) => {
      const res = await api.delete(EndPoints.Review(id));
      return res.data;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: reviewKeys.meAll() });

      const previous = queryClient.getQueriesData<Review[]>({
        queryKey: reviewKeys.meAll(),
      });

      queryClient.setQueriesData<Review[]>(
        { queryKey: reviewKeys.meAll() },
        (old) => old?.filter((r) => r.id !== id),
      );

      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context) rollbackReviews(queryClient, context.previous);
      toast.error('Failed to delete review');
    },
    onSuccess: () => {
      invalidateAfterReviewChange(queryClient);
    },
  });
};
