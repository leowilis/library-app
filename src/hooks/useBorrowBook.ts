import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { EndPoints } from '@/constants';
import type { CreateLoanPayload } from '@/types/loan';
import type { Book } from '@/types/book';
import { bookKeys } from '@/lib/queryKeys';
import { invalidateBorrow, invalidateCart } from '@/lib/queryHelpers';

interface BorrowContext {
  previousBook?: Book;
}

/**
 * Handles borrowing a book with optimistic UI
 * On mutate: immediately decrements `availableCopies` in the book detail cache.
 * On error: rolls back the book detail cache.
 * On success: invalidates books, book detail, and loan queries to sync with the server.
 */
export const useBorrowBook = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, CreateLoanPayload, BorrowContext>({
    mutationFn: async (payload) => {
      const { data } = await api.post(EndPoints.Loans, payload);
      return data;
    },

    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: bookKeys.detail(payload.bookId),
      });

      const previousBook = queryClient.getQueryData<Book>(
        bookKeys.detail(payload.bookId),
      );

      // Optimistically decrement available copies
      queryClient.setQueryData<Book>(bookKeys.detail(payload.bookId), (old) => {
        if (!old) return old;

        return {
          ...old,
          availableCopies: Math.max(0, (old.availableCopies ?? 0) - 1),
        };
      });

      return { previousBook };
    },

    // Rollback on failure
    onError: (_error, payload, context) => {
      if (context?.previousBook) {
        queryClient.setQueryData(
          bookKeys.detail(payload.bookId),
          context.previousBook,
        );
      }

      toast.error('Failed to borrow the book.');
    },

    onSuccess: () => {
      toast.success('Book borrowed successfully!');
    },

    // Sync server state after success
    onSettled: async (_data, _error, payload) => {
      await Promise.all([
        invalidateBorrow(queryClient, payload.bookId),
        invalidateCart(queryClient),
      ]);
    },
  });
};
