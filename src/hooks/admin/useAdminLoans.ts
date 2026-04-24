
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { EndPoints, Query_Keys } from "@/constants";
import type { AdminLoansResponse, LoanStatusFilter } from "@/types/admin/admin";

const PAGE_SIZE = 15;

/**
 * Fetches paginated loans from the admin loans endpoint.
 * When `status` is `"overdue"`, uses the dedicated overdue endpoint.
 *
 * Current page number (1-indexed).
 * Active status filter.
 */
export function useAdminLoans(page: number, status: LoanStatusFilter) {
  return useQuery<AdminLoansResponse>({
    queryKey: [Query_Keys.AdminLoans, page, status],
    queryFn: async () => {
      const isOverdue = status === "overdue";
      const res = await api.get(
        isOverdue ? EndPoints.AdminLoansOverdue : EndPoints.AdminLoans,
        { params: { page, limit: PAGE_SIZE, ...(!isOverdue && { status }) } }
      );
      return res.data?.data ?? res.data;
    },
  });
}