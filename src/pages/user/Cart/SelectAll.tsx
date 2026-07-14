import { Checkbox } from '@/components/ui/checkbox';

interface SelectAllProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function SelectAll({ checked, onChange }: SelectAllProps) {
  return (
    <div
      aria-label='Select all books'
      className='flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3'
    >
      {/* Select All */}
      <div className='flex items-center gap-3'>
        <Checkbox
          id='select-all'
          checked={checked}
          onCheckedChange={(value) => onChange(value === true)}
        />

        <label
          htmlFor='select-all'
          className='cursor-pointer text-sm font-medium text-neutral-900'
        >
          Select All
        </label>
      </div>
    </div>
  );
}
