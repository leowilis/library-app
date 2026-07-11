import { useState } from 'react';
import { useBorrowBook } from '@/hooks/useBorrowBook';

// Props for the BorrowModal component
interface BorrowModalProps {
  bookId: number;
  bookTitle: string;
  currentStock: number;
  onClose: () => void;
}

// Predefined borrow duration options in days
const DAY_OPTIONS = [3, 7, 14, 30];

/**
 * BorrowModal — allows users to select a borrow duration and confirm borrowing a book.
 * Handles out-of-stock state, optimistic UI, and loading feedback.
 */
export default function BorrowModal({
  bookId,
  bookTitle,
  currentStock,
  onClose,
}: BorrowModalProps) {
  // Selected borrow duration in days
  const [days, setDays] = useState(7);
  const { mutate: borrowBook, isPending } = useBorrowBook();

  const isOutOfStock = currentStock <= 0;

  // Submits the borrow request and closes modal on success
  const handleBorrow = () => {
    if (isOutOfStock) return;

    borrowBook(
      { bookId, days },
      {
        onSuccess: onClose,
      },
    );
  };

  // Returns stock badge styles based on availability
  const stockBadgeClass = isOutOfStock
    ? 'bg-red-100 text-red-600'
    : currentStock <= 3
      ? 'bg-green-700 text-white'
      : 'bg-green-100 text-green-700';

  return (
    <div className='fixed inset-0 z-50 flex items-end justify-center md:items-center'>
      <div className='absolute inset-0 bg-black/40' onClick={onClose} />
      <div className='relative bg-white w-full md:w-[420px] rounded-t-3xl md:rounded-3xl p-6 space-y-5'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-bold text-gray-900'>Borrow Book</h3>
          <button
            onClick={onClose}
            className='text-gray-400 text-2xl leading-none'
          >
            ×
          </button>
        </div>

        {/* Book title */}
        <p className='text-sm text-gray-500 line-clamp-2'>{bookTitle}</p>

        {/* Stock availability badge */}
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${stockBadgeClass}`}
        >
          {isOutOfStock ? 'Out of stock' : `${currentStock} available`}
        </span>

        {/* Predefined duration options */}
        <div className='space-y-2 pt-3'>
          <p className='text-sm font-semibold text-gray-700'>Borrow Duration</p>
          <div className='grid grid-cols-4 gap-2'>
            {DAY_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                disabled={isOutOfStock}
                className='py-2 rounded-xl text-sm font-semibold border-2 transition-all disabled:opacity-40'
                style={{
                  backgroundColor: days === d ? '#E0ECFF' : 'white',
                  borderColor: days === d ? '#1c65da' : '#e5e7eb',
                  color: days === d ? '#1c65da' : '#374151',
                }}
              >
                {d} days
              </button>
            ))}
          </div>
        </div>

        {/* Custom duration input */}
        <div className='space-y-2'>
          <p className='text-sm font-semibold text-gray-700'>
            Or enter custom days
          </p>
          <input
            type='number'
            min={1}
            max={90}
            value={days}
            disabled={isOutOfStock}
            onChange={(e) =>
              setDays(Math.max(1, Math.min(90, Number(e.target.value))))
            }
            className='w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400 disabled:opacity-40 disabled:bg-gray-50'
          />
        </div>

        {/* Submit button */}
        <button
          onClick={handleBorrow}
          disabled={isOutOfStock || isPending}
          className='w-full py-3.5 rounded-full font-semibold text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed'
          style={{ backgroundColor: '#1c65da' }}
        >
          {isPending
            ? 'Borrow...'
            : isOutOfStock
              ? 'Out of stock'
              : `Borrow for ${days} days`}
        </button>
      </div>
    </div>
  );
}
