import type { Category } from '@/types/category';
import FilterContent from './FilterContent';

interface FilterSidebarProps {
  categories: Category[];
  selectedCategoryId?: number;
  minRating?: number;
  onCategoryChange: (id: number) => void;
  onRatingChange: (rating: number) => void;
}

export default function FilterSidebar(props: FilterSidebarProps) {
  return (
    <aside className='hidden w-[266px] rounded-xl border border-neutral-100 bg-white p-5 shadow-sm md:block'>
      <h2 className='mb-6 text-sm font-extrabold uppercase tracking-wide text-neutral-950'>
        Filter
      </h2>

      <FilterContent {...props} />
    </aside>
  );
}
