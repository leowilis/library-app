import type { PopularAuthor } from '@/types/author';
import AvatarIcon from '@/assets/avatar/avatar.svg';
import BookIcon from '@/assets/icon/Book.svg';

interface AuthorCardProps {
  author: PopularAuthor;
  onClick: () => void;
}

/**
 * Clickable card displaying an author's avatar, name, and book count.
 * Used in the Popular Authors section on the Home page.
 */
export default function AuthorCard({ author, onClick }: AuthorCardProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-label={`View books by ${author.name}`}
      className='flex h-20 w-full items-center gap-3 rounded-xl bg-white p-3 text-left shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
    >
      <img
        src={AvatarIcon}
        alt={author.name}
        className='h-14 w-14 flex-shrink-0 object-cover'
      />

      <div className='min-w-0 space-y-2'>
        <p className='truncate text-sm font-bold text-foreground'>
          {author.name}
        </p>

        <div className='flex items-center gap-1'>
          <img src={BookIcon} alt='' aria-hidden='true' className='h-6 w-6' />

          <span className='text-sm text-muted-foreground'>
            {author.bookCount} books
          </span>
        </div>
      </div>
    </button>
  );
}
