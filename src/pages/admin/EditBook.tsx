import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Trash2, ImageIcon } from "lucide-react";
import { api } from "@/lib/api";
import { EndPoints, Query_Keys } from "@/constants";
import { toast } from "sonner";
import { useCategories } from "@/hooks/useCategories";
import { useBookDetail } from "@/hooks/useBooks";
import type { Category } from "@/types/category";

// Types

interface BookFormState {
  title: string;
  authorName: string;
  categoryId: string;
  description: string;
  totalPages: string;
  coverImage: string;
}

// Constants

const INITIAL_FORM: BookFormState = {
  title: "",
  authorName: "",
  categoryId: "",
  description: "",
  totalPages: "",
  coverImage: "",
};

// FormField

/**
 * Reusable labeled input wrapper.
 */
function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-neutral-950">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

// inputClass

const inputClass =
  "w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400";

// AdminBookForm

/**
 * Admin Book Form page.
 *
 * - In **add** mode (`/admin/books/add`): renders an empty form.
 * - In **edit** mode (`/admin/books/:id/edit`): prefills form from `useBookDetail`.
 * Submits via PUT (edit) or POST (add) and invalidates the admin books cache on success.
 */
export default function AdminBookForm() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState<BookFormState>(INITIAL_FORM);

  const { data: categories } = useCategories();
  const { data: book } = useBookDetail(Number(id));

  // Prefill form when editing
  useEffect(() => {
    if (isEdit && book) {
      setForm({
        title: book.title ?? "",
        authorName: book.author?.name ?? "",
        categoryId: book.categoryId?.toString() ?? "",
        description: book.description ?? "",
        totalPages: book.totalPages?.toString() ?? "",
        coverImage: book.coverImage ?? "",
      });
    }
  }, [isEdit, book]);

  const { mutate: submit, isPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        authorName: form.authorName,
        categoryId: Number(form.categoryId),
        description: form.description,
        totalPages: Number(form.totalPages),
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
      if (isEdit) {
        queryClient.invalidateQueries({ queryKey: [Query_Keys.BooksDetail, Number(id)] });
      }
      navigate("/admin/books");
    },
    onError: () =>
      toast.error(isEdit ? "Failed to update book" : "Failed to add book"),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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

  return (
    <section className="max-w-2xl space-y-6 pb-10">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/admin/books")}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={22} className="text-neutral-700" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Book" : "Add Book"}
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6"
      >
        {/* Title */}
        <FormField label="Title" required>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter book title"
            required
            className={inputClass}
          />
        </FormField>

        {/* Author */}
        <FormField label="Author" required>
          <input
            name="authorName"
            value={form.authorName}
            onChange={handleChange}
            placeholder="Enter author name"
            required
            className={inputClass}
          />
        </FormField>

        {/* Category */}
        <FormField label="Category" required>
          <div className="relative">
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
              className={`${inputClass} appearance-none pr-10`}
            >
              <option value="">Select category</option>
              {(categories ?? []).map((cat: Category) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </FormField>

        {/* Number of Pages */}
        <FormField label="Number of Pages">
          <input
            name="totalPages"
            type="number"
            min={1}
            value={form.totalPages}
            onChange={handleChange}
            placeholder="e.g. 320"
            className={inputClass}
          />
        </FormField>

        {/* Description */}
        <FormField label="Description">
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            placeholder="Enter book description"
            className={`${inputClass} resize-none`}
          />
        </FormField>

        {/* Cover Image */}
        <FormField label="Cover Image">
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 space-y-4">
            {form.coverImage ? (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={form.coverImage}
                  alt="cover preview"
                  className="w-28 h-40 object-cover rounded-xl shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, coverImage: "" }))}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 text-red-500 text-sm hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={15} />
                  Remove Image
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                    <ImageIcon size={22} className="text-gray-400" />
                  </div>
                </div>
                <input
                  name="coverImage"
                  placeholder="Paste image URL here"
                  value={form.coverImage}
                  onChange={handleChange}
                  className={inputClass}
                />
                <p className="text-xs text-center text-gray-400">PNG or JPG (max. 5MB)</p>
              </div>
            )}
          </div>
        </FormField>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 rounded-full text-white font-semibold text-sm disabled:opacity-60 transition-colors hover:bg-blue-700"
          style={{ backgroundColor: "#1c65da" }}
        >
          {isPending ? "Saving..." : isEdit ? "Update Book" : "Add Book"}
        </button>
      </form>
    </section>
  );
}