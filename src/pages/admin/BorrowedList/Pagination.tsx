interface PaginationProps {
  page: number;
  total: number;
  totalPages: number;
  limit?: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  total,
  totalPages,
  limit = 10,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className='flex items-center justify-between pt-2'>
      <p className='text-xs text-gray-400'>
        Showing {start}-{end} of {total} items
      </p>

      <nav aria-label='Pagination' className='flex items-center gap-1'>
        <button
          type='button'
          disabled={page === 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          className='rounded-lg border border-gray-200 px-3 py-1.5 text-xs disabled:opacity-40'
        >
          Previous
        </button>

        {Array.from({
          length: Math.min(totalPages, 5),
        }).map((_, index) => {
          const target = index + 1;
          const active = target === page;

          return (
            <button
              key={target}
              type='button'
              aria-current={active ? 'page' : undefined}
              onClick={() => onPageChange(target)}
              className={`h-8 w-8 rounded-lg border text-xs ${
                active
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              {target}
            </button>
          );
        })}

        <button
          type='button'
          disabled={page === totalPages}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          className='rounded-lg border border-gray-200 px-3 py-1.5 text-xs disabled:opacity-40'
        >
          Next
        </button>
      </nav>
    </div>
  );
}
