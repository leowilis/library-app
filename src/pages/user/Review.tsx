import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { EndPoints, Query_Keys } from "@/constants";
import type { Review } from "@/types/review";

function StarRating({ rating }: { rating: number }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Button
          key={i}
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0 hover:bg-transparent"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
        >
          <Star
            size={18}
            fill={(hovered || rating) >= i ? "#fdb022" : "transparent"}
            stroke="#fdb022"
            strokeWidth={2}
            className="transition-transform hover:scale-110"
          />
        </Button>
      ))}
    </div>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }) +
    ", " +
    date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useQuery({
  queryKey: [Query_Keys.MeReviews],
  queryFn: async () => {
    const response = await api.get(EndPoints.MeReviews);
      const reviewsData = response.data?.data?.reviews || response.data?.data || [];
      return Array.isArray(reviewsData) ? reviewsData : [];
    },
  });

  const reviews = (data as Review[]) ?? [];

  const filteredReviews = reviews.filter((review) =>
    review.book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h1>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search book"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-blue-400"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-gray-400">Loading reviews...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400">
              {searchQuery ? "No reviews found" : "No reviews yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredReviews.map((review) => (
              <div key={review.id} className="space-y-3">
                <p className="text-xs text-gray-500">
                  {formatDate(review.createdAt)}
                </p>

                <div className="flex gap-3">
                  <img
                    src={
                      review.book.coverImage ??
                      "https://via.placeholder.com/64x96?text=No+Image"
                    }
                    alt={review.book.title}
                    className="w-16 h-24 object-cover rounded-lg flex-shrink-0"
                  />

                  <div className="flex-1 space-y-2">
                    <span className="inline-block text-xs px-2 py-1 border border-gray-300 rounded text-gray-700">
                      {review.book.category.name}
                    </span>

                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {review.book.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {review.book.author.name}
                    </p>

                    <StarRating rating={review.star} />

                    <p className="text-sm text-neutral-500 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}