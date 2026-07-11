import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { EndPoints } from '@/constants';
import type { AdminUsersResponse } from '@/types/admin/admin';
import { adminUserKeys } from '@/lib/queryKeys';

const PAGE_SIZE = 10;

export function useAdminUsers(page: number, q = '') {
  const normalizedQuery = q.trim();

  return useQuery<AdminUsersResponse>({
    queryKey: adminUserKeys.list(page, normalizedQuery),

    queryFn: async () => {
      const { data } = await api.get<{ data: AdminUsersResponse }>(
        EndPoints.AdminUsers,
        {
          params: {
            page,
            limit: PAGE_SIZE,

            ...(normalizedQuery && {
              q: normalizedQuery,
            }),
          },
        },
      );
      return data.data;
    },

    placeholderData: (previous) => previous,
  });
}
