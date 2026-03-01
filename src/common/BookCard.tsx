import Star from "@/assets/icon/Star.svg";
import type { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

export default function BookCard({ book, onClick }: BookCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col rounded-xl overflow-hidden bg-white shadow-sm text-left w-full"
    >
      <div className="w-full h-[370px] bg-gray-100">
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-4xl"
            style={{ backgroundColor: "var(--primary-300)" }}
          >
            📚
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 space-y-1">
        <p className="font-bold text-xs text-gray-900 line-clamp-2">
          {book.title}
        </p>
        <p className="text-xs text-gray-500 line-clamp-1">
          {book.author?.name}
        </p>
        <div className="flex items-center gap-1">
          <img src={Star} width={12} height={12} alt="Rating" />
          <span className="text-xs font-semibold text-gray-700">
            {book.rating}
          </span>
        </div>
      </div>
    </button>
  );
}
