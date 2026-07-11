import { useEffect, useState } from 'react';

import { useAdminLoans } from '@/hooks/admin/useAdminLoans';
import type { AdminLoan, LoanStatusFilter } from '@/types/admin/admin';

import EmptyState from '@/common/EmptyState';
import ErrorState from '@/common/ErrorState';
import { BorrowedSkeleton } from '@/components/ui/skeleton';

import BorrowedCard from './BorrowedCard';
import BorrowedFilter from './BorrowedFilter';
import BorrowedHeader from './BorrowedHeader';
import BorrowedSearch from './BorrowedSearch';
import Pagination from './Pagination';

export default function AdminBorrowedList() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [status, setStatus] = useState<LoanStatusFilter>(undefined);
  const [page, setPage] = useState(1);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  // Server-driven pagination, status classification, and text filter integration query
  const { data, isLoading, isError } = useAdminLoans(
    page,
    status,
    debouncedSearch,
  );

  const loans: AdminLoan[] = data?.loans ?? [];
  const total = data?.pagination?.total ?? 0;
  const totalPages = Math.max(
    1,
    data?.pagination?.totalPages ?? Math.ceil(total / 15),
  );

  const isOverdue = status === 'overdue';

  // Loading State
  if (isLoading) {
    return (
      <section className='space-y-5 md:m-4 md:px-2'>
        <BorrowedHeader title='Borrowed List' />

        <BorrowedSearch
          value={search}
          onChange={setSearch}
          placeholder='Search loans...'
        />

        <BorrowedFilter
          value={status}
          onChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
        />

        <BorrowedSkeleton />
      </section>
    );
  }

  // Error State
  if (isError) {
    return (
      <section className='p-6'>
        <ErrorState
          title='Failed to load loans'
          description='Please try again later.'
        />
      </section>
    );
  }

  // Empty State
  if (loans.length === 0) {
    return (
      <section className='space-y-5 md:m-4 md:px-2'>
        <BorrowedHeader title='Borrowed List' />

        <BorrowedSearch
          value={search}
          onChange={setSearch}
          placeholder='Search loans...'
        />

        <BorrowedFilter
          value={status}
          onChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
        />

        <div className='rounded-2xl border border-dashed border-gray-200 bg-white py-14'>
          <EmptyState
            title='No loans found'
            description={
              debouncedSearch
                ? `No matching records found for "${debouncedSearch}".`
                : 'There are no loan records available.'
            }
          />
        </div>
      </section>
    );
  }

  return (
    <section className='space-y-5 md:m-4 md:px-2'>
      <BorrowedHeader title='Borrowed List' />

      <BorrowedSearch
        value={search}
        onChange={setSearch}
        placeholder='Search loans...'
      />

      <BorrowedFilter
        value={status}
        onChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
      />

      <div className='space-y-3 md:max-w-5xl'>
        {loans.map((loan) => (
          <BorrowedCard key={loan.id} loan={loan} isOverdue={isOverdue} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          page={page}
          total={total}
          totalPages={totalPages}
          limit={15}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}
