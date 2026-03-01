import type { PopularAuthor } from "@/types/author";
import AvatarIcon from "@/assets/avatar/avatar.svg";
import BookIcon from "@/assets/icon/Book.svg";

interface AuthorCardProps {
  author: PopularAuthor;
  onClick: () => void;
}

export default function AuthorCard({ author, onClick }: AuthorCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full h-[84px] bg-white rounded-xl p-3 shadow-sm text-left"
    >
      <img
        src={AvatarIcon}
        alt={author.name}
        className="w-14 h-14 object-cover flex-shrink-0"
      />
      <div className="flex flex-col gap-3">
        <p className="text-sm font-bold text-gray-900">{author.name}</p>
        <div className="flex items-center gap-1">
          <img src={BookIcon} alt="books" className="w-6 h-6" />
          <span className="text-md text-neutral-950">
            {author.bookCount} books
          </span>
        </div>
      </div>
    </button>
  );
}
