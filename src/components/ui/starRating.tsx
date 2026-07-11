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
  const roundedRating = Math.min(5, Math.max(0, Math.round(rating)));

  return (
    <div className='flex items-center gap-2'>
      {/* Structural Star Matrix Container Row */}
      <div
        className='flex gap-0.5'
        role='img'
        aria-label={`Rated ${rating} out of 5 stars`}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= roundedRating;

          return (
            <Star
              key={star}
              size={size}
              fill={isFilled ? '#fdb022' : 'transparent'}
              color={isFilled ? '#fdb022' : '#d1d5db'}
              aria-hidden='true'
            />
          );
        })}
      </div>

      {/* Integrated Option: Conditional label readout for cleaner metadata rendering */}
      {showValue && (
        <span className='text-xs font-bold text-neutral-800 leading-none'>
          {Number(rating.toFixed(1))}
        </span>
      )}
    </div>
  );
}
