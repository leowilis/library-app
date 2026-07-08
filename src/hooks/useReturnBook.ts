import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { EndPoints } from '@/constants';
import { bookKeys, meKeys } from '@/lib/queryKeys';
import type { Loan } from '@/types/loan';

// Types

export interface ReturnBookPayload {
  loanId: number;
  bookId: number;
}

interface ReturnContext {
  previousLoans: Array<[readonly unknown[], Loan[] | undefined]>;
}

// Hook

/**
 * Returns a borrowed book by loan ID.
 * Optimistically marks the loan as RETURNED in the cache,
 * rolls back if the request fails.
 */
export const useReturnBook = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, ReturnBookPayload, ReturnContext>({
    mutationFn: async ({ loanId }) => {
      await api.patch(EndPoints.LoansReturn(loanId));
    },

    onMutate: async ({ loanId }) => {
      await queryClient.cancelQueries({ queryKey: meKeys.loansAll() });

      const previousLoans = queryClient.getQueriesData<Loan[]>({
        queryKey: meKeys.loansAll(),
      });

      queryClient.setQueriesData<Loan[]>(
        { queryKey: meKeys.loansAll() },
        (old) =>
          old?.map((loan) =>
            loan.id === loanId ? { ...loan, status: 'RETURNED' as const } : loan,
          ),
      );

      return { previousLoans };
    },

    onError: (_err, _payload, context) => {
      context?.previousLoans.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
      toast.error('Failed to return book. Please try again.');
    },

    // `variables` here is the same `{ loanId, bookId }` passed to mutate(),
    // so we can target exactly the book that was returned instead of
    // invalidating every cached book detail.
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: meKeys.loansAll() });
      queryClient.invalidateQueries({ queryKey: bookKeys.lists() });
      queryClient.invalidateQueries({ queryKey: bookKeys.detail(variables.bookId) });
      toast.success('Book returned successfully!');
    },
  });
};