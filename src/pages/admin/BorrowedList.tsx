import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { api } from "@/lib/api";
import { EndPoints, Query_Keys } from "@/constants";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

const PAGE_SIZE = 10;

type LoanStatus = "BORROWED" | "LATE" | "RETURNED" | undefined;

const STATUS_FILTERS = [
  { label: "All", value: undefined },
  { label: "Active", value: "BORROWED" as const },
  { label: "Returned", value: "RETURNED" as const },
  { label: "Overdue", value: "LATE" as const },
];

const STATUS_COLOR: Record<string, string> = {
  BORROWED: "#079455",
  RETURNED: "#6b7280",
  LATE: "#d92d20",
};

const STATUS_LABEL: Record<string, string> = {
  BORROWED: "Active",
  RETURNED: "Returned",
  LATE: "Overdue",
};

export default function AdminBorrowedList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<LoanStatus>(undefined);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [Query_Keys.AdminLoans, page, status],
    queryFn: async () => {
      const res = await api.get(EndPoints.AdminLoans, {
        params: { page, limit: PAGE_SIZE, status },
      });
      return res.data?.data ?? res.data;
    },
  });

  const loans = data?.loans ?? data ?? [];
  const total = data?.pagination?.total ?? loans.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const { mutate: returnBook } = useMutation({
    mutationFn: async (id: number) => {
      await api.patch(EndPoints.LoansReturn(id));
    },
    onSuccess: () => {
      toast.success("Book returned!");
      queryClient.invalidateQueries({ queryKey: [Query_Keys.AdminLoans] });
    },
    onError: () => toast.error("Failed to return book"),
  });

  const filtered = loans.filter((loan: any) =>
    loan.book?.title?.toLowerCase().includes(search.toLowerCase()) ||
    loan.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Borrowed List</h1>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-gray-200 w-full md:w-80">
        <Search size={16} className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by book or user"
          className="flex-1 text-sm bg-transparent outline-none text-gray-700"
        />
      </div>

      {/* Status filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {STATUS_FILTERS.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => { setStatus(value); setPage(1); }}
            className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all"
            style={{
              backgroundColor: status === value ? "#E0ECFF" : "white",
              borderColor: status === value ? "#1c65da" : "#e5e7eb",
              color: status === value ? "#1c65da" : "#374151",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["No", "User", "Book", "Borrowed At", "Due Date", "Status", "Action"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  {[...Array(7)].map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400">No loans found</td>
              </tr>
            ) : (
              filtered.map((loan: any, idx: number) => (
                <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{loan.user?.name}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-40">
                    <p className="line-clamp-2">{loan.book?.title}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{formatDate(loan.borrowedAt)}</td>
                  <td className="px-4 py-3 text-gray-400">{formatDate(loan.dueAt)}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-bold" style={{ color: STATUS_COLOR[loan.status] }}>
                      {STATUS_LABEL[loan.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {loan.status !== "RETURNED" && (
                      <button
                        onClick={() => returnBook(loan.id)}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-colors"
                        style={{ borderColor: "#1c65da", color: "#1c65da" }}
                      >
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
          ))
        ) : filtered.map((loan: any) => (
          <div key={loan.id} className="bg-white rounded-2xl p-4 shadow-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-xs font-bold" style={{ color: STATUS_COLOR[loan.status] }}>
                {STATUS_LABEL[loan.status]}
              </span>
              <span className="text-xs text-gray-400">{formatDate(loan.dueAt)}</span>
            </div>
            <p className="font-bold text-gray-900 line-clamp-1">{loan.book?.title}</p>
            <p className="text-sm text-gray-500">{loan.user?.name}</p>
            <p className="text-xs text-gray-400">{formatDate(loan.borrowedAt)}</p>
            {loan.status !== "RETURNED" && (
              <button
                onClick={() => returnBook(loan.id)}
                className="w-full py-2 rounded-full text-xs font-semibold border-2"
                style={{ borderColor: "#1c65da", color: "#1c65da" }}
              >
                Return
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-gray-400">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total} entries
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40">
              Previous
            </button>
            {[...Array(Math.min(totalPages, 5))].map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                className="w-8 h-8 text-xs rounded-lg border transition-colors"
                style={{
                  backgroundColor: page === i + 1 ? "#1c65da" : "white",
                  borderColor: page === i + 1 ? "#1c65da" : "#e5e7eb",
                  color: page === i + 1 ? "white" : "#374151",
                }}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}