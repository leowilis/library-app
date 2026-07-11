import { Star } from 'lucide-react';

import EmptyState from '@/common/EmptyState';
import type { BookReview } from '@/types/book';

import BookReviewCard from './BookReviewCard';

interface BookReviewSectionProps {
  rating: number;
  reviewCount: number;
  reviews: BookReview[];
}

export default function BookReviewSection({
  rating,
  reviewCount,
  reviews,
}: BookReviewSectionProps) {
  return (
    <section className='space-y-4'>
      <div className='flex items-center gap-3'>
        <h2 className='text-lg font-extrabold text-gray-900'>Reviews</h2>
        <div className='flex items-center gap-1.5'>
          <Star size={14} fill='#fdb022' color='#fdb022' aria-hidden='true' />
          <span className='text-sm font-bold text-gray-700'>{rating}</span>
          <span className='text-xs text-gray-400'>({reviewCount} reviews)</span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <EmptyState
          title='No reviews yet'
          description="This book hasn't received any reviews."
        />
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {reviews.slice(0, 4).map((review) => (
            <BookReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}
