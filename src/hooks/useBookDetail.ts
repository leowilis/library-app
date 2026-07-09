import { useQuery } from '@tanstack/react-query';

import { EndPoints } from '@/constants';
import { api } from '@/lib/api';
import { bookKeys } from '@/lib/queryKeys';
import { extractResource } from '@/lib/bookResponse';

import type { Book } from '@/types/book';

export function useBookDetail(id: number) {
  return useQuery<Book>({
    queryKey: bookKeys.detail(id),

    queryFn: async () => {
      const { data } = await api.get(
        EndPoints.BooksDetail(id),
      );

      return extractResource<Book>(data, 'book');
    },

    enabled: !!id,
  });
}