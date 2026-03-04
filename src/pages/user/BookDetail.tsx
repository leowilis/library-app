import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBookDetail } from "@/hooks/useBooks";
import { useRecommendedBooks } from "@/hooks/useBooks";
import { useCreateReview } from "@/hooks/useReviews";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/index";
import { addToCart } from "@/store/cartSlice";
import { ROUTES } from "@/constants";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import AvatarIcon from "@/assets/avatar/avatar.svg";
import Chevron from "@/assets/icon/chevron.svg";
import { formatDate } from "@/lib/utils";
import BorrowModal from "./BorrowModal";
import BookCard from "./BookCard";


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

function ReviewModal({
  bookId,
  onClose,
}: {
  bookId: number;
  onClose: () => void;
}) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const { mutate: createReview, isPending } = useCreateReview();

  const handleSend = () => {
    if (rating === 0) return toast.error("Please give a rating");
    if (!comment.trim()) return toast.error("Please write a comment");
    createReview(
      { bookId, star: rating, comment },
      {
        onSuccess: () => {
          toast.success("Review submitted!");
          onClose();
        },
        onError: () => toast.error("Failed to submit review"),
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full md:w-[480px] md:rounded-3xl rounded-t-3xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Give Review</h3>
          <button
            onClick={onClose}
            className="text-gray-400 text-2xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold text-gray-700">Give Rating</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setRating(i)}
              >
                <Star
                  size={36}
                  fill={(hovered || rating) >= i ? "#fdb022" : "#e5e7eb"}
                  color={(hovered || rating) >= i ? "#fdb022" : "#e5e7eb"}
                />
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Please share your thoughts about this book"
          rows={4}
          className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-blue-400 resize-none"
        />
        <Button
          onClick={handleSend}
          disabled={isPending}
          className="w-full rounded-full py-6 font-semibold text-white"
          style={{ backgroundColor: "var(--primary-300)" }}
        >
          {isPending ? "Sending..." : "Send"}
        </Button>
      </div>
    </div>
  );
}

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [showReview, setShowReview] = useState(false);
  const [reviewPage, setReviewPage] = useState(1);
  const [showBorrow, setShowBorrow] = useState(false);

  const { data: bookData, isLoading } = useBookDetail(Number(id));
  const book =
    (bookData as any)?.data?.data?.book ??
    (bookData as any)?.data?.data ??
    (bookData as any)?.data;

  const { data: relatedBooks } = useRecommendedBooks({
    by: "rating",
    categoryId: book?.categoryId,
    limit: 6,
  });

  const isInCart = book
    ? cartItems.some((item) => item.book.id === book.id)
    : false;

  // Check stock status
  const isOutOfStock = book ? book.stock <= 0 : false;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("This book is out of stock");
      return;
    }

    if (!token) {
      toast.error("Please login first");
      return navigate(ROUTES.Login);
    }

    if (!book) return;

    if (isInCart) {
      toast.info("Book already in cart");
      return;
    }

    dispatch(addToCart(book));
    toast.success("Book added to cart!");
  };

  const handleBorrow = () => {
    if (isOutOfStock) {
      toast.error("This book is out of stock");
      return;
    }

    if (!token) {
      toast.error("Please login first");
      return navigate(ROUTES.Login);
    }
    setShowBorrow(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-4 px-4 py-4">
        <div className="h-64 rounded-2xl bg-gray-100 animate-pulse" />
        <div className="h-6 w-2/3 rounded bg-gray-100 animate-pulse" />
        <div className="h-4 w-1/3 rounded bg-gray-100 animate-pulse" />
      </div>
    );
  }

  if (!book)
    return <p className="text-center py-10 text-gray-400">Book not found</p>;

  const reviews = book.reviews ?? [];
  const visibleReviews = reviews.slice(0, reviewPage * 3);

  return (
    <div className="pb-32 md:pb-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 py-3 text-xs text-blue-500">
        <button
          onClick={() => navigate(ROUTES.Home)}
          className="hover:text-blue-700"
        >
          Home
        </button>
        <img src={Chevron} alt="chevron" />
        <button
          onClick={() => navigate(ROUTES.Category(book.categoryId))}
          className="hover:text-blue-700"
        >
          {book.category?.name}
        </button>
        <img src={Chevron} alt="chevron" width={16} height={16} />
        <span className="text-neutral-950 line-clamp-1">{book.title}</span>
      </div>

      {/* ── TOP SECTION: cover + info ── */}
      <div className="md:flex md:gap-8 md:items-start">
        {/* Cover */}
        <div className="md:w-64 md:flex-shrink-0">
          <div className="w-full rounded-2xl overflow-hidden">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full object-contain max-h-[400px] md:h-full"
            />
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 md:mt-0 space-y-3 flex-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-neutral-950 border border-neutral-300 rounded-sm w-32 py-1 px-2 text-center">
              {book.category?.name}
            </p>
            {/* Out of Stock Badge */}
            {isOutOfStock && (
              <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                Out of stock
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
          <p className="text-sm text-gray-500">{book.author?.name}</p>

          <div className="flex items-center gap-1">
            <Star size={16} fill="#fdb022" color="#fdb022" />
            <span className="text-sm font-bold text-gray-800">
              {book.rating}
            </span>
          </div>

          {/* Stats with Lines */}
          <div className="flex justify-between py-3 border-b border-neutral-300 my-4">
            <div className="flex flex-col items-center flex-1 border-r border-neutral-300">
              <span className="text-base font-bold text-neutral-950">
                {book.totalPages ?? "-"}
              </span>
              <span className="text-xs text-neutral-950">Page</span>
            </div>

            <div className="flex flex-col items-center flex-1 border-r border-gray-200">
              <span className="text-base font-bold text-neutral-950">
                {book.rating ?? 0}
              </span>
              <span className="text-xs text-neutral-950">Rating</span>
            </div>

            <div className="flex flex-col items-center flex-1">
              <span className="text-base font-bold text-neutral-950">
                {book.reviewCount ?? 0}
              </span>
              <span className="text-xs text-neutral-950">Reviews</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              Description
            </h2>
            <p className="text-md text-neutral-950 leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* Desktop buttons */}
          <div className="hidden md:flex gap-3 pt-4">
            {/* Add to Cart Button */}
            <Button
              variant="outline"
              className="rounded-full px-15 py-5 font-semibold border-2 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              style={{
                borderColor: isOutOfStock ? "#D5D7DA" : "#D5D7DA",
                color: isOutOfStock ? "#9ca3af" : "D5D7DA",
              }}
              onClick={handleAddToCart}
              disabled={isOutOfStock || isInCart}
            >
              {isOutOfStock
                ? "Out of Stock"
                : isInCart
                  ? "In Cart"
                  : "Add to Cart"}
            </Button>

            {/* Borrow Button */}
            <Button
              className="rounded-full px-15 py-5 font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              style={{
                backgroundColor: "#1C65DA",
              }}
              onClick={handleBorrow}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? "Not Available" : "Borrow Book"}
            </Button>
          </div>
        </div>
      </div>
      <br />

      <div className="flex flex-col items-center flex-1 border border-neutral-300" />
      {/* Reviews */}
      <div className="mt-8 space-y-5">
        <div className="flex-col items-center gap-2">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Review</h2>
          <div className="flex items-center gap-1 px-2">
            <Star size={14} fill="#fdb022" color="#fdb022" />
            <span className="text-sm font-bold text-gray-800">
              {book.rating}
            </span>
            <span className="text-xs text-neutral-950">
              ({book.reviewCount} Ulasan)
            </span>
          </div>
        </div>

        {/* Reviews: 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.length === 0 ? (
            <p className="text-sm text-gray-400">No reviews yet</p>
          ) : (
            visibleReviews.map((review: any) => (
              <div
                key={review.id}
                className="space-y-2 shadow rounded-2xl p-5 px-5"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={review.user?.profilePhoto ?? AvatarIcon}
                    alt={review.user?.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-neutral-950">
                      {review.user?.name}
                    </p>
                    <p className="text-xs text-neutral-950">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.star ?? review.rating} />
                <p className="text-sm text-gray-600 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))
          )}
        </div>

        {visibleReviews.length < reviews.length && (
          <div className="flex justify-center">
            <button
              onClick={() => setReviewPage((p) => p + 1)}
              className="px-8 py-2 rounded-full text-sm font-semibold text-gray-700 border border-gray-300"
            >
              Load More
            </button>
          </div>
        )}
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
                  onClick={() => navigate(ROUTES.BookDetail(b.id))}
                />
              ))}
          </div>
        </div>
      )}

      {/* Mobile fixed bottom buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 flex gap-3 md:hidden">
        <Button
          variant="outline"
          className="flex-1 rounded-full py-6 font-semibold border-2"
          style={{
            borderColor: isOutOfStock ? "#e5e7eb" : "#D5D7DA",
            color: isOutOfStock ? "#9ca3af" : "var(--primary-300)",
          }}
          onClick={handleAddToCart}
          disabled={isOutOfStock || isInCart}
        >
          {isOutOfStock ? "Out of Stock" : isInCart ? "In Cart" : "Add to Cart"}
        </Button>
        <Button
          className="flex-1 rounded-full py-6 font-semibold text-white"
          style={{ backgroundColor: isOutOfStock ? "#d1d5db" : "#1C65DA" }}
          onClick={handleBorrow}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Not Available" : "Borrow Book"}
        </Button>
      </div>

      {showReview && (
        <ReviewModal bookId={book.id} onClose={() => setShowReview(false)} />
      )}
      {showBorrow && (
        <BorrowModal
          bookId={book.id}
          bookTitle={book.title}
          onClose={() => setShowBorrow(false)} book={undefined}        />
      )}
    </div>
  );
}
