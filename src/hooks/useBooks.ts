import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EndPoints, Query_Keys } from '@/constants';
import type { Book, CreateBookPayload, UpdateBookPayload } from '@/types/book';
import { api } from '@/lib/api';

// Types

interface BooksResponse {
  books: Book[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
  };
}

// useBooks

/**
 * Fetches a paginated, filterable list of books.
 * Response is normalized via `select` to always return `BooksResponse`.
 */
export const useBooks = (params?: {
  q?: string;
  categoryId?: number;
  authorId?: number;
  minRating?: number;
  page?: number;
  limit?: number;
}) => {
  return useQuery<BooksResponse>({
    queryKey: [Query_Keys.Books, params],
    queryFn: async () => {
      const res = await api.get(EndPoints.Book, { params });
      return res.data;
    },
    select: (data: any) => ({
      books: data?.data?.data?.books ?? data?.data?.books ?? data?.books ?? [],
      pagination: data?.data?.data?.pagination ?? data?.data?.pagination ?? data?.pagination,
    }),
  });
};

// useBookDetail

/**
 * Fetches a single book by ID.
 * Query is disabled until a valid `id` is provided.
 * Response is normalized via `select` to always return a `Book` object.
 */
export const useBookDetail = (id: number) => {
  return useQuery<Book>({
    queryKey: [Query_Keys.BooksDetail, id],
    queryFn: async () => {
      const res = await api.get(EndPoints.BooksDetail(id));
      return res.data;
    },
    enabled: !!id,
    select: (data: any) => data?.data?.book ?? data?.data ?? data,
  });
};

// useRecommendedBooks

/**
 * Fetches recommended books, sortable by rating or popularity.
 * Response is normalized via `select` to always return `Book[]`.
 */
export const useRecommendedBooks = (params?: {
  by?: 'rating' | 'popular';
  categoryId?: number;
  page?: number;
  limit?: number;
}) => {
  return useQuery<Book[]>({
    queryKey: [Query_Keys.BooksRecommend, params],
    queryFn: async () => {
      const res = await api.get(EndPoints.BooksRecommend, { params });
      return res.data;
    },
    select: (data: any) => {
      if (Array.isArray(data)) return data;
      if (Array.isArray(data?.books)) return data.books;
      if (Array.isArray(data?.data?.books)) return data.data.books;
      return [];
    },
  });
};

// useCreateBook

// Creates a new book. Invalidates the book list on success
export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateBookPayload) => {
      const res = await api.post(EndPoints.Book, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Query_Keys.Books] });
    },
  });
};

// useUpdateBook

/**
 * Updates an existing book by ID.
 * Invalidates both the book list and the specific book detail on success.
 */
export const useUpdateBook = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateBookPayload) => {
      const res = await api.put(EndPoints.BooksDetail(id), payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Query_Keys.Books] });
      queryClient.invalidateQueries({ queryKey: [Query_Keys.BooksDetail, id] });
    },
  });
};

// useDeleteBook

// Deletes a book by ID. Invalidates the book list on success
export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete(EndPoints.BooksDetail(id));
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Query_Keys.Books] });
    },
  });
};