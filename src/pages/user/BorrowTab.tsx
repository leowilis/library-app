import { useState } from "react";
import { Search } from "lucide-react";
import { useMyLoansProfile } from "@/hooks/useMe";
import { formatDate } from "@/lib/utils";
import ReviewModal from "@/pages/user/ReviewModal";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Query_Keys } from "@/constants";
import { api } from "@/lib/api";

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

export default function BorrowedTab() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<LoanStatus>(undefined);
  const [reviewBookId, setReviewBookId] = useState<number | null>(null);
  const [returningId, setReturningId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { data: loansData } = useMyLoansProfile({ status, limit: 20 });
  const loans =
    (loansData as any)?.data?.data?.loans ??
    (loansData as any)?.data?.loans ??
    [];

  const filtered = loans.filter((loan: any) =>
    loan.book?.title?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleReturn = async (loanId: number) => {
    setReturningId(loanId);
    try {
      await api.patch(`/api/loans/${loanId}/return`);
      toast.success("Book returned successfully!");
      queryClient.invalidateQueries({ queryKey: [Query_Keys.Loans] });
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to return book");
    } finally {
      setReturningId(null);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
        Borrowed List
      </h1>

      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-3 border border-gray-200 md:max-w-2xl">
        <Search size={16} className="text-neutral-600" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search book"
          className="flex-1 text-sm bg-transparent outline-none text-neutral-600"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3">
        {STATUS_FILTERS.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => setStatus(value)}
            className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border-1 transition-all"
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

      <div className="space-y-5 md:max-w-6xl">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No loans found</p>
        ) : (
          filtered.map((loan: any) => (
            <div
              key={loan.id}
              className="bg-white rounded-2xl p-4 shadow-sm space-y-8 md:p-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-md font-bold text-neutral-950">
                    Status
                  </span>
                  <span
                    className="text-sm font-bold border py-2 px-2 rounded-lg bg-[#24A500]/5 border-none"
                    style={{ color: STATUS_COLOR[loan.status] }}
                  >
                    {STATUS_LABEL[loan.status]}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-md font-bold text-neutral-950">
                    Due Date
                  </span>
                  <span
                    className="text-sm font-bold border py-2 px-2 rounded-lg bg-[#EE1D52]/10 border-none"
                    style={{ color: "#d92d20" }}
                  >
                    {formatDate(loan.dueAt)}
                  </span>
                </div>
              </div>

              {/* Line */}
              <div className="border-b border-neutral-300" />

              {/* Mobile: stacked */}
              <div className="md:hidden flex gap-3">
                <div className="w-25 h-30 overflow-hidden flex-shrink-0 bg-gray-100">
                  {loan.book?.coverImage ? (
                    <img
                      src={loan.book.coverImage}
                      alt={loan.book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 text-2xl">
                      📚
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-4">
                  <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full border border-gray-300 text-gray-500">
                    {loan.book?.category?.name ?? "Category"}
                  </span>
                  <p className="text-sm font-bold text-gray-900">
                    {loan.book?.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {loan.book?.author?.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatDate(loan.borrowedAt)} · Duration {loan.durationDays}{" "}
                    Days
                  </p>
                </div>
              </div>

              {loan.status !== "RETURNED" && (
                <div className="flex gap-3 mt-12 md:hidden">
                  <button
                    onClick={() => handleReturn(loan.id)}
                    disabled={returningId === loan.id}
                    className="flex-1 py-3 rounded-full text-sm font-semibold border-2 transition-all disabled:opacity-60"
                    style={{ borderColor: "#1c65da", color: "#1c65da" }}
                  >
                    {returningId === loan.id ? "Returning..." : "Return"}
                  </button>
                  <button
                    onClick={() => setReviewBookId(loan.book?.id)}
                    className="flex-1 py-3 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: "#1c65da" }}
                  >
                    Give Review
                  </button>
                </div>
              )}

              <div className="hidden md:flex md:items-center md:justify-between md:gap-4">
                <div className="flex gap-3 flex-1 min-w-0">
                  <div className="w-20 h-24 overflow-hidden flex-shrink-0 bg-gray-100">
                    {loan.book?.coverImage ? (
                      <img
                        src={loan.book.coverImage}
                        alt={loan.book.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-50 text-2xl">
                        📚
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full border border-gray-300 text-gray-500">
                      {loan.book?.category?.name ?? "Category"}
                    </span>
                    <p className="text-sm font-bold text-gray-900">
                      {loan.book?.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {loan.book?.author?.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatDate(loan.borrowedAt)} · Duration {loan.durationDays}{" "}
                      Days
                    </p>
                  </div>
                </div>

                {loan.status !== "RETURNED" && (
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleReturn(loan.id)}
                      disabled={returningId === loan.id}
                      className="py-3 px-6 rounded-full text-sm font-semibold border-2 transition-all disabled:opacity-60"
                      style={{ borderColor: "#1c65da", color: "#1c65da" }}
                    >
                      {returningId === loan.id ? "Returning..." : "Return"}
                    </button>
                    <button
                      onClick={() => setReviewBookId(loan.book?.id)}
                      className="py-3 px-6 rounded-full text-sm font-semibold text-white"
                      style={{ backgroundColor: "#1c65da" }}
                    >
                      Give Review
                    </button>
                  </div>
                )}
              </div>

            </div>
          ))
        )}
      </div>

      {reviewBookId && (
        <ReviewModal
          bookId={reviewBookId}
          onClose={() => setReviewBookId(null)}
        />
      )}
    </div>
  );
}