import FilterIcon from '@/assets/icon/Filter.svg';
import type { Category } from '@/types/category';

import FilterContent from './FilterContent';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';

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
  return (
    <div className='mb-4 md:hidden'>
      <Sheet>
        <SheetTrigger asChild>
          <button
            type='button'
            className='flex w-full items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-xs transition-colors hover:bg-neutral-50'
          >
            <span className='text-sm font-bold uppercase tracking-wide'>
              Filter
            </span>

            <img
              src={FilterIcon}
              alt=''
              aria-hidden='true'
              className='h-5 w-5'
            />
          </button>
        </SheetTrigger>

        <SheetContent side='bottom' className='rounded-t-3xl px-0 pb-0'>
          <SheetHeader className='px-6'>
            <SheetTitle>Filter Books</SheetTitle>
          </SheetHeader>

          <div className='max-h-[65vh] overflow-y-auto px-6 py-4'>
            <FilterContent
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              minRating={minRating}
              onCategoryChange={onCategoryChange}
              onRatingChange={onRatingChange}
            />
          </div>

          <SheetFooter className='border-t bg-neutral-50 p-4'>
            <SheetClose asChild>
              <Button className='w-full'>Apply Filter</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
