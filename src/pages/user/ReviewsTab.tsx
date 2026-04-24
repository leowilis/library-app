import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trash2, AlertCircle } from 'lucide-react';
import { useMyReviews } from '@/hooks/useMe';
import { useDeleteReview } from '@/hooks/useReviews';
import { ROUTES } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { toast } from 'sonner';
import StarRating from '@/components/ui/starRating';
import DeleteReviewModal from '@/components/user/DeleteReviewModal';
import { SkeletonReviewCard } from '@/components/ui/skeleton';
import type { Review } from '@/types/review';

// ReviewsTab

export default function ReviewsTab() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);

  const { data: reviewsData, isLoading, isError } = useMyReviews({ q: search });
  const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview();

  const reviews: Review[] = reviewsData?.data?.reviews ?? [];

  // Confirms and submits delete, closes modal on success
  const handleConfirmDelete = () => {
    if (!deleteReviewId) return;
    deleteReview(deleteReviewId, {
      onSuccess: () => {
        toast.success('Review deleted!');
        setDeleteReviewId(null);
      },
      onError: () => toast.error('Failed to delete review'),
    });
  };

  // ── Error State ──
  if (isError) {
    return (
      <div className='flex flex-col items-center justify-center py-20 gap-3 text-red-500'>
        <AlertCircle size={40} />
        <p className='text-sm font-semibold'>
          Failed to load reviews. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <h1 className='text-3xl font-bold text-gray-900'>Reviews</h1>

      {/* Search */}
      <div className='flex items-center gap-2 bg-white rounded-full px-4 py-3 border border-neutral-300 md:max-w-2xl'>
        <Search size={20} className='text-neutral-600' />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search book'
          className='flex-1 text-sm bg-transparent outline-none text-neutral-600'
        />
      </div>

      {/* Loading */}
      {isLoading && [1, 2, 3].map((i) => <SkeletonReviewCard key={i} />)}

      {/* Empty */}
      {!isLoading && reviews.length === 0 && (
        <div className='flex flex-col items-center py-16 gap-3 text-gray-400'>
          <StarRating rating={0} />
          <p className='text-sm font-semibold'>No reviews yet</p>
        </div>
      )}

      {/* Review List */}
      {!isLoading && reviews.length > 0 && (
        <div className='space-y-6'>
          {reviews.map((review) => (
            <div
              key={review.id}
              className='bg-white rounded-2xl p-4 shadow-sm space-y-4 md:p-4 md:space-y-5 md:max-w-5xl'
            >
              {/* Date + Delete */}
              <div className='flex items-center justify-between'>
                <p className='text-sm text-neutral-950 font-semibold'>
                  {formatDateTime(review.createdAt)}
                </p>
                <button
                  onClick={() => setDeleteReviewId(review.id)}
                  className='p-1.5 text-gray-400 hover:text-red-500 transition-colors'
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <hr className='border-gray-300' />

              {/* Book Info */}
              <div
                className='flex gap-3 cursor-pointer'
                onClick={() =>
                  navigate(ROUTES.BookDetail(review.book?.id ?? 0))
                }
              >
                <div className='w-20 h-28 overflow-hidden flex-shrink-0 bg-gray-100'>
                  {review.book?.coverImage ? (
                    <img
                      src={review.book.coverImage}
                      alt={review.book.title}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-xl bg-blue-50'>
                      📚
                    </div>
                  )}
                </div>
                <div className='flex-1 min-w-0 flex flex-col justify-center gap-4'>
                  <span className='inline-block text-xs font-bold px-2 py-1 rounded-sm border border-gray-300 text-neutral-950 w-fit'>
                    {review.book?.category?.name}
                  </span>
                  <p className='text-sm font-bold text-gray-900'>
                    {review.book?.title}
                  </p>
                  <p className='text-xs text-neutral-700'>
                    {review.book?.author?.name}
                  </p>
                </div>
              </div>

              <hr className='border-gray-300' />

              {/* Rating + Comment */}
              <StarRating rating={review.star} />
              <p className='text-sm text-gray-950 leading-relaxed'>
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {deleteReviewId && (
        <DeleteReviewModal
          isLoading={isDeleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteReviewId(null)}
        />
      )}
    </div>
  );
}
