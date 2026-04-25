import { useQuery } from "@tanstack/react-query";
import { EndPoints, Query_Keys } from "@/constants";
import { api } from "@/lib/api";

// Fetches a list of authors, optionally filtered by search query
export const useAuthors = (q?: string) => {
  return useQuery({
    queryKey: [Query_Keys.Authors, q],
    queryFn: async () => {
      const data = await api.get(EndPoints.Authors, { params: { q } });
      return data;
    },
  });
};

// Fetches the most popular authors ranked by book count
export const usePopularAuthors = (limit?: number) => {
  return useQuery({
    queryKey: [Query_Keys.AuthorsPopular, limit],
    queryFn: async () => {
      const res = await api.get(EndPoints.AuthorsPopular, {
        params: { limit },
      });
      return Array.isArray(res.data?.data?.authors)
        ? res.data.data.authors
        : [];
    },
  });
};

/**
 * Fetches paginated books written by a specific author
 * Query is disabled until a valid `id` is provided
 */
export const useAuthorBooks = (
  id: number,
  params?: { page?: number; limit?: number },
) => {
  return useQuery({
    queryKey: [Query_Keys.AuthorsBook, id, params],
    queryFn: async () => {
      const data = await api.get(EndPoints.AuthorBooks(id), { params });
      return data;
    },
    enabled: !!id,
  });
};
