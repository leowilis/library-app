import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EndPoints, Query_Keys } from "@/constants";
import type { CreateReviewPayload } from "@/types/review";
import api from "@/lib/api";

export const useBookReviews = (
  bookId: number,
  params?: { page?: number; limit?: number },
) => {
  return useQuery({
    queryKey: [Query_Keys.ReviewsBook, bookId, params],
    queryFn: async () => {
      const data = await api.get(EndPoints.ReviewsBook(bookId), { params });
      return data;
    },
    enabled: !!bookId,
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateReviewPayload) => {
      const data = await api.post(EndPoints.Reviews, payload);
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [Query_Keys.ReviewsBook, variables.bookId],
      });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const data = await api.delete(EndPoints.Review(id));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Query_Keys.ReviewsBook] });
      queryClient.invalidateQueries({ queryKey: [Query_Keys.MeReviews] });
    },
  });
};
