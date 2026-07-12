import type { AdminBook } from '@/types/admin/admin';

import BookTableRow from './BookTableRow';

import { SkeletonTable } from '@/components/ui/skeleton';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
    <div className='hidden overflow-hidden rounded-2xl border bg-card md:block'>
      <Table>
        <TableHeader>
          <TableRow>
            {TABLE_HEADERS.map((header) => (
              <TableHead
                key={header}
                className='text-xs font-semibold uppercase tracking-wide'
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <SkeletonTable rows={5} columns={6} />
          ) : books.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className='h-32 text-center text-muted-foreground'
              >
                No books found
              </TableCell>
            </TableRow>
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
        </TableBody>
      </Table>
    </div>
  );
}
