import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { EndPoints, Query_Keys } from '@/constants';
import type { AdminLoansResponse, LoanStatusFilter } from '@/types/admin/admin';

const PAGE_SIZE = 15;

/**
 * Fetches paginated loans from the admin loans endpoint.
 * When `status` is `"overdue"`, uses the dedicated overdue endpoint
 * and normalizes the response to always return `AdminLoansResponse`.
 */
export function useAdminLoans(page: number, status: LoanStatusFilter) {
  const isOverdue = status === 'overdue';

  return useQuery<AdminLoansResponse>({
    queryKey: [Query_Keys.AdminLoans, page, status],
    queryFn: async () => {
      const res = await api.get<{
        data: AdminLoansResponse & { overdue?: AdminLoansResponse['loans'] };
      }>(isOverdue ? EndPoints.AdminLoansOverdue : EndPoints.AdminLoans, {
        params: { page, limit: PAGE_SIZE, ...(!isOverdue && { status }) },
      });

      const payload = res.data.data;

      // Overdue endpoint returns { overdue: AdminLoan[] } — normalize to AdminLoansResponse
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
  });
}
