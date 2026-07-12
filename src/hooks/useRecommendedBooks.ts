import { useQuery } from '@tanstack/react-query';

import { EndPoints } from '@/constants';
import { api } from '@/lib/api';
import { bookKeys } from '@/lib/queryKeys';

import type { Book } from '@/types/book';
import type { ApiResponse } from '@/types/api';

interface RecommendPayload {
  mode: string;
  books: Book[];
}

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
      const { data } = await api.get<ApiResponse<RecommendPayload>>(
        EndPoints.BooksRecommend,
        {
          params: normalizedParams,
        },
      );

      return data.data.books;
    },

    enabled: !!normalizedParams.categoryId,
  });
}
