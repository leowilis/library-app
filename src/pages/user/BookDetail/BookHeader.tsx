import { Button } from '@/components/ui/button';
import StarRating from '@/components/ui/starRating';

interface BookHeaderProps {
  category?: string;
  title: string;
  author?: string;
  rating?: number;

  isOutOfStock: boolean;
  isAlreadyBorrowed: boolean;

  borrowButtonLabel: string;
  onBorrow: () => void;
  onAddToCart: () => void;
}

export default function BookHeader({
  category,
  title,
  author,
  rating = 0,
  isOutOfStock,
  isAlreadyBorrowed,
  borrowButtonLabel,
  onBorrow,
  onAddToCart,
}: BookHeaderProps) {
  return (
    <div className='mt-4 flex-1 space-y-3 md:mt-0'>
      <div className='flex items-center justify-between'>
        <span className='rounded-sm border border-neutral-300 px-2 py-1 text-center text-xs font-semibold text-neutral-950'>
          {category ?? '-'}
        </span>

        <div className='flex items-center gap-2'>
          {isAlreadyBorrowed && (
            <span className='rounded bg-blue-50 px-2 py-1 text-xs font-bold text-blue-600'>
              Currently Borrowed
            </span>
          )}

          {!isAlreadyBorrowed && isOutOfStock && (
            <span className='rounded bg-red-50 px-2 py-1 text-xs font-bold text-red-500'>
              Out of Stock
            </span>
          )}
        </div>
      </div>

      <h1 className='text-2xl font-bold text-gray-900'>{title}</h1>
      <p className='text-sm text-neutral-700'>{author ?? 'Unknown Author'}</p>
      <StarRating rating={rating} showValue />

      <div className='hidden gap-4 pt-4 md:flex'>
        <Button
          variant='outline'
          className="h-10 min-w-40 rounded-full border-2 border-primary-300 px-8 font-semibold text-primary-300 transition-all duration-200 hover:-translate-y-1 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-400 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          onClick={onAddToCart}
          disabled={isOutOfStock}
        >
          Add to Cart
        </Button>

        <Button
          onClick={onBorrow}
          disabled={isAlreadyBorrowed || isOutOfStock}
          className='rounded-full bg-primary-300 px-8 py-5 font-semibold text-white transition-all duration-200 hover:-translate-y-1 hover:bg-primary-400 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0'
        >
          {borrowButtonLabel}
        </Button>
      </div>
    </div>
  );
}
