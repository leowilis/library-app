import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Upload, Trash2 } from "lucide-react";
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
    onError: () =>
      toast.error(isEdit ? "Failed to update book" : "Failed to add book"),
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
    <section className=" space-y-6 pb-3">
      {/* HEADER */}
      <div className="flex items-center">
        <button
          onClick={() => navigate("/admin/books")}
          className="p-2 rounded-xl hover:bg-gray-100"
        >
          <ChevronLeft size={30} className="text-neutral-700" />
        </button>
        {!isEdit && (
          <button
            onClick={() => navigate("/admin/books")}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
        )}
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Book" : "Add Book"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl shadow-sm p-6 space-y-6"
      >
        {/* TITLE */}
        <div className="space-y-1">
          <label className="text-sm font-bold text-neutral-950">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full rounded-xl font-semibold border border-gray-200 mt-2 px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* AUTHOR */}
        <div className="space-y-1">
          <label className="text-sm font-bold text-neutral-950">Author</label>
          <input
            name="authorName"
            value={form.authorName}
            onChange={handleChange}
            required
            className="w-full rounded-xl font-semibold border border-gray-200 mt-2 px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* CATEGORY */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">
            Category
          </label>

          <div className="relative">
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              required
              className="w-full appearance-none rounded-xl border border-gray-200 
                 px-4 py-3 pr-10 text-sm
                 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select category</option>
              {(categories ?? []).map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Custom Arrow */}
            <svg
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* NUMBER OF PAGES */}
        <div className="space-y-1">
          <label className="text-sm font-bold text-neutral-950">
            Number of Pages
          </label>
          <input
            name="totalPages"
            type="number"
            value={form.totalPages}
            onChange={handleChange}
            className="w-full rounded-xl font-semibold border border-gray-200 mt-2 px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-1">
          <label className="text-sm font-bold text-neutral-950">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-xl font-semibold border border-gray-200 mt-2 px-4 py-3 text-sm resize-none focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* COVER IMAGE */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-neutral-950">
            Cover Image
          </label>

          <div className="border-2 border-dashed border-gray-200 mt-2 rounded-2xl p-6 text-center space-y-4">
            {form.coverImage ? (
              <>
                <img
                  src={form.coverImage}
                  alt="cover"
                  className="w-28 h-40 object-cover mx-auto shadow-sm"
                />

                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 text-sm hover:bg-gray-50"
                  >
                    <Upload size={16} />
                    Change Image
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({ ...prev, coverImage: "" }))
                    }
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-300 text-red-500 text-sm hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                    Delete Image
                  </button>
                </div>
              </>
            ) : (
              <input
                name="coverImage"
                placeholder="Enter image URL"
                value={form.coverImage}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
              />
            )}

            <p className="text-md text-neutral-950">PNG or JPG (max. 5mb)</p>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 rounded-full text-white font-semibold text-sm disabled:opacity-60"
          style={{ backgroundColor: "#2563eb" }}
        >
          {isPending ? "Saving..." : "Save"}
        </button>
      </form>
    </section>
  );
}
