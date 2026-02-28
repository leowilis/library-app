import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Book, CreateBookPayload, UpdateBookPayload } from "./type";
import { endPoints, fetchBooks } from "./api";


export const useBooks = (params?: {
  q?: string;
  categoryId?: number;
  authorId?: number;
  minRating?: number;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [fetchBooks.Book, params],
    queryFn: async () => {
      const data = await api.get(endPoints.Book, { params });
      return data;
    },
  });
};

// Fetch book details by ID, only if ID is provided
export const useBookDetail = (id: number) => {
  return useQuery({
    queryKey: [fetchBooks.Books_Detail, id],
    queryFn: async () => {
      const data = await api.get(endPoints.Books_Detail(id));
      return data;
    },
    enabled: !!id, // Only fetch when id is available
  });
};

// Fetch recommended books, with optional sorting and filtering parameters
export const useRecommendedBooks = (params?: {
  by?: "rating" | "popularity";
  categoryId?: number;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [fetchBooks.Books_Recommended, params],
    queryFn: async () => {
      const data = await api.get(endPoints.Books_Recommended, { params });
      return data;
    },
    select: (data) => data.data.books as Book[],
  });
};

// Mutations for creating, updating, and deleting books, with cache invalidation to keep data fresh
export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateBookPayload) => {
      const data = await api.post(endPoints.Book, payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [fetchBooks.Book] });
    },
  });
};

// Update book details by ID, with cache invalidation for both the book list and the specific book detail
export const useUpdateBook = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateBookPayload) => {
      const data = await api.put(endPoints.Books_Detail(id), payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [fetchBooks.Book] });
      queryClient.invalidateQueries({
        queryKey: [fetchBooks.Books_Detail, id],
      });
    },
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const data = await api.delete(endPoints.Books_Detail(id));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [fetchBooks.Book] });
    },
  });
};
