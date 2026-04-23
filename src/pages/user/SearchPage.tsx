import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useBooks } from '@/hooks/useBooks';
import { useCategories } from '@/hooks/useCategories';
import { ROUTES } from '@/constants';
import BookCard from '@/pages/user/BookCard';
import FilterIcon from '@/assets/icon/Filter.svg';
import StarIcon from '@/assets/icon/Star.svg';
import { SkeletonBookCard } from '@/components/ui/skeleton';

// Rating star options for filter
const RATING_STARS = [5, 4, 3, 2, 1];

// Shared filter content for desktop sidebar and mobile dropdown
function FilterContent({
  categories,
  selectedCategoryId,
  minRating,
  onCategoryChange,
  onRatingChange,
}: {
  categories: any[];
  selectedCategoryId: number | undefined;
  minRating: number | undefined;
  onCategoryChange: (id: number) => void;
  onRatingChange: (star: number) => void;
}) {
  return (
    <div className='space-y-5'>
      {/* Category */}
      <div>
        <p className='text-sm font-extrabold text-neutral-950 mb-3'>Category</p>
        <div className='space-y-2.5'>
          {categories.map((cat: any) => (
            <label
              key={cat.id}
              className='flex items-center gap-2 cursor-pointer group'
            >
              <input
                type='checkbox'
                checked={selectedCategoryId === cat.id}
                onChange={() => onCategoryChange(cat.id)}
                className='w-4 h-4 rounded accent-blue-600 flex-shrink-0'
              />
              <span className='text-sm text-neutral-800 group-hover:text-blue-600 transition-colors'>
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <hr className='border-gray-100' />

      {/* Rating */}
      <div>
        <p className='text-sm font-extrabold text-neutral-950 mb-3'>Rating</p>
        <div className='space-y-2.5'>
          {RATING_STARS.map((star) => (
            <label
              key={star}
              className='flex items-center gap-1.5 cursor-pointer group'
            >
              <input
                type='checkbox'
                checked={minRating === star}
                onChange={() => onRatingChange(star)}
                className='w-4 h-4 accent-blue-600 flex-shrink-0'
              />
              <img src={StarIcon} alt='star' className='w-5 h-5' />
              <span className='text-sm text-neutral-950 group-hover:text-blue-600 transition-colors'>
                {star}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  // UI state
  const [showFilter, setShowFilter] = useState(false);
  const [search] = useState(searchParams.get('q') ?? '');
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(id ? Number(id) : undefined);
  const [page, setPage] = useState(1);

  // Data fetching
  const { data: categoriesData } = useCategories();
  const categories = categoriesData ?? [];

  const { data: booksData, isFetching } = useBooks({
    q: search,
    categoryId: selectedCategoryId,
    minRating,
    page,
    limit: 8,
  });

  const raw = (booksData as any)?.data;
  const books = raw?.data?.books ?? raw?.books ?? [];
  const pagination = raw?.data?.pagination ?? raw?.pagination;

  // Handle category selection — deselects if same category clicked
  const handleCategoryChange = (id: number) => {
    setSelectedCategoryId(selectedCategoryId === id ? undefined : id);
    setPage(1);
  };

  // Handle rating selection — deselects if same rating clicked
  const handleRatingChange = (star: number) => {
    setMinRating(minRating === star ? undefined : star);
    setPage(1);
  };

  return (
    <section className='mt-2 md:mt-6'>
      <h1 className='text-3xl font-bold text-gray-900 pb-6 md:pb-8'>
        Book List
      </h1>

      <div className='md:flex md:gap-8'>
        {/* DESKTOP SIDEBAR */}
        <aside className='hidden md:block w-[266px] rounded-xl p-5 h-fit space-y-6 drop-shadow border border-neutral-100'>
          <p className='text-sm font-extrabold text-neutral-950 tracking-wide'>
            FILTER
          </p>
          <FilterContent
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            minRating={minRating}
            onCategoryChange={handleCategoryChange}
            onRatingChange={handleRatingChange}
          />
        </aside>

        {/* MAIN CONTENT */}
        <div className='flex-1'>
          {/* Mobile filter bar */}
          <div className='relative md:hidden mb-4'>
            <div className='flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-gray-100 shadow-sm'>
              <span className='text-sm font-extrabold text-neutral-950 tracking-wide'>
                FILTER
              </span>
              <button
                onClick={() => setShowFilter((v) => !v)}
                className={`p-1.5 rounded-lg transition-colors ${showFilter ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              >
                <img src={FilterIcon} alt='filter' className='w-5 h-5' />
              </button>
            </div>

            {/* Mobile dropdown */}
            {showFilter && (
              <>
                <div
                  className='fixed inset-0'
                  onClick={() => setShowFilter(false)}
                />
                <div className='absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-10'>
                  <div className='max-h-80 overflow-y-auto p-4'>
                    <FilterContent
                      categories={categories}
                      selectedCategoryId={selectedCategoryId}
                      minRating={minRating}
                      onCategoryChange={handleCategoryChange}
                      onRatingChange={handleRatingChange}
                    />
                  </div>
                  <div className='px-4 py-3 border-t border-gray-100 bg-gray-50'>
                    <button
                      onClick={() => setShowFilter(false)}
                      className='w-full py-2.5 rounded-full text-sm font-bold text-white bg-[#1c65da] hover:bg-[#1550b8] active:scale-95 transition-all'
                    >
                      Apply Filter
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Book grid */}
          <div>
            {isFetching ? (
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {[...Array(8)].map((_, i) => (
                  <SkeletonBookCard key={i} />
                ))}
              </div>
            ) : books.length === 0 ? (
              <div className='flex flex-col items-center py-16 gap-3 text-gray-400'>
                <span className='text-4xl'>🔍</span>
                <p className='text-sm font-semibold'>No books found</p>
              </div>
            ) : (
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {books.map((book: any) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={() => navigate(ROUTES.BookDetail(book.id))}
                  />
                ))}
              </div>
            )}

            {/* Load more */}
            {pagination?.hasNextPage && (
              <div className='flex justify-center mt-6'>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className='px-10 py-2.5 rounded-full text-sm font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 transition-all'
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
