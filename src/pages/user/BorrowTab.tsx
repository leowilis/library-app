import { useState } from 'react';
import { Search, AlertTriangle, AlertCircle } from 'lucide-react';
import { useMyLoansProfile } from '@/hooks/useMe';
import { useReturnBook } from '@/hooks/useReturnBook';
import { formatDate } from '@/lib/utils';
import ReviewModal from '@/pages/user/ReviewModal';
import { SkeletonCard } from '@/components/ui/skeleton';
import { useNavigate } from 'react-router-dom';
import type { Loan } from '@/types/loan';

type LoanStatus = 'BORROWED' | 'LATE' | 'RETURNED' | undefined;

const STATUS_FILTERS: { label: string; value: LoanStatus }[] = [
  { label: 'All', value: undefined },
  { label: 'Active', value: 'BORROWED' },
  { label: 'Returned', value: 'RETURNED' },
  { label: 'Overdue', value: 'LATE' },
];

const STATUS_COLOR: Record<string, string> = {
  BORROWED: '#079455',
  RETURNED: '#6b7280',
  LATE: '#d92d20',
};

const STATUS_LABEL: Record<string, string> = {
  BORROWED: 'Active',
  RETURNED: 'Returned',
  LATE: 'Overdue',
};

/**
 * Displays book cover, category, title, and borrow date for a single loan.
 */
function LoanBookInfo({ loan }: { loan: Loan }) {
  return (
    <div className='flex gap-3 flex-1 min-w-0'>
      <div className='w-20 h-30 overflow-hidden flex-shrink-0 bg-gray-100'>
        {loan.book?.coverImage ? (
          <img
            src={loan.book.coverImage}
            alt={loan.book.title}
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center bg-blue-50 text-2xl'>
            📚
          </div>
        )}
      </div>
      <div className='flex-1 min-w-0 space-y-4 m-2 md:space-y-5'>
        <span className='inline-block text-xs font-semibold px-2 py-0.5 rounded-sm border border-gray-300 text-gray-500'>
          {loan.book?.category?.name ?? 'Category'}
        </span>
        <p className='text-sm font-bold text-gray-900'>{loan.book?.title}</p>
        <p className='text-xs text-neutral-950 font-bold'>
          {formatDate(loan.borrowedAt)} · Duration {loan.durationDays} Days
        </p>
      </div>
    </div>
  );
}

// ReturnConfirmModal

/**
 * Confirmation modal shown before returning a book.
 * Blocks interaction with the rest of the page via a backdrop.
 */
