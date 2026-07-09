import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants';
import type { Book } from '@/types/book';
import BookCard from './BookCard';

interface RelatedBooksSectionProps {
  currentBookId: number;
  books?: Book[];
}

export default function RelatedBooksSection({
  currentBookId,
  books = [],
}: RelatedBooksSectionProps) {
  const navigate = useNavigate();

  const relatedBooks = books
    .filter((book) => book.id !== currentBookId)
    .slice(0, 5);

  if (relatedBooks.length === 0) {
    return null;
  }

  return (
    <section className='mt-8 space-y-4' aria-labelledby='related-books-title'>
      <h2
        id='related-books-title'
        className='text-base font-extrabold text-gray-900 md:text-2xl'
      >
        Related Books
      </h2>

      <div className='grid grid-cols-2 gap-4 md:grid-cols-5'>
        {relatedBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onClick={() => navigate(ROUTES.BookDetail(book.id))}
          />
        ))}
      </div>
    </section>
  );
}
