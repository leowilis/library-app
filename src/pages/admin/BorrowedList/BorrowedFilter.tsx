import { Button } from '@/components/ui/button';
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
          <Button
            key={label}
            type='button'
            role='tab'
            variant={isActive ? 'default' : 'outline'}
            aria-selected={isActive}
            onClick={() => onChange(filter)}
            className={cn(
              'flex-shrink-0 rounded-full px-4',
              !isActive && 'hover:bg-muted',
            )}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
