import FormField from './FormField';
import type { BookFormState, FormErrors } from './type';

interface BookDescriptionFieldProps {
  form: BookFormState;
  errors: FormErrors;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const inputClass =
  'w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none';

export default function BookDescriptionField({
  form,
  errors,
  onChange,
}: BookDescriptionFieldProps) {
  return (
    <FormField id='description' label='Description' required>
      <textarea
        name='description'
        rows={5}
        value={form.description}
        onChange={onChange}
        placeholder='Enter book description'
        className={`${inputClass} resize-none`}
      />

      {errors.description && (
        <p className='text-sm text-red-500'>{errors.description}</p>
      )}
    </FormField>
  );
}
