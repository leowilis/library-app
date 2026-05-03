import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { EndPoints, Query_Keys } from '@/constants';
import type { User, UpdateProfilePayload } from '@/types/user';
import { api } from '@/lib/api';
import type { Loan } from '@/types/loan';
import type { Review } from '@/types/review';
import type { AxiosError } from 'axios';

// Types

interface MeLoansResponse {
  loans: Loan[];
}

interface MeReviewsResponse {
  reviews: Review[];
}

// Hooks

// Fetches the current authenticated user's profile
export const useMe = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  return useQuery<User>({
    queryKey: [Query_Keys.Me],
    queryFn: async () => {
      const res = await api.get<{ data: { user: User } }>(EndPoints.Me);
      return res.data.data.user;
    },
    enabled: !!token,
  });
};

// Updates the current user's profile. Invalidates the user cache on success
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError<{ message?: string }>, UpdateProfilePayload>({
    mutationFn: async (payload) => {
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
  const token = useSelector((state: RootState) => state.auth.token);
  return useQuery<Loan[]>({
    queryKey: [Query_Keys.MeLoans, params],
    queryFn: async () => {
      const res = await api.get<{ data: MeLoansResponse }>(EndPoints.MeLoans, { params });
      return res.data.data.loans;
    },
    enabled: !!token,
  });
};

// Fetches the current user's submitted reviews
export const useMyReviews = (params?: {
  q?: string;
  page?: number;
  limit?: number;
}) => {
  const token = useSelector((state: RootState) => state.auth.token);
  return useQuery<Review[]>({
    queryKey: [Query_Keys.MeReviews, params],
    queryFn: async () => {
      const res = await api.get<{ data: MeReviewsResponse }>(EndPoints.MeReviews, { params });
      return res.data.data.reviews;
    },
    enabled: !!token,
  });
};

/**
 * Checks whether the current user has an active loan for a specific book.
 * Reuses `useMyLoansProfile` with status 'BORROWED' — no extra API call.
 */
export const useIsBookBorrowed = (bookId: number) => {
  const { data: loans = [] } = useMyLoansProfile({ status: 'BORROWED' });
  return loans.some(
    (loan) => loan.book?.id === bookId && loan.status === 'BORROWED',
  );
};