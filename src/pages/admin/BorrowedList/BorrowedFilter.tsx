import { cn } from '@/lib/utils';
import type { LoanStatusFilter } from '@/types/admin/admin';

const STATUS_FILTERS: {
  label: string;
  value: LoanStatusFilter;
}[] = [
  { label: 'All', value: undefined },
  { label: 'Active', value: 'active' },
  { label: 'Returned', value: 'returned' },
  { label: 'Overdue', value: 'overdue' },
];

interface BorrowedFilterProps {
  value: LoanStatusFilter;
  onChange: (status: LoanStatusFilter) => void;
}

/**
 * BorrowedFilter — Interactive tab selectors to switch between loan statuses.
 * Fully refactored to eliminate hardcoded inline styles in favor of crisp Tailwind modifiers.
 */
export default function BorrowedFilter({
  value,
  onChange,
}: BorrowedFilterProps) {
  return (
    <div
      role='tablist'
      aria-label='Loan status filters'
      className='flex gap-1 overflow-x-auto pb-1 md:gap-4 md:pb-3'
    >
      {STATUS_FILTERS.map(({ label, value: filter }) => {
        const isActive = value === filter;

        return (
          <button
            key={label}
            type='button'
            role='tab'
            aria-selected={isActive}
            onClick={() => onChange(filter)}
            className={cn(
              'flex-shrink-0 cursor-pointer rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20',
              isActive
                ? 'border-blue-600 bg-blue-50 text-blue-600'
                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
