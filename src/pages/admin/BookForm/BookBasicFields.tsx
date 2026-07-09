import type { Category } from '@/types/category';
import type { BookFormState, FormErrors } from './type';
import FormField from './FormField';

interface BookBasicFieldsProps {
  form: BookFormState;
  errors: FormErrors;
  categories: Category[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const inputClass =
  'w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none';

export default function BookBasicFields({
  form,
  errors,
  categories,
  onChange,
}: BookBasicFieldsProps) {
  return (
    <>
      <FormField id='title' label='Title' required>
          <input
            name='title'
            value={form.title}
            onChange={onChange}
            placeholder='Enter book title'
            className={inputClass}
          />

          {errors.title && (
            <p className='text-sm text-red-500'>{errors.title}</p>
          )}
      </FormField>

      <FormField id='authorName' label='Author' required>
          <input
            name='authorName'
            value={form.authorName}
            onChange={onChange}
            placeholder='Enter author name'
            className={inputClass}
          />

          {errors.authorName && (
            <p className='text-sm text-red-500'>{errors.authorName}</p>
          )}
      </FormField>

      <FormField id='categoryId' label='Category' required>
          <div className='relative'>
            <select
              name='categoryId'
              value={form.categoryId}
              onChange={onChange}
              className={`${inputClass} appearance-none pr-10`}
            >
              <option value=''>Select category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <svg
              className='pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>

          {errors.categoryId && (
            <p className='text-sm text-red-500'>{errors.categoryId}</p>
          )}
      </FormField>

      <FormField id='numberPages' label='Number of Pages' required>
          <input
            type='number'
            name='totalPages'
            min={1}
            value={form.totalPages}
            onChange={onChange}
            placeholder='e.g. 320'
            className={inputClass}
          />

          {errors.totalPages && (
            <p className='text-sm text-red-500'>{errors.totalPages}</p>
          )}
      </FormField>
    </>
  );
}
