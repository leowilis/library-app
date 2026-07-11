interface UserHeaderProps {
  title: string;
}

export default function UserHeader({ title }: UserHeaderProps) {
  return (
    <header>
      <h1 className='text-2xl font-bold text-gray-900 md:text-3xl'>{title}</h1>
    </header>
  );
}
