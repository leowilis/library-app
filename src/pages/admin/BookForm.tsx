import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { api } from "@/lib/api";
import { EndPoints, Query_Keys } from "@/constants";
import { toast } from "sonner";
import { useCategories } from "@/hooks/useCategories";

export default function AdminBookForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: categories } = useCategories();

  const [form, setForm] = useState({
    title: "",
    authorName: "",
    categoryId: "",
    description: "",
    totalPages: "",
    stock: "",
    coverImage: "",
  });

  const { data: bookData } = useQuery({
    queryKey: [Query_Keys.BooksDetail, id],
    queryFn: async () => {
      const res = await api.get(EndPoints.BooksDetail(Number(id)));
      return res.data?.data?.book ?? res.data?.data ?? res.data;
    },
    enabled: isEdit,
  });

  useEffect(() => {
    if (bookData) {
      setForm({
        title: bookData.title ?? "",
        authorName: bookData.author?.name ?? "",
        categoryId: bookData.categoryId?.toString() ?? "",
        description: bookData.description ?? "",
        totalPages: bookData.totalPages?.toString() ?? "",
        stock: bookData.stock?.toString() ?? "",
        coverImage: bookData.coverImage ?? "",
      });
    }
  }, [bookData]);

  const { mutate: submit, isPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        authorName: form.authorName,
        categoryId: Number(form.categoryId),
        description: form.description,
        totalPages: Number(form.totalPages),
        stock: Number(form.stock),
        coverImage: form.coverImage,
      };
      if (isEdit) {
        await api.put(EndPoints.BooksDetail(Number(id)), payload);
      } else {
        await api.post(EndPoints.AdminBooks, payload);
      }
    },
    onSuccess: () => {
      toast.success(isEdit ? "Book updated!" : "Book added!");
      queryClient.invalidateQueries({ queryKey: [Query_Keys.AdminBooks] });
      navigate("/admin/books");
    },
    onError: () => toast.error(isEdit ? "Failed to update book" : "Failed to add book"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.categoryId) {
      toast.error("Please fill required fields");
      return;
    }
    submit();
  };

  const fields = [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "authorName", label: "Author Name", type: "text", required: true },
    { name: "coverImage", label: "Cover Image URL", type: "text", required: false },
    { name: "totalPages", label: "Total Pages", type: "number", required: false },
    { name: "stock", label: "Stock", type: "number", required: false },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/admin/books")} className="p-2 rounded-xl hover:bg-gray-100">
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? "Edit Book" : "Add Book"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm space-y-4">

        {fields.map(({ name, label, type, required }) => (
          <div key={name} className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              name={name}
              type={type}
              value={(form as any)[name]}
              onChange={handleChange}
              required={required}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
            />
          </div>
        ))}

        {/* Category */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400"
          >
            <option value="">Select category</option>
            {(categories ?? []).map((cat: any) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-blue-400 resize-none"
          />
        </div>

        {/* Cover preview */}
        {form.coverImage && (
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">Cover Preview</label>
            <img src={form.coverImage} alt="cover" className="w-24 h-32 object-cover rounded-xl border border-gray-200" />
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate("/admin/books")}
            className="flex-1 py-3 rounded-full text-sm font-semibold border-2 border-gray-200 text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 py-3 rounded-full text-sm font-semibold text-white disabled:opacity-60"
            style={{ backgroundColor: "#1c65da" }}
          >
            {isPending ? "Saving..." : isEdit ? "Update Book" : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
}