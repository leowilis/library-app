import type { Loan } from '@/types/loan';
import { cn, formatDate } from '@/lib/utils';

import LoanBookInfo from './LoanBookInfo';

const STATUS_COLOR = {
  BORROWED: 'bg-green-100 text-green-700',
  RETURNED: 'bg-gray-100 text-gray-600',
  LATE: 'bg-red-100 text-red-600',
} as const;

const STATUS_LABEL = {
  BORROWED: 'Active',
  RETURNED: 'Returned',
  LATE: 'Overdue',
} as const;

interface LoanCardProps {
  loan: Loan;
  isReturning: boolean;
  onReturn: () => void;
  onReview: () => void;
}

// Loan Card
export default function LoanCard({
  loan,
  isReturning,
  onReturn,
  onReview,
}: LoanCardProps) {
  // Safe runtime configuration mapping
  const statusKey = loan.status as keyof typeof STATUS_COLOR;
  const statusLabel = STATUS_LABEL[statusKey] ?? 'Unknown';

  return (
    <div className='bg-white rounded-2xl p-4 shadow-sm space-y-4 md:space-y-6'>
      {/* Header Status & Dates Section */}
      <div className='flex items-center justify-between'>
        <div className='flex gap-1 items-center'>
          <span className='text-sm font-bold'>Status</span>
          <span
            className={cn(
              'rounded-lg px-2.5 py-1 text-xs font-bold',
              STATUS_COLOR[statusKey],
            )}
          >
            {statusLabel}
          </span>
        </div>

        <div className='flex gap-1 items-center'>
          <span className='text-sm font-bold'>Due Date</span>
          <span className='rounded-lg bg-red-50 px-2 py-1 text-xs font-bold text-red-600'>
            {formatDate(loan.dueAt)}
          </span>
        </div>
      </div>

      <hr className='border-gray-100' />

      {/* Main Metadata Info Body & Actions Segment */}
      <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        <LoanBookInfo loan={loan} />

        <div className='flex justify-end gap-2 flex-shrink-0'>
          {loan.status === 'BORROWED' && (
            <button
              type='button'
              onClick={onReturn}
              disabled={isReturning}
              className='rounded-full border-2 border-[#1c65da] px-9 py-2.5 text-sm font-semibold text-[#1c65da] hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isReturning ? 'Returning...' : 'Return'}
            </button>
          )}

          {loan.status === 'RETURNED' && (
            <button
              type='button'
              onClick={onReview}
              className='rounded-full bg-[#1c65da] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1550b8] transition'
            >
              Give Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
