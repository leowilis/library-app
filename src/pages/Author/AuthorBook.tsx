import { useParams, useNavigate } from "react-router-dom";
import { useAuthorBooks } from "@/hooks/useAuthors";
import { ROUTES } from "@/constants";
import BookCard from "@/pages/user/BookCard";
import AvatarIcon from "@/assets/avatar/avatar.svg";
import BookIcon from "@/assets/icon/Book.svg";
import { SkeletonBookCard } from "@/components/ui/skeleton";
import type { Book } from "@/types/book";
import type { Author } from "@/types/author";

// AuthorCard

/**
 * Displays the author's avatar, name, and total book count.
 */
function AuthorCard({ author, bookCount }: { author: Author; bookCount: number }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm">
      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
        <img
          src={author.profilePhoto ?? AvatarIcon}
          alt={author.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-bold text-gray-900 truncate">{author.name}</h3>
        {author.bio && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{author.bio}</p>
        )}
        <div className="flex items-center gap-1 mt-2">
          <img src={BookIcon} alt="books" className="w-4 h-4" />
          <span className="text-sm text-neutral-950 font-medium">
            {author.bookCount ?? bookCount} books
          </span>
        </div>
      </div>
    </div>
  );
}

// BooksByAuthorPage

/**
 * Books by Author page
 *
 * Fetches author profile and book list via `useAuthorBooks`
 * Renders an author card followed by a responsive book grid
 */
export default function BooksByAuthorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useAuthorBooks(Number(id));

  const author = data?.author;
  const books: Book[] = data?.books ?? [];

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <div className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => <SkeletonBookCard key={i} />)}
        </div>
      </div>
    );
  }

  // ── Error ──
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-red-500">
        <p className="text-sm font-semibold">Failed to load author. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

      {/* Author Profile */}
      {author && <AuthorCard author={author} bookCount={books.length} />}

      {/* Book List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Book List</h2>

        {books.length === 0 ? (
          <div className="flex flex-col items-center py-16 gap-3 text-gray-400">
            <span className="text-4xl">📚</span>
            <p className="text-sm font-semibold">No books found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {books.map((book) => (
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
  );
}