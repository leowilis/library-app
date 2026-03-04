import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "@/hooks/useCategories";
import { useRecommendedBooks } from "@/hooks/useBooks";
import { usePopularAuthors } from "@/hooks/useAuthors";
import { ROUTES } from "@/constants";
import AuthorCard from "@/components/user/AuthorCard";
import Background from "@/components/user/Background";
import BookCard from "@/pages/user/BookCard";

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
  const [activeCategory] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(1);

  const { data: categories } = useCategories();

  const { data: recommended, isFetching } = useRecommendedBooks({
    by: "rating",
    categoryId: activeCategory,
    page,
    limit: 10,
  });

  const { data: popularAuthors } = usePopularAuthors(4);

  return (
    <main className="space-y-8 md:space-y-12">
      <Background />

      {/* Categories */}
      <section className="px-4 md:px-8">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 py-3">
          {categories
            ?.filter(
              (cat: { id: number; name: string }) => CATEGORY_ICONS[cat.name],
            )
            .map((cat: { id: number; name: string }) => (
              <button
                key={cat.id}
                onClick={() => navigate(ROUTES.Category(cat.id))}
                className="flex flex-col items-start gap-5 p-3 md:p-4 rounded-2xl bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className="w-full h-15 md:h-20 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#E0ECFF" }}
                >
                  <img
                    src={CATEGORY_ICONS[cat.name]}
                    alt={cat.name}
                    className="w-11 h-11 md:w-14 md:h-14 object-contain"
                  />
                </div>
                <span className="text-xs md:text-sm font-semibold text-gray-950 text-left">
                  {cat.name}
                </span>
              </button>
            ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-6">
          {activeCategory
            ? categories?.find((c: { id: number }) => c.id === activeCategory)
                ?.name
            : "Recommendation"}
        </h2>

        {isFetching ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-56 md:h-80 rounded-2xl bg-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {recommended?.map((book: any) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => navigate(ROUTES.BookDetail(book.id))}
              />
            ))}
          </div>
        )}

        {recommended && recommended.length >= 10 && (
          <div className="flex justify-center mt-4 md:mt-8">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-10 py-2.5 rounded-full text-sm font-bold text-gray-700 border border-gray-300 transition hover:bg-gray-200"
            >
              Load More
            </button>
          </div>
        )}
      </section>

      {/* Popular Authors */}
      <div className="px-4 md:py-10 md:px-10 md:justify-center md:items-center ">
        <h2 className="text-3xl font-bold text-gray-900 mb-7 md:text-4xl md:mb-8">
          Popular Authors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 ">
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