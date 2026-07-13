import { Star } from 'lucide-react';

import type { Category } from '@/types/category';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { Label } from '@/components/ui/label';

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
    <div className='space-y-6'>
      {/* Category */}
      <section aria-labelledby='category-filter-title'>
        <h3
          id='category-filter-title'
          className='mb-3 text-sm font-bold text-foreground'
        >
          Category
        </h3>

        <RadioGroup
          value={selectedCategoryId?.toString() ?? ''}
          onValueChange={(value) => onCategoryChange(Number(value))}
          className='space-y-3'
        >
          {categories.map((category) => (
            <div key={category.id} className='flex items-center space-x-3'>
              <RadioGroupItem
                value={category.id.toString()}
                id={`category-${category.id}`}
              />

              <Label
                htmlFor={`category-${category.id}`}
                className='cursor-pointer text-sm font-normal'
              >
                {category.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </section>

      <hr className='border-border' />

      {/* Rating */}
      <section aria-labelledby='rating-filter-title'>
        <h3
          id='rating-filter-title'
          className='mb-3 text-sm font-bold text-foreground'
        >
          Rating
        </h3>

        <RadioGroup
          value={minRating?.toString() ?? ''}
          onValueChange={(value) => onRatingChange(Number(value))}
          className='space-y-3'
        >
          {RATING_STARS.map((rating) => (
            <div key={rating} className='flex items-center space-x-3'>
              <RadioGroupItem
                value={rating.toString()}
                id={`rating-${rating}`}
              />

              <Label
                htmlFor={`rating-${rating}`}
                className='flex cursor-pointer items-center gap-2 text-sm font-normal'
              >
                <Star
                  className='h-4 w-4 fill-yellow-400 text-yellow-400'
                  aria-hidden='true'
                />
                {rating}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </section>
    </div>
  );
}
