import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Pencil, Trash2, Plus } from "lucide-react";
import { api } from "@/lib/api";
import { EndPoints, Query_Keys, ROUTES } from "@/constants";
import { toast } from "sonner";

const PAGE_SIZE = 10;

export default function AdminBookList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: [Query_Keys.AdminBooks, page],
    queryFn: async () => {
      const res = await api.get(EndPoints.AdminBooks, { params: { page, limit: PAGE_SIZE } });
      return res.data?.data ?? res.data;
    },
  });

  const books = data?.books ?? data ?? [];
  const total = data?.pagination?.total ?? books.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const { mutate: deleteBook, isPending: isDeleting } = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(EndPoints.BooksDetail(id));
    },
    onSuccess: () => {
      toast.success("Book deleted!");
      setDeleteId(null);
      queryClient.invalidateQueries({ queryKey: [Query_Keys.AdminBooks] });
    },
    onError: () => toast.error("Failed to delete book"),
  });

  const filtered = books.filter((b: any) =>
    b.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Book List</h1>
        <button
          onClick={() => navigate("/admin/books/add")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: "#1c65da" }}
        >
          <Plus size={16} />
          Add Book
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-gray-200 w-full md:w-80">
        <Search size={16} className="text-gray-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search book"
          className="flex-1 text-sm bg-transparent outline-none text-gray-700"
        />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["No", "Cover", "Title", "Author", "Category", "Stock", "Action"].map((h) => (
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
                  {[...Array(7)].map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-400">No books found</td>
              </tr>
            ) : (
              filtered.map((book: any, idx: number) => (
                <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{(page - 1) * PAGE_SIZE + idx + 1}</td>
                  <td className="px-4 py-3">
                    <div className="w-10 h-14 rounded-lg overflow-hidden bg-gray-100">
                      {book.coverImage && (
                        <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 max-w-48">
                    <p className="line-clamp-2">{book.title}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{book.author?.name}</td>
                  <td className="px-4 py-3 text-gray-600">{book.category?.name}</td>
                  <td className="px-4 py-3 text-gray-600">{book.stock ?? 0}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/admin/books/${book.id}/edit`)}
                        className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteId(book.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-28 bg-gray-100 rounded-2xl animate-pulse" />
          ))
        ) : filtered.map((book: any, idx: number) => (
          <div key={book.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex gap-3">
              <div className="w-12 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                {book.coverImage && (
                  <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs border border-gray-300 rounded px-1.5 py-0.5 text-gray-500">
                  {book.category?.name}
                </span>
                <p className="font-bold text-gray-900 mt-1 line-clamp-2">{book.title}</p>
                <p className="text-xs text-gray-500">{book.author?.name}</p>
              </div>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => navigate(`/admin/books/${book.id}/edit`)}
                  className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => setDeleteId(book.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-gray-400">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total} entries
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40">
              Previous
            </button>
            {[...Array(Math.min(totalPages, 5))].map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                className="w-8 h-8 text-xs rounded-lg border transition-colors"
                style={{
                  backgroundColor: page === i + 1 ? "#1c65da" : "white",
                  borderColor: page === i + 1 ? "#1c65da" : "#e5e7eb",
                  color: page === i + 1 ? "white" : "#374151",
                }}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 disabled:opacity-40">
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDeleteId(null)} />
          <div className="relative bg-white rounded-2xl p-6 w-80 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-gray-900">Delete Book</h3>
            <p className="text-sm text-gray-500">Are you sure you want to delete this book? This action cannot be undone.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold border border-gray-200 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteBook(deleteId)}
                disabled={isDeleting}
                className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white bg-red-500 disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}