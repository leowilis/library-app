import { useParams, useNavigate } from "react-router-dom";
import { useBookDetail } from "@/hooks/useBooks";
import { useRecommendedBooks } from "@/hooks/useBooks";
import { Star } from "lucide-react";
import AvatarIcon from "@/assets/avatar/avatar.svg";
import { formatDate } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import BookCard from "../user/BookCard";

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= Math.round(rating) ? "#fdb022" : "transparent"}
          color={i <= Math.round(rating) ? "#fdb022" : "#d1d5db"}
        />
      ))}
    </div>
  );
}

export default function AdminBookPreview() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: bookData, isLoading } = useBookDetail(Number(id));
  const book = bookData?.data?.book ?? bookData?.data;

  const { data: relatedBooks } = useRecommendedBooks({
    by: "rating",
    categoryId: book?.categoryId,
    limit: 6,
  });

  if (isLoading) {
    return (
      <div className="space-y-4 px-4 py-4">
        <div className="h-64 rounded-2xl bg-gray-100 animate-pulse" />
        <div className="h-6 w-2/3 rounded bg-gray-100 animate-pulse" />
      </div>
    );
  }

  if (!book) return <p className="text-center py-10 text-gray-400">Book not found</p>;

  const reviews = book.reviews ?? [];

  return (
    <section className="pb-10">
      {/* Back Button Header */}
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={() => navigate("/admin/books")} 
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Book Detail</h1>
      </div>

      {/* Main Content */}
      <div className="md:flex md:gap-8 md:items-start">
        {/* Cover */}
        <div className="md:w-64 md:flex-shrink-0">
          <div className="w-full rounded-2xl overflow-hidden shadow-sm">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full object-contain max-h-[400px] md:h-full"
            />
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 md:mt-0 space-y-3 flex-1">
          <p className="text-xs font-semibold text-neutral-950 border border-neutral-300 rounded-sm w-32 py-1 px-2 text-center">
            {book.category?.name}
          </p>

          <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
          <p className="text-sm text-gray-500">{book.author?.name}</p>

          <div className="flex items-center gap-1">
            <Star size={16} fill="#fdb022" color="#fdb022" />
            <span className="text-sm font-bold text-gray-800">{book.rating}</span>
          </div>

          {/* Stats */}
          <div className="flex justify-between py-3 border-b border-neutral-300 my-4">
            <div className="flex flex-col items-center flex-1 border-r border-neutral-300">
              <span className="text-base font-bold text-neutral-950">{book.totalPages ?? "-"}</span>
              <span className="text-xs text-neutral-950">Page</span>
            </div>
            <div className="flex flex-col items-center flex-1 border-r border-gray-200">
              <span className="text-base font-bold text-neutral-950">{book.rating ?? 0}</span>
              <span className="text-xs text-neutral-950">Rating</span>
            </div>
            <div className="flex flex-col items-center flex-1">
              <span className="text-base font-bold text-neutral-950">{book.reviewCount ?? 0}</span>
              <span className="text-xs text-neutral-950">Reviews</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-2">Description</h2>
            <p className="text-md text-neutral-950 leading-relaxed">{book.description}</p>
          </div>
          
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-gray-900">Review</h2>
          <div className="flex items-center gap-1">
            <Star size={14} fill="#fdb022" color="#fdb022" />
            <span className="text-sm font-bold text-gray-800">{book.rating}</span>
            <span className="text-xs text-gray-400">({book.reviewCount} Ulasan)</span>
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-6 space-y-5 md:space-y-0">
          {reviews.length === 0 ? (
            <p className="text-sm text-gray-400">No reviews yet</p>
          ) : (
            reviews.slice(0, 3).map((review: any) => (
              <div key={review.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <img
                    src={review.user?.profilePhoto ?? AvatarIcon}
                    alt={review.user?.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{review.user?.name}</p>
                    <p className="text-xs text-gray-400">{formatDate(review.createdAt)}</p>
                  </div>
                </div>
                <StarRating rating={review.star ?? review.rating} />
                <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Related Books */}
      {relatedBooks && relatedBooks.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-base font-bold text-gray-900">Related Books</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {relatedBooks
              .filter((b: any) => b.id !== book.id)
              .slice(0, 5)
              .map((b: any) => (
                <BookCard
                  key={b.id}
                  book={b}
                  onClick={() => navigate(`/admin/books/${b.id}`)} // Navigate within admin
                />
              ))}
          </div>
        </div>
      )}
    </section>
  );
}