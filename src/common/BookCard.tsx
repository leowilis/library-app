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
  className="group flex flex-col rounded-xl overflow-hidden bg-white shadow-sm text-left w-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
>
  <div className="relative aspect-3/4 w-full bg-gray-100 overflow-hidden">
    {book.coverImage ? (
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    ) : (
          <div
            className="w-full h-full flex items-center justify-center text-4xl"
          ></div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 space-y-1">
        <p className="font-bold text-md text-gray-900 line-clamp-2">
          {book.title}
        </p>
        <p className="text-sm text-gray-500 line-clamp-1">
          {book.author?.name}
        </p>
        <div className="flex items-center gap-1">
          <img src={Star} width={24} height={24} alt="Rating" />
          <span className="text-md font-semibold text-gray-700">
            {book.rating}
          </span>
        </div>
      </div>
    </button>
  );
}
