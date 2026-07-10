import type { QueryClient, QueryKey } from '@tanstack/react-query';
import type { Review } from '@/types/review';

import { bookKeys, cartKeys, meKeys, reviewKeys } from './queryKeys';

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
  if (bookId) {
    await queryClient.invalidateQueries({
      queryKey: reviewKeys.book(bookId),
    });

    await queryClient.invalidateQueries({
      queryKey: bookKeys.detail(bookId),
    });
  }

  await queryClient.invalidateQueries({
    queryKey: meKeys.reviewsAll(),
  });
}
