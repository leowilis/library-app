import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

import { ROUTES } from '@/constants';
import type { RootState } from '@/store';

import {
  BookBreadcrumb,
  BookCover,
  BookDescription,
  BookHeader,
  BookReviewSection,
  BookStats,
  MobileBorrowBar,
  RelatedBooksSection,
} from '@/components/book';

import BorrowModal from './BorrowModal';
import ReviewModal from './ReviewModal';

import { useBookDetail, useRecommendedBooks } from '@/hooks/useBooks';
import { useHasReturnedBook, useIsBookBorrowed } from '@/hooks/useMe';

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { token } = useSelector((state: RootState) => state.auth);

  const [showBorrow, setShowBorrow] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviewPage, setReviewPage] = useState(1);

  const bookId = Number(id);

  useEffect(() => {
    setReviewPage(1);
  }, [bookId]);

  const { data: book, isLoading } = useBookDetail(bookId);

  const { data: relatedBooks } = useRecommendedBooks({
    by: 'rating',
    categoryId: book?.categoryId,
    limit: 6,
  });

  const isAlreadyBorrowed = useIsBookBorrowed(bookId);
  const hasReturnedBook = useHasReturnedBook(bookId);
  const isOutOfStock = (book?.availableCopies ?? 0) <= 0;

  const handleBorrow = () => {
    if (isOutOfStock) {
      toast.error('This book is out of stock');
      return;
    }

    if (isAlreadyBorrowed) {
      toast.error('You already borrowed this book');
      return;
    }

    if (!token) {
      toast.error('Please login first');
      navigate(ROUTES.Login);
      return;
    }

    setShowBorrow(true);
  };

  if (isLoading) {
    return (
      <div className='space-y-4 px-4 py-4'>
        <div className='h-64 animate-pulse rounded-2xl bg-gray-100' />
        <div className='h-6 w-2/3 animate-pulse rounded bg-gray-100' />
        <div className='h-4 w-1/3 animate-pulse rounded bg-gray-100' />
      </div>
    );
  }

  if (!book) {
    return <p className='py-10 text-center text-gray-400'>Book not found.</p>;
  }

  const borrowButtonLabel = isOutOfStock
    ? 'Not Available'
    : isAlreadyBorrowed
      ? 'Already Borrowed'
      : 'Borrow Book';

  const reviews = book.reviews ?? [];
  const visibleReviews = reviews.slice(0, reviewPage * 3);

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
          onGiveReview={() => setShowReview(true)}
          hasMore={visibleReviews.length < reviews.length}
          onLoadMore={() => setReviewPage((page) => page + 1)}
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
