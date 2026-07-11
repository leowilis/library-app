import { formatDate } from '@/lib/utils';
import type { Loan } from '@/types/loan';

interface LoanBookInfoProps {
  loan: Loan;
}

export default function LoanBookInfo({ loan }: LoanBookInfoProps) {
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
          <div className='flex h-full w-full items-center justify-center bg-blue-50 text-2xl'>
            📚
          </div>
        )}
      </div>

      <div className='m-2 flex-1 min-w-0 space-y-4 md:space-y-5'>
        <span className='inline-block rounded-sm border border-gray-300 px-2 py-0.5 text-xs font-semibold text-gray-500'>
          {loan.book?.category?.name ?? 'Category'}
        </span>

        <p className='text-sm font-bold text-gray-900'>{loan.book?.title}</p>

        <p className='text-xs font-bold text-neutral-950'>
          {formatDate(loan.borrowedAt)} · Duration {loan.durationDays} Days
        </p>
      </div>
    </div>
  );
}
