import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EndPoints, Query_Keys } from '@/constants';
import type { UpdateProfilePayload } from '@/types/user';
import { api } from '@/lib/api';
import type { Loan } from '@/types/loan';

export const useMe = () => {
  return useQuery({
    queryKey: [Query_Keys.Me],
    queryFn: async () => {
      const res = await api.get(EndPoints.Me);
      return res.data;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const res = await api.patch(EndPoints.Me, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Query_Keys.Me] });
    },
  });
};

export const useMyLoansProfile = (params?: {
  status?: 'BORROWED' | 'LATE' | 'RETURNED';
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [Query_Keys.MeLoans, params],
    queryFn: async () => {
      const res = await api.get(EndPoints.MeLoans, { params });
      return res.data;
    },
  });
};

export const useMyReviews = (params?: {
  q?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: [Query_Keys.MeReviews, params],
    queryFn: async () => {
      const res = await api.get(EndPoints.MeReviews, { params });
      return res.data;
    },
  });
};


export const useIsBookBorrowed = (bookId: number) => {
  const { data } = useMyLoansProfile({ status: 'BORROWED' })
  const loans: Loan[] = data?.data?.loans ?? data?.loans ?? []
  return loans.some(
    (loan) => loan.book?.id === bookId && loan.status === 'BORROWED'
  )
}
