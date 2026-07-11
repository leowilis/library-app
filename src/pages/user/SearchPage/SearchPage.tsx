import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants';

import BookGrid from '@/pages/user/SearchPage/BookGrid';
import FilterSidebar from '@/pages/user/SearchPage/FilterSidebar';
import MobileFilter from '@/pages/user/SearchPage/MobileFilter';
import LoadMoreButton from '@/common/LoadMoreButton';

import useSearchFilters from '@/hooks/useSearchFilters';
import { useBooks } from '@/hooks/useBooks';
import { useCategories } from '@/hooks/useCategories';
import EmptyState from '@/common/EmptyState';
import ErrorState from '@/common/ErrorState';

export default function SearchPage() {
  const navigate = useNavigate();

  const {
    search,
    page,
    setPage,
    minRating,
    selectedCategoryId,
    handleCategoryChange,
    handleRatingChange,
  } = useSearchFilters();

  const { data: categoriesData } = useCategories();
  const categories = categoriesData ?? [];

  const {
    data: booksData,
    isLoading,
    isFetching,
    isError,
  } = useBooks({
    q: search,
    categoryId: selectedCategoryId,
    minRating,
    page,
    limit: 8,
  });

  const books = booksData?.books ?? [];
  const hasNextPage = booksData?.pagination?.hasNextPage ?? false;

  if (isError) {
    return (
      <ErrorState
        title='Failed to load books'
        description='Please try again later.'
      />
    );
  }

  return (
    <section className='mt-2 md:mt-6'>
      <h1
        id='books-heading'
        className='pb-6 text-3xl font-bold text-gray-900 md:pb-8'
      >
        Book List
      </h1>

      <div className='flex flex-col gap-8 md:flex-row'>
        {/* DESKTOP SIDEBAR */}
        <FilterSidebar
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          minRating={minRating}
          onCategoryChange={handleCategoryChange}
          onRatingChange={handleRatingChange}
        />

        {/* MAIN CONTENT */}
        <div className='flex-1'>
          {/* Mobile filter bar */}
          <MobileFilter
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            minRating={minRating}
            onCategoryChange={handleCategoryChange}
            onRatingChange={handleRatingChange}
          />
          {/* Book grid */}
          <div className='space-y-8'>
            <BookGrid
              books={books}
              isLoading={isLoading}
              onBookClick={(bookId) => navigate(ROUTES.BookDetail(bookId))}
            />

            {!isLoading && books.length === 0 && (
              <EmptyState
                title='No books found'
                description='Try changing the search keyword or filters.'
              />
            )}

            {/* Load more */}
            <LoadMoreButton
              show={hasNextPage}
              loading={isFetching && page > 1}
              onClick={() => setPage((prev) => prev + 1)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
