import { useEffect, useState } from 'react';

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
  SheetDescription,
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
  const [open, setOpen] = useState(false);

  // temporary state
  const [tempCategory, setTempCategory] = useState<number | undefined>(
    selectedCategoryId,
  );

  const [tempRating, setTempRating] = useState<number | undefined>(minRating);

  // sync every time sheet opens
  useEffect(() => {
    if (open) {
      setTempCategory(selectedCategoryId);
      setTempRating(minRating);
    }
  }, [open, selectedCategoryId, minRating]);

  const handleApply = () => {
    if (tempCategory !== selectedCategoryId) {
      if (tempCategory === undefined) {
        onCategoryChange(-1);
      } else {
        onCategoryChange(tempCategory);
      }
    }

    if (tempRating !== minRating) {
      if (tempRating === undefined) {
        onRatingChange(-1);
      } else {
        onRatingChange(tempRating);
      }
    }

    setOpen(false);
  };

  const handleReset = () => {
    setTempCategory(undefined);
    setTempRating(undefined);
  };

  return (
    <div className='mb-4 md:hidden'>
      <Sheet open={open} onOpenChange={setOpen}>
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

            <SheetDescription>
              Select a category and minimum rating, then tap Apply Filter.
            </SheetDescription>
          </SheetHeader>

          <div className='max-h-[65vh] overflow-y-auto px-6 py-4'>
            <FilterContent
              categories={categories}
              selectedCategoryId={tempCategory}
              minRating={tempRating}
              onCategoryChange={setTempCategory}
              onRatingChange={setTempRating}
            />
          </div>

          <SheetFooter className='border-t bg-neutral-50 p-4'>
            <div className='flex w-full gap-3'>
              <Button
                variant='outline'
                className='flex-1'
                onClick={handleReset}
              >
                Reset
              </Button>

              <Button className='flex-1' onClick={handleApply}>
                Apply Filter
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
