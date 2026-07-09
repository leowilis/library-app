import type { Book } from '@/types/book';
import StarRating from '@/components/ui/starRating';

// Props for the BookCard component
interface BookCardProps {
  book: Book;
  onClick: () => void;
}

/**
 * BookCard — displays a book cover, title, author, and rating.
 * Used in book grids across Home, SearchPage, and BookDetail (related books).
 */
export default function BookCard({ book, onClick }: BookCardProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-label={`View details for ${book.title}`}
      className='group w-full overflow-hidden rounded-xl bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md'
    >
      <div className='relative aspect-[3/4] overflow-hidden bg-neutral-100'>
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            loading='lazy'
            decoding='async'
            className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
          />
        ) : (
          <div className='flex h-full items-center justify-center text-center text-sm font-medium text-neutral-400'>
            No Cover
          </div>
        )}
      </div>

      <div className='space-y-1 p-3'>
        <h3 className='line-clamp-2 text-sm font-bold text-neutral-950 md:text-base'>
          {book.title}
        </h3>

        <p className='line-clamp-1 text-sm text-neutral-500'>
          {book.author?.name ?? 'Unknown Author'}
        </p>

        <StarRating rating={book.rating} showValue />
      </div>
    </button>
  );
}
