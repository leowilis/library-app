import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants';

import BookGrid from '@/components/search/BookGrid';
import FilterSidebar from '@/components/search/FilterSidebar';
import MobileFilter from '@/components/search/MobileFilter';
import LoadMoreButton from '@/common/LoadMoreButton';

import useSearchFilters from '@/hooks/useSearchFilters';
import { useBooks } from '@/hooks/useBooks';
import { useCategories } from '@/hooks/useCategories';

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
  } = useBooks({
    q: search,
    categoryId: selectedCategoryId,
    minRating,
    page,
    limit: 8,
  });

  const books = booksData?.books ?? [];
  const pagination = booksData?.pagination;

  const filterProps = {
    categories,
    selectedCategoryId,
    minRating,
    onCategoryChange: handleCategoryChange,
    onRatingChange: handleRatingChange,
  };

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
        <FilterSidebar {...filterProps} />

        {/* MAIN CONTENT */}
        <div className='flex-1'>
          {/* Mobile filter bar */}
          <MobileFilter {...filterProps} />
          {/* Book grid */}
          <div className='space-y-8'>
            <BookGrid
              books={books}
              isLoading={isLoading}
              onBookClick={(bookId) => navigate(ROUTES.BookDetail(bookId))}
            />

            {/* Load more */}
            <LoadMoreButton
              show={pagination?.hasNextPage ?? false}
              loading={isFetching}
              onClick={() => setPage((prev) => prev + 1)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
