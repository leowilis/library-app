import { Pencil, Trash2 } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import StarRating from '@/components/ui/starRating';
import type { Review } from '@/types/review';
import ReviewBookInfo from './ReviewBookInfo';

interface ReviewCardProps {
  review: Review;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ReviewCard({
  review,
  onEdit,
  onDelete,
}: ReviewCardProps) {
  return (
    <div className='space-y-5 rounded-2xl bg-white p-4 shadow-sm md:max-w-5xl'>
      <div className='flex items-center justify-between'>
        <p className='text-sm font-semibold text-neutral-950'>
          {formatDateTime(review.createdAt)}
        </p>

        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={onEdit}
            className='rounded p-1.5 text-gray-400 transition hover:text-blue-500'
            aria-label='Edit review'
          >
            <Pencil size={16} />
          </button>

          <button
            type='button'
            onClick={onDelete}
            className='rounded p-1.5 text-gray-400 transition hover:text-red-500'
            aria-label='Delete review'
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <hr className='border-gray-300' />

      <ReviewBookInfo review={review} />

      <hr className='border-gray-300' />

      <StarRating rating={review.star} />

      <p className='leading-relaxed text-gray-950'>{review.comment}</p>
    </div>
  );
}
