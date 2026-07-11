import { useParams } from 'react-router-dom';

import ErrorState from '@/common/ErrorState';

import { SkeletonBookCard } from '@/components/ui/skeleton';

import { useAuthorBooks } from '@/hooks/useAuthors';

import AuthorCard from './AuthorCard';
import BookGrid from './BookGrid';

const SKELETON_COUNT = 8;

export default function BooksByAuthorPage() {
  const { id } = useParams<{ id: string }>();

  const authorId = Number(id);

  const { data, isLoading, isError } = useAuthorBooks(authorId);

  const author = data?.author;

  const books = data?.books ?? [];

  if (isLoading) {
    return (
      <section className='mx-auto max-w-7xl space-y-6 px-4 py-6'>
        <div className='h-24 animate-pulse rounded-2xl bg-gray-100' />

        <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
          {Array.from({
            length: SKELETON_COUNT,
          }).map((_, index) => (
            <SkeletonBookCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className='py-10'>
        <ErrorState
          title='Failed to load author'
          description='Please try again later.'
        />
      </section>
    );
  }

  return (
    <section className='mx-auto max-w-7xl space-y-6 px-4 py-6'>
      {author && <AuthorCard author={author} bookCount={books.length} />}

      <div className='space-y-4'>
        <h2 className='text-2xl font-bold text-gray-900'>Book List</h2>

        <BookGrid books={books} />
      </div>
    </section>
  );
}
