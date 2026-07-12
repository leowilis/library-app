import { useParams, useNavigate } from 'react-router-dom';
import EmptyState from '@/common/EmptyState';

import BookPreviewInfo from './BookPreviewInfo';
import BookReviewSection from './BookReviewSection';
import BookRelatedSection from './BookRelatedSection';
import { SkeletonBookPreview } from '@/components/ui/skeleton';
import ErrorState from '@/common/ErrorState';
import BookPreviewHeader from './BookPreviewHeader';
import { useBookDetail } from '@/hooks/useBookDetail';
import { useRecommendedBooks } from '@/hooks/useRecommendedBooks';
import { ROUTES } from '@/constants';

export default function AdminBookPreview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: book, isLoading, isError } = useBookDetail(Number(id));

  const { data: relatedBooks } = useRecommendedBooks({
    by: 'rating',
    categoryId: book?.categoryId,
    limit: 6,
  });

  if (isLoading) {
    return <SkeletonBookPreview />;
  }

  if (isError) {
    return (
      <ErrorState
        title='Failed to load book'
        description='Please try again later.'
      />
    );
  }

  if (!book) {
    return (
      <EmptyState
        title='Book not found'
        description='The requested book does not exist.'
      />
    );
  }

  return (
    <section className='max-w-5xl space-y-10 pb-16'>
      <BookPreviewHeader onBack={() => navigate(ROUTES.AdminBooks)} />

      <BookPreviewInfo book={book} />

      <BookReviewSection
        rating={book.rating}
        reviewCount={book.reviewCount ?? 0}
        reviews={book.reviews ?? []}
      />

      <BookRelatedSection currentBookId={book.id} books={relatedBooks ?? []} />
    </section>
  );
}
