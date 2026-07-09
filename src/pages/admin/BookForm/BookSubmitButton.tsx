interface Props {
  isEdit: boolean;
  isPending: boolean;
}

export default function BookSubmitButton({ isEdit, isPending }: Props) {
  return (
    <button
      type='submit'
      disabled={isPending}
      className='w-full rounded-full bg-[#1c65da] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-60'
    >
      {isPending ? 'Saving...' : isEdit ? 'Update Book' : 'Add Book'}
    </button>
  );
}
