import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { api } from "@/lib/api";
import { EndPoints, Query_Keys } from "@/constants";
import { formatDate } from "@/lib/utils";

const PAGE_SIZE = 15;

type LoanStatus = "active" | "returned" | "overdue" | undefined;

const STATUS_FILTERS = [
  { label: "All", value: undefined },
  { label: "Active", value: "active" as const },
  { label: "Returned", value: "returned" as const },
  { label: "Overdue", value: "overdue" as const },
];

const STATUS_COLOR: Record<string, string> = {
  BORROWED: "#24A500",
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

  const filtered = loans.filter((loan: any) =>
    loan.book?.title?.toLowerCase().includes(search.toLowerCase()) ||
    loan.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Borrowed List</h1>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-gray-200 w-full md:w-80">
        <Search size={15} className="text-neutral-600" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          className="flex-1 text-md bg-transparent outline-none text-neutral-600"
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

      {/* Cards */}
      <div className="space-y-3">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />
          ))
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No loans found</p>
        ) : (
          filtered.map((loan: any) => (
            <div key={loan.id} className="bg-white rounded-2xl p-4 shadow-sm">
              {/* Status + Due Date */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <span className="text-md font-bold text-neutral-950">Status</span>
                  <span
                    className="text-sm font-bold bg-[#24a500]/10 rounded py-2 px-2"
                    style={{
                      color: STATUS_COLOR[loan.status],
                      borderColor: STATUS_COLOR[loan.status]
                    }}
                  >
                    {STATUS_LABEL[loan.status]}
                  </span>
                </div>
                <div className="flex items-center gap-5">
                  <span className="text-md font-bold text-neutral-950">Due Date</span>
                  <span
                    className="text-sm font-bold bg-[#EE1D52]/10 rounded py-2 px-2"
                    style={{
                      color: "#d92d20",
                      borderColor: "#d92d20"
                    }}
                  >
                    {formatDate(loan.dueAt)}
                  </span>
                </div>
              </div>

              {/* Line */}
              <div className="border-t border-neutral-300 mb-5 mt-5"/>

              {/* Book info */}
              <div className="flex flex-col gap-3">
                {/* Cover */}
                <div className="w-25 h-30 overflow-hidden flex-shrink-0 bg-gray-100">
                  {loan.book?.coverImage ? (
                    <img
                      src={loan.book.coverImage}
                      alt={loan.book?.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-xl" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-3">
                  <span className="inline-block text-xs font-bold px-2 py-1 rounded-md border border-neutral-300 text-neutral-950">
                    {loan.book?.category?.name ?? "Category"}
                  </span>
                  <p className="text-md font-bold text-gray-950 line-clamp-1">{loan.book?.title}</p>
                  <p className="text-xs text-neutral-700">{loan.book?.author?.name}</p>
                  <p className="text-sm font-bold text-neutral-950">
                    {formatDate(loan.borrowedAt)} · Duration {loan.durationDays} Days
                  </p>
                  {/* Divider + Borrower name */}
                  <div className="border-t border-gray-200 pt-2">
                    <p className="text-sm font-semibold text-gray-700">{loan.user?.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
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