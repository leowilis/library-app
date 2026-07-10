import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryKey,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { EndPoints } from '@/constants';
import { api } from '@/lib/api';
import { invalidateReview, rollbackReviews } from '@/lib/queryHelpers';
import { meKeys, reviewKeys } from '@/lib/queryKeys';
import { createOptimisticReview } from '@/lib/reviewHelpers';

import type { Review, SubmitReviewPayload } from '@/types/review';

interface ReviewContext {
  previous: Array<[QueryKey, Review[] | undefined]>;
}

// Fetch reviews of a book.
export const useBookReviews = (
  bookId: number,
  params?: {
    page?: number;
    limit?: number;
  },
) => {
  return useQuery<Review[]>({
    queryKey: [...reviewKeys.book(bookId), params],

    queryFn: async () => {
      const { data } = await api.get<{
        data: {
          reviews: Review[];
        };
      }>(EndPoints.ReviewsBook(bookId), {
        params,
      });

      return data.data.reviews;
    },

    enabled: !!bookId,
  });
};

// Create / Update Review
export const useSubmitReview = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, SubmitReviewPayload, ReviewContext>({
    mutationFn: async (payload) => {
      const { data } = await api.post(EndPoints.Reviews, payload);

      return data;
    },

    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: meKeys.reviewsAll(),
      });

      const previous = queryClient.getQueriesData<Review[]>({
        queryKey: meKeys.reviewsAll(),
      });

      const newReview = createOptimisticReview(payload, {
        name: 'You',
      });

      queryClient.setQueriesData<Review[]>(
        {
          queryKey: meKeys.reviewsAll(),
        },
        (old) => {
          // CREATE
          if (!('id' in payload)) {
            if (!old) {
              return [newReview];
            }

            const exists = old.some(
              (review) => review.bookId === payload.bookId,
            );

            if (!exists) {
              return [newReview, ...old];
            }

            return old;
          }

          // UPDATE
          if (!old) return old;

          return old.map((review) =>
            review.id === payload.id
              ? {
                  ...review,
                  star: payload.star,
                  comment: payload.comment ?? '',
                }
              : review,
          );
        },
      );

      return {
        previous,
      };
    },

    onError: (_error, _payload, context) => {
      if (context) {
        rollbackReviews(queryClient, context.previous);
      }

      toast.error('Failed to submit review');
    },

    onSuccess: () => {
      toast.success('Review submitted successfully!');
    },

    onSettled: async (_data, _error, variables) => {
      if (!variables) return;

      await invalidateReview(queryClient, variables.bookId);
    },
  });
};

// Delete Review
export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, number, ReviewContext>({
    mutationFn: async (reviewId) => {
      const { data } = await api.delete(EndPoints.Review(reviewId));

      return data;
    },

    onMutate: async (reviewId) => {
      await queryClient.cancelQueries({
        queryKey: meKeys.reviewsAll(),
      });

      const previous = queryClient.getQueriesData<Review[]>({
        queryKey: meKeys.reviewsAll(),
      });

      queryClient.setQueriesData<Review[]>(
        {
          queryKey: meKeys.reviewsAll(),
        },
        (old) => old?.filter((review) => review.id !== reviewId),
      );

      return {
        previous,
      };
    },

    onError: (_error, _reviewId, context) => {
      if (context) {
        rollbackReviews(queryClient, context.previous);
      }

      toast.error('Failed to delete review');
    },

    onSuccess: () => {
      toast.success('Review deleted successfully!');
    },

    onSettled: async () => {
      await invalidateReview(queryClient);
    },
  });
};
