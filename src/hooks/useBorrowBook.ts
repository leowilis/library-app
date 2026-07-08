import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { EndPoints, Query_Keys } from '@/constants';
import type { CreateLoanPayload } from '@/types/loan';
import type { Book } from '@/types/book';
import { bookKeys, meKeys } from '@/lib/queryKeys';

interface BorrowContext {
  previousDetail: Book | undefined;
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
      const res = await api.post(EndPoints.Loans, payload);
      return res.data;
    },

    onMutate: async (payload) => {
      await queryClient.cancelQueries({
        queryKey: bookKeys.detail(payload.bookId),
      });

      const previousDetail = queryClient.getQueryData<Book>(
        bookKeys.detail(payload.bookId),
      );

      // Optimistically decrement available copies
      queryClient.setQueryData<Book>(bookKeys.detail(payload.bookId), (old) => {
        if (!old) return old;
        return {
          ...old,
          availableCopies: Math.max(0, (old.availableCopies ?? 1) - 1),
        };
      });
      return { previousDetail };
    },

    // Rollback on failure
    onError: (_err, payload, context) => {
      if (context) {
        queryClient.setQueryData(
          bookKeys.detail(payload.bookId),
          context.previousDetail,
        );
      }
      toast.error('Failed to borrow the book. Please try again.');
    },

    // Sync server state after success
    onSuccess: (_data, payload) => {
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: bookKeys.detail(payload.bookId),
      });
      queryClient.invalidateQueries({ queryKey: meKeys.loansAll() });
      toast.success('Book borrowed successfully!');
    },
  });
};
