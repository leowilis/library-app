import StarIcon from '@/assets/icon/Star.svg';
import type { Category } from '@/types/category';

const RATING_STARS = [5, 4, 3, 2, 1] as const;

interface FilterContentProps {
  categories: Category[];
  selectedCategoryId?: number;
  minRating?: number;
  onCategoryChange: (id: number) => void;
  onRatingChange: (rating: number) => void;
}

export default function FilterContent({
  categories,
  selectedCategoryId,
  minRating,
  onCategoryChange,
  onRatingChange,
}: FilterContentProps) {
  return (
    <div className='space-y-5'>
      {/* Category */}
      <section aria-label='Category Filter'>
        <h3 className='mb-3 text-sm font-extrabold text-neutral-950'>
          Category
        </h3>

        <div className='space-y-2.5'>
          {categories.map((category) => (
            <label
              key={category.id}
              className='group flex cursor-pointer items-center gap-2'
            >
              <input
                type='radio'
                name='category-filter'
                checked={selectedCategoryId === category.id}
                onChange={() => onCategoryChange(category.id)}
                className='h-4 w-4 flex-shrink-0 cursor-pointer accent-blue-600'
              />

              <span className='text-sm text-neutral-800 transition-colors group-hover:text-blue-600'>
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </section>

      <hr className='border-gray-100' />

      {/* Rating */}
      <section aria-label='Rating Filter'>
        <h3 className='mb-3 text-sm font-extrabold text-neutral-950'>Rating</h3>

        <div className='space-y-2.5'>
          {RATING_STARS.map((rating) => (
            <label
              key={rating}
              className='group flex cursor-pointer items-center gap-2'
            >
              <input
                type='radio'
                name='rating-filter'
                checked={minRating === rating}
                onChange={() => onRatingChange(rating)}
                className='h-4 w-4 flex-shrink-0 accent-blue-600'
              />

              <img
                src={StarIcon}
                alt=''
                aria-hidden='true'
                className='h-5 w-5'
              />

              <span className='text-sm text-neutral-950 transition-colors group-hover:text-blue-600'>
                {rating}
              </span>
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}
