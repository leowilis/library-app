import { useParams, useNavigate } from 'react-router-dom';
import { useBookDetail, useRecommendedBooks } from '@/hooks/useBooks';
import { Star, ChevronLeft, AlertCircle } from 'lucide-react';
import AvatarIcon from '@/assets/avatar/avatar.svg';
import { formatDate } from '@/lib/utils';
import BookCard from '../user/BookCard';
import type { Book, BookReview } from '@/types/book';

/**
 * Renders a row of 5 stars filled based on the given rating.
 */
function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className='flex gap-0.5'>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= Math.round(rating) ? '#fdb022' : 'transparent'}
          color={i <= Math.round(rating) ? '#fdb022' : '#d1d5db'}
        />
      ))}
    </div>
  );
}

// StatItem

/**
 * Single stat column showing a value and label.
 */
function StatItem({ value, label }: { value: string | number; label: string }) {
  return (
    <div className='flex flex-col items-center gap-1'>
      <span className='text-lg font-extrabold text-neutral-950'>{value}</span>
      <span className='text-xs font-medium text-neutral-500'>{label}</span>
    </div>
  );
}

// ReviewCard

/**
 * Displays a single user review with avatar, name, date, rating, and comment.
 */
function ReviewCard({ review }: { review: BookReview }) {
  return (
    <div className='bg-gray-50 rounded-2xl p-4 space-y-3'>
      <div className='flex items-center gap-3'>
        <img
          src={review.user?.profilePhoto ?? AvatarIcon}
          alt={review.user?.name}
          className='w-10 h-10 rounded-full object-cover flex-shrink-0'
        />
        <div>
          <p className='text-sm font-semibold text-gray-900'>
            {review.user?.name}
          </p>
          <p className='text-xs text-gray-400'>
            {formatDate(review.createdAt)}
          </p>
        </div>
      </div>
      <StarRating rating={review.star} />
      <p className='text-sm text-gray-600 leading-relaxed'>{review.comment}</p>
    </div>
  );
}

/**
 * Admin Book Preview page.
 *
 * Fetches full book detail via `useBookDetail` and renders:
 * - Cover, category, title, author, rating
 * - Stats: pages, rating, reviews
 * - Description
 * - User reviews grid
 * - Related books
 */
export default function AdminBookPreview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: book, isLoading, isError } = useBookDetail(Number(id));

  const { data: relatedBooks } = useRecommendedBooks({
    by: 'rating',
    categoryId: book?.categoryId,
    limit: 6,
  });

  // ── Loading ──
  if (isLoading) {
    return (
      <section className='space-y-4 px-4 py-4 max-w-5xl'>
        <div className='h-8 w-32 rounded-xl bg-gray-100 animate-pulse' />
        <div className='md:flex md:gap-8'>
          <div className='h-80 w-56 rounded-2xl bg-gray-100 animate-pulse flex-shrink-0' />
          <div className='flex-1 space-y-4 mt-4 md:mt-0'>
            <div className='h-6 w-24 rounded bg-gray-100 animate-pulse' />
            <div className='h-8 w-3/4 rounded bg-gray-100 animate-pulse' />
            <div className='h-4 w-1/3 rounded bg-gray-100 animate-pulse' />
            <div className='h-24 rounded-xl bg-gray-100 animate-pulse' />
          </div>
        </div>
      </section>
    );
  }

  // ── Error ──
  if (isError) {
    return (
      <section className='flex flex-col items-center justify-center py-20 gap-3 text-red-500'>
        <AlertCircle size={40} />
        <p className='text-sm font-semibold'>
          Failed to load book. Please try again.
        </p>
      </section>
    );
  }

  // ── Not Found ──
  if (!book) {
    return <p className='text-center py-10 text-gray-400'>Book not found</p>;
  }

  const reviews: BookReview[] = book.reviews ?? [];

  return (
    <section className='pb-16 max-w-5xl space-y-10'>
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/books')}
        className='flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors'
      >
        <ChevronLeft size={18} />
        Back to Book List
      </button>

      {/* Main Content */}
      <div className='md:flex md:gap-10 md:items-start'>
        {/* Cover */}
        <div className='md:w-56 md:flex-shrink-0'>
          <div className='w-full rounded-2xl overflow-hidden shadow-md bg-gray-100'>
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                className='w-full object-cover'
              />
            ) : (
              <div className='w-full h-72 flex items-center justify-center text-4xl bg-gray-100'>
                📚
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className='mt-6 md:mt-0 space-y-4 flex-1'>
          {/* Category */}
          <span className='inline-block text-xs font-semibold px-3 py-1 border border-neutral-300 rounded-full text-neutral-600'>
            {book.category?.name}
          </span>

          {/* Title + Author */}
          <div>
            <h1 className='text-2xl font-extrabold text-gray-900 leading-tight'>
              {book.title}
            </h1>
            <p className='text-sm text-gray-500 mt-1'>{book.author?.name}</p>
          </div>

          {/* Rating */}
          <div className='flex items-center gap-2'>
            <StarRating rating={book.rating} />
            <span className='text-sm font-bold text-gray-700'>
              {book.rating}
            </span>
          </div>

          {/* Stats */}
          <div className='flex items-center gap-8 py-4 border-y border-gray-100'>
            <StatItem value={book.totalPages ?? '-'} label='Pages' />
            <StatItem value={book.rating ?? 0} label='Rating' />
            <StatItem value={book.reviewCount ?? 0} label='Reviews' />
            <StatItem value={book.availableCopies ?? 0} label='Available' />
          </div>

          {/* Description */}
          <div className='space-y-2'>
            <h2 className='text-sm font-bold text-gray-900'>Description</h2>
            <p className='text-sm text-gray-600 leading-relaxed'>
              {book.description ?? 'No description available.'}
            </p>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className='space-y-4'>
        <div className='flex items-center gap-3'>
          <h2 className='text-lg font-extrabold text-gray-900'>Reviews</h2>
          <div className='flex items-center gap-1.5'>
            <Star size={14} fill='#fdb022' color='#fdb022' />
            <span className='text-sm font-bold text-gray-700'>
              {book.rating}
            </span>
            <span className='text-xs text-gray-400'>
              ({book.reviewCount} ulasan)
            </span>
          </div>
        </div>

        {reviews.length === 0 ? (
          <p className='text-sm text-gray-400 py-6 text-center'>
            No reviews yet
          </p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {reviews.slice(0, 4).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>

      {/* Related Books */}
      {relatedBooks && relatedBooks.length > 0 && (
        <div className='space-y-4'>
          <h2 className='text-lg font-extrabold text-gray-900'>
            Related Books
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-5 gap-4'>
            {relatedBooks
              .filter((b: Book) => b.id !== book.id)
              .slice(0, 5)
              .map((b: Book) => (
                <BookCard
                  key={b.id}
                  book={b}
                  onClick={() => navigate(`/admin/books/${b.id}`)}
                />
              ))}
          </div>
        </div>
      )}
    </section>
  );
}
