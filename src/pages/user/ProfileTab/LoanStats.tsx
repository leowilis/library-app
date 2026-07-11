import type { Loan } from '@/types/loan';

interface LoanStatsProps {
  loans: Loan[];
}

const STATS = [
  {
    key: 'total',
    label: 'Total Loans',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    key: 'active',
    label: 'Active',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    key: 'returned',
    label: 'Returned',
    color: 'text-gray-600',
    bg: 'bg-gray-50',
  },
  {
    key: 'overdue',
    label: 'Overdue',
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
] as const;

export default function LoanStats({ loans }: LoanStatsProps) {
  const stats = {
    total: loans.length,
    active: loans.filter((loan) => loan.status === 'BORROWED').length,
    returned: loans.filter((loan) => loan.status === 'RETURNED').length,
    overdue: loans.filter((loan) => loan.status === 'LATE').length,
  };

  return (
    <div>
      <p className='mb-3 text-sm font-bold text-gray-700'>Loan Statistics</p>

      <div className='grid grid-cols-2 gap-3'>
        {STATS.map(({ key, label, color, bg }) => (
          <div key={key} className={`${bg} rounded-2xl p-4 text-center`}>
            <p className={`text-2xl font-bold ${color}`}>{stats[key]}</p>

            <p className='mt-1 text-xs text-gray-500'>{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
