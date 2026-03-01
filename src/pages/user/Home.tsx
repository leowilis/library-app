import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";
import { useRecommendedBooks } from "@/hooks/useBooks";
import { usePopularAuthors } from "@/hooks/useAuthors";
import { ROUTES } from "@/constants";
import HeroBanner from "@/components/user/Background";
import AuthorCard from "@/components/user/AuthorCard";
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
    <div className="space-y-8">
      <HeroBanner />

      {/* Categories */}
      <section>
        <div className="grid grid-cols-3 gap-3">
          {categories?.map((cat: { id: number; name: string }) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl shadow-sm transition-all"
              style={{
                backgroundColor: activeCategory === cat.id ? "var(--primary-200)" : "white",
                border: activeCategory === cat.id ? "2px solid var(--primary-300)" : "2px solid transparent",
              }}
            >
              {CATEGORY_ICONS[cat.name] && (
                <img
                  src={CATEGORY_ICONS[cat.name]}
                  alt={cat.name}
                  className="w-8 h-8 object-contain"
                />
              )}
              <span className="text-xs font-semibold text-gray-700 text-center">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section>
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
              <div key={book.id} onClick={() => navigate(ROUTES.BookDetail(book.id))}>
                <BookCard book={book} />
              </div>
            ))}
          </div>
        )}

        {recommended && recommended.length >= 8 && (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="w-full mt-4 py-3 rounded-xl font-semibold text-sm"
            style={{ backgroundColor: "var(--primary-200)", color: "var(--primary-300)" }}
          >
            Load More
          </button>
        )}
      </section>

      {/* Popular Authors */}
      <section>
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
      </section>
    </div>
  );
}