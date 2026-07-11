import { Star } from 'lucide-react';
import type { AdminBook } from '@/types/admin/admin';
import BookActionDropdown from './BookActionDropdown';

interface Props {
  books: AdminBook[];
  isLoading: boolean;
  onPreview: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function BookMobileCard({
  books,
  isLoading,
  onPreview,
  onEdit,
  onDelete,
}: Props) {
  if (isLoading) {
    return (
      <div className='space-y-3 md:hidden'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='h-28 animate-pulse rounded-2xl bg-gray-100' />
        ))}
      </div>
    );
  }

  return (
    <div className='space-y-3 md:hidden'>
      {books.map((book) => (
        <div key={book.id} className='rounded-xl bg-white p-4 shadow-sm'>
          <div className='flex gap-3'>
            <div className='h-[108px] w-[72px] overflow-hidden'>
              {book.coverImage && (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className='h-full w-full object-cover'
                />
              )}
            </div>

            <div className='min-w-0 flex-1 p-1'>
              <span className='inline-block max-w-full whitespace-nowrap rounded border border-gray-300 px-2 py-0.5 text-xs font-bold text-neutral-950 line-clamp-1'>
                {book.category?.name}
              </span>

              <p className='mt-2 line-clamp-2 text-sm font-bold text-gray-900'>
                {book.title}
              </p>

              <p className='mt-1 line-clamp-1 text-xs text-neutral-700'>
                {book.author?.name}
              </p>

              <div className='mt-2 flex items-center gap-1.5'>
                <Star size={14} fill='#fdb022' color='#fdb022' />
                <span className='text-xs font-bold'>{book.rating}</span>
              </div>
            </div>

            <BookActionDropdown
              onPreview={() => onPreview(book.id)}
              onEdit={() => onEdit(book.id)}
              onDelete={() => onDelete(book.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
