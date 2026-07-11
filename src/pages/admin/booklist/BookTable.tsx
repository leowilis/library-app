import type { AdminBook } from '@/types/admin/admin';

import BookTableRow from './BookTableRow';
import { SkeletonTable } from '@/components/ui/skeleton';

interface BookTableProps {
  books: AdminBook[];
  isLoading: boolean;
  onPreview: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TABLE_HEADERS = [
  'Cover',
  'Title',
  'Author',
  'Category',
  'Stock',
  'Action',
];

export default function BookTable({
  books,
  isLoading,
  onPreview,
  onEdit,
  onDelete,
}: BookTableProps) {
  return (
    <div className='hidden overflow-hidden rounded-2xl bg-gray-50 md:block'>
      <table className='w-full border-separate border-spacing-y-2 px-2 text-sm'>
        <thead>
          <tr>
            {TABLE_HEADERS.map((header) => (
              <th
                key={header}
                className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500'
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <SkeletonTable rows={5} columns={6} />
          ) : books.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className='rounded-2xl bg-white py-10 text-center text-gray-400'
              >
                No books found
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <BookTableRow
                key={book.id}
                book={book}
                onPreview={onPreview}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
