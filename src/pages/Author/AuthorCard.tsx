import AvatarIcon from '@/assets/avatar/avatar.png';
import BookIcon from '@/assets/icon/Book.svg';
import type { Author } from '@/types/author';

interface AuthorCardProps {
  author: Author;
  bookCount: number;
}

export default function AuthorCard({ author, bookCount }: AuthorCardProps) {
  return (
    <div className='flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm'>
      <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-gray-100'>
        <img
          src={author.profilePhoto ?? AvatarIcon}
          alt={author.name}
          className='h-full w-full object-cover'
        />
      </div>

      <div className='min-w-0 flex-1'>
        <h3 className='truncate text-base font-bold text-gray-900'>
          {author.name}
        </h3>

        {author.bio && (
          <p className='mt-1 line-clamp-2 text-xs text-gray-500'>
            {author.bio}
          </p>
        )}

        <div className='mt-2 flex items-center gap-1'>
          <img src={BookIcon} alt='books' className='h-4 w-4' />

          <span className='text-sm font-medium text-neutral-950'>
            {author.bookCount ?? bookCount} books
          </span>
        </div>
      </div>
    </div>
  );
}
