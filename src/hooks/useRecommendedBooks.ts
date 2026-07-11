import { useQuery } from '@tanstack/react-query';

import { EndPoints } from '@/constants';
import { api } from '@/lib/api';
import { extractBooks } from '@/lib/bookResponse';
import { bookKeys } from '@/lib/queryKeys';

import type { Book } from '@/types/book';

interface RecommendParams {
  by?: 'rating' | 'popular';
  categoryId?: number;
  page?: number;
  limit?: number;
}

/**
 * Fetches recommended books from the backend.
 * Response is normalized via extractBooks().
 */
export function useRecommendedBooks(params?: RecommendParams) {
  const normalizedParams = {
    by: params?.by ?? 'rating',
    categoryId: params?.categoryId,
    page: params?.page ?? 1,
    limit: params?.limit ?? 6,
  };

  return useQuery<Book[]>({
    queryKey: bookKeys.recommend(normalizedParams),

    queryFn: async () => {
      const { data } = await api.get(EndPoints.BooksRecommend, {
        params: normalizedParams,
      });

      return extractBooks(data);
    },

    enabled: !!normalizedParams.categoryId,
  });
}
