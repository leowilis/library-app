import { useEffect, useState } from 'react';
import FilterIcon from '@/assets/icon/Filter.svg';
import type { Category } from '@/types/category';
import FilterContent from './FilterContent';

interface MobileFilterProps {
  categories: Category[];
  selectedCategoryId?: number;
  minRating?: number;
  onCategoryChange: (id: number) => void;
  onRatingChange: (rating: number) => void;
}

export default function MobileFilter({
  categories,
  selectedCategoryId,
  minRating,
  onCategoryChange,
  onRatingChange,
}: MobileFilterProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className='relative mb-4 md:hidden'>
      <div className='flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm'>
        <span className='text-sm font-extrabold uppercase tracking-wide text-neutral-950'>
          Filter
        </span>

        <button
          type='button'
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Close filter menu' : 'Open filter menu'}
          aria-controls='mobile-filter-panel'
          aria-expanded={open}
          className={`rounded-lg p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            open ? 'bg-blue-50' : 'hover:bg-gray-50'
          }`}
        >
          <img src={FilterIcon} alt='' aria-hidden='true' className='h-5 w-5' />
        </button>
      </div>

      {open && (
        <>
          {/* Backdrop Overlay */}
          <div
            className='fixed inset-0 z-10 bg-black/10 transition-opacity'
            onClick={() => setOpen(false)}
          />

          {/* Filter Floating Drawer */}
          <div
            id='mobile-filter-panel'
            role='dialog'
            aria-modal='true'
            aria-label='Book filter'
            className='absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl'
          >
            <div className='max-h-80 overflow-y-auto p-4'>
              <FilterContent
                categories={categories}
                selectedCategoryId={selectedCategoryId}
                minRating={minRating}
                onCategoryChange={onCategoryChange}
                onRatingChange={onRatingChange}
              />
            </div>

            <div className='border-t border-gray-100 bg-gray-50 px-4 py-3'>
              <button
                type='button'
                onClick={() => setOpen(false)}
                className='w-full rounded-full bg-primary-300 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-400 active:scale-95'
              >
                Apply Filter
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
