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
      <ol className='flex items-center gap-1 text-xs text-blue-500'>
        <li className='flex items-center gap-1'>
          <button
            type='button'
            onClick={() => navigate(ROUTES.Home)}
            className='transition-colors hover:text-blue-700 focus:outline-none focus:underline'
          >
            Home
          </button>
          <img
            src={Chevron}
            alt=''
            width={16}
            height={16}
            aria-hidden='true'
            className='rotate-270'
          />
        </li>

        <li className='flex items-center gap-1'>
          <button
            type='button'
            onClick={() => navigate(ROUTES.Category(categoryId))}
            className='transition-colors hover:text-blue-700 focus:outline-none focus:underline'
          >
            {categoryName}
          </button>
          <img
            src={Chevron}
            alt=''
            width={16}
            height={16}
            aria-hidden='true'
            className='rotate-270'
          />
        </li>

        <li
          className='line-clamp-1 text-neutral-950 font-medium'
          aria-current='page'
        >
          {title}
        </li>
      </ol>
    </nav>
  );
}
