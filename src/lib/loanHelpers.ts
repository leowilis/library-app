import type { AdminLoan } from '@/types/admin/admin';

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

export function getLoanStatusColor(
  loan: AdminLoan,
  isOverdue: boolean,
) {
  return isOverdue ? '#d92d20' : STATUS_COLOR[loan.status];
}

export function getLoanStatusLabel(
  loan: AdminLoan,
  isOverdue: boolean,
) {
  return isOverdue ? 'Overdue' : STATUS_LABEL[loan.status];
}