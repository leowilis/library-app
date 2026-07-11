import BookCard from '@/pages/user/BookDetail/BookCard';
import { SkeletonBookCard } from '@/components/ui/skeleton';
import type { Book } from '@/types/book';

interface BookGridProps {
  books: Book[];
  isLoading: boolean;
  onBookClick: (bookId: number) => void;
}

const SKELETON_COUNT = 8;

export default function BookGrid({
  books,
  isLoading,
  onBookClick,
}: BookGridProps) {
  // Loading State
  if (isLoading) {
    return (
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <SkeletonBookCard key={index} />
        ))}
      </div>
    );
  }

  // Empty State
  if (books.length === 0) {
    return (
      <div className='flex select-none flex-col items-center gap-3 py-16 text-neutral-500'>
        <span role='img' aria-label='Search' className='text-4xl'>
          🔍
        </span>

        <p className='text-sm font-semibold'>No books found</p>
      </div>
    );
  }

  // Success State
  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onClick={() => onBookClick(book.id)}
        />
      ))}
    </div>
  );
}
