import { useEffect, useState } from 'react';

import EmptyState from '@/common/EmptyState';
import ErrorState from '@/common/ErrorState';

import { UserSkeleton } from '@/components/ui/skeleton';

import { useAdminUsers } from '@/hooks/admin/useAdminUsers';

import Pagination from '../BorrowedList/Pagination';

import UserHeader from './UserHeader';
import UserSearch from './UserSearch';
import UserTable from './UserTable';
import UserMobileList from './UserMobileList';

const PAGE_SIZE = 10;

/**
 * AdminUserList
 *
 * Displays paginated users with:
 * - server-side search
 * - loading state
 * - error state
 * - empty state
 * - responsive desktop/mobile layouts
 */
export default function AdminUserList() {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useAdminUsers(page, debouncedSearch);

  const users = data?.users ?? [];

  const total = data?.pagination?.total ?? users.length;

  const totalPages =
    data?.pagination?.totalPages ?? Math.ceil(total / PAGE_SIZE);

  // Error State
  if (isError) {
    return (
      <ErrorState
        title='Failed to load users'
        description='Please try again later.'
      />
    );
  }

  return (
    <section className='space-y-5 select-none md:m-4 md:px-6'>
      <UserHeader title='User' />

      <UserSearch value={search} onChange={setSearch} />

      {/* Loading state + Empty state */}
      {isLoading ? (
        <UserSkeleton />
      ) : users.length === 0 ? (
        <EmptyState
          title='No users found'
          description={
            debouncedSearch
              ? `No users matched "${debouncedSearch}".`
              : 'There are no registered users.'
          }
        />
      ) : (
        <>
          <UserTable users={users} page={page} pageSize={PAGE_SIZE} />

          <UserMobileList users={users} page={page} pageSize={PAGE_SIZE} />

          <Pagination
            page={page}
            total={total}
            totalPages={totalPages}
            limit={PAGE_SIZE}
            onPageChange={setPage}
          />
        </>
      )}
    </section>
  );
}
