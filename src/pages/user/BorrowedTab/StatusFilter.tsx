import { cn } from '@/lib/utils';

type LoanStatus = 'BORROWED' | 'LATE' | 'RETURNED' | undefined;

interface StatusFilterProps {
  value: LoanStatus;
  onChange: (status: LoanStatus) => void;
}

const STATUS_FILTERS = [
  { label: 'All', value: undefined },
  { label: 'Active', value: 'BORROWED' },
  { label: 'Returned', value: 'RETURNED' },
  { label: 'Overdue', value: 'LATE' },
] satisfies {
  label: string;
  value: LoanStatus;
}[];

// Filter buttons for borrowed book status.
export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div
      role='tablist'
      aria-label='Loan status filter'
      className='flex gap-2 overflow-x-auto pb-2 no-scrollbar'
    >
      {STATUS_FILTERS.map((item) => {
        const isActive = value === item.value;

        return (
          <button
            key={item.label}
            type='button'
            role='tab'
            aria-selected={isActive}
            aria-pressed={isActive}
            onClick={() => onChange(item.value)}
            className={cn(
              'flex h-12 shrink-0 items-center justify-center rounded-full border px-7 text-base font-semibold transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary/20',
              isActive
                ? 'border-primary-300 bg-neutral-80 text-primary-300'
                : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
