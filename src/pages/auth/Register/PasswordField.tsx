import EyeOpen from '@/assets/icon/eye.svg';
import EyeOff from '@/assets/icon/eyeclose.svg';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PasswordFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  show: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onToggle: () => void;
}

export default function PasswordField({
  id,
  name,
  label,
  value,
  show,
  onChange,
  onToggle,
}: PasswordFieldProps) {
  return (
    <div className='flex flex-col gap-1'>
      <Label htmlFor={id} className='text-sm font-bold'>
        {label}
      </Label>

      <div className='relative'>
        <Input
          id={id}
          name={name}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          required
          className='w-full rounded-xl border border-gray-300 px-3 py-5 text-sm focus:border-blue-500'
        />

        <button
          type='button'
          onClick={onToggle}
          className='absolute right-3 top-1/2 -translate-y-1/2'
        >
          <img
            src={show ? EyeOff : EyeOpen}
            width={20}
            height={20}
            alt='Toggle password visibility'
          />
        </button>
      </div>
    </div>
  );
}
