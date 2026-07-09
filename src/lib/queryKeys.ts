import { Query_Keys } from '@/constants';

// Book
export interface BooksParams {
  q?: string;
  categoryId?: number;
  authorId?: number;
  minRating?: number;
  page?: number;
  limit?: number;
}

export const bookKeys = {
  all: [Query_Keys.Books] as const,
  lists: () => [...bookKeys.all, 'list'] as const,
  list: (params?: BooksParams) => [...bookKeys.lists(), params] as const,
  details: () => [Query_Keys.BooksDetail] as const,
  detail: (id: number) => [...bookKeys.details(), id] as const,
  recommend: (params?: {
    by?: 'rating' | 'popular';
    categoryId?: number;
    page?: number;
    limit?: number;
  }) => [Query_Keys.BooksRecommend, params] as const,
};

// Me (profile / loans)
export interface LoansParams {
  status?: string;
  q?: string;
  page?: number;
  limit?: number;
}

export const meKeys = {
  all: [Query_Keys.Me] as const,
  profile: () => meKeys.all,
  loansAll: () => [Query_Keys.MeLoans] as const,
  loans: (params?: LoansParams) => [...meKeys.loansAll(), params] as const,
};

// Reviews
export interface ReviewsParams {
  q?: string;
  page?: number;
  limit?: number;
}

export const reviewKeys = {
  book: (bookId: number) => [Query_Keys.ReviewsBook, bookId] as const,
  meAll: () => [Query_Keys.MeReviews] as const,
  me: (params?: ReviewsParams) => [...reviewKeys.meAll(), params] as const,
};

// Cart
export const cartKeys = {
  all: [Query_Keys.Cart] as const,
  lists: () => [...cartKeys.all, 'list'] as const,
  detail: () => [...cartKeys.all, 'detail'] as const,
  checkout: () => [...cartKeys.all, 'checkout'] as const,
};
