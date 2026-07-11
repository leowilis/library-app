import { Query_Keys } from '@/constants';

// Parameters Interface
export interface BooksParams {
  q?: string;
  categoryId?: number;
  authorId?: number;
  minRating?: number;
  page?: number;
  limit?: number;
}

export interface LoansParams {
  status?: string;
  q?: string;
  page?: number;
  limit?: number;
}

export interface ReviewsParams {
  q?: string;
  page?: number;
  limit?: number;
}

// Query Key Factories

// Book Keys
export const bookKeys = {
  all: [Query_Keys.Books] as const,
  lists: () => [...bookKeys.all, 'list'] as const,
  list: (params?: BooksParams) => [...bookKeys.lists(), params] as const,
  details: () => [Query_Keys.BooksDetail] as const,
  detail: (id: number) => [...bookKeys.details(), id] as const,
  recommendAll: () => [Query_Keys.BooksRecommend] as const,
  recommend: (params?: {
    by?: 'rating' | 'popular';
    categoryId?: number;
    page?: number;
    limit?: number;
  }) => [...bookKeys.recommendAll(), params] as const,
};

// Me Keys (Profile / Loans)
export const meKeys = {
  all: [Query_Keys.Me] as const,
  profile: () => [...meKeys.all, 'profile'] as const,
  loansAll: () => [Query_Keys.MeLoans] as const,
  loans: (params?: LoansParams) => [...meKeys.loansAll(), params] as const,
  reviewsAll: () => [Query_Keys.MeReviews] as const,
  reviews: (params?: ReviewsParams) =>
    [...meKeys.reviewsAll(), params] as const,
};

// Review Keys
export const reviewKeys = {
  all: [Query_Keys.Reviews] as const,
  books: () => [...reviewKeys.all, 'book'] as const,
  book: (bookId: number, params?: ReviewsParams) =>
    [...reviewKeys.books(), bookId, params] as const,
  details: () => [...reviewKeys.all, 'detail'] as const,
  detail: (id: number) => [...reviewKeys.details(), id] as const,
};

// Cart Keys
export const cartKeys = {
  all: [Query_Keys.Cart] as const,
  detail: () => [...cartKeys.all, 'detail'] as const,
  checkout: () => [...cartKeys.all, 'checkout'] as const,
};

// 3. Category Keys
export const categoryKeys = {
  all: [Query_Keys.Categories] as const,
};

// Author Keys
export const authorKeys = {
  all: [Query_Keys.Authors] as const,
  popular: (limit?: number) => [Query_Keys.AuthorsPopular, limit] as const,
  books: (authorId: number, params?: BooksParams) =>
    [Query_Keys.AuthorsBook, authorId, params] as const,
};

// Admin Book Keys
export const adminBookKeys = {
  all: ['adminBooks'] as const,
  list: (page: number, q = '') => [...adminBookKeys.all, page, q] as const,
};

// Admin Loan Keys
export const adminLoanKeys = {
  all: [Query_Keys.AdminLoans] as const,
  list: () => [...adminLoanKeys.all, 'list'] as const,
};

// Admin User Keys
export const adminUserKeys = {
  all: [Query_Keys.AdminUsers] as const,
  list: () => [...adminUserKeys.all, 'list'] as const,
};
