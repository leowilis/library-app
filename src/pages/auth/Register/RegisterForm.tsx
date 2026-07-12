import { Link } from 'react-router-dom';

import { ROUTES } from '@/constants';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import PasswordField from './PasswordField';

interface RegisterFormState {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  form: RegisterFormState;
  isPending: boolean;
  showPassword: boolean;
  showConfirm: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onTogglePassword: () => void;
  onToggleConfirm: () => void;
}

export default function RegisterForm({
  form,
  isPending,
  showPassword,
  showConfirm,
  onChange,
  onSubmit,
  onTogglePassword,
  onToggleConfirm,
}: RegisterFormProps) {
  return (
    <>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        {/* Name */}
        <div className='flex flex-col gap-1'>
          <Label htmlFor='name' className='text-sm font-bold'>
            Name
          </Label>

          <Input
            id='name'
            name='name'
            value={form.name}
            onChange={onChange}
            required
            className='rounded-xl border border-gray-300 px-3 py-5 text-sm focus:border-blue-500'
          />
        </div>

        {/* Email */}
        <div className='flex flex-col gap-1'>
          <Label htmlFor='email' className='text-sm font-bold'>
            Email
          </Label>

          <Input
            id='email'
            name='email'
            type='email'
            value={form.email}
            onChange={onChange}
            required
            className='rounded-xl border border-gray-300 px-3 py-5 text-sm focus:border-blue-500'
          />
        </div>

        {/* Phone */}
        <div className='flex flex-col gap-1'>
          <Label htmlFor='phone' className='text-sm font-bold'>
            Nomor Handphone
          </Label>

          <Input
            id='phone'
            name='phone'
            type='tel'
            value={form.phone}
            onChange={onChange}
            required
            className='rounded-xl border border-gray-300 px-3 py-5 text-sm focus:border-blue-500'
          />
        </div>

        <PasswordField
          id='password'
          name='password'
          label='Password'
          value={form.password}
          show={showPassword}
          onChange={onChange}
          onToggle={onTogglePassword}
        />

        <PasswordField
          id='confirmPassword'
          name='confirmPassword'
          label='Confirm Password'
          value={form.confirmPassword}
          show={showConfirm}
          onChange={onChange}
          onToggle={onToggleConfirm}
        />

        <Button
          type='submit'
          disabled={isPending}
          size='xl'
          className='w-full rounded-full bg-primary-300 text-white hover:bg-primary-500'
        >
          {isPending ? 'Loading...' : 'Submit'}
        </Button>
      </form>

      <p className='mt-6 text-center text-sm text-neutral-950'>
        Already have an account?{' '}
        <Link to={ROUTES.Login} className='font-medium text-blue-600'>
          Log in
        </Link>
      </p>
    </>
  );
}
