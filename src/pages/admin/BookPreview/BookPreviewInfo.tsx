import type { Book } from '@/types/book';

import StatItem from './StatItem';
import StarRating from '@/components/ui/starRating';

interface BookPreviewInfoProps {
  book: Book;
}

export default function BookPreviewInfo({ book }: BookPreviewInfoProps) {
  return (
    <div className='md:flex md:items-start md:gap-10'>
      {/* Cover */}
      <div className='md:w-56 md:flex-shrink-0'>
        <div className='overflow-hidden rounded-2xl bg-gray-100 shadow-md'>
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className='w-full object-cover'
            />
          ) : (
            <div className='flex h-72 w-full items-center justify-center bg-gray-100 text-4xl'>
              📚
            </div>
          )}
        </div>
      </div>

      {/* Book Information */}
      <div className='mt-6 flex-1 space-y-4 md:mt-0'>
        <span className='inline-block rounded-full border border-neutral-300 px-3 py-1 text-xs font-semibold text-neutral-600'>
          {book.category?.name}
        </span>
        <div>
          <h1 className='text-2xl font-extrabold leading-tight text-gray-900'>
            {book.title}
          </h1>
          <p className='mt-1 text-sm text-gray-500'>{book.author?.name}</p>
        </div>

        <StarRating rating={book.rating} showValue />

        <div className='flex items-center gap-8 border-y border-gray-100 py-4'>
          <StatItem value={book.totalPages ?? '-'} label='Pages' />
          <StatItem value={book.rating} label='Rating' />
          <StatItem value={book.reviewCount ?? 0} label='Reviews' />
          <StatItem value={book.availableCopies ?? 0} label='Available' />
        </div>

        <div className='space-y-2'>
          <h2 className='text-sm font-bold text-gray-900'>Description</h2>
          <p className='text-sm leading-relaxed text-gray-600'>
            {book.description ?? 'No description available.'}
          </p>
        </div>
      </div>
    </div>
  );
}
