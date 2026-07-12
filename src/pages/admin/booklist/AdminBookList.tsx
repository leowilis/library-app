import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAdminBooks, useDeleteBook } from '@/hooks/admin/useAdminBookHooks';
import type { AdminBook } from '@/types/admin/admin';

import EmptyState from '@/common/EmptyState';
import ErrorState from '@/common/ErrorState';

import BookDeleteModal from './BookDeleteModal';
import BookListHeader from './BookListHeader';
import BookMobileCard from './BookMobileCard';
import BookPagination from './BookPagination';
import BookSearch from './BookSearch';
import BookTable from './BookTable';
import { PAGE_SIZE } from '@/pages/user/Home/constants';
import { ROUTES } from '@/constants';

export default function AdminBookList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useAdminBooks(page, debouncedSearch);

  const { mutate: deleteBook, isPending: isDeleting } = useDeleteBook(
    page,
    debouncedSearch,
    () => setDeleteId(null),
  );

  const books: AdminBook[] = data?.books ?? [];

  const pagination = data?.pagination;

  const total = pagination?.total ?? 0;

  const totalPages =
    pagination?.totalPages ?? Math.max(1, Math.ceil(total / PAGE_SIZE));

  // Error State
  if (isError) {
    return (
      <section className='p-6'>
        <ErrorState
          title='Failed to load books'
          description='Please try again later.'
        />
      </section>
    );
  }

  return (
    <section className='space-y-4 md:m-4 md:px-4'>
      <BookListHeader onAddBook={() => navigate(ROUTES.AdminBookAdd)} />

      <BookSearch value={search} onChange={setSearch} />

      {!isLoading && books.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-gray-200 bg-white py-14'>
          <EmptyState
            title='No books found'
            description={
              debouncedSearch
                ? `No books found for "${debouncedSearch}".`
                : 'No books have been added yet.'
            }
          />
        </div>
      ) : (
        <>
          <BookTable
            books={books}
            isLoading={isLoading}
            onPreview={(id) => navigate(ROUTES.AdminBookPreview(id))}
            onEdit={(id) => navigate(ROUTES.AdminBookEdit(id))}
            onDelete={setDeleteId}
          />

          <BookMobileCard
            books={books}
            isLoading={isLoading}
            onPreview={(id) => navigate(ROUTES.AdminBookPreview(id))}
            onEdit={(id) => navigate(ROUTES.AdminBookEdit(id))}
            onDelete={setDeleteId}
          />

          {totalPages > 1 && (
            <BookPagination
              page={page}
              total={total}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {deleteId !== null && (
        <BookDeleteModal
          isLoading={isDeleting}
          onConfirm={() => deleteBook(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </section>
  );
}
