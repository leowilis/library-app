import type { Author } from './author';
import type { Category } from './category';

export interface Book {
  id: number;
  title: string;
  description: string | null;
  isbn: string;
  publishedYear: number | null;
  coverImage: string | null;
  rating: number;
  reviewCount: number;
  totalCopies: number;
  availableCopies: number;
  borrowCount: number;
  authorId: number;
  categoryId: number;
  author?: Author;
  category?: Category;
  reviews?: BookReview[];
  totalPages?: number;
  createdAt: string;
  updatedAt: string;
}

export interface BookReview {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user?: {
    name: string;
    profilePhoto?: string | null;
  };
}

export interface CreateBookPayload {
  title: string;
  isbn: string;
  categoryId: number;
  authorId?: number;
  authorName?: string;
  description?: string;
  publishedYear?: number;
  coverImage?: string;
  totalCopies?: number;
  availableCopies?: number;
}

export interface UpdateBookPayload extends Partial<CreateBookPayload> {}
