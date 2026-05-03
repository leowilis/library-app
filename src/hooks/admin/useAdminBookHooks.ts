import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { EndPoints, Query_Keys } from '@/constants';
import type { AdminBook, AdminBooksResponse } from '@/types/admin/admin';

// Types

const PAGE_SIZE = 10;

interface DeleteContext {
  previous: AdminBooksResponse | undefined;
}

// Hooks

// Fetches a paginated list of books from `GET /api/admin/books`.
export function useAdminBooks(page: number) {
  return useQuery<AdminBooksResponse>({
    queryKey: [Query_Keys.AdminBooks, page],
    queryFn: async () => {
      const res = await api.get<{ data: AdminBooksResponse }>(
        EndPoints.AdminBooks,
        {
          params: { page, limit: PAGE_SIZE },
        },
      );
      return res.data.data;
    },
  });
}

/**
 * Deletes a book by ID with optimistic UI update.
 * Immediately removes the book from the cache and rolls back on failure.
 */
export function useDeleteBook(page: number, onSuccess: () => void) {
  const queryClient = useQueryClient();

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
    onError: (err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          [Query_Keys.AdminBooks, page],
          context.previous,
        );
      }
      toast.error(err.response?.data?.message ?? 'Failed to delete book');
    },
    onSuccess: () => {
      toast.success('Book deleted!');
      queryClient.invalidateQueries({ queryKey: [Query_Keys.AdminBooks] });
      onSuccess();
    },
  });
}
