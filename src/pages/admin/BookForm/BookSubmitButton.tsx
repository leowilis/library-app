import { Button } from '@/components/ui/button';

interface BookSubmitButtonProps {
  loading: boolean;
  isEdit: boolean;
}

export default function BookSubmitButton({
  loading,
  isEdit,
}: BookSubmitButtonProps) {
  return (
    <Button
      type='submit'
      size='lg'
      className='w-full rounded-full'
      disabled={loading}
    >
      {loading ? 'Saving...' : isEdit ? 'Update Book' : 'Add Book'}
    </Button>
  );
}
