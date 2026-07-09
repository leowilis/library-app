import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import BookCard from '@/components/book/BookCard';
import { SkeletonBookCard } from '@/components/ui/skeleton';
import type { Book } from '@/types/book';

interface BookGridProps {
  books: Book[];
  isLoading: boolean;
}

export default function BookGrid({ books, isLoading }: BookGridProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonBookCard key={index} />
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className='flex flex-col items-center gap-3 py-16 text-gray-400'>
        <span className='text-4xl'>🔍</span>
        <p className='text-sm font-semibold'>No books found</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onClick={() => navigate(ROUTES.BookDetail(book.id))}
        />
      ))}
    </div>
  );
}
