import { useState } from 'react';
import { Search, AlertTriangle } from 'lucide-react';
import { useMyLoansProfile } from '@/hooks/useMe';
import { formatDate } from '@/lib/utils';
import ReviewModal from '@/pages/user/ReviewModal';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Query_Keys } from '@/constants';
import { api } from '@/lib/api';
import type { Loan } from '@/types/loan';
import { useNavigate } from 'react-router-dom';

type LoanStatus = 'BORROWED' | 'LATE' | 'RETURNED' | undefined;

const STATUS_FILTERS = [
  { label: 'All', value: undefined },
  { label: 'Active', value: 'BORROWED' as const },
  { label: 'Returned', value: 'RETURNED' as const },
  { label: 'Overdue', value: 'LATE' as const },
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

function LoanBookInfo({ loan }: { loan: Loan }) {
  return (
    <div className='flex gap-3 flex-1 min-w-0'>
      <div className='w-20 h-24 overflow-hidden flex-shrink-0 bg-gray-100 rounded-lg'>
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
      <div className='flex-1 min-w-0 space-y-1.5'>
        <span className='inline-block text-xs font-semibold px-2 py-0.5 rounded-full border border-gray-300 text-gray-500'>
          {loan.book?.category?.name ?? 'Category'}
        </span>
        <p className='text-sm font-bold text-gray-900'>{loan.book?.title}</p>
        <p className='text-xs text-gray-500'>{loan.book?.author?.name}</p>
        <p className='text-xs text-gray-400'>
          {formatDate(loan.borrowedAt)} · Duration {loan.durationDays} Days
        </p>
      </div>
    </div>
  );
}

interface ReturnConfirmModalProps {
  loan: Loan;
  isLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ReturnConfirmModal({
  loan,
  isLoading,
  onConfirm,
  onCancel,
}: ReturnConfirmModalProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-4'>
      <div className='absolute inset-0 bg-black/40' onClick={onCancel} />
      <div className='relative bg-white w-full max-w-sm rounded-3xl p-6 space-y-5'>
        {/* Icon */}
        <div className='flex justify-center'>
          <div className='w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center'>
            <AlertTriangle size={28} className='text-[#1c65da]' />
          </div>
        </div>

        {/* Text */}
        <div className='text-center space-y-2'>
          <h3 className='text-lg font-bold text-gray-900'>Return Book?</h3>
          <p className='text-sm text-gray-500'>
            Are you sure you want to return
          </p>
          <p className='text-sm font-semibold text-gray-800 line-clamp-2'>
            "{loan.book?.title}"
          </p>
        </div>

        {/* Buttons */}
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

export default function BorrowedTab() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<LoanStatus>(undefined);
  const [reviewBookId, setReviewBookId] = useState<number | null>(null);
  const [returningId, setReturningId] = useState<number | null>(null);
  const [confirmLoan, setConfirmLoan] = useState<Loan | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: loansData, isLoading } = useMyLoansProfile({
    status,
    limit: 20,
  });
  const loans: Loan[] =
    (loansData as any)?.data?.data?.loans ??
    (loansData as any)?.data?.loans ??
    [];

  const filtered = loans.filter((loan) =>
    loan.book?.title?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleReturn = async () => {
    if (!confirmLoan) return;
    setReturningId(confirmLoan.id);
    try {
      await api.patch(`/api/loans/${confirmLoan.id}/return`);
      toast.success('Book returned successfully!');
      queryClient.invalidateQueries({ queryKey: [Query_Keys.MeLoans] });
      setConfirmLoan(null);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? 'Failed to return book');
    } finally {
      setReturningId(null);
    }
  };

  return (
    <div className='space-y-4 md:space-y-6'>
      <h1 className='text-2xl font-bold text-gray-900 md:text-3xl'>
        Borrowed List
      </h1>

      <div className='flex items-center gap-2 bg-white rounded-full px-4 py-3 border border-gray-200 md:max-w-2xl'>
        <Search size={16} className='text-neutral-600' />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search book'
          className='flex-1 text-sm bg-transparent outline-none text-neutral-600'
        />
      </div>

      <div className='flex gap-2 overflow-x-auto pb-3'>
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

      {isLoading && (
        <div className='space-y-4'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='bg-white rounded-2xl p-4 shadow-sm animate-pulse'
            >
              <div className='h-4 w-1/3 bg-gray-100 rounded mb-3' />
              <div className='h-20 bg-gray-100 rounded' />
            </div>
          ))}
        </div>
      )}

      {!isLoading && filtered.length === 0 && (
        <div className='flex flex-col items-center py-16 gap-3 text-gray-400'>
          <span className='text-4xl'>📚</span>
          <p className='text-sm font-semibold'>No loans found</p>
        </div>
      )}

      {!isLoading && (
        <div className='space-y-5 md:max-w-6xl'>
          {filtered.map((loan) => (
            <div
              key={loan.id}
              className='bg-white rounded-2xl p-4 shadow-sm space-y-4 md:p-6'
            >
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

              <div className='border-b border-neutral-300' />

              <div className='flex items-center justify-between gap-4'>
                <LoanBookInfo loan={loan} />
                {loan.status === 'BORROWED' && (
                  <div className='flex flex-col md:flex-row gap-2 flex-shrink-0'>
                    <button
                      onClick={() => setConfirmLoan(loan)}
                      disabled={returningId === loan.id}
                      className='py-2.5 px-5 rounded-full text-sm font-semibold border-2 transition-all hover:bg-blue-50 disabled:opacity-60'
                      style={{ borderColor: '#1c65da', color: '#1c65da' }}
                    >
                      {returningId === loan.id ? 'Returning...' : 'Return'}
                    </button>
                    <button
                      onClick={() => setReviewBookId(loan.book?.id ?? null)}
                      className='py-2.5 px-5 rounded-full text-sm font-semibold text-white transition-all hover:bg-[#1550b8]'
                      style={{ backgroundColor: '#1c65da' }}
                    >
                      Give Review
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmLoan && (
        <ReturnConfirmModal
          loan={confirmLoan}
          isLoading={returningId === confirmLoan.id}
          onConfirm={handleReturn}
          onCancel={() => setConfirmLoan(null)}
        />
      )}

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
