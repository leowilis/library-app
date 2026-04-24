import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '@/lib/api';
import { EndPoints, Query_Keys } from '@/constants';
import { formatDate } from '@/lib/utils';
import type { AdminUser } from '@/types/admin/admin';

const PAGE_SIZE = 10;
const TABLE_HEADERS = ['No', 'Name', 'Nomor Handphone', 'Email', 'Created At'];

// Builds the visible page numbers with ellipsis for large page counts
function buildPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 3) return [1, 2, 3, '...', total];
  if (current >= total - 2) return [1, '...', total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

export default function AdminUserList() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: [Query_Keys.AdminUsers, page],
    queryFn: async () => {
      const res = await api.get(EndPoints.AdminUsers, {
        params: { page, limit: PAGE_SIZE },
      });
      return res.data?.data ?? res.data;
    },
  });

  const users: AdminUser[] = data?.users ?? data ?? [];
  const total: number = data?.pagination?.total ?? users.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const pageNumbers = buildPageNumbers(page, totalPages);

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className='space-y-4 md:px-6 md:m-4'>
      <h1 className='text-2xl font-bold text-gray-900 md:text-3xl'>User</h1>

      {/* Search */}
      <div className='flex items-center gap-2 bg-white rounded-full px-4 py-2.5 border border-neutral-300 w-full md:max-w-[750px] md:mb-10'>
        <Search size={20} className='text-neutral-600' />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search user'
          className='flex-1 text-sm bg-transparent outline-none text-neutral-600'
        />
      </div>

      {/* Desktop Table */}
      <div className='hidden md:block border-2 border-gray-200 rounded-2xl overflow-hidden max-w-5xl'>
        <table className='w-full text-sm'>
          <thead className='bg-white border-b border-gray-200'>
            <tr>
              {TABLE_HEADERS.map((h) => (
                <th
                  key={h}
                  className='text-left px-4 py-5 text-xs font-semibold text-neutral-950 uppercase tracking-wide md:bg-neutral-50 rounded'
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 bg-white'>
            {isLoading ? (
              [...Array(PAGE_SIZE)].map((_, i) => (
                <tr key={i}>
                  {[...Array(5)].map((_, j) => (
                    <td key={j} className='px-4 py-3'>
                      <div className='h-4 bg-gray-100 rounded animate-pulse' />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className='text-center py-10 text-gray-400'>
                  No users found
                </td>
              </tr>
            ) : (
              filtered.map((user, idx) => (
                <tr
                  key={user.id}
                  className='hover:bg-neutral-50 transition-colors'
                >
                  <td className='px-4 py-3 text-gray-500'>
                    {(page - 1) * PAGE_SIZE + idx + 1}
                  </td>
                  <td className='px-4 py-3 font-semibold text-neutral-950'>
                    {user.name}
                  </td>
                  <td className='px-4 py-3 font-semibold text-neutral-950'>
                    {user.phone ?? '-'}
                  </td>
                  <td className='px-4 py-3 font-semibold text-neutral-950'>
                    {user.email}
                  </td>
                  <td className='px-4 py-3 font-semibold text-neutral-950'>
                    {formatDate(user.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='flex items-center justify-between px-4 py-3 border-t border-gray-200 bg-white'>
            <p className='text-xs font-medium text-neutral-950'>
              Showing {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, total)} of {total} entries
            </p>
            <div className='flex items-center gap-1'>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className='flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors'
              >
                <ChevronLeft size={14} /> Previous
              </button>
              {pageNumbers.map((p, i) =>
                p === '...' ? (
                  <span
                    key={`ellipsis-${i}`}
                    className='w-8 text-center text-xs text-neutral-950'
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className='w-8 h-8 text-xs rounded-lg border transition-colors'
                    style={{
                      backgroundColor: page === p ? '#1c65da' : 'white',
                      borderColor: page === p ? '#1c65da' : '#e5e7eb',
                      color: page === p ? 'white' : '#374151',
                    }}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className='flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors'
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className='md:hidden space-y-4'>
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className='h-40 bg-gray-100 rounded-2xl animate-pulse'
            />
          ))
        ) : filtered.length === 0 ? (
          <p className='text-center text-gray-400 py-6'>No users found</p>
        ) : (
          filtered.map((user, idx) => (
            <div
              key={user.id}
              className='bg-white rounded-2xl p-4 shadow-xs space-y-3'
            >
              <div className='flex justify-between text-sm'>
                <span className='text-neutral-950 font-semibold'>No</span>
                <span className='font-bold text-gray-900'>
                  {(page - 1) * PAGE_SIZE + idx + 1}
                </span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-neutral-950 font-semibold'>Name</span>
                <span className='font-bold text-gray-900'>{user.name}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-neutral-950 font-semibold'>Email</span>
                <span className='font-bold text-gray-900 break-all text-right'>
                  {user.email}
                </span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-neutral-950 font-semibold'>
                  Nomor Handphone
                </span>
                <span className='font-bold text-gray-900'>
                  {user.phone ?? '-'}
                </span>
              </div>
              <div className='flex justify-between text-sm'>
                <span className='text-neutral-950 font-semibold'>
                  Created at
                </span>
                <span className='font-bold text-gray-900 text-right'>
                  {formatDate(user.createdAt)}
                </span>
              </div>
            </div>
          ))
        )}

        {/* Mobile pagination */}
        {totalPages > 1 && (
          <div className='flex items-center justify-between pt-2'>
            <p className='text-xs text-gray-400'>
              Showing {(page - 1) * PAGE_SIZE + 1}–
              {Math.min(page * PAGE_SIZE, total)} of {total} entries
            </p>
            <div className='flex items-center gap-1'>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className='px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40'
              >
                Previous
              </button>
              {pageNumbers.map((p, i) =>
                p === '...' ? (
                  <span
                    key={`ellipsis-${i}`}
                    className='w-8 text-center text-xs text-gray-400'
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className='w-8 h-8 text-xs rounded-lg border transition-colors'
                    style={{
                      backgroundColor: page === p ? '#1c65da' : 'white',
                      borderColor: page === p ? '#1c65da' : '#e5e7eb',
                      color: page === p ? 'white' : '#374151',
                    }}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className='px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40'
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
