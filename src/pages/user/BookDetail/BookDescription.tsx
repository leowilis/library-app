interface BookDescriptionProps {
  description?: string | null;
}

export default function BookDescription({ description }: BookDescriptionProps) {
  const content = description?.trim() || 'No description available.';

  return (
    <section className='space-y-2' aria-labelledby='book-description-title'>
      <h2
        id='book-description-title'
        className='text-base font-bold text-gray-900'
      >
        Description
      </h2>
      <p className='text-sm leading-relaxed text-neutral-950 whitespace-pre-line'>
        {content}
      </p>
    </section>
  );
}
