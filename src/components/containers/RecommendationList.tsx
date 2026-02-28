import { useState } from "react"
import { useBooks } from "@/lib/books/hooks"
import BookCard from "@/components/ui/BookCard"

export default function RecommendationList() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useBooks({ page, limit: 10 })

  if (isLoading) return (
    <div className="grid grid-cols-2 gap-4 px-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="aspect-[2/3] animate-pulse bg-gray-100 rounded-lg" />
      ))}
    </div>
  )

  return (
    <div className="px-4">
      <div className="grid grid-cols-2 gap-4">
        {data?.data.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Load More */}
      {data && data.data.length < data.total && (
        <button
          onClick={() => setPage(page + 1)}
          className="w-full mt-6 py-2 border border-gray-300 rounded-full text-sm text-gray-600"
        >
          Load More
        </button>
      )}
    </div>
  )
}