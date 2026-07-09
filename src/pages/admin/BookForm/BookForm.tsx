
import BookBasicFields from './BookBasicFields';
import BookDescriptionField from './BookDescriptionField';
import BookCoverField from './BookCoverField';
import BookSubmitButton from './BookSubmitButton';
import { useBookForm } from './useBookForm';
import BookHeader from './BookHeader';

export default function BookForm() {
  const {
    form,
    errors,
    categories,
    isEdit,
    isPending,
    setForm,
    handleChange,
    handleSubmit,
    goBack,
  } = useBookForm();

  return (
    <section className='max-w-2xl space-y-6 pb-10' aria-labelledby='admin-book-form-title'>
      <BookHeader isEdit={isEdit} onBack={goBack} />

      <form
        onSubmit={handleSubmit}
        className='space-y-6 rounded-3xl border bg-white p-8 shadow-sm'
      >
        <BookBasicFields
          form={form}
          errors={errors}
          categories={categories}
          onChange={handleChange}
        />

        <BookDescriptionField
          form={form}
          errors={errors}
          onChange={handleChange}
        />

        <BookCoverField
          form={form}
          errors={errors}
          onChange={handleChange}
          setForm={setForm}
        />

        <BookSubmitButton loading={isPending} isEdit={isEdit} />
      </form>
    </section>
  );
}
