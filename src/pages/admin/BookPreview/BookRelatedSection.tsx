import { useNavigate } from 'react-router-dom';
import type { Book } from '@/types/book';
import BookCard from '@/pages/user/BookDetail/BookCard';

interface BookRelatedSectionProps {
  currentBookId: number;
  books: Book[];
}

export default function BookRelatedSection({
  currentBookId,
  books,
}: BookRelatedSectionProps) {
  const navigate = useNavigate();

  if (!books.length) return null;

  return (
    <section className='space-y-4'>
      <h2 className='text-lg font-extrabold text-gray-900'>Related Books</h2>

      <div className='grid grid-cols-2 gap-4 md:grid-cols-5'>
        {books
          .filter((book) => book.id !== currentBookId)
          .slice(0, 5)
          .map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => navigate(`/admin/books/${book.id}`)}
            />
          ))}
      </div>
    </section>
  );
}
