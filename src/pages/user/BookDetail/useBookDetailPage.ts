import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

import { ROUTES } from '@/constants';
import type { RootState } from '@/store';

import { useBookDetail, useRecommendedBooks } from '@/hooks/useBooks';
import { useHasReturnedBook, useIsBookBorrowed } from '@/hooks/useMe';

import { RELATED_BOOK_LIMIT, REVIEWS_PER_PAGE } from './constants';

export function useBookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { token } = useSelector((state: RootState) => state.auth);

  const [showBorrow, setShowBorrow] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [reviewPage, setReviewPage] = useState(1);

  const bookId = Number(id);

  useEffect(() => {
    setReviewPage(1);
  }, [bookId]);

  const { data: book, isLoading, isError } = useBookDetail(bookId);

  const { data: relatedBooks } = useRecommendedBooks({
    by: 'rating',
    categoryId: book?.categoryId,
    limit: RELATED_BOOK_LIMIT,
  });

  const isAlreadyBorrowed = useIsBookBorrowed(bookId);
  const hasReturnedBook = useHasReturnedBook(bookId);

  const isOutOfStock = (book?.availableCopies ?? 0) <= 0;

  const borrowButtonLabel = useMemo(() => {
    if (isOutOfStock) return 'Not Available';
    if (isAlreadyBorrowed) return 'Already Borrowed';

    return 'Borrow Book';
  }, [isOutOfStock, isAlreadyBorrowed]);

  const reviews = book?.reviews ?? [];

  const visibleReviews = useMemo(
    () => reviews.slice(0, reviewPage * REVIEWS_PER_PAGE),
    [reviews, reviewPage],
  );

  const hasMore = visibleReviews.length < reviews.length;

  const handleBorrow = () => {
    if (isOutOfStock) {
      toast.error('This book is out of stock');
      return;
    }

    if (isAlreadyBorrowed) {
      toast.error('You already borrowed this book');
      return;
    }

    if (!token) {
      toast.error('Please login first');
      navigate(ROUTES.Login);
      return;
    }

    setShowBorrow(true);
  };

  const handleLoadMore = () => {
    setReviewPage((prev) => prev + 1);
  };

  return {
    book,
    isLoading,
    isError,

    relatedBooks,

    showBorrow,
    setShowBorrow,

    showReview,
    setShowReview,

    visibleReviews,
    hasMore,

    borrowButtonLabel,

    isAlreadyBorrowed,
    isOutOfStock,
    hasReturnedBook,

    handleBorrow,
    handleLoadMore,
  };
}
