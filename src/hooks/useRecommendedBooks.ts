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
  return useQuery<Book[]>({
    queryKey: bookKeys.recommend(params),
    queryFn: async () => {
      const { data } = await api.get(EndPoints.BooksRecommend, {
        params,
      });

      return extractBooks(data);
    },
  });
}
