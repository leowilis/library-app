import { useParams, useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { useAuthorBooks } from "@/hooks/useAuthors";
import { ROUTES } from "@/constants";
import BookCard from "../user/BookCard";
import AvatarIcon from "@/assets/avatar/avatar.svg";
import Book from "@/assets/icon/Book.svg";

export default function BooksByAuthorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch Books by Author
  const { data: booksResponse, isLoading } = useAuthorBooks(Number(id));

  // Extract data from response
  const author =
    booksResponse?.data?.data?.author || booksResponse?.data?.author;
  const books =
    booksResponse?.data?.data?.books || booksResponse?.data?.books || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center py-10">
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Author Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 bg-white rounded-2xl p-4">
            {/* Author Photo */}
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              {author?.profilePhoto ? (
                <img
                  src={author.profilePhoto}
                  alt={author.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={author?.profilePhoto ?? AvatarIcon}
                  alt="profile"
                  className="w-full h-full rounded-full object-cover"
                />
              )}
            </div>

            {/* Author Info */}
            <div className="flex-1">
              <h3 className="text-base font-bold text-gray-900">
                {author?.name || "Author name"}
              </h3>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <img src={Book} />
                <span className="text-neutral-950">
                  {author?.bookCount || books.length} books
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Book List */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Book List</h2>

          {books.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400">No books found</p>
            </div>
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
        </div>
      </div>
    </div>
  );
}
