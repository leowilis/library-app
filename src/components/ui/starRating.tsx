import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  variant?: 'single' | 'five';
}

export default function StarRating({
  rating,
  size = 16,
  showValue = false,
  variant = 'single',
}: StarRatingProps) {
  const normalizedRating = Math.min(5, Math.max(0, rating));

  return (
    <div className='flex items-center gap-1'>
      {variant === 'single' ? (
        <Star size={size} fill='#fdb022' color='#fdb022' aria-hidden='true' />
      ) : (
        <div className='flex gap-0.5'>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={size}
              fill={
                index < Math.round(normalizedRating) ? '#fdb022' : 'transparent'
              }
              color={
                index < Math.round(normalizedRating) ? '#fdb022' : '#d1d5db'
              }
              aria-hidden='true'
            />
          ))}
        </div>
      )}

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
