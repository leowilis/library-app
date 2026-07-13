import { useState } from 'react';

import EmptyState from '@/common/EmptyState';
import ErrorState from '@/common/ErrorState';

import ReviewCard from './ReviewCard';

import ReviewModal from '@/pages/user/ReviewModal';
import DeleteReviewModal from '@/components/user/DeleteReviewModal';
import SearchBar from '../BorrowedTab/SearchBar';

import { SkeletonReviewCard } from '@/components/ui/skeleton';

import { useDeleteReview } from '@/hooks/useReviews';
import { useMyReviews } from '@/hooks/useMe';

import type { Review } from '@/types/review';

export default function ReviewsTab() {
  const [search, setSearch] = useState('');

  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const [reviewToDelete, setReviewToDelete] = useState<Review | null>(null);

  const {
    data: reviewsData,
    isLoading,
    isError,
  } = useMyReviews({
    q: search.trim(),
  });

  const { mutate: deleteReview, isPending: isDeleting } = useDeleteReview();

  const reviews = reviewsData ?? [];

  const handleDelete = () => {
    if (!reviewToDelete) return;

    deleteReview(
      {
        reviewId: reviewToDelete.id,
        bookId: reviewToDelete.book.id,
      },
      {
        onSuccess: () => {
          setReviewToDelete(null);
        },
      },
    );
  };

  if (isError) {
    return (
      <ErrorState
        title='Failed to load reviews'
        description='Please try again later.'
      />
    );
  }

  return (
    <section className='space-y-5 md:space-y-6'>
      <h1 className='text-3xl font-bold text-gray-900'>Reviews</h1>

      <SearchBar value={search} onChange={setSearch} />

      {isLoading ? (
        <div className='space-y-5'>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonReviewCard key={index} />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <EmptyState
          title='No reviews yet'
          description='Your submitted reviews will appear here.'
        />
      ) : (
        <div className='space-y-6'>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onEdit={() => setEditingReview(review)}
              onDelete={() => setReviewToDelete(review)}
            />
          ))}
        </div>
      )}

      {reviewToDelete && (
        <DeleteReviewModal
          isLoading={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setReviewToDelete(null)}
        />
      )}

      {editingReview && (
        <ReviewModal
          mode='edit'
          review={editingReview}
          onClose={() => setEditingReview(null)}
          onSuccess={() => setEditingReview(null)}
        />
      )}
    </section>
  );
}
