import { Button } from '@/components/ui/button';
import StarRating from '@/components/ui/starRating';
import { formatDate } from '@/lib/utils';
import AvatarIcon from '@/assets/avatar/avatar.svg';
import type { BookReview } from '@/types/book';
import LoadMoreButton from '@/common/LoadMoreButton';

interface BookReviewSectionProps {
  rating: number;
  reviewCount: number;
  visibleReviews: BookReview[];
  hasReturnedBook: boolean;
  onGiveReview: () => void;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function BookReviewSection({
  rating,
  reviewCount,
  visibleReviews,
  hasReturnedBook,
  onGiveReview,
  hasMore,
  onLoadMore,
}: BookReviewSectionProps) {
  return (
    <section className='mt-8 space-y-5'>
      <div className='flex items-center justify-between gap-4'>
        <div>
          <h2
            id='review-section-title'
            className='mb-2 text-2xl font-extrabold text-gray-900'
          >
            Reviews
          </h2>

          <div className='flex items-center gap-2'>
            <StarRating rating={rating} showValue />

            <span className='text-xs font-extrabold text-neutral-950'>
              ({reviewCount} Reviews)
            </span>
          </div>
          {/* Messages to guide users */}
          {!hasReturnedBook && (
            <p className='mt-2 text-sm text-neutral-500'>
              Return this book first to write a review.
            </p>
          )}
        </div>

        <Button
          onClick={onGiveReview}
          disabled={!hasReturnedBook}
          aria-disabled={!hasReturnedBook}
          className='flex-shrink-0 rounded-full bg-primary-300 px-6 py-5 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300'
        >
          Give Reviews
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        {visibleReviews.length === 0 ? (
          <div className='py-8 text-center'>
            <p className='text-sm text-neutral-500'>No reviews yet.</p>
          </div>
        ) : (
          visibleReviews.map((review) => (
            <article
              key={review.id}
              className='space-y-2 rounded-2xl p-5 shadow-sm'
            >
              <div className='flex items-center gap-4'>
                <img
                  src={review.user?.profilePhoto ?? AvatarIcon}
                  alt={review.user?.name ?? 'User'}
                  className='h-14 w-14 rounded-full object-cover'
                />

                <div>
                  <p className='text-sm font-semibold text-neutral-950'>
                    {review.user?.name ?? 'Anonymous'}
                  </p>

                  <p className='text-xs text-neutral-500'>
                    {formatDate(review.createdAt)}
                  </p>
                </div>
              </div>

              <StarRating rating={review.star} />

              <p className='text-sm leading-relaxed text-gray-600'>
                {review.comment}
              </p>
            </article>
          ))
        )}
      </div>

      <LoadMoreButton show={hasMore} onClick={onLoadMore} />
    </section>
  );
}
