import { formatDate } from '@/lib/utils';

import type { AdminLoan } from '@/types/admin/admin';
import { getBorrowerName } from '@/lib/queryHelpers';

import { getLoanStatusColor, getLoanStatusLabel } from '@/lib/loanHelpers';

interface BorrowedCardProps {
  loan: AdminLoan;
  isOverdue: boolean;
}

export default function BorrowedCard({ loan, isOverdue }: BorrowedCardProps) {
  const statusColor = getLoanStatusColor(loan, isOverdue);
  const statusLabel = getLoanStatusLabel(loan, isOverdue);
  const category =
    loan.book?.category?.name && loan.book.category.name !== 'string'
      ? loan.book.category.name
      : 'Uncategorized';

  return (
    <article className='rounded-2xl bg-white p-4 shadow-sm'>
      {/* Status */}
      <div className='mb-3 flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <span className='text-md font-bold text-neutral-950'>Status</span>

          <span
            className='rounded px-2 py-1 text-sm font-bold'
            style={{
              color: statusColor,
              backgroundColor: `${statusColor}1A`,
            }}
          >
            {statusLabel}
          </span>
        </div>

        <div className='flex items-center gap-1'>
          <span className='text-md font-bold text-neutral-950'>Due Date</span>

          <span className='rounded bg-red-50 px-2 py-1 text-sm font-bold text-red-600'>
            {formatDate(loan.dueAt)}
          </span>
        </div>
      </div>

      <div className='my-5 border-t border-neutral-300' />

      <div className='flex flex-col gap-3'>
        <div className='h-32 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100'>
          {loan.book?.coverImage ? (
            <img
              src={loan.book.coverImage}
              alt={loan.book.title}
              className='h-full w-full object-cover'
            />
          ) : (
            <div className='flex h-full w-full items-center justify-center bg-neutral-100 text-3xl'>
              📚
            </div>
          )}
        </div>

        <div className='min-w-0 flex-1 space-y-3'>
          <span className='inline-block rounded-md border border-neutral-300 px-2 py-1 text-xs font-bold text-neutral-950'>
            {category}
          </span>
          <p className='line-clamp-1 text-md font-bold text-gray-950'>
            {loan.book?.title}
          </p>
          <p className='text-xs text-neutral-700'>{loan.book?.author?.name}</p>
          <p className='text-sm font-bold text-neutral-950'>
            {formatDate(loan.borrowedAt)} · Duration {loan.durationDays} Days
          </p>

          <div className='space-y-2.5 border-t border-gray-200 pt-4'>
            <p className='text-xs font-semibold text-neutral-950'>
              Borrower's Name
            </p>

            <p className='text-sm font-bold text-neutral-950'>
              {getBorrowerName(loan)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
