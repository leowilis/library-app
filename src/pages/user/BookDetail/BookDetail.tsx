import {
  BookBreadcrumb,
  BookCover,
  BookDescription,
  BookHeader,
  BookReviewSection,
  BookStats,
  MobileBorrowBar,
  RelatedBooksSection,
} from '@/pages/user/BookDetail';

import BorrowModal from '../BorrowModal';
import ReviewModal from '../ReviewModal';

import EmptyState from '@/common/EmptyState';
import { SkeletonBookDetail } from '@/components/ui/skeleton';

import { useBookDetailPage } from './useBookDetailPage';
import ErrorState from '@/common/ErrorState';

export default function BookDetail() {
  const {
    book,
    isLoading,
    isError,

    relatedBooks,

    showBorrow,
    setShowBorrow,

    showReview,
    setShowReview,

    visibleReviews,
    hasMore,

    borrowButtonLabel,

    isAlreadyBorrowed,
    isOutOfStock,
    hasReturnedBook,

    handleBorrow,
    handleGiveReview,
    handleLoadMore,
  } = useBookDetailPage();

  if (isLoading) {
    return <SkeletonBookDetail />;
  }

  if (isError) {
    return (
      <ErrorState
        title='Failed to load book'
        description='Please try again later.'
      />
    );
  }

  if (!book) {
    return (
      <EmptyState
        title='Book not found'
        description='The requested book could not be found.'
      />
    );
  }

  return (
    <div className='pb-32 md:pb-10'>
      <BookBreadcrumb
        categoryId={book.categoryId}
        categoryName={book.category?.name ?? ''}
        title={book.title}
      />

      <div className='items-start gap-10 md:flex'>
        <BookCover coverImage={book.coverImage} title={book.title} />

        <div className='flex-1'>
          <BookHeader
            category={book.category?.name}
            title={book.title}
            author={book.author?.name}
            rating={book.rating}
            isAlreadyBorrowed={isAlreadyBorrowed}
            isOutOfStock={isOutOfStock}
            borrowButtonLabel={borrowButtonLabel}
            onBorrow={handleBorrow}
          />

          <BookStats
            totalPages={book.totalPages}
            rating={book.rating}
            reviewCount={book.reviewCount}
          />

          <BookDescription description={book.description} />
        </div>
      </div>

      <div className='mt-12 border-t border-neutral-300 pt-8'>
        <BookReviewSection
          rating={book.rating}
          reviewCount={book.reviewCount}
          visibleReviews={visibleReviews}
          hasReturnedBook={hasReturnedBook}
          onGiveReview={handleGiveReview}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
        />
      </div>

      <div className='mt-12 border-t border-neutral-300 pt-8'>
        <RelatedBooksSection
          currentBookId={book.id}
          books={relatedBooks ?? []}
        />
      </div>

      <MobileBorrowBar
        borrowButtonLabel={borrowButtonLabel}
        disabled={isAlreadyBorrowed || isOutOfStock}
        onBorrow={handleBorrow}
      />

      {showReview && (
        <ReviewModal
          mode='create'
          bookId={book.id}
          onClose={() => setShowReview(false)}
        />
      )}

      {showBorrow && (
        <BorrowModal
          bookId={book.id}
          bookTitle={book.title}
          currentStock={book.availableCopies}
          onClose={() => setShowBorrow(false)}
        />
      )}
    </div>
  );
}
