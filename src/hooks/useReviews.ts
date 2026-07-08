import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EndPoints, Query_Keys } from '@/constants';
import type { CreateReviewPayload, Review } from '@/types/review';
import { api } from '@/lib/api';
import { toast } from 'sonner';

// Types
interface ReviewContext {
  previousReviews: Review[] | undefined;
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
    queryKey: [Query_Keys.ReviewsBook, bookId, params],
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

/**
 * Submits a new review with optimistic UI.
 * On mutate: immediately prepends a temporary review to MeReviews cache.
 * On error: rolls back to previous reviews and shows a toast.
 * On success: invalidates book reviews, user reviews, and book detail queries.
 */
export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, CreateReviewPayload, ReviewContext>({
    mutationFn: async (payload) => {
      const res = await api.post(EndPoints.Reviews, payload);
      return res.data;
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: [Query_Keys.MeReviews] });
      const previousReviews = queryClient.getQueryData<Review[]>([
        Query_Keys.MeReviews,
      ]);

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

      queryClient.setQueryData<Review[]>([Query_Keys.MeReviews], (old) => [
        newReview,
        ...(old ?? []),
      ]);

      return { previousReviews };
    },
    onError: (_err, _payload, context) => {
      queryClient.setQueryData(
        [Query_Keys.MeReviews],
        context?.previousReviews,
      );
      toast.error('Failed to submit review');
    },
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

// Update an existing review (star + comment) with optimistic UI.
export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    Error,
    { id: number; bookId: number; star: number; comment?: string },
    { previous: Array<[readonly unknown[], Review[] | undefined]> }
  >({
    mutationFn: async ({ id, star, comment }) => {
      const res = await api.put(EndPoints.Review(id), { star, comment });
      return res.data;
    },
    onMutate: async ({ id, star, comment }) => {
      await queryClient.cancelQueries({ queryKey: [Query_Keys.MeReviews] });

      // Snapshot every cached MeReviews entry (one per params variant) so we
      // can roll back precisely on error.
      const previous = queryClient.getQueriesData<Review[]>({
        queryKey: [Query_Keys.MeReviews],
      });

      queryClient.setQueriesData<Review[]>(
        { queryKey: [Query_Keys.MeReviews] },
        (old) =>
          old?.map((r) =>
            r.id === id ? { ...r, star, comment: comment ?? r.comment } : r,
          ),
      );

      return { previous };
    },
    onError: (_err, _payload, context) => {
      context?.previous.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
      toast.error('Failed to update review');
    },
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
 * Deletes a review with optimistic UI.
 * On mutate: immediately removes the review from MeReviews cache.
 * On error: rolls back to previous reviews and shows a toast.
 * On success: invalidates book reviews and user reviews queries.
 */
export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, number, ReviewContext>({
    mutationFn: async (id) => {
      const res = await api.delete(EndPoints.Review(id));
      return res.data;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: [Query_Keys.MeReviews] });
      const previousReviews = queryClient.getQueryData<Review[]>([
        Query_Keys.MeReviews,
      ]);

      queryClient.setQueryData<Review[]>([Query_Keys.MeReviews], (old) =>
        old?.filter((r) => r.id !== id),
      );

      return { previousReviews };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(
        [Query_Keys.MeReviews],
        context?.previousReviews,
      );
      toast.error('Failed to delete review');
    },
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
