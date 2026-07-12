import type {
  BookFormChangeHandler,
  BookFormState,
  FormErrors,
} from './type';
import type { Category } from '@/types/category';

import FormField from './FormField';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BookBasicFieldsProps {
  form: BookFormState;
  errors: FormErrors;
  categories: Category[];
  onChange: BookFormChangeHandler;
}

export default function BookBasicFields({
  form,
  errors,
  categories,
  onChange,
}: BookBasicFieldsProps) {
  return (
    <>
      {/* Title */}
      <FormField id="title" label="Title" required>
        <Input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Enter book title"
        />

        {errors.title && (
          <p className="text-sm text-destructive">{errors.title}</p>
        )}
      </FormField>

      {/* Author */}
      <FormField id="authorName" label="Author" required>
        <Input
          name="authorName"
          value={form.authorName}
          onChange={onChange}
          placeholder="Enter author name"
        />

        {errors.authorName && (
          <p className="text-sm text-destructive">
            {errors.authorName}
          </p>
        )}
      </FormField>

      {/* Category */}
      <FormField id="categoryId" label="Category" required>
        <Select
          value={form.categoryId ? String(form.categoryId) : ''}
          onValueChange={(value: string) =>
            onChange({
              target: {
                name: 'categoryId',
                value,
              },
            } as React.ChangeEvent<
              HTMLInputElement | HTMLSelectElement
            >)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>

          <SelectContent>
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={String(category.id)}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {errors.categoryId && (
          <p className="text-sm text-destructive">
            {errors.categoryId}
          </p>
        )}
      </FormField>

      {/* Pages */}
      <FormField id="numberPages" label="Number of Pages" required>
        <Input
          type="number"
          min={1}
          name="totalPages"
          value={form.totalPages}
          onChange={onChange}
          placeholder="e.g. 320"
        />

        {errors.totalPages && (
          <p className="text-sm text-destructive">
            {errors.totalPages}
          </p>
        )}
      </FormField>
    </>
  );
}