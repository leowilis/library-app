import { Button } from '@/components/ui/button';

interface MobileBorrowBarProps {
  borrowButtonLabel: string;
  disabled: boolean;
  onBorrow: () => void;
}

export default function MobileBorrowBar({
  borrowButtonLabel,
  disabled,
  onBorrow,
}: MobileBorrowBarProps) {
  return (
    <div
      role='region'
      aria-label='Mobile action bar'
      className='fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100 bg-white px-4 py-4 md:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.05)]'
    >
      <Button
        type='button'
        onClick={onBorrow}
        disabled={disabled}
        className='w-full flex-1 rounded-full bg-primary-300 py-6 font-semibold text-white transition-all duration-200 hover:bg-primary-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60'
      >
        {borrowButtonLabel}
      </Button>
    </div>
  );
}
