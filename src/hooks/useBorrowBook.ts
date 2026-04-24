import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { EndPoints, Query_Keys } from '@/constants';
import type { CreateLoanPayload } from '@/types/loan';
import type { Book } from '@/types/book';

export const useBorrowBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateLoanPayload) => {
      const res = await api.post(EndPoints.Loans, payload);
      return res.data;
    },

    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: [Query_Keys.Books] });
      await queryClient.cancelQueries({ queryKey: [Query_Keys.BooksDetail] });

      const previousBooks = queryClient.getQueryData([Query_Keys.Books]);
      const previousDetail = queryClient.getQueryData([
        Query_Keys.BooksDetail,
        payload.bookId,
      ]);

      queryClient.setQueryData(
        [Query_Keys.BooksDetail, payload.bookId],
        (old: { data: Book } | undefined) => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              availableCopies: (old.data?.availableCopies ?? 1) - 1,
            },
          };
        },
      );

      return { previousBooks, previousDetail };
    },

    onError: (_err, payload, context) => {
      queryClient.setQueryData([Query_Keys.Books], context?.previousBooks);
      queryClient.setQueryData(
        [Query_Keys.BooksDetail, payload.bookId],
        context?.previousDetail,
      );
      toast.error('Failed to borrow the book. Please try again.');
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Query_Keys.Books] });
      queryClient.invalidateQueries({ queryKey: [Query_Keys.BooksDetail] });
      queryClient.invalidateQueries({ queryKey: [Query_Keys.MeLoans] });
      queryClient.invalidateQueries({ queryKey: [Query_Keys.LoansMy] });
      toast.success('Book borrowed successfully!');
    },
  });
};
