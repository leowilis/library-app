import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants';
import BookCard from '@/components/book/BookCard';
import EmptyState from '@/common/EmptyState';
import LoadMoreButton from '@/common/LoadMoreButton';
import { SkeletonBookCard } from '@/components/ui/skeleton';

import type { Book } from '@/types/book';

interface RecommendationSectionProps {
  books?: Book[];
  loading: boolean;
  error: boolean;
  pageSize: number;
  onLoadMore: () => void;
}

export default function RecommendationSection({
  books,
  loading,
  error,
  pageSize,
  onLoadMore,
}: RecommendationSectionProps) {
  const navigate = useNavigate();

  const renderContent = () => {
    // Loading State
    if (loading) {
      return (
        <div className='grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6'>
          {Array.from({ length: pageSize }).map((_, index) => (
            <SkeletonBookCard key={index} />
          ))}
        </div>
      );
    }

    // Error State
    if (error) {
      return (
        <EmptyState
          title='Failed to load recommendations'
          description='Please try again later.'
        />
      );
    }

    // Empty State
    if (!books?.length) {
      return (
        <EmptyState
          title='No recommendations'
          description='No books available.'
        />
      );
    }

    // Success State
    return (
      <>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6'>
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => navigate(ROUTES.BookDetail(book.id))}
            />
          ))}
        </div>

        <LoadMoreButton show={books.length === pageSize} onClick={onLoadMore} />
      </>
    );
  };

  return (
    <section className='px-4 md:px-8' aria-labelledby='recommendation-title'>
      <h2
        id='recommendation-title'
        className='mb-6 text-3xl font-bold text-gray-900'
      >
        Recommendation
      </h2>

      {renderContent()}
    </section>
  );
}
