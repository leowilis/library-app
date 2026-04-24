import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Star,
  AlertCircle,
} from 'lucide-react';
import { useAdminBooks, useDeleteBook } from '@/hooks/admin/useAdminbooks';
import type {
  AdminBook,
  ActionDropdownProps,
  DeleteModalProps,
} from '@/types/admin/admin';

const TABLE_HEADERS = [
  'Cover',
  'Title',
  'Author',
  'Category',
  'Stock',
  'Action',
];

/**
 * Three-dot menu with Preview, Edit, and Delete actions.
 * Closes automatically on outside click.
 */
function ActionDropdown({ onPreview, onEdit, onDelete }: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const actions = [
    {
      label: 'Preview',
      icon: <Eye size={16} />,
      onClick: onPreview,
      className: 'text-gray-700 hover:bg-gray-100',
    },
    {
      label: 'Edit',
      icon: <Pencil size={16} />,
      onClick: onEdit,
      className: 'text-gray-700 hover:bg-gray-100',
    },
    {
      label: 'Delete',
      icon: <Trash2 size={16} />,
      onClick: onDelete,
      className: 'text-red-600 hover:bg-red-50',
    },
  ];

  return (
    <div className='relative' ref={ref}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors'
      >
        <MoreVertical size={18} />
      </button>
      {isOpen && (
        <div className='absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10 py-1'>
          {actions.map(({ label, icon, onClick, className }) => (
            <button
              key={label}
              onClick={() => {
                onClick();
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors ${className}`}
            >
              {icon} {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// DeleteModal

/**
 * Confirmation modal shown before deleting a book.
 * Blocks interaction with the rest of the page via a backdrop.
 */
function DeleteModal({ isDeleting, onConfirm, onCancel }: DeleteModalProps) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/40' onClick={onCancel} />
      <div className='relative bg-white rounded-2xl p-6 w-80 space-y-4 shadow-xl'>
        <h3 className='text-base font-bold text-gray-900'>Delete Book</h3>
        <p className='text-sm text-gray-500'>
          Are you sure you want to delete this book? This action cannot be
          undone.
        </p>
        <div className='flex gap-2'>
          <button
            onClick={onCancel}
            className='flex-1 py-2.5 rounded-full text-sm font-semibold border border-gray-200 text-gray-700'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className='flex-1 py-2.5 rounded-full text-sm font-semibold text-white bg-red-500 disabled:opacity-60'
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

// AdminBookList

/**
 * Admin Book List page.
 *
 * Fetches paginated books via `useAdminBooks` and renders:
 * - A card-style table on desktop with optimistic delete.
 * - Stacked cards with rating on mobile.
 * Supports client-side search by title.
 */
export default function AdminBookList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, isLoading, isError } = useAdminBooks(page);
  const { mutate: deleteBook, isPending: isDeleting } = useDeleteBook(
    page,
    () => setDeleteId(null),
  );

  const books: AdminBook[] = data?.books ?? [];
  const total: number = data?.pagination?.total ?? books.length;
  const totalPages = Math.ceil(total / 10);

  const filtered = books.filter((b) =>
    b.title?.toLowerCase().includes(search.toLowerCase()),
  );

  // ── Error State ──
  if (isError) {
    return (
      <section className='space-y-4 md:px-4 md:m-4'>
        <h1 className='text-2xl font-bold text-gray-900 md:text-3xl'>
          Book List
        </h1>
        <div className='flex flex-col items-center justify-center py-20 gap-3 text-red-500'>
          <AlertCircle size={40} />
          <p className='text-sm font-semibold'>
            Failed to load books. Please try again.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className='space-y-4 md:px-4 md:m-4'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-gray-900 md:text-3xl'>
          Book List
        </h1>
        <button
          onClick={() => navigate('/admin/books/add')}
          className='flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white'
          style={{ backgroundColor: '#1c65da' }}
        >
          <Plus size={16} />
          Add Book
        </button>
      </div>

      {/* Search */}
      <div className='flex items-center gap-2 bg-white rounded-full px-4 py-2.5 border border-gray-200 w-full md:max-w-[750px] md:mb-10'>
        <Search size={20} className='text-neutral-600' />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search book'
          className='flex-1 text-sm bg-transparent outline-none text-neutral-600'
        />
      </div>

      {/* ── Desktop Table ── */}
      <div className='hidden md:block bg-gray-50 rounded-2xl overflow-hidden'>
        <table className='w-full text-sm border-separate border-spacing-y-2 px-2'>
          <thead>
            <tr>
              {TABLE_HEADERS.map((h) => (
                <th
                  key={h}
                  className='text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide'
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  {[...Array(6)].map((_, j) => (
                    <td key={j} className='px-4 py-3 bg-white'>
                      <div className='h-4 bg-gray-100 rounded animate-pulse' />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className='text-center py-10 text-gray-400 bg-white rounded-2xl'
                >
                  No books found
                </td>
              </tr>
            ) : (
              filtered.map((book) => (
                <tr
                  key={book.id}
                  className='bg-white hover:bg-gray-50 transition-colors'
                >
                  <td className='px-4 py-3 rounded-l-2xl'>
                    <div className='w-[92px] h-[138px] overflow-hidden bg-gray-100'>
                      {book.coverImage && (
                        <img
                          src={book.coverImage}
                          alt={book.title}
                          className='w-full h-full object-cover'
                        />
                      )}
                    </div>
                  </td>
                  <td className='px-4 py-3 font-medium text-gray-900 max-w-48'>
                    <p className='line-clamp-2'>{book.title}</p>
                  </td>
                  <td className='px-4 py-3 text-gray-600'>
                    {book.author?.name}
                  </td>
                  <td className='px-4 py-3 text-gray-600'>
                    {book.category?.name}
                  </td>
                  <td className='px-4 py-3 text-gray-600'>
                    {book.availableCopies}
                  </td>
                  <td className='px-4 py-3 rounded-r-2xl'>
                    <ActionDropdown
                      onPreview={() => navigate(`/admin/books/${book.id}`)}
                      onEdit={() => navigate(`/admin/books/${book.id}/edit`)}
                      onDelete={() => setDeleteId(book.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className='md:hidden space-y-3'>
        {isLoading
          ? [...Array(3)].map((_, i) => (
              <div
                key={i}
                className='h-28 bg-gray-100 rounded-2xl animate-pulse'
              />
            ))
          : filtered.map((book) => (
              <div key={book.id} className='bg-white rounded-xl p-4 shadow-sm'>
                <div className='flex gap-3'>
                  <div className='w-[92px] h-[138px] overflow-hidden'>
                    {book.coverImage && (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className='w-[92px] h-[140px] object-cover mt-2'
                      />
                    )}
                  </div>
                  <div className='flex-1 p-2'>
                    <span className='text-xs font-bold border border-gray-300 rounded px-2 py-0.5 text-neutral-950'>
                      {book.category?.name}
                    </span>
                    <p className='font-bold text-gray-900 mt-2 line-clamp-2'>
                      {book.title}
                    </p>
                    <p className='text-xs text-neutral-700 mt-3'>
                      {book.author?.name}
                    </p>
                    <div className='flex items-center gap-1.5 mt-5'>
                      <Star size={18} fill='#fdb022' color='#fdb022' />
                      <span className='text-sm font-bold text-gray-800'>
                        {book.rating}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-start'>
                    <ActionDropdown
                      onPreview={() => navigate(`/admin/books/${book.id}`)}
                      onEdit={() => navigate(`/admin/books/${book.id}/edit`)}
                      onDelete={() => setDeleteId(book.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-between pt-2'>
          <p className='text-xs text-gray-400'>
            Showing {(page - 1) * 10 + 1}–{Math.min(page * 10, total)} of{' '}
            {total} entries
          </p>
          <div className='flex items-center gap-1'>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className='px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40'
            >
              Previous
            </button>
            {[...Array(Math.min(totalPages, 5))].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className='w-8 h-8 text-xs rounded-lg border transition-colors'
                style={{
                  backgroundColor: page === i + 1 ? '#1c65da' : 'white',
                  borderColor: page === i + 1 ? '#1c65da' : '#e5e7eb',
                  color: page === i + 1 ? 'white' : '#374151',
                }}
              >
                {i + 1}
              </button>
            ))}
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

      {/* Delete Modal */}
      {deleteId && (
        <DeleteModal
          isDeleting={isDeleting}
          onConfirm={() => deleteBook(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </section>
  );
}
