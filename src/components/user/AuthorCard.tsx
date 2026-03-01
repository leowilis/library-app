import type { PopularAuthor } from '@/types/author'
import AvatarIcon from '@/assets/avatar/avatar.svg'
import BookIcon from '@/assets/icon/Bag.svg'

interface AuthorCardProps {
  author: PopularAuthor
  onClick: () => void
}

export default function AuthorCard({ author, onClick }: AuthorCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full bg-white rounded-2xl p-3 shadow-sm text-left"
    >
      <img
        src={AvatarIcon}
        alt={author.name}
        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-gray-900">{author.name}</p>
        <div className="flex items-center gap-1">
          <img src={BookIcon} alt="books" className="w-4 h-4" />
          <span className="text-xs text-gray-500">{author.bookCount} books</span>
        </div>
      </div>
    </button>
  )
}