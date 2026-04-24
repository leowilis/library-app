import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { EndPoints, Query_Keys } from '@/constants';
import type { AdminUsersResponse } from '@/types/admin/admin';

const PAGE_SIZE = 10;

/**
 * Fetches a paginated list of users from `GET /api/admin/users`.
 *
 * Current page number (1-indexed).
 */
export function useAdminUsers(page: number) {
  return useQuery<AdminUsersResponse>({
    queryKey: [Query_Keys.AdminUsers, page],
    queryFn: async () => {
      const res = await api.get(EndPoints.AdminUsers, {
        params: { page, limit: PAGE_SIZE },
      });
      return res.data?.data ?? res.data;
    },
  });
}
