import type { AdminBook } from '@/types/admin/admin';
import BookActionDropdown from './BookActionDropdown';

interface Props {
  book: AdminBook;
  onPreview: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function BookTableRow({
  book,
  onPreview,
  onEdit,
  onDelete,
}: Props) {
  return (
    <tr className='bg-white transition-colors hover:bg-gray-50'>
      <td className='rounded-l-2xl px-4 py-3'>
        <div className='h-[138px] w-[92px] overflow-hidden bg-gray-100'>
          {book.coverImage && (
            <img
              src={book.coverImage}
              alt={book.title}
              className='h-full w-full object-cover'
            />
          )}
        </div>
      </td>

      <td className='max-w-48 px-4 py-3 font-medium text-gray-900'>
        <p className='line-clamp-2'>{book.title}</p>
      </td>

      <td className='px-4 py-3 text-gray-600'>{book.author?.name}</td>

      <td className='px-4 py-3 text-gray-600'>{book.category?.name}</td>

      <td className='px-4 py-3 text-gray-600'>{book.availableCopies}</td>

      <td className='rounded-r-2xl px-4 py-3'>
        <BookActionDropdown
          onPreview={() => onPreview(book.id)}
          onEdit={() => onEdit(book.id)}
          onDelete={() => onDelete(book.id)}
        />
      </td>
    </tr>
  );
}
