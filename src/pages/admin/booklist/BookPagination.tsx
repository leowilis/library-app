interface Props {
  page: number;
  total: number;
  totalPages: number;
  limit?: number;
  onPageChange: (page: number) => void;
}

export default function BookPagination({
  page,
  total,
  totalPages,
  limit = 10,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const startRange = (page - 1) * limit + 1;
  const endRange = Math.min(page * limit, total);

  return (
    <div className='flex items-center justify-between pt-2'>
      {/* Informative structural tracking text block */}
      <p className='text-xs text-gray-400'>
        Showing {startRange}-{endRange} of {total} books
      </p>

      {/* Control Actions Row */}
      <div
        role='navigation'
        aria-label='Pagination Navigation'
        className='flex items-center gap-1'
      >
        <button
          type='button'
          aria-label='Previous page'
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className='rounded-lg border border-gray-200 px-3 py-1.5 text-xs disabled:opacity-40'
        >
          Previous
        </button>

        {[...Array(Math.min(totalPages, 5))].map((_, i) => {
          const targetPage = i + 1;
          const isActive = page === targetPage;

          return (
            <button
              key={targetPage}
              type='button'
              aria-label={`Go to page ${targetPage}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onPageChange(targetPage)}
              className={`h-8 w-8 rounded-lg border text-xs ${
                isActive
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              {targetPage}
            </button>
          );
        })}

        <button
          type='button'
          aria-label='Next page'
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className='rounded-lg border border-gray-200 px-3 py-1.5 text-xs disabled:opacity-40'
        >
          Next
        </button>
      </div>
    </div>
  );
}
