import type { Book } from '@/types/book';

interface BooksResponse {
  books: Book[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
  };
}

// Extract books array safely from multiple backend response shapes.
export function extractBooks(data: unknown): Book[] {
  if (!data || typeof data !== 'object') return [];

  const root = data as Record<string, unknown>;
  const nested = root.data as Record<string, unknown> | undefined;

  return (
    (nested?.data as { books?: Book[] })?.books ??
    (nested?.books as Book[]) ??
    (root.books as Book[]) ??
    []
  );
}

// Extract pagination contextual values safely from multiple backend response shapes.
export function extractPagination(data: unknown): BooksResponse['pagination'] {
  if (!data || typeof data !== 'object') return undefined;

  const root = data as Record<string, unknown>;
  const nested = root.data as Record<string, unknown> | undefined;

  return (
    (nested?.data as BooksResponse)?.pagination ??
    (nested?.pagination as BooksResponse['pagination']) ??
    (root.pagination as BooksResponse['pagination'])
  );
}

// Powerful generic data parsing layer to strip single/double wrapper objects safely.
export function extractResource<T>(data: unknown, resourceKey: string): T {
  if (!data || typeof data !== 'object') {
    return data as T;
  }

  const root = data as Record<string, unknown>;
  const nested = root.data as Record<string, unknown> | undefined;
  const payload = nested?.data as Record<string, unknown> | undefined;

  return (
    (payload?.[resourceKey] as T) ??
    (nested?.[resourceKey] as T) ??
    (nested as T) ??
    (data as T)
  );
}
