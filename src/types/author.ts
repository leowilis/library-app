import type { Book } from "./book";

/**
 * Base author record.
 */
export interface Author {
  id: number;
  name: string;
  bio: string | null;
  profilePhoto?: string | null;
  bookCount?: number;
}

/**
 * Author with popularity metrics, used in the popular authors section
 */
export interface PopularAuthor extends Author {
  bookCount: number;
  accumulatedScore: number;
}

/**
 * Response shape from `GET /api/authors/:id/books`.
 */
export interface AuthorBooksResponse {
  author: Author;
  books: Book[];
}