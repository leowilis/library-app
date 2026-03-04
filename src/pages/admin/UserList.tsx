import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { api } from "@/lib/api";
import { EndPoints, Query_Keys } from "@/constants";
import { formatDate } from "@/lib/utils";

const PAGE_SIZE = 10;

export default function AdminUserList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: [Query_Keys.AdminUsers, page],
    queryFn: async () => {
      const res = await api.get(EndPoints.AdminUsers, { params: { page, limit: PAGE_SIZE } });
      return res.data?.data ?? res.data;
    },
  });

  const users = data?.users ?? data ?? [];
  const total = data?.pagination?.total ?? users.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const filtered = users.filter((u: any) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">User</h1>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 border border-gray-200 w-full md:w-80">
        <Search size={16} className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search user"
          className="flex-1 text-sm bg-transparent outline-none text-gray-700"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["No", "Name", "Nomor Handphone", "Email", "Created At"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  {[...Array(5)].map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400">No users found</td>
              </tr>
            ) : (
              filtered.map((user: any, idx: number) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{user.name}</td>
                  <td className="px-4 py-3 text-gray-600">{user.phone ?? "-"}</td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3 text-gray-400">{formatDate(user.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
  {isLoading ? (
    [...Array(3)].map((_, i) => (
      <div key={i} className="h-40 bg-gray-100 rounded-2xl animate-pulse" />
    ))
  ) : filtered.length === 0 ? (
    <p className="text-center text-gray-400 py-6">No users found</p>
  ) : (
    filtered.map((user: any, idx: number) => (
      <div
        key={user.id}
        className="bg-white rounded-2xl p-4 shadow-xs space-y-3"
      >
        {/* No */}
        <div className="flex justify-between text-sm">
          <span className="text-neutral-950 font-semibold">No</span>
          <span className="font-bold text-gray-900">
            {(page - 1) * PAGE_SIZE + idx + 1}
          </span>
        </div>

        {/* Name */}
        <div className="flex justify-between text-sm">
          <span className="text-neutral-950 font-semibold">Name</span>
          <span className="font-bold text-gray-900">
            {user.name}
          </span>
        </div>

        {/* Email */}
        <div className="flex justify-between text-sm">
          <span className="text-neutral-950 font-semibold">Email</span>
          <span className="font-bold text-gray-900 break-all text-right">
            {user.email}
          </span>
        </div>

        {/* Phone */}
        <div className="flex justify-between text-sm">
          <span className="text-neutral-950 font-semibold">Nomor Handphone</span>
          <span className="font-bold text-gray-900">
            {user.phone ?? "-"}
          </span>
        </div>

        {/* Created At */}
        <div className="flex justify-between text-sm">
          <span className="text-neutral-950 font-semibold">Created at</span>
          <span className="font-bold text-gray-900 text-right">
            {formatDate(user.createdAt)}
          </span>
        </div>
      </div>
    ))
  )}
</div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-gray-400">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total} entries
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className="w-8 h-8 text-xs rounded-lg border transition-colors"
                style={{
                  backgroundColor: page === i + 1 ? "#1c65da" : "white",
                  borderColor: page === i + 1 ? "#1c65da" : "#e5e7eb",
                  color: page === i + 1 ? "white" : "#374151",
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}