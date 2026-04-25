import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { EndPoints, Query_Keys } from '@/constants';
import type { AdminOverview } from '@/types/admin/admin';

/**
 * Fetches admin dashboard overview statistics.
 *
 * Returns totals for books, users, active loans, overdue loans,
 * total loans, and a list of top borrowed books.
 */
export function useAdminOverview() {
  return useQuery<AdminOverview>({
    queryKey: [Query_Keys.AdminOverview],
    queryFn: async () => {
      const res = await api.get(EndPoints.AdminOverview);
      return res.data?.data ?? res.data;
    },
  });
}
