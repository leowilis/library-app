import { useQuery } from '@tanstack/react-query';

import { EndPoints } from '@/constants';
import { api } from '@/lib/api';
import { adminLoanKeys } from '@/lib/queryKeys';

import type { AdminLoansResponse, LoanStatusFilter } from '@/types/admin/admin';

const PAGE_SIZE = 15;

interface AdminLoanApiResponse {
  data: AdminLoansResponse & {
    overdue?: AdminLoansResponse['loans'];
  };
}

/**
 * Fetch paginated admin loans.
 * Supports:
 * - pagination
 * - status filter
 * - search
 * - overdue endpoint normalization
 */
export function useAdminLoans(page: number, status?: LoanStatusFilter, q = '') {
  const normalizedQuery = q.trim();
  const isOverdue = status === 'overdue';

  return useQuery<AdminLoansResponse>({
    queryKey: adminLoanKeys.list(page, status, normalizedQuery),

    queryFn: async () => {
      const params = {
        page,
        limit: PAGE_SIZE,

        ...(!isOverdue &&
          status && {
            status,
          }),

        ...(normalizedQuery && {
          q: normalizedQuery,
        }),
      };

      const { data } = await api.get<AdminLoanApiResponse>(
        isOverdue ? EndPoints.AdminLoansOverdue : EndPoints.AdminLoans,
        {
          params,
        },
      );

      const payload = data.data;

      if (isOverdue && Array.isArray(payload.overdue)) {
        return {
          loans: payload.overdue,
          pagination: payload.pagination ?? {
            total: payload.overdue.length,
            page,
            limit: PAGE_SIZE,
            totalPages: 1,
          },
        };
      }

      return payload;
    },

    placeholderData: (previous) => previous,
  });
}
