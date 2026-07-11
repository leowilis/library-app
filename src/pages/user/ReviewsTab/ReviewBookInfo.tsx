import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants';
import type { Review } from '@/types/review';

interface ReviewBookInfoProps {
  review: Review;
}

export default function ReviewBookInfo({ review }: ReviewBookInfoProps) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (review.book?.id) {
      navigate(ROUTES.BookDetail(review.book.id));
    }
  };

  return (
    <button
      type='button'
      onClick={handleNavigation}
      className='flex w-full text-left gap-3 select-none outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 rounded-xl group cursor-pointer'
    >
      {/* Cover Image Container */}
      <div className='h-28 w-20 flex-shrink-0 overflow-hidden bg-gray-100'>
        {review.book?.coverImage ? (
          <img
            src={review.book.coverImage}
            alt={review.book.title}
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center bg-blue-50 text-xl'>
            📚
          </div>
        )}
      </div>

      {/* Book Metadata Context */}
      <div className='flex min-w-0 flex-1 flex-col justify-center gap-4'>
        <span className='w-fit rounded-sm border border-gray-300 px-2 py-1 text-xs font-bold text-neutral-950'>
          {review.book?.category?.name ?? 'Category'}
        </span>

        <p className='text-sm font-bold text-gray-900'>{review.book?.title}</p>

        <p className='text-xs text-neutral-700'>{review.book?.author?.name}</p>
      </div>
    </button>
  );
}