function ReturnConfirmModal({
  loan,
  isLoading,
  onConfirm,
  onCancel,
}: {
  loan: Loan;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
      <div className='absolute inset-0 bg-black/40' onClick={onCancel} />
      <div className='relative bg-white w-full max-w-sm rounded-3xl p-6 space-y-5'>
        <div className='flex justify-center'>
          <div className='w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center'>
            <AlertTriangle size={28} className='text-[#1c65da]' />
          </div>
        </div>
        <div className='text-center space-y-2'>
          <h3 className='text-lg font-bold text-gray-900'>Return Book?</h3>
          <p className='text-sm text-gray-500'>
            Are you sure you want to return
          </p>
          <p className='text-sm font-semibold text-gray-800 line-clamp-2'>
            "{loan.book?.title}"
          </p>
        </div>
        <div className='flex gap-3 pt-1'>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className='flex-1 py-3 rounded-full text-sm font-semibold border-2 transition-all hover:bg-gray-50 disabled:opacity-50'
            style={{ borderColor: '#e5e7eb', color: '#374151' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className='flex-1 py-3 rounded-full text-sm font-semibold text-white transition-all hover:bg-[#1550b8] disabled:opacity-50'
            style={{ backgroundColor: '#1c65da' }}
          >
            {isLoading ? 'Returning...' : 'Yes, Return'}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Borrowed books tab on the user profile page.
 *
 * Fetches loans via `useMyLoansProfile` and supports:
 * - Status filtering (All, Active, Returned, Overdue)
 * - Search by book title
 * - Book return with optimistic UI via `useReturnBook`
 * - Review submission after returning
 */
export default function BorrowedTab() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<LoanStatus>(undefined);
  const [reviewBookId, setReviewBookId] = useState<number | null>(null);
  const [confirmLoan, setConfirmLoan] = useState<Loan | null>(null);

  const {
    data: loansData,
    isLoading,
    isError,
  } = useMyLoansProfile({ status, limit: 20 });
  const { mutate: returnBook, isPending: isReturning } = useReturnBook();

  const loans: Loan[] = loansData?.data?.loans ?? loansData?.loans ?? [];

  const filtered = loans.filter((loan) =>
    loan.book?.title?.toLowerCase().includes(search.toLowerCase()),
  );

  // Submits return request and closes confirmation modal on success
  const handleReturn = () => {
    if (!confirmLoan) return;
    returnBook(confirmLoan.id, {
      onSuccess: () => setConfirmLoan(null),
    });
  };

  // ── Error State ──
  if (isError) {
    return (
      <div className='flex flex-col items-center justify-center py-20 gap-3 text-red-500'>
        <AlertCircle size={40} />
        <p className='text-sm font-semibold'>
          Failed to load loans. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-4 md:space-y-6'>
      <h1 className='text-2xl font-bold text-gray-900 md:text-3xl'>
        Borrowed List
      </h1>

      {/* Search */}
      <div className='flex items-center gap-2 bg-white rounded-full px-4 py-3 border border-neutral-300 md:max-w-2xl'>
        <Search size={20} className='text-neutral-600' />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search book'
          className='flex-1 text-sm bg-transparent outline-none text-neutral-600'
        />
      </div>

      {/* Status Filters */}
      <div className='flex gap-2 overflow-x-auto pb-3 md:gap-3'>
        {STATUS_FILTERS.map(({ label, value }) => (
          <button
            key={label}
            onClick={() => setStatus(value)}
            className='flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all'
            style={{
              backgroundColor: status === value ? '#E0ECFF' : 'white',
              borderColor: status === value ? '#1c65da' : '#e5e7eb',
              color: status === value ? '#1c65da' : '#374151',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && [1, 2, 3].map((i) => <SkeletonCard key={i} />)}

      {/* Empty */}
      {!isLoading && filtered.length === 0 && (
        <div className='flex flex-col items-center py-16 gap-3 text-gray-400'>
          <span className='text-4xl'>📚</span>
          <p className='text-sm font-semibold'>No loans found</p>
        </div>
      )}

      {/* Loan List */}
      {!isLoading && filtered.length > 0 && (
        <div className='space-y-5 md:max-w-5xl'>
          {filtered.map((loan) => (
            <div
              key={loan.id}
              className='bg-white rounded-2xl p-4 shadow-sm space-y-4 md:p-4.5 md:space-y-6'
            >
              {/* Status + Due Date */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-bold text-neutral-950'>
                    Status
                  </span>
                  <span
                    className='text-xs font-bold py-1 px-2 rounded-lg'
                    style={{
                      color: STATUS_COLOR[loan.status],
                      backgroundColor: `${STATUS_COLOR[loan.status]}15`,
                    }}
                  >
                    {STATUS_LABEL[loan.status]}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-bold text-neutral-950'>
                    Due Date
                  </span>
                  <span className='text-xs font-bold py-1 px-2 rounded-lg bg-red-50 text-red-600'>
                    {formatDate(loan.dueAt)}
                  </span>
                </div>
              </div>

              <hr className='border-neutral-300' />

              {/* Book Info + Actions */}
              <div className='flex items-center justify-between gap-4'>
                <LoanBookInfo loan={loan} />
                <div className='flex flex-col md:flex-row gap-2 flex-shrink-0'>
                  {loan.status === 'BORROWED' && (
                    <button
                      onClick={() => setConfirmLoan(loan)}
                      disabled={isReturning}
                      className='py-2.5 px-9 rounded-full text-sm font-semibold border-2 transition-all hover:bg-blue-50 disabled:opacity-60'
                      style={{ borderColor: '#1c65da', color: '#1c65da' }}
                    >
                      Return
                    </button>
                  )}
                  {loan.status === 'RETURNED' && (
                    <button
                      onClick={() => setReviewBookId(loan.book?.id ?? null)}
                      className='py-2.5 px-5 rounded-full text-sm font-semibold text-white transition-all hover:bg-[#1550b8]'
                      style={{ backgroundColor: '#1c65da' }}
                    >
                      Give Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Return Confirmation Modal */}
      {confirmLoan && (
        <ReturnConfirmModal
          loan={confirmLoan}
          isLoading={isReturning}
          onConfirm={handleReturn}
          onCancel={() => setConfirmLoan(null)}
        />
      )}

      {/* Review Modal */}
      {reviewBookId && (
        <ReviewModal
          bookId={reviewBookId}
          onClose={() => setReviewBookId(null)}
          onSuccess={() => {
            setReviewBookId(null);
            navigate('/profile?tab=reviews');
          }}
        />
      )}
    </div>
  );
}
