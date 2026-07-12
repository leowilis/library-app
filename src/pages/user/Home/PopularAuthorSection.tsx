import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants';
import EmptyState from '@/common/EmptyState';
import AuthorCard from '@/components/user/AuthorCard';
import { SkeletonAuthorCard } from '@/components/ui/skeleton';

import type { PopularAuthor } from '@/types/author';
import ErrorState from '@/common/ErrorState';

interface PopularAuthorSectionProps {
  authors?: PopularAuthor[];
  loading: boolean;
  error: boolean;
}

export default function PopularAuthorSection({
  authors,
  loading,
}: PopularAuthorSectionProps) {
  const navigate = useNavigate();

  const renderContent = () => {
    // Loading State
    if (loading) {
      return (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4'>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonAuthorCard key={index} />
          ))}
        </div>
      );
    }

    // Error State
    <ErrorState
      title='Failed to load authors'
      description='Please refresh the page.'
    />;

    // Empty State
    if (!authors?.length) {
      return (
        <EmptyState
          title='No authors found'
          description='There are no popular authors available.'
        />
      );
    }

    // Success State
    return (
      <div className='grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4'>
        {authors.map((author) => (
          <AuthorCard
            key={author.id}
            author={author}
            onClick={() => navigate(ROUTES.BooksByAuthors(author.id))}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      className='px-4 py-10 md:px-10'
      aria-labelledby='popular-author-title'
    >
      <h2
        id='popular-author-title'
        className='mb-7 text-3xl font-bold text-gray-900 md:mb-8 md:text-4xl'
      >
        Popular Authors
      </h2>

      {renderContent()}
    </section>
  );
}
