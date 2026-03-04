import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBooks } from "@/hooks/useBooks";
import { useCategories } from "@/hooks/useCategories";
import { ROUTES } from "@/constants";
import BookCard from "@/pages/user/BookCard";
import { X } from "lucide-react";
import FilterIcon from "@/assets/icon/Filter.svg";
import StarIcon from "@/assets/icon/Star.svg";

const RATING_OPTIONS = [
  { label: "All", value: undefined },
  { label: "4+", value: 4 },
  { label: "3+", value: 3 },
  { label: "2+", value: 2 },
];

const RATING_STARS = [5, 4, 3, 2, 1];

export default function Category() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [showFilter, setShowFilter] = useState(false);
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(Number(id));
  const [page, setPage] = useState(1);

  const { data: categoriesData } = useCategories();
  const categories = categoriesData ?? [];

  const { data: booksData, isFetching } = useBooks({
    categoryId: selectedCategoryId,
    minRating,
    page,
    limit: 8,
  });

  const raw = (booksData as any)?.data;
  const books = raw?.data?.books ?? raw?.books ?? [];
  const pagination = raw?.data?.pagination ?? raw?.pagination;

  return (
    <section className="mt-2 md:mt-6">
      <h1 className="text-3xl font-bold text-gray-900 pb-6 md:pb-8">Book List</h1>

      <div className="md:flex md:gap-8">

        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-[266px] rounded-xl p-5 h-fit space-y-6 drop-shadow border border-neutral-100">
          <p className="text-sm font-extrabold text-neutral-950 tracking-wide">FILTER</p>

          <div>
            <p className="text-md font-bold text-gray-800 mb-3">Category</p>
            <div className="space-y-2">
              {categories.map((cat: any) => (
                <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategoryId === cat.id}
                    onChange={() => { setSelectedCategoryId(cat.id); setPage(1); }}
                    className="w-4 h-4 rounded accent-blue-600"
                  />
                  <span className="text-sm text-neutral-950">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Line */}
          <div className="md:border md:border-neutral-300"/>

          {/* Rating */}
          <div>
            <p className="text-sm font-bold text-gray-800 mb-3">Rating</p>
            <div className="space-y-2">
              {RATING_STARS.map((star) => (
                <label key={star} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={minRating === star}
                    onChange={() => { setMinRating(minRating === star ? undefined : star); setPage(1); }}
                    className="w-4 h-4 rounded accent-blue-600"
                  />
                  <img src={StarIcon} alt="star" className="w-4 h-4" />
                  <span className="text-sm text-gray-700">{star}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">

          {/* Mobile filter bar */}
          <div className="flex items-center justify-between px-3 py-4 rounded-xl mb-4 bg-white md:hidden">
            <span className="text-sm font-extrabold text-neutral-950 tracking-wide">FILTER</span>
            <button onClick={() => setShowFilter((v) => !v)}>
              <img src={FilterIcon} alt="filter" className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile filter panel */}
          {showFilter && (
            <div className="mb-4 bg-white rounded-2xl p-4 shadow-sm space-y-3 md:hidden">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-700">Min Rating</p>
                <button onClick={() => setShowFilter(false)}>
                  <X size={16} className="text-gray-400" />
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {RATING_OPTIONS.map(({ label, value }) => (
                  <button
                    key={label}
                    onClick={() => { setMinRating(value); setPage(1); }}
                    className="px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-all"
                    style={{
                      backgroundColor: minRating === value ? "var(--primary-200)" : "white",
                      borderColor: minRating === value ? "var(--primary-300)" : "#e5e7eb",
                      color: minRating === value ? "var(--primary-300)" : "#374151",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Book Grid */}
          <div>
            {isFetching ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-56 rounded-2xl bg-gray-100 animate-pulse" />
                ))}
              </div>
            ) : books.length === 0 ? (
              <p className="text-center text-gray-400 py-10">No books found</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {books.map((book: any) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={() => navigate(ROUTES.BookDetail(book.id))}
                  />
                ))}
              </div>
            )}

            {pagination?.hasNextPage && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="px-10 py-2.5 rounded-full text-sm font-semibold text-gray-700 border border-gray-300"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}