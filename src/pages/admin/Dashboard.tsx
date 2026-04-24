import { BookOpen, Users, BookMarked, AlertTriangle } from "lucide-react";
import { useAdminOverview } from "@/hooks/admin/useAdminOverview";
import type { AdminOverview, StatCardProps } from "@/types/admin/admin";

// Constants

/**
 * Builds the ordered list of stat card configs from overview data.
 * Extracted as a pure function to keep the component body clean.
 */
function buildStats(data: AdminOverview | undefined): Omit<StatCardProps, "isLoading">[] {
  return [
    {
      label: "Total Books",
      value: data?.totals.books,
      icon: <BookOpen size={22} />,
      accent: "#1c65da",
    },
    {
      label: "Total Users",
      value: data?.totals.users,
      icon: <Users size={22} />,
      accent: "#7c3aed",
    },
    {
      label: "Active Loans",
      value: data?.loans.active,
      icon: <BookMarked size={22} />,
      accent: "#24a500",
    },
    {
      label: "Overdue Loans",
      value: data?.loans.overdue,
      icon: <AlertTriangle size={22} />,
      accent: "#d92d20",
    },
  ];
}

// StatCard

/**
 * Renders a single statistic card with an icon badge, label, and value.
 * Displays an animated skeleton while `isLoading` is true.
 */
function StatCard({ label, value, icon, isLoading, accent }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${accent}18`, color: accent }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide truncate">
          {label}
        </p>
        {isLoading ? (
          <div className="h-7 w-16 bg-gray-100 rounded-lg animate-pulse mt-1" />
        ) : (
          <p className="text-2xl font-extrabold text-gray-900">{value ?? 0}</p>
        )}
      </div>
    </div>
  );
}

/**
 * Admin Dashboard page
 */
export default function AdminDashboard() {
  const { data, isLoading } = useAdminOverview();
  const stats = buildStats(data);

  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl md:font-extrabold">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">Library overview at a glance</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} isLoading={isLoading} />
        ))}
      </div>
    </section>
  );
}