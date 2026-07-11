interface StatItemProps {
  value: string | number;
  label: string;
}

export default function StatItem({
  value,
  label,
}: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-lg font-extrabold text-neutral-950">
        {value}
      </span>

      <span className="text-xs font-medium text-neutral-500">
        {label}
      </span>
    </div>
  );
}