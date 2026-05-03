import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { EndPoints, Query_Keys } from '@/constants';
import type { Loan } from '@/types/loan';

// Types

interface ReturnContext {
  previousLoans: Loan[] | undefined;
}

// Hook

/**
 * Returns a borrowed book by loan ID.
 * Optimistically marks the loan as RETURNED in the cache,
 * rolls back if the request fails.
 */
export const useReturnBook = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number, ReturnContext>({
    mutationFn: async (loanId) => {
      await api.patch(EndPoints.LoansReturn(loanId));
    },

    onMutate: async (loanId) => {
      await queryClient.cancelQueries({ queryKey: [Query_Keys.MeLoans] });

      const previousLoans = queryClient.getQueryData<Loan[]>([
        Query_Keys.MeLoans,
      ]);

      queryClient.setQueryData<Loan[]>([Query_Keys.MeLoans], (old) =>
        old?.map((loan) =>
          loan.id === loanId ? { ...loan, status: 'RETURNED' as const } : loan,
        ),
      );

      return { previousLoans };
    },

    onError: (_err, _loanId, context) => {
      queryClient.setQueryData([Query_Keys.MeLoans], context?.previousLoans);
      toast.error('Failed to return book. Please try again.');
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Query_Keys.MeLoans] });
      queryClient.invalidateQueries({ queryKey: [Query_Keys.LoansMy] });
      queryClient.invalidateQueries({ queryKey: [Query_Keys.Books] });
      queryClient.invalidateQueries({ queryKey: [Query_Keys.BooksDetail] });
      toast.success('Book returned successfully!');
    },
  });
};
