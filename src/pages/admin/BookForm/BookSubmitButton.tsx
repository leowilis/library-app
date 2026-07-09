interface BookSubmitButtonProps {
  loading: boolean;
  isEdit: boolean;
}

export default function BookSubmitButton({
  loading,
  isEdit,
}: BookSubmitButtonProps) {
  return (
    <button
      type='submit'
      disabled={loading}
      className='w-full rounded-full bg-[#1c65da] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60'
    >
      {loading ? 'Saving...' : isEdit ? 'Update Book' : 'Add Book'}
    </button>
  );
}
