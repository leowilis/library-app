import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  description?: string;
}

export default function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again later.',
}: ErrorStateProps) {
  return (
    <div className='flex flex-col items-center justify-center py-20 gap-3 text-center'>
      <AlertCircle size={44} className='text-red-500' />

      <h2 className='text-lg font-semibold text-neutral-900'>{title}</h2>

      <p className='max-w-sm text-sm text-neutral-500'>{description}</p>
    </div>
  );
}
