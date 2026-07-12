import Chevron from '@/assets/icon/chevron.svg';
import { ROUTES } from '@/constants';
import { useNavigate } from 'react-router-dom';

interface BookBreadcrumbProps {
  categoryId: number;
  categoryName: string;
  title: string;
}

export default function BookBreadcrumb({
  categoryId,
  categoryName,
  title,
}: BookBreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <nav aria-label='Breadcrumb' className='py-3 md:pb-8'>
      <ol className='flex items-center gap-1 text-xs text-primary'>
        <li className='flex items-center gap-1'>
          <button
            type='button'
            onClick={() => navigate(ROUTES.Home)}
            className='rounded-sm transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          >
            Home
          </button>

          <img
            src={Chevron}
            alt=''
            aria-hidden='true'
            width={16}
            height={16}
            className='-rotate-90'
          />
        </li>

        <li className='flex items-center gap-1'>
          <button
            type='button'
            onClick={() => navigate(ROUTES.Category(categoryId))}
            className='rounded-sm transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          >
            {categoryName}
          </button>

          <img
            src={Chevron}
            alt=''
            aria-hidden='true'
            width={16}
            height={16}
            className='-rotate-90'
          />
        </li>

        <li
          aria-current='page'
          className='line-clamp-1 font-medium text-foreground'
        >
          {title}
        </li>
      </ol>
    </nav>
  );
}
