import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EmptyState from '@/common/EmptyState';
import ErrorState from '@/common/ErrorState';
import { SkeletonCard } from '@/components/ui/skeleton';
import ReviewModal from '@/pages/user/ReviewModal';

import { useMyLoansProfile } from '@/hooks/useMe';
import { useReturnBook } from '@/hooks/useReturnBook';

import type { Loan, LoanStatus } from '@/types/loan';

import LoanCard from './LoanCard';
import ReturnConfirmModal from './ReturnConfirmModal';
import SearchBar from './SearchBar';
import StatusFilter from './StatusFilter';

/**
 * Borrowed books tab.
 *
 * Supports:
 * - Search
 * - Status filter
 * - Return book
 * - Give review
 */
export default function BorrowedTab() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<LoanStatus>();
  const [reviewBookId, setReviewBookId] = useState<number | null>(null);
  const [confirmLoan, setConfirmLoan] = useState<Loan | null>(null);

  const {
    data: loansData,
    isLoading,
    isError,
  } = useMyLoansProfile({
    status,
    q: search.trim(),
    limit: 20,
  });

  const { mutate: returnBook, isPending: isReturning } = useReturnBook();

  const loans = loansData ?? [];

  const handleReturn = () => {
    if (!confirmLoan?.book) return;

    returnBook(
      {
        loanId: confirmLoan.id,
        bookId: confirmLoan.book.id,
      },
      {
        onSuccess: () => setConfirmLoan(null),
      },
    );
  };

  // Error
  if (isError) {
    return (
      <section className='p-6'>
        <ErrorState
          title='Failed to load loans'
          description='Please try again later.'
        />
      </section>
    );
  }

  return (
    <section className='space-y-6'>
      <h1 className='text-2xl font-bold text-gray-900 md:text-3xl'>
        Borrowed List
      </h1>

      <SearchBar value={search} onChange={setSearch} />

      <StatusFilter value={status} onChange={setStatus} />

      {/* Loading */}
      {isLoading ? (
        <div className='space-y-5 pt-1 md:max-w-5xl'>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : loans.length === 0 ? (
        /* Empty state */
        <div className='rounded-2xl border border-dashed border-gray-200 bg-white py-14'>
          <EmptyState
            title='No loans found'
            description={
              search
                ? `No borrowed books match "${search}".`
                : "You haven't borrowed any books yet."
            }
          />
        </div>
      ) : (
        /* Loan list */
        <div className='space-y-5 pt-1 md:max-w-5xl'>
          {loans.map((loan) => (
            <LoanCard
              key={loan.id}
              loan={loan}
              isReturning={isReturning}
              onReturn={() => setConfirmLoan(loan)}
              onReview={() => {
                if (loan.book) {
                  setReviewBookId(loan.book.id);
                }
              }}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {confirmLoan && (
        <ReturnConfirmModal
          loan={confirmLoan}
          isLoading={isReturning}
          onConfirm={handleReturn}
          onCancel={() => setConfirmLoan(null)}
        />
      )}

      {reviewBookId && (
        <ReviewModal
          mode='create'
          bookId={reviewBookId}
          onClose={() => setReviewBookId(null)}
          onSuccess={() => {
            setReviewBookId(null);
            navigate('/profile?tab=reviews');
          }}
        />
      )}
    </section>
  );
}
