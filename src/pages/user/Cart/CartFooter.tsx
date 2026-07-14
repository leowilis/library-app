import { Button } from '@/components/ui/button';

interface CartFooterProps {
  totalBooks: number;
  disabled?: boolean;
  onBorrow: () => void;
}

/**
 * Sticky footer displayed on the cart page.
 * Shows total selected books and borrow action.
 */
export default function CartFooter({
  totalBooks,
  disabled = false,
  onBorrow,
}: CartFooterProps) {
  return (
    <footer
      aria-label='Cart summary'
      className='
        fixed
        bottom-0
        left-0
        right-0
        z-40
        border-t
        border-neutral-200
        bg-white
        px-5
        py-4
        shadow-[0_-4px_20px_rgba(0,0,0,0.06)]
        md:sticky
        md:bottom-6
        md:rounded-2xl
        md:border
        md:shadow-lg
      '
    >
      {/* Total */}
      <div className='mx-auto flex max-w-7xl items-center justify-between gap-4'>
        <div>
          <p className='text-xs text-neutral-500'>Total Book</p>

          <h2 className='text-lg font-bold text-neutral-900'>
            {totalBooks} {totalBooks === 1 ? 'Item' : 'Items'}
          </h2>
        </div>

        {/* Borrow Button */}
        <Button
          type='button'
          disabled={disabled}
          onClick={onBorrow}
          className='rounded-full px-8'
        >
          Borrow Book
        </Button>
      </div>
    </footer>
  );
}
