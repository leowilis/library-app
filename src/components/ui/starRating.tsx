import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
}

export default function StarRating({
  rating,
  size = 16,
  showValue = false,
}: StarRatingProps) {
  const normalizedRating = Math.min(5, Math.max(0, rating));

  return (
    <div className='flex items-center gap-1'>
      <Star size={size} fill='#fdb022' color='#fdb022' aria-hidden='true' />

      {showValue && (
        <span
          className='text-xs font-bold leading-none text-neutral-800'
          aria-label={`Rated ${normalizedRating.toFixed(1)} out of 5`}
        >
          {normalizedRating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
