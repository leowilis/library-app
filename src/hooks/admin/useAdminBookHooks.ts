import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

import { EndPoints } from '@/constants';
import { adminBookKeys } from '@/lib/queryKeys';
import { api } from '@/lib/api';

import type { AdminBook, AdminBooksResponse } from '@/types/admin/admin';

const PAGE_SIZE = 10;

interface DeleteContext {
  previous: AdminBooksResponse | undefined;
}

// Fetch paginated admin books with optional server-side search.
export function useAdminBooks(page: number, q = '') {
  const normalizedQuery = q.trim();

  return useQuery<AdminBooksResponse>({
    queryKey: adminBookKeys.list(page, normalizedQuery),

    queryFn: async () => {
      const res = await api.get<{ data: AdminBooksResponse }>(
        EndPoints.AdminBooks,
        {
          params: {
            page,
            limit: PAGE_SIZE,
            status: 'all',
            ...(normalizedQuery && { q: normalizedQuery }),
          },
        },
      );

      return res.data.data;
    },

    // Prevent table flicker when page/search changes
    placeholderData: (previous) => previous,
  });
}

// Delete a book with optimistic cache update.
export function useDeleteBook(page: number, q: string, onSuccess: () => void) {
  const queryClient = useQueryClient();
  const normalizedQuery = q.trim();

  return useMutation<
    void,
    AxiosError<{ message?: string }>,
    number,
    DeleteContext
  >({
    mutationFn: async (id) => {
      await api.delete(EndPoints.BooksDetail(id));
    },

    onMutate: async (id) => {
      const queryKey = adminBookKeys.list(page, normalizedQuery);

      await queryClient.cancelQueries({
        queryKey,
      });

      const previous = queryClient.getQueryData<AdminBooksResponse>(queryKey);

      queryClient.setQueryData<AdminBooksResponse>(queryKey, (old) => {
        if (!old) return old;

        return {
          ...old,
          books: old.books.filter((book: AdminBook) => book.id !== id),
        };
      });

      return { previous };
    },

    onError: (error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          adminBookKeys.list(page, normalizedQuery),
          context.previous,
        );
      }

      toast.error(error.response?.data?.message ?? 'Failed to delete book.');
    },

    onSuccess: () => {
      toast.success('Book deleted successfully.');

      queryClient.invalidateQueries({
        queryKey: adminBookKeys.all,
      });

      onSuccess();
    },
  });
}
