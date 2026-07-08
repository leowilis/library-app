import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { EndPoints } from '@/constants';
import type { User, UpdateProfilePayload } from '@/types/user';
import { api } from '@/lib/api';
import type { Loan } from '@/types/loan';
import type { Review } from '@/types/review';
import type { AxiosError } from 'axios';
import { meKeys, reviewKeys, type LoansParams } from '@/lib/queryKeys';

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
    queryKey: meKeys.profile(),
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
  return useMutation<
    unknown,
    AxiosError<{ message?: string }>,
    UpdateProfilePayload
  >({
    mutationFn: async (payload) => {
      const res = await api.patch(EndPoints.Me, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meKeys.profile() });
    },
  });
};

// Fetches the current user's loan history with optional status filter.
export const useMyLoansProfile = <TData = Loan[]>(
  params?: LoansParams,
  options?: { select?: (data: Loan[]) => TData },
) => {
  const token = useSelector((state: RootState) => state.auth.token);
  return useQuery<Loan[], AxiosError, TData>({
    queryKey: meKeys.loans(params),
    queryFn: async () => {
      const res = await api.get<{ data: MeLoansResponse }>(EndPoints.MeLoans, {
        params,
      });
      return res.data.data.loans;
    },
    enabled: !!token,
    ...options,
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
    queryKey: reviewKeys.me(params),
    queryFn: async () => {
      const res = await api.get<{ data: MeReviewsResponse }>(
        EndPoints.MeReviews,
        { params },
      );
      return res.data.data.reviews;
    },
    enabled: !!token,
  });
};

// Checks whether the current user has an active loan for a specific book.
export const useIsBookBorrowed = (bookId: number) => {
  const { data } = useMyLoansProfile(
    { status: 'BORROWED' },
    {
      select: (loans) =>
        loans.some(
          (loan) => loan.book?.id === bookId && loan.status === 'BORROWED',
        ),
    },
  );
  return data ?? false;
};

// Checks whether the current user has returned a loan for a specific book
export const useHasReturnedBook = (bookId: number) => {
  const { data } = useMyLoansProfile(
    { status: 'RETURNED' },
    {
      select: (loans) =>
        loans.some(
          (loan) => loan.book?.id === bookId && loan.status === 'RETURNED',
        ),
    },
  );
  return data ?? false;
};
