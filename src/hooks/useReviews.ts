import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EndPoints, Query_Keys } from '@/constants';
import type { CreateReviewPayload } from '@/types/review';
import { api } from '@/lib/api';

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

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateReviewPayload) => {
      const res = await api.post(EndPoints.Reviews, payload);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.ReviewsBook, variables.bookId],
      });
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.MeReviews],
        exact: false,
      });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete(EndPoints.Review(id));
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Query_Keys.ReviewsBook], exact: false, });
      queryClient.invalidateQueries({ queryKey: [Query_Keys.MeReviews], exact: false, });
    },
  });
};
