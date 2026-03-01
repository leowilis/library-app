import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";
import { useRecommendedBooks } from "@/hooks/useBooks";
import { usePopularAuthors } from "@/hooks/useAuthors";
import { ROUTES } from "@/constants";
import AuthorCard from "@/components/user/AuthorCard";
import Background from "@/components/user/Background";
import BookCard from "@/common/BookCard";

import fictionIcon from "@/assets/categoriesIcon/fiction.svg";
import nonfictionIcon from "@/assets/categoriesIcon/nonfiction.svg";
import selfimprovementIcon from "@/assets/categoriesIcon/selfimprovement.svg";
import financeIcon from "@/assets/categoriesIcon/finance.svg";
import scienceIcon from "@/assets/categoriesIcon/science.svg";
import educationIcon from "@/assets/categoriesIcon/education.svg";

const CATEGORY_ICONS: Record<string, string> = {
  Fiction: fictionIcon,
  "Non-Fiction": nonfictionIcon,
  "Self-Improvement": selfimprovementIcon,
  Finance: financeIcon,
  Science: scienceIcon,
  Education: educationIcon,
};

export default function Home() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(1);

  const { data: categories } = useCategories();

  const { data: recommended, isFetching } = useRecommendedBooks({
    by: "rating",
    categoryId: activeCategory,
    page,
    limit: 8,
  });

  const { data: popularAuthors } = usePopularAuthors(6);

  const handleCategoryClick = (id: number) => {
    setActiveCategory((prev) => (prev === id ? undefined : id));
    setPage(1);
  };

  return (
    <main className="space-y-8">
      <Background />

      {/* Categories */}
      <div>
        <div className="grid grid-cols-3 gap-3 px-2 py-4">
          {categories
            ?.filter((cat: { id: number; name: string }) => CATEGORY_ICONS[cat.name])
            .map((cat: { id: number; name: string }) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl shadow-sm transition-all"
                style={{
                  backgroundColor: activeCategory === cat.id ? "var(--primary-200)" : "white",
                  border: activeCategory === cat.id ? "2px solid var(--primary-300)" : "2px solid transparent",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--primary-100)" }}
                >
                  <img
                    src={CATEGORY_ICONS[cat.name]}
                    alt={cat.name}
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <span className="text-xs font-semibold text-gray-700 text-center">{cat.name}</span>
              </button>
            ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {activeCategory
            ? categories?.find((c: { id: number }) => c.id === activeCategory)?.name
            : "Recommendation"}
        </h2>

        {isFetching ? (
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-56 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {recommended?.map((book: any) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => navigate(ROUTES.BookDetail(book.id))}
              />
            ))}
          </div>
        )}

        {recommended && recommended.length >= 8 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-10 py-2.5 rounded-full text-sm font-bold text-gray-700"
              style={{ border: "150px solid var(--neutral-300)" }}
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Popular Authors */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Authors</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {popularAuthors?.map((author: any) => (
            <AuthorCard
              key={author.id}
              author={author}
              onClick={() => navigate(ROUTES.BooksByAuthors(author.id))}
            />
          ))}
        </div>
      </div>
    </main>
  );
}