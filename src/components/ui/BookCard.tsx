import type { Book } from "@/features/books/type";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigate(`/books/${book.id}`)}
    >
      {/* Cover */}
      <div className="w-full aspect-[2/3] rounded-lg overflow-hidden mb-2">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <p className="text-sm font-semibold truncate">{book.title}</p>
      <p className="text-xs text-gray-500 truncate">{book.author}</p>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-yellow-400 text-xs">★</span>
        <span className="text-xs text-gray-500">{book.rating}</span>
      </div>
    </div>
  );
}
