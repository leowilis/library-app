import type { ApiResponse, Pagination } from '@/types/api';
import type { Book } from '@/types/book';

interface BooksPayload {
  books: Book[];
  pagination?: Pagination;
}

// Extract books array safely from supported backend response shapes.
export function extractBooks(
  data: ApiResponse<BooksPayload> | ApiResponse<{ data: BooksPayload }>,
): Book[] {
  if ('books' in data.data) {
    return data.data.books;
  }

  return data.data.data.books;
}

// Extract pagination safely.
export function extractPagination(
  data: ApiResponse<BooksPayload> | ApiResponse<{ data: BooksPayload }>,
): Pagination | undefined {
  if ('books' in data.data) {
    return data.data.pagination;
  }

  return data.data.data.pagination;
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
