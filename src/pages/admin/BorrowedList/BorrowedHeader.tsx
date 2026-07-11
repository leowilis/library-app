interface BorrowedHeaderProps {
  title?: string;
}

export default function BorrowedHeader({
  title = 'Borrowed List',
}: BorrowedHeaderProps) {
  return (
    <header>
      <h1 className='text-2xl font-bold text-gray-900 md:text-3xl md:font-extrabold'>
        {title}
      </h1>
    </header>
  );
}
