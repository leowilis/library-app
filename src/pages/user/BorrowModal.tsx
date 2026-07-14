import { useState } from 'react';

import { useBorrowBook } from '@/hooks/useBorrowBook';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className='max-w-md rounded-3xl p-6'>
        <DialogHeader className='flex-row items-center justify-between space-y-0'>
          <DialogTitle>Borrow Book</DialogTitle>
        </DialogHeader>

        {/* Book */}
        <div className='space-y-3'>
          <p className='line-clamp-2 text-sm text-muted-foreground'>
            {bookTitle}
          </p>

          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
              isOutOfStock
                ? 'bg-destructive/10 text-destructive'
                : currentStock <= 3
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-green-100 text-green-700'
            }`}
          >
            {isOutOfStock ? 'Out of stock' : `${currentStock} available`}
          </span>
        </div>

        {/* Preset Days */}
        <div className='space-y-3'>
          <p className='text-sm font-semibold'>Borrow Duration</p>

          <div className='grid grid-cols-4 gap-2'>
            {DAY_OPTIONS.map((day) => (
              <Button
                key={day}
                type='button'
                variant={days === day ? 'default' : 'outline'}
                disabled={isOutOfStock}
                onClick={() => setDays(day)}
                className='rounded-xl'
              >
                {day} days
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Days */}
        <div className='space-y-2'>
          <p className='text-sm font-semibold'>Or enter custom days</p>

          <Input
            type='number'
            min={1}
            max={90}
            value={days}
            disabled={isOutOfStock}
            onChange={(e) =>
              setDays(Math.max(1, Math.min(90, Number(e.target.value) || 1)))
            }
          />
        </div>

        {/* Footer */}
        <div className='flex gap-3'>
          <Button
            variant='outline'
            className='flex-1 rounded-full'
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            className='flex-1 rounded-full'
            onClick={handleBorrow}
            disabled={isOutOfStock || isPending}
          >
            {isPending
              ? 'Borrowing...'
              : isOutOfStock
                ? 'Out of Stock'
                : `Borrow for ${days} days`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
