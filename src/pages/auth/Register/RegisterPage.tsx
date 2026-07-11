import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';

import { toast } from 'sonner';

import { ROUTES } from '@/constants';
import { useRegister } from '@/hooks/useAuth';

import RegisterHeader from './RegisterHeader';
import RegisterForm from './RegisterForm';

interface RegisterFormState {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const INITIAL_FORM: RegisterFormState = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

/**
 * Registration page.
 *
 * Handles:
 * - form state
 * - validation
 * - register mutation
 * - redirect after success
 */
export default function RegisterPage() {
  const navigate = useNavigate();

  const { mutate: register, isPending } = useRegister();

  const [form, setForm] = useState(INITIAL_FORM);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (form.phone.length < 8 || form.phone.length > 20) {
      toast.error('Phone must be 8–20 characters');
      return;
    }

    register(
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      },
      {
        onSuccess: () => {
          toast.success('Account created successfully! Please log in.');

          navigate(ROUTES.Login);
        },

        onError: (
          error: AxiosError<{
            message?: string;
          }>,
        ) => {
          toast.error(
            error.response?.data?.message ??
              'Failed to create account. Please try again.',
          );
        },
      },
    );
  }

  return (
    <div className='flex items-center justify-center px-6 py-20'>
      <div className='w-full max-w-md'>
        <RegisterHeader />

        <RegisterForm
          form={form}
          isPending={isPending}
          showPassword={showPassword}
          showConfirm={showConfirm}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onTogglePassword={() => setShowPassword((prev) => !prev)}
          onToggleConfirm={() => setShowConfirm((prev) => !prev)}
        />
      </div>
    </div>
  );
}
