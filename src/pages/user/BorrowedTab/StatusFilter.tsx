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
      className='flex gap-2 overflow-x-auto pb-3 -mx-6 px-4 md:mx-0 md:px-0 md:gap-3 no-scrollbar'
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
              'flex-shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20',
              isActive
                ? 'border-[#1c65da] bg-[#E0ECFF] text-[#1c65da]'
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
