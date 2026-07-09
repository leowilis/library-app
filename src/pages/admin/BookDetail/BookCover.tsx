interface BookCoverProps {
  coverImage?: string | null;
  title: string;
}

export default function BookCover({ coverImage, title }: BookCoverProps) {
  return (
    <div className='w-full md:w-80 md:flex-shrink-0'>
      <div className='relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100'>
        {coverImage ? (
          <img
            src={coverImage}
            alt={`Cover of ${title}`}
            loading='lazy'
            className='h-full w-full object-cover transition-opacity duration-300'
          />
        ) : (
          <div className='flex h-full items-center justify-center px-4 text-center text-sm font-medium text-neutral-400'>
            No Cover Available
          </div>
        )}
      </div>
    </div>
  );
}
