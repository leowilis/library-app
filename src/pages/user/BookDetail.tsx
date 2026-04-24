import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookDetail, useRecommendedBooks } from '@/hooks/useBooks';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/index';
import { ROUTES } from '@/constants';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import AvatarIcon from '@/assets/avatar/avatar.svg';
import Chevron from '@/assets/icon/chevron.svg';
import StarRating from '@/components/ui/starRating';
import BorrowModal from './BorrowModal';
import ReviewModal from './ReviewModal';
import BookCard from './BookCard';
import { useIsBookBorrowed } from '@/hooks/useMe';

/**
 * BookDetail page — displays full book information including cover, stats,
 * description, reviews, and related books.
 * Handles borrow flow, out-of-stock state, and already-borrowed state.
 */
export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);
  // Modal visibility state
  const [showReview, setShowReview] = useState(false);
  const [showBorrow, setShowBorrow] = useState(false);
  // Pagination state for reviews
  const [reviewPage, setReviewPage] = useState(1);

  // Data fetching
  const { data: book, isLoading } = useBookDetail(Number(id));
 
  const { data: relatedBooks } = useRecommendedBooks({
    by: 'rating',
    categoryId: book?.categoryId,
    limit: 6,
  });

  // Borrow status checks
  const isAlreadyBorrowed = useIsBookBorrowed(Number(id));
  const isOutOfStock = book ? book.availableCopies <= 0 : false;

  // Handles borrow button click with auth and stock validation
  const handleBorrow = () => {
    if (isOutOfStock) return toast.error('This book is out of stock');
    if (isAlreadyBorrowed) return toast.error('You already borrowed this book');
    if (!token) {
      toast.error('Please login first');
      return navigate(ROUTES.Login);
    }
    setShowBorrow(true);
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className='space-y-4 px-4 py-4'>
        <div className='h-64 rounded-2xl bg-gray-100 animate-pulse' />
        <div className='h-6 w-2/3 rounded bg-gray-100 animate-pulse' />
        <div className='h-4 w-1/3 rounded bg-gray-100 animate-pulse' />
      </div>
    );
  }

  // Dynamic borrow button label based on book state
  const borrowButtonLabel = isOutOfStock
    ? 'Not Available'
    : isAlreadyBorrowed
      ? 'Already Borrowed'
      : 'Borrow Book';

  if (!book)
    return <p className='text-center py-10 text-gray-400'>Book not found</p>;

  const reviews = book.reviews ?? [];
  const visibleReviews = reviews.slice(0, reviewPage * 3);

  return (
    <div className='pb-32 md:pb-10'>
      {/* Breadcrumb navigation */}
      <div className='flex items-center gap-1 py-3 text-xs text-blue-500 md:pb-8'>
        <button
          onClick={() => navigate(ROUTES.Home)}
          className='hover:text-blue-700'
        >
          Home
        </button>
        <img src={Chevron} alt='chevron' />
        <button
          onClick={() => navigate(ROUTES.Category(book.categoryId))}
          className='hover:text-blue-700'
        >
          {book.category?.name}
        </button>
        <img src={Chevron} alt='chevron' width={16} height={16} />
        <span className='text-neutral-950 line-clamp-1'>{book.title}</span>
      </div>

      {/* Top Section: cover + book info */}
      <div className='md:flex md:gap-10 md:items-start'>
        {/* Book Cover */}
        <div className='md:w-80 md:flex-shrink-0'>
          <div className='w-full overflow-hidden'>
            <img
              src={book.coverImage ?? ''}
              alt={book.title}
              className='w-full object-contain max-h-[400px] md:max-h-[480px]'
            />
          </div>
        </div>

        {/* Book info */}
        <div className='mt-4 md:mt-0 space-y-3 flex-1'>
          <div className='flex items-center justify-between'>
            <p className='text-xs font-semibold text-neutral-950 border border-neutral-300 rounded-sm w-32 py-1 px-2 text-center'>
              {book.category?.name}
            </p>
            {/* Borrow status badges */}
            <div className='flex items-center gap-2'>
              {isAlreadyBorrowed && (
                <span className='text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded'>
                  Currently Borrowed
                </span>
              )}
              {isOutOfStock && !isAlreadyBorrowed && (
                <span className='text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded'>
                  Out of stock
                </span>
              )}
            </div>
          </div>

          <h1 className='text-2xl font-bold text-gray-900'>{book.title}</h1>
          <p className='text-sm text-neutral-700'>{book.author?.name}</p>
          <StarRating rating={book.rating} showValue />

          {/* Book Stats: Pages, Rating, Reviews */}
          <div className='flex justify-between py-3 border-b border-neutral-300 my-5 md:justify-start md:gap-0 md:max-w-xl'>
            <div className='flex flex-col items-center flex-1 border-r border-neutral-300 md:flex-none md:items-start md:pr-10'>
              <span className='text-base font-bold text-neutral-950'>
                {book.totalPages ?? '-'}
              </span>
              <span className='text-xs font-medium text-neutral-950'>Page</span>
            </div>
            <div className='flex flex-col items-center flex-1 border-r border-gray-200 md:flex-none md:items-start md:px-10'>
              <span className='text-base font-bold text-neutral-950'>
                {book.rating ?? 0}
              </span>
              <span className='text-xs font-medium text-neutral-950'>
                Rating
              </span>
            </div>
            <div className='flex flex-col items-center flex-1 md:flex-none md:items-start md:pl-10'>
              <span className='text-base font-bold text-neutral-950'>
                {book.reviewCount ?? 0}
              </span>
              <span className='text-xs font-medium text-neutral-950'>
                Reviews
              </span>
            </div>
          </div>

          {/* Book description */}
          <div>
            <h2 className='text-base font-bold text-gray-900 mb-2'>
              Description
            </h2>
            <p className='text-md text-neutral-950 leading-relaxed md:text-sm'>
              {book.description}
            </p>
          </div>

          {/* Desktop Borrow Button */}
          <div className='hidden md:flex pt-4'>
            <Button
              className='rounded-full px-8 py-5 font-semibold text-white bg-[#1C65DA] transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:bg-[#1550b8] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0'
              onClick={handleBorrow}
              disabled={isOutOfStock || isAlreadyBorrowed}
            >
              {borrowButtonLabel}
            </Button>
          </div>
        </div>
      </div>

      {/* Line */}
      <div className='mt-15 border-t border-neutral-300 pt-8 space-y-5' />

      {/* Reviews */}
      <div className='mt-8 space-y-5'>
        <div>
          <h2 className='text-2xl font-extrabold text-gray-900 mb-2'>Review</h2>
          <div className='flex items-center gap-1'>
            <StarRating rating={book.rating} showValue />
            <span className='text-xs font-extrabold text-neutral-950'>
              ({book.reviewCount} Ulasan)
            </span>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          {reviews.length === 0 ? (
            <p className='text-sm text-gray-400'>No reviews yet</p>
          ) : (
            visibleReviews.map((review: any) => (
              <div key={review.id} className='space-y-2 shadow rounded-2xl p-5'>
                <div className='flex items-center gap-4'>
                  <img
                    src={review.user?.profilePhoto ?? AvatarIcon}
                    alt={review.user?.name}
                    className='w-14 h-14 rounded-full object-cover'
                  />
                  <div>
                    <p className='text-sm font-semibold text-neutral-950'>
                      {review.user?.name}
                    </p>
                    <p className='text-xs text-neutral-950'>
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.star ?? review.rating} />
                <p className='text-sm text-gray-600 leading-relaxed'>
                  {review.comment}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Load more reviews */}
        {visibleReviews.length < reviews.length && (
          <div className='flex justify-center'>
            <button
              onClick={() => setReviewPage((p) => p + 1)}
              className='px-8 py-2 rounded-full text-sm font-semibold text-gray-700 border border-gray-300'
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Line */}
      <div className='mt-15 border-t border-neutral-300 pt-8 space-y-5' />

      {/* Related Books */}
      {relatedBooks && relatedBooks.length > 0 && (
        <div className='mt-8 space-y-4'>
          <h2 className='text-base font-extrabold text-gray-900 md:text-2xl'>
            Related Books
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            {relatedBooks
              .filter((b: any) => b.id !== book.id)
              .slice(0, 5)
              .map((b: any) => (
                <BookCard
                  key={b.id}
                  book={b}
                  onClick={() => navigate(ROUTES.BookDetail(b.id))}
                />
              ))}
          </div>
        </div>
      )}

      {/* Mobile borrow button — fixed at bottom */}
      <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 flex md:hidden'>
        <Button
          className='flex-1 rounded-full py-6 font-semibold text-white bg-[#1C65DA] transition-all duration-200 hover:bg-[#1550b8] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed'
          onClick={handleBorrow}
          disabled={isOutOfStock || isAlreadyBorrowed}
        >
          {borrowButtonLabel}
        </Button>
      </div>

      {/* Review modal */}
      {showReview && (
        <ReviewModal bookId={book.id} onClose={() => setShowReview(false)} />
      )}

      {/* Borrow modal */}
      {showBorrow && (
        <BorrowModal
          bookId={book.id}
          bookTitle={book.title}
          currentStock={book.availableCopies ?? 0}
          onClose={() => setShowBorrow(false)}
        />
      )}
    </div>
  );
}
