import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { EndPoints, Query_Keys } from '@/constants';
import type { Loan } from '@/types/loan';

type LoansCache = {
  data?: {
    loans?: Loan[];
  };
};

/**
 * Returns a borrowed book by loan ID.
 * Optimistically marks the loan as RETURNED in the cache,
 * rolls back if the request fails.
 */
export const useReturnBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (loanId: number) => {
      const res = await api.patch(EndPoints.LoansReturn(loanId));
      return res.data;
    },

    onMutate: async (loanId: number) => {
      await queryClient.cancelQueries({ queryKey: [Query_Keys.MeLoans] });

      const previousLoans = queryClient.getQueryData([Query_Keys.MeLoans]);

      queryClient.setQueryData(
        [Query_Keys.MeLoans],
        (old: LoansCache | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              loans: (old.data?.loans ?? []).map((loan) =>
                loan.id === loanId
                  ? { ...loan, status: 'RETURNED' as const }
                  : loan,
              ),
            },
          };
        },
      );

      return { previousLoans };
    },

    onError: (_err, _loanId, context: any) => {
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