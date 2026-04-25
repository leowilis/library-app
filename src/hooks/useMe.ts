import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { EndPoints, Query_Keys } from '@/constants';
import type { UpdateProfilePayload } from '@/types/user';
import { api } from '@/lib/api';
import type { Loan } from '@/types/loan';

// Fetches the current authenticated user's profile
export const useMe = () => {
  return useQuery({
    queryKey: [Query_Keys.Me],
    queryFn: async () => {
      const res = await api.get(EndPoints.Me);
      return res.data;
    },
  });
};

// Updates the current user's profile. Invalidates the user cache on success
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

// Fetches the current user's loan history with optional status filter
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

// Fetches the current user's submitted reviews
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

/**
 * Checks whether the current user has an active loan for a specific book
 * Reuses `useMyLoansProfile` with status 'BORROWED' — no extra API call
 */
export const useIsBookBorrowed = (bookId: number) => {
  const { data } = useMyLoansProfile({ status: 'BORROWED' });
  const loans: Loan[] = data?.data?.loans ?? data?.loans ?? [];
  return loans.some(
    (loan) => loan.book?.id === bookId && loan.status === 'BORROWED',
  );
};
