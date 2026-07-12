import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants';
import EmptyState from '@/common/EmptyState';
import { SkeletonCategoryCard } from '@/components/ui/skeleton';
import type { Category } from '@/types/category';

import { CATEGORY_ICONS } from './categoryIcons';

interface CategorySectionProps {
  categories?: Category[];
  loading: boolean;
  error: boolean;
}

export default function CategorySection({
  categories,
  loading,
  error,
}: CategorySectionProps) {
  const navigate = useNavigate();

  // Loading State
  if (loading) {
    return (
      <section className='px-4 md:px-8' aria-label='Loading categories'>
        <div className='grid grid-cols-3 gap-3 py-3 md:grid-cols-6 md:gap-4'>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCategoryCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className='px-4 md:px-8'>
        <EmptyState
          title='Failed to load categories'
          description='Please try again later.'
        />
      </section>
    );
  }

  const visibleCategories = (categories ?? []).filter(
    (category) => CATEGORY_ICONS[category.name],
  );

  // Empty State
  if (!visibleCategories.length) {
    return (
      <section className='px-4 md:px-8'>
        <EmptyState
          title='No categories'
          description='There are no categories available.'
        />
      </section>
    );
  }

  // Success State
  return (
    <section className='px-4 md:px-8'>
      <div className='grid grid-cols-3 gap-3 py-3 md:grid-cols-6 md:gap-4'>
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            type='button'
            onClick={() => navigate(ROUTES.Category(category.id))}
            className='flex flex-col items-start gap-5 rounded-2xl bg-white p-3 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md md:p-4'
          >
            <div className='flex h-15 w-full items-center justify-center rounded-xl bg-neutral-80 md:h-20'>
              <img
                src={CATEGORY_ICONS[category.name]}
                alt={category.name}
                loading='lazy'
                className='h-11 w-11 object-contain md:h-14 md:w-14'
              />
            </div>

            <span className='text-left text-xs font-semibold text-gray-950 md:text-sm'>
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
