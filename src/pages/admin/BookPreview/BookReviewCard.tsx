import AvatarIcon from '@/assets/avatar/avatar.png';
import StarRating from '@/components/ui/starRating';
import { formatDate } from '@/lib/utils';
import type { BookReview } from '@/types/book';

interface BookReviewCardProps {
  review: BookReview;
}

export default function BookReviewCard({ review }: BookReviewCardProps) {
  return (
    <div className='space-y-3 rounded-2xl bg-gray-50 p-4'>
      <div className='flex items-center gap-3'>
        <img
          src={review.user?.profilePhoto ?? AvatarIcon}
          alt={review.user?.name ?? 'User'}
          className='h-10 w-10 rounded-full object-cover'
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

      <StarRating rating={review.star} variant='five' size={16} />

      <p className='text-sm leading-relaxed text-gray-600'>{review.comment}</p>
    </div>
  );
}
