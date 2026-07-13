import { Button } from '@/components/ui/button';

interface MobileBorrowBarProps {
  borrowButtonLabel: string;
  disabled: boolean;
  onBorrow: () => void;
  onAddToCart: () => void;
}

export default function MobileBorrowBar({
  borrowButtonLabel,
  disabled,
  onBorrow,
  onAddToCart,
}: MobileBorrowBarProps) {
  return (
    <div
      role='region'
      aria-label='Mobile action bar'
      className='fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-4 md:hidden'
    >
      <div className='mx-auto flex max-w-lg gap-3'>
        <Button
          type='button'
          variant='outline'
          className='w-full flex-1 py-5.5 rounded-full'
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>

        <Button
          type='button'
          onClick={onBorrow}
          disabled={disabled}
          className='w-full flex-1 rounded-full bg-primary-300 py-6 font-semibold text-white transition-all duration-200 hover:bg-primary-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {borrowButtonLabel}
        </Button>
      </div>
    </div>
  );
}
