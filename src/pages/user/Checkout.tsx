import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/index";
import { clearCart } from "@/store/cartSlice";
import { toast } from "sonner";
import { api } from "@/lib/api";

const DURATION_OPTIONS = [
  { label: "3 Days", value: 3 },
  { label: "5 Days", value: 5 },
  { label: "10 Days", value: 10 },
];

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDateInput(date: Date): string {
  return date.toISOString().split("T")[0];
}

function formatDateDisplay(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const books: any[] = location.state?.books ?? [];
  const [borrowDate, setBorrowDate] = useState<string>(formatDateInput(new Date()));
  const [duration, setDuration] = useState<number>(3);
  const [agreeReturn, setAgreeReturn] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const returnDate = addDays(new Date(borrowDate), duration);

  if (books.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleConfirm = async () => {
    if (!agreeReturn || !agreePolicy) {
      toast.error("Please agree to both terms before borrowing");
      return;
    }
    setIsSubmitting(true);
    try {
      await Promise.all(
        books.map((book: any) => api.post("/api/loans", { bookId: book.id, days: duration }))
      );
      dispatch(clearCart());
      toast.success("Books borrowed successfully!");
      navigate("/profile");
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to borrow books");
    } finally {
      setIsSubmitting(false);
    }
  };

  const BorrowForm = (
    <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
      <h2 className="text-base font-bold text-gray-900">Complete Your Borrow Request</h2>

      <div className="space-y-1">
        <label className="text-sm font-bold text-gray-700">Borrow Date</label>
        <input
          type="date"
          value={borrowDate}
          onChange={(e) => setBorrowDate(e.target.value)}
          className="w-full border border-neutral-100 bg-neutral-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Borrow Duration</label>
        <div className="space-y-2">
          {DURATION_OPTIONS.map(({ label, value }) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer" onClick={() => setDuration(value)}>
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: duration === value ? "#1c65da" : "#D5D7DA" }}
              >
                {duration === value && (
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#1c65da" }} />
                )}
              </div>
              <span className="text-sm font-medium" style={{ color: duration === value ? "#1c65da" : "#374151" }}>
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-3 space-y-1">
        <p className="text-sm font-semibold text-gray-700">Return Date</p>
        <p className="text-xs text-gray-500">Please return the book no later than</p>
        <p className="text-sm font-bold" style={{ color: "#d92d20" }}>
          {formatDateDisplay(returnDate)}
        </p>
      </div>

      <div className="space-y-3 pt-1">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeReturn}
            onChange={(e) => setAgreeReturn(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded accent-blue-600"
          />
          <span className="text-sm text-gray-600">I agree to return the book(s) before the due date.</span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreePolicy}
            onChange={(e) => setAgreePolicy(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded accent-blue-600"
          />
          <span className="text-sm text-gray-600">I accept the library borrowing policy.</span>
        </label>
      </div>

      <button
        onClick={handleConfirm}
        disabled={isSubmitting || !agreeReturn || !agreePolicy}
        className="w-full py-3.5 rounded-full font-semibold text-white text-sm disabled:opacity-50 transition-opacity"
        style={{ backgroundColor: "#1c65da" }}
      >
        {isSubmitting ? "Processing..." : "Confirm & Borrow"}
      </button>
    </div>
  );

  return (
    <div className="pb-10">
      <div className="py-4">
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
      </div>

      <div className="md:flex md:gap-8 md:items-start">

        {/* LEFT: User Info + Book List */}
        <div className="flex-1 space-y-6">

          {/* User Information */}
          <div className="md:bg-white md:rounded-2xl md:p-5 md:shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-3">User Information</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Name</span>
                <span className="font-medium text-gray-900">{(user as any)?.name ?? "-"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Email</span>
                <span className="font-medium text-gray-900">{(user as any)?.email ?? "-"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Nomor Handphone</span>
                <span className="font-medium text-gray-900">{(user as any)?.phone ?? "-"}</span>
              </div>
            </div>
          </div>

          {/* Book List */}
          <div className="md:bg-white md:rounded-2xl md:p-5 md:shadow-sm">
            <h2 className="text-base font-bold text-gray-900 mb-3">Book List</h2>
            <div className="space-y-4">
              {books.map((book: any) => (
                <div key={book.id} className="flex gap-3">
                  <div className="w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    {book.coverImage ? (
                      <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-xl" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="inline-block text-xs font-semibold px-2 py-0.5 border border-gray-300 rounded text-gray-500">
                      {book.category?.name ?? "Category"}
                    </span>
                    <p className="text-sm font-bold text-gray-900 line-clamp-2">{book.title}</p>
                    <p className="text-xs text-gray-500">{book.author?.name ?? "Author"}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile form */}
          <div className="md:hidden">{BorrowForm}</div>
        </div>

        {/* RIGHT: desktop only */}
        <div className="hidden md:block w-96 flex-shrink-0 sticky top-6">
          {BorrowForm}
        </div>
      </div>
    </div>
  );
}