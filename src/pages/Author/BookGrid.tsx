import { useNavigate } from 'react-router-dom';

import EmptyState from '@/common/EmptyState';
import BookCard from '@/pages/user/BookDetail/BookCard';

import { ROUTES } from '@/constants';

import type { Book } from '@/types/book';

interface BookGridProps {
  books: Book[];
}

export default function BookGrid({ books }: BookGridProps) {
  const navigate = useNavigate();

  if (books.length === 0) {
    return (
      <EmptyState
        title='No books found'
        description="This author doesn't have any published books yet."
      />
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
