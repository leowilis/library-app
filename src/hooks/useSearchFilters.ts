import { useParams, useSearchParams } from 'react-router-dom';

/**
 * useSearchFilters
 *
 * Centralizes search, category, rating, and pagination state.
 * URL parameters are treated as the single source of truth so
 * SearchPage always stays synchronized with navigation.
 */
export default function useSearchFilters() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL is the single source of truth
  const search = searchParams.get('q') ?? '';

  // Current page
  const page = Number(searchParams.get('page') ?? 1);

  // Selected category
  const selectedCategoryId = searchParams.get('categoryId')
    ? Number(searchParams.get('categoryId'))
    : id
      ? Number(id)
      : undefined;

  // Minimum rating
  const minRating = searchParams.get('minRating')
    ? Number(searchParams.get('minRating'))
    : undefined;

  // Update page while preserving all existing filters.
  const setPage = (value: number | ((prev: number) => number)) => {
    const nextPage = typeof value === 'function' ? value(page) : value;
    const params = new URLSearchParams(searchParams);
    params.set('page', String(nextPage));
    setSearchParams(params);
  };

  // Updates a single URL parameter while preserving the existing search query.
  const updateUrlParams = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams);

    if (value !== undefined) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set('page', '1');

    setSearchParams(params);
  };

  const handleCategoryChange = (categoryId: number) => {
    updateUrlParams(
      'categoryId',
      selectedCategoryId === categoryId ? undefined : String(categoryId),
    );
  };

  const handleRatingChange = (rating: number) => {
    updateUrlParams(
      'minRating',
      minRating === rating ? undefined : String(rating),
    );
  };

  return {
    search,
    page,
    setPage,

    selectedCategoryId,
    minRating,

    handleCategoryChange,
    handleRatingChange,
  };
}
