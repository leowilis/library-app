import type { QueryClient, QueryKey } from '@tanstack/react-query';
import type { Review } from '@/types/review';

import { bookKeys, cartKeys, meKeys, reviewKeys } from './queryKeys';
import type { AdminLoan } from '@/types/admin/admin';

// Invalidate all queries related to borrowing/returning books.
export async function invalidateBorrow(
  queryClient: QueryClient,
  bookId: number,
) {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: meKeys.loansAll(),
    }),

    queryClient.invalidateQueries({
      queryKey: bookKeys.lists(),
    }),

    queryClient.invalidateQueries({
      queryKey: bookKeys.detail(bookId),
    }),

    queryClient.invalidateQueries({
      queryKey: cartKeys.checkout(),
    }),
  ]);
}

// Invalidate cart-related queries.
export async function invalidateCart(queryClient: QueryClient) {
  await Promise.all([
    queryClient.invalidateQueries({
      queryKey: cartKeys.detail(),
    }),

    queryClient.invalidateQueries({
      queryKey: cartKeys.checkout(),
    }),
  ]);
}

// Invalidate all review queries.
export function rollbackReviews(
  queryClient: QueryClient,
  previous: Array<[QueryKey, Review[] | undefined]>,
) {
  previous.forEach(([key, data]) => {
    queryClient.setQueryData(key, data);
  });
}

export async function invalidateReview(
  queryClient: QueryClient,
  bookId?: number,
) {
  const tasks = [
    queryClient.invalidateQueries({
      queryKey: meKeys.reviewsAll(),
    }),
  ];

  if (bookId) {
    tasks.push(
      queryClient.invalidateQueries({
        queryKey: reviewKeys.book(bookId),
      }),
    );

    tasks.push(
      queryClient.invalidateQueries({
        queryKey: bookKeys.detail(bookId),
      }),
    );
  }

  await Promise.all(tasks);
}

export function getBorrowerName(loan: AdminLoan): string {
  return loan.borrower?.name ?? loan.user?.name ?? '-';
}

export function filterLoans(loans: AdminLoan[], search: string) {
  const keyword = search.trim().toLowerCase();

  if (!keyword) return loans;

  return loans.filter(
    (loan) =>
      loan.book?.title?.toLowerCase().includes(keyword) ||
      getBorrowerName(loan).toLowerCase().includes(keyword),
  );
}
