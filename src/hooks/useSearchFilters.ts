import { useState } from 'react';
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

  const selectedCategoryId = searchParams.get('categoryId')
    ? Number(searchParams.get('categoryId'))
    : id
      ? Number(id)
      : undefined;

  const minRating = searchParams.get('minRating')
    ? Number(searchParams.get('minRating'))
    : undefined;

  // Local state only for pagination
  const [page, setPage] = useState(1);

  // Updates a single URL parameter while preserving the existing search query.
  const updateUrlParams = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset pagination whenever filters change
    params.set('page', '1');

    setSearchParams(params);
    setPage(1);
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
