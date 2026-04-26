import { useQuery } from "@tanstack/react-query";
import { EndPoints, Query_Keys } from "@/constants";
import { api } from "@/lib/api";
import type { Author, AuthorBooksResponse, PopularAuthor } from "@/types/author";

// useAuthors

// Fetches a list of authors, optionally filtered by search query
export const useAuthors = (q?: string) => {
  return useQuery<Author[]>({
    queryKey: [Query_Keys.Authors, q],
    queryFn: async () => {
      const res = await api.get(EndPoints.Authors, { params: { q } });
      return res.data?.data?.authors ?? res.data?.authors ?? res.data ?? [];
    },
  });
};

// usePopularAuthors

// Fetches the most popular authors ranked by book count
export const usePopularAuthors = (limit?: number) => {
  return useQuery<PopularAuthor[]>({
    queryKey: [Query_Keys.AuthorsPopular, limit],
    queryFn: async () => {
      const res = await api.get(EndPoints.AuthorsPopular, { params: { limit } });
      return Array.isArray(res.data?.data?.authors)
        ? res.data.data.authors
        : [];
    },
  });
};

// useAuthorBooks

/**
 * Fetches an author's profile and their books by author ID
 * Query is disabled until a valid `id` is provided
 */
export const useAuthorBooks = (
  id: number,
  params?: { page?: number; limit?: number },
) => {
  return useQuery<AuthorBooksResponse>({
    queryKey: [Query_Keys.AuthorsBook, id, params],
    queryFn: async () => {
      const res = await api.get(EndPoints.AuthorBooks(id), { params });
      return res.data?.data ?? res.data;
    },
    enabled: !!id,
  });
};