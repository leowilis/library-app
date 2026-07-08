interface BookStatsProps {
  totalPages?: number;
  rating?: number;
  reviewCount: number;
}

export default function BookStats({
  totalPages,
  rating,
  reviewCount,
}: BookStatsProps) {
  const safeRating = (rating ?? 0).toFixed(1);
  const stats = [
    {
      label: 'Page',
      value: totalPages ?? '-',
    },
    {
      label: 'Rating',
      value: safeRating,
    },
    {
      label: 'Reviews',
      value: reviewCount,
    },
  ];

  return (
    <div className='my-5 flex justify-between border-b border-neutral-300 py-3 md:max-w-xl md:justify-start md:gap-10'>
      {stats.map((item, index) => (
        <StatItem
          key={item.label}
          label={item.label}
          value={item.value}
          border={index !== stats.length - 1}
        />
      ))}
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: string | number;
  border?: boolean;
}

function StatItem({ label, value, border = false }: StatItemProps) {
  return (
    <div
      className={`
  flex flex-1 flex-col items-center
  md:flex-none md:items-start
  ${border ? 'border-r border-neutral-300 md:pr-10' : ''}
`}
    >
      <span className='text-base font-bold text-neutral-950'>{value}</span>
      <span className='text-xs font-medium text-neutral-950'>{label}</span>
    </div>
  );
}
