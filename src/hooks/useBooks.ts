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

// Helpers

function extractBooks(data: unknown): Book[] {
  if (!data || typeof data !== 'object') return [];
  const d = data as Record<string, unknown>;
  const nested = d?.data as Record<string, unknown> | undefined;
  return (
    (nested?.data as { books?: Book[] })?.books ??
    (nested?.books as Book[]) ??
    (d?.books as Book[]) ??
    []
  );
}

function extractPagination(data: unknown): BooksResponse['pagination'] {
  if (!data || typeof data !== 'object') return undefined;
  const d = data as Record<string, unknown>;
  const nested = d?.data as Record<string, unknown> | undefined;
  return (
    (nested?.data as BooksResponse)?.pagination ??
    (nested?.pagination as BooksResponse['pagination']) ??
    (d?.pagination as BooksResponse['pagination'])
  );
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
    select: (data) => ({
      books: extractBooks(data),
      pagination: extractPagination(data),
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
  return useQuery<unknown, Error, Book>({
    queryKey: [Query_Keys.BooksDetail, id],
    queryFn: async () => {
      const res = await api.get(EndPoints.BooksDetail(id));
      return res.data;
    },
    enabled: !!id,
    select: (data) => {
      if (!data || typeof data !== 'object') return data as Book;
      const d = data as Record<string, unknown>;
      const nested = d?.data as Record<string, unknown> | undefined;
      return (nested?.book ?? nested ?? data) as Book;
    },
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
    select: (data): Book[] => {
      if (Array.isArray(data)) return data as Book[];
      if (!data || typeof data !== 'object') return [];
      const d = data as Record<string, unknown>;
      if (Array.isArray(d?.books)) return d.books as Book[];
      const nested = d?.data as Record<string, unknown> | undefined;
      if (Array.isArray(nested?.books)) return nested.books as Book[];
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
