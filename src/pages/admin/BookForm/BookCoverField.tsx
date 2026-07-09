import { ImageIcon, Trash2 } from 'lucide-react';
import FormField from './FormField';
import type { BookFormState, FormErrors } from './type';
import type { Dispatch, SetStateAction } from 'react';

interface BookCoverFieldProps {
  form: BookFormState;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setForm: Dispatch<SetStateAction<BookFormState>>;
}

const inputClass =
  'w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none';

export default function BookCoverField({
  form,
  errors,
  onChange,
  setForm,
}: BookCoverFieldProps) {
  return (
    <FormField id='coverImage' label='Cover Image'>
      <div className='space-y-4 rounded-2xl border-2 border-dashed border-gray-200 p-6'>
        {form.coverImage ? (
          <div className='flex flex-col items-center gap-4'>
            <img
              src={form.coverImage}
              alt='Book Cover'
              className='h-40 w-28 rounded-xl object-cover shadow-sm'
            />

            <button
              type='button'
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  coverImage: '',
                }))
              }
              className='flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2 text-sm text-red-500 transition-colors hover:bg-red-50'
            >
              <Trash2 size={15} />
              Remove Image
            </button>
          </div>
        ) : (
          <div className='space-y-4 animate-in fade-in duration-300'>
            <div className='flex justify-center'>
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100'>
                <ImageIcon size={22} className='text-gray-400' />
              </div>
            </div>

            <input
              id='coverImage'
              name='coverImage'
              value={form.coverImage}
              onChange={onChange}
              placeholder='Paste image URL here'
              className={inputClass}
            />

            <p className='text-center text-xs text-gray-400'>
              JPG, JPEG, PNG or WEBP image URL
            </p>
          </div>
        )}
      </div>

      {errors.coverImage && (
        <p className='text-sm text-red-500'>{errors.coverImage}</p>
      )}
    </FormField>
  );
}
