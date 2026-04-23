import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Trash2 } from 'lucide-react';
import { useMyReviews } from '@/hooks/useMe';
import { useDeleteReview } from '@/hooks/useReviews';
import { ROUTES } from '@/constants';
import { formatDateTime } from '@/lib/utils';
import { toast } from 'sonner';
import StarRating from '@/components/ui/starRating';
import DeleteReviewModal from '@/components/user/DeleteReviewModal';
import { SkeletonReviewCard } from '@/components/ui/skeleton';

// Reviews tab — shows user's submitted reviews with delete functionality
export default function ReviewsTab() {
  const navigate = useNavigate();

  // UI state
  const [search, setSearch] = useState('');
  const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);

  // Data fetching
  const { data: reviewsData, isLoading } = useMyReviews({ q: search });
  const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview();
  const reviews = reviewsData?.data?.reviews ?? [];

  // Handles review deletion and closes modal on success
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

  return (
    <div className='space-y-4'>
      <h1 className='text-3xl font-bold text-gray-900'>Reviews</h1>

      {/* Search input */}
      <div className='flex items-center gap-2 bg-white rounded-full px-4 py-3 border border-neutral-300 md:max-w-2xl'>
        <Search size={20} className='text-neutral-600' />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search book'
          className='flex-1 text-sm bg-transparent outline-none text-neutral-600'
        />
      </div>

      {/* Loading skeleton */}
      {isLoading && [1, 2, 3].map((i) => <SkeletonReviewCard key={i} />)}

      {/* Empty state */}
      {!isLoading && reviews.length === 0 && (
        <div className='flex flex-col items-center py-16 gap-3 text-gray-400'>
          <StarRating rating={0} />
          <p className='text-sm font-semibold'>No reviews yet</p>
        </div>
      )}

      {/* Review list */}
      {!isLoading && reviews.length > 0 && (
        <div className='space-y-6'>
          {reviews.map((review: any) => (
            <div
              key={review.id}
              className='bg-white rounded-2xl p-4 shadow-sm space-y-4 md:p-4 md:space-y-5 md:max-w-5xl'
            >
              {/* Date and delete button */}
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

              {/* Line */}
              <hr className='border-gray-300' />

              {/* Book info */}
              <div
                className='flex gap-3 cursor-pointer'
                onClick={() => navigate(ROUTES.BookDetail(review.book?.id))}
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

              {/* Line */}
              <hr className='border-gray-300' />

              {/* Star rating and comment */}
              <StarRating rating={review.star ?? review.rating} />
              <p className='text-sm text-gray-950 leading-relaxed'>
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
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
