import type { LoanStatusFilter } from '@/types/admin/admin';

export const STATUS_FILTERS: {
  label: string;
  value: LoanStatusFilter;
}[] = [
  {
    label: 'All',
    value: undefined,
  },
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Returned',
    value: 'returned',
  },
  {
    label: 'Overdue',
    value: 'overdue',
  },
];

export const STATUS_COLOR: Record<string, string> = {
  BORROWED: '#24A500',
  RETURNED: '#6b7280',
  LATE: '#d92d20',
};

export const STATUS_LABEL: Record<string, string> = {
  BORROWED: 'Active',
  RETURNED: 'Returned',
  LATE: 'Overdue',
};
