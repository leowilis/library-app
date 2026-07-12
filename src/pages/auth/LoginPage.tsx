import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useLogin } from '@/hooks/useAuth';

import Logo from '@/assets/logo/logo.svg';
import EyeOpen from '@/assets/icon/eye.svg';
import EyeOff from '@/assets/icon/eyeclose.svg';

/**
 * Login page for user authentication.
 *
 * Submits email and password via `useLogin`.
 * On success, redirects are handled inside `useLogin`.
 */
export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login({
      email,
      password,
    });
  };

  return (
    <div className='flex min-h-screen items-center justify-center px-6'>
      <div className='w-full max-w-sm'>
        {/* Logo */}
        <div className='mb-5 flex items-center gap-3'>
          <img src={Logo} width={33} height={33} alt='Booky logo' />

          <h1 className='text-2xl font-bold'>Booky</h1>
        </div>

        {/* Heading */}
        <h2 className='mb-2 text-2xl font-bold'>Login</h2>

        <p className='text-sm text-muted-foreground'>
          Sign in to manage your library account.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className='mt-7 flex flex-col gap-6'>
          {/* Email */}
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>

            <Input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='h-12'
            />
          </div>

          {/* Password */}
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>

            <div className='relative'>
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='h-12 pr-11'
              />

              <button
                type='button'
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((prev) => !prev)}
                className='absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              >
                <img
                  src={showPassword ? EyeOff : EyeOpen}
                  width={20}
                  height={20}
                  alt=''
                  aria-hidden='true'
                />
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type='submit'
            size='xl'
            className='w-full rounded-full'
            disabled={isPending}
          >
            {isPending ? 'Loading...' : 'Login'}
          </Button>
        </form>

        {/* Footer */}
        <p className='mt-4 text-center text-sm text-foreground'>
          Don't have an account?{' '}
          <Link
            to='/register'
            className='font-medium text-primary hover:underline'
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
