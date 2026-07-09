interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function FormField({
  label,
  required,
  children,
}: FormFieldProps) {
  return (
    <div className='space-y-2'>
      <label className='text-sm font-bold text-neutral-950'>
        {label}
        {required && <span className='ml-1 text-red-500'>*</span>}
      </label>

      {children}
    </div>
  );
}
