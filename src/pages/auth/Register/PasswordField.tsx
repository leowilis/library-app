import type { ChangeEventHandler } from 'react';

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
  onChange: ChangeEventHandler<HTMLInputElement>;
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
    <div className='space-y-2'>
      <Label htmlFor={id}>{label}</Label>

      <div className='relative'>
        <Input
          id={id}
          name={name}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          required
          className='h-12 pr-11'
        />

        <button
          type='button'
          aria-label={show ? 'Hide password' : 'Show password'}
          onClick={onToggle}
          className='absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        >
          <img
            src={show ? EyeOff : EyeOpen}
            width={20}
            height={20}
            alt=''
            aria-hidden='true'
          />
        </button>
      </div>
    </div>
  );
}
