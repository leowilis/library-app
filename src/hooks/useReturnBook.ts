import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { EndPoints } from '@/constants';
import { meKeys } from '@/lib/queryKeys';
import type { Loan } from '@/types/loan';
import { invalidateBorrow } from '@/lib/queryHelpers';

// Types
export interface ReturnBookPayload {
  loanId: number;
  bookId: number;
}

interface ReturnContext {
  previousLoans: Array<[QueryKey, Loan[] | undefined]>;
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
            loan.id === loanId
              ? { ...loan, status: 'RETURNED' as const }
              : loan,
          ),
      );

      return { previousLoans };
    },

    // Rollback on failure
    onError: (_err, _payload, context) => {
      context?.previousLoans.forEach(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
      toast.error('Failed to return book. Please try again.');
    },

    onSuccess: () => {
      toast.success('Book returned successfully!');
    },

    // Sync server state after success
    onSettled: async (_data, _error, variables) => {
      if (!variables) return;

      await invalidateBorrow(queryClient, variables.bookId);
    },
  });
};
