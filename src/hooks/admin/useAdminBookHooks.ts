import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { EndPoints, Query_Keys } from '@/constants';
import type { AdminBook, AdminBooksResponse } from '@/types/admin/admin';

const PAGE_SIZE = 10;

/**
 * Fetches a paginated list of books from `GET /api/admin/books`.
 */
export function useAdminBooks(page: number) {
  return useQuery<AdminBooksResponse>({
    queryKey: [Query_Keys.AdminBooks, page],
    queryFn: async () => {
      const res = await api.get(EndPoints.AdminBooks, {
        params: { page, limit: PAGE_SIZE },
      });
      return res.data?.data ?? res.data;
    },
  });
}

// useDeleteBook

/**
 * Deletes a book by ID with optimistic UI update.
 * Immediately removes the book from the cache and rolls back on failure.
 *
 * Current page (used to target the correct query cache entry).
 * Callback fired after successful deletion.
 */
export function useDeleteBook(page: number, onSuccess: () => void) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id: number) => {
      await api.delete(EndPoints.BooksDetail(id));
    },
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({
        queryKey: [Query_Keys.AdminBooks, page],
      });

      const previous = queryClient.getQueryData<AdminBooksResponse>([
        Query_Keys.AdminBooks,
        page,
      ]);

      queryClient.setQueryData<AdminBooksResponse>(
        [Query_Keys.AdminBooks, page],
        (old) => {
          if (!old) return old;
          return {
            ...old,
            books: old.books.filter((b: AdminBook) => b.id !== id),
          };
        },
      );

      return { previous };
    },
    onError: (_err: any, _id, context: any) => {
      if (context?.previous) {
        queryClient.setQueryData(
          [Query_Keys.AdminBooks, page],
          context.previous,
        );
      }
      const message = _err?.response?.data?.message ?? 'Failed to delete book';
      toast.error(message);
    },
    onSuccess: () => {
      toast.success('Book deleted!');
      queryClient.invalidateQueries({ queryKey: [Query_Keys.AdminBooks] });
      onSuccess();
    },
  });
}
