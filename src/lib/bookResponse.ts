import type { ApiResponse, Pagination } from '@/types/api';
import type { Book } from '@/types/book';

interface BooksPayload {
  books: Book[];
  pagination?: Pagination;
}

interface NestedBooksPayload {
  data: BooksPayload;
}

// Extract books array safely from supported backend response shapes.
export function extractBooks(
  response:
    | ApiResponse<BooksPayload>
    | ApiResponse<NestedBooksPayload>
    | BooksPayload,
): Book[] {
  if ('books' in response) {
    return response.books;
  }

  if ('books' in response.data) {
    return response.data.books;
  }

  return response.data.data.books;
}

// Extract pagination safely.
export function extractPagination(
  response:
    | ApiResponse<BooksPayload>
    | ApiResponse<NestedBooksPayload>
    | BooksPayload,
) {
  if ('books' in response) {
    return response.pagination;
  }

  if ('books' in response.data) {
    return response.data.pagination;
  }

  return response.data.data.pagination;
}

// Extract any resource from backend wrapper.
export function extractResource<T>(
  response: ApiResponse<T> | ApiResponse<{ data: T }> | T,
): T {
  if (typeof response === 'object' && response !== null && 'data' in response) {
    const data = response.data;

    if (typeof data === 'object' && data !== null && 'data' in data) {
      return data.data as T;
    }

    return data as T;
  }

  return response;
}
