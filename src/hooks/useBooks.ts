import { useQuery } from '@tanstack/react-query';

import { EndPoints } from '@/constants';
import { api } from '@/lib/api';
import { bookKeys, type BooksParams } from '@/lib/queryKeys';
import { extractBooks, extractPagination } from '@/lib/bookResponse';

import type { Book } from '@/types/book';
import type { ApiResponse, Pagination } from '@/types/api';

interface BooksPayload {
  books: Book[];
  pagination?: Pagination;
}

interface BooksResponse {
  books: Book[];
  pagination?: Pagination;
}

export function useBooks(params?: BooksParams) {
  return useQuery<BooksResponse>({
    queryKey: bookKeys.list(params),

    queryFn: async () => {
      const { data } = await api.get<ApiResponse<BooksPayload>>(
        EndPoints.Book,
        {
          params,
        },
      );

      return {
        books: extractBooks(data),
        pagination: extractPagination(data),
      };
    },
  });
}
