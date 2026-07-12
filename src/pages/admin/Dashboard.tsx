import { AlertTriangle, BookMarked, BookOpen, Users } from 'lucide-react';

import EmptyState from '@/common/EmptyState';
import ErrorState from '@/common/ErrorState';

import { useAdminOverview } from '@/hooks/admin/useAdminOverview';

import type { AdminOverview, StatCardProps } from '@/types/admin/admin';
import Skeleton from '@/components/ui/skeleton';

// Builds the ordered list of stat card configs from overview data.
function buildStats(
  data: AdminOverview | undefined,
): Omit<StatCardProps, 'isLoading'>[] {
  return [
    {
      label: 'Total Books',
      value: data?.totals?.books,
      icon: <BookOpen size={22} />,
      accent: '#1c65da',
    },
    {
      label: 'Total Users',
      value: data?.totals?.users,
      icon: <Users size={22} />,
      accent: '#7c3aed',
    },
    {
      label: 'Active Loans',
      value: data?.loans?.active,
      icon: <BookMarked size={22} />,
      accent: '#24a500',
    },
    {
      label: 'Overdue Loans',
      value: data?.loans?.overdue,
      icon: <AlertTriangle size={22} />,
      accent: '#d92d20',
    },
  ];
}

function StatCard({ label, value, icon, isLoading, accent }: StatCardProps) {
  return (
    <div className='flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm'>
      <div
        className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl'
        style={{
          backgroundColor: `${accent}18`,
          color: accent,
        }}
      >
        {icon}
      </div>

      <div className='min-w-0'>
        <p className='truncate text-xs font-semibold uppercase tracking-wide text-gray-500'>
          {label}
        </p>

        {isLoading ? (
          <Skeleton className='mt-2 h-7 w-16 rounded-lg' />
        ) : (
          <p className='text-2xl font-extrabold text-gray-900'>{value ?? 0}</p>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data, isLoading, isError } = useAdminOverview();

  const stats = buildStats(data);

  if (isError) {
    return (
      <ErrorState
        title='Failed to load dashboard'
        description='Please try again later.'
      />
    );
  }

  if (!isLoading && !data?.totals && !data?.loans) {
    return (
      <EmptyState
        title='No dashboard data'
        description='Dashboard statistics are not available yet.'
      />
    );
  }

  return (
    <section className='space-y-6 md:m-4 md:px-6'>
      {/* Header */}
      <div>
        <h1 className='pt-0 text-2xl font-bold text-gray-900 md:pt-5 md:text-3xl md:font-extrabold'>
          Dashboard
        </h1>

        <p className='mt-1 text-sm text-neutral-950 md:mt-4'>
          Library overview at a glance
        </p>
      </div>

      {/* Stat Cards */}
      <div className='grid grid-cols-1 gap-4 md:max-w-5xl md:grid-cols-2 md:pt-5'>
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} isLoading={isLoading} />
        ))}
      </div>
    </section>
  );
}
