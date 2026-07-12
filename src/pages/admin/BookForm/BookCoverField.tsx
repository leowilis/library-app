import type { Dispatch, SetStateAction } from 'react';
import { ImageIcon, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import FormField from './FormField';

import type { BookFormChangeHandler, BookFormState, FormErrors } from './type';

interface BookCoverFieldProps {
  form: BookFormState;
  errors: FormErrors;
  onChange: BookFormChangeHandler;
  setForm: Dispatch<SetStateAction<BookFormState>>;
}

export default function BookCoverField({
  form,
  errors,
  onChange,
  setForm,
}: BookCoverFieldProps) {
  return (
    <FormField id='coverImage' label='Cover Image'>
      <div className='space-y-4 rounded-2xl border-2 border-dashed border-border p-6'>
        {form.coverImage ? (
          <div className='flex flex-col items-center gap-4'>
            <img
              src={form.coverImage}
              alt='Book Cover'
              className='h-40 w-28 rounded-xl object-cover shadow-sm'
            />

            <Button
              type='button'
              variant='outline'
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  coverImage: '',
                }))
              }
              className='text-destructive hover:text-destructive'
            >
              <Trash2 className='mr-2 h-4 w-4' />
              Remove Image
            </Button>
          </div>
        ) : (
          <div className='animate-in fade-in space-y-4 duration-300'>
            <div className='flex justify-center'>
              <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-muted'>
                <ImageIcon size={22} className='text-muted-foreground' />
              </div>
            </div>

            <Input
              id='coverImage'
              name='coverImage'
              value={form.coverImage}
              onChange={onChange}
              placeholder='Paste image URL here'
            />

            <p className='text-center text-xs text-muted-foreground'>
              JPG, JPEG, PNG or WEBP image URL
            </p>
          </div>
        )}
      </div>

      {errors.coverImage && (
        <p className='text-sm text-destructive'>{errors.coverImage}</p>
      )}
    </FormField>
  );
}
