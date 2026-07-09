import { useState } from 'react';

import Background from '@/components/user/Background';

import { useCategories } from '@/hooks/useCategories';
import { usePopularAuthors } from '@/hooks/useAuthors';
import { useRecommendedBooks } from '@/hooks/useBooks';
import { PAGE_SIZE } from './constants';

import CategorySection from './CategorySection';
import RecommendationSection from './RecommendationSection';
import PopularAuthorSection from './PopularAuthorSection';

/**
 * Landing page for authenticated users.
 *
 * Displays:
 * - Categories
 * - Recommended books
 * - Popular authors
 */
export default function Home() {
  const [page, setPage] = useState(1);

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useCategories();

  const {
    data: recommended,
    isLoading: isRecommendationLoading,
    isError: isRecommendationError,
  } = useRecommendedBooks({
    by: 'rating',
    page,
    limit: PAGE_SIZE,
  });

  const {
    data: popularAuthors,
    isLoading: isAuthorsLoading,
    isError: isAuthorsError,
  } = usePopularAuthors(4);

  return (
    <main className='space-y-8 md:space-y-12'>
      <Background />

      <CategorySection
        categories={categories}
        loading={isCategoriesLoading}
        error={isCategoriesError}
      />

      <RecommendationSection
        books={recommended}
        loading={isRecommendationLoading}
        error={isRecommendationError}
        pageSize={PAGE_SIZE}
        onLoadMore={() => setPage((prev) => prev + 1)}
      />

      <PopularAuthorSection
        authors={popularAuthors}
        loading={isAuthorsLoading}
        error={isAuthorsError}
      />
    </main>
  );
}
