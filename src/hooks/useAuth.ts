import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials, logout } from '@/store/authSlice';
import { EndPoints, ROUTES } from '@/constants';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import type { User } from '@/types/user';
import type { AxiosError } from 'axios';

// Types

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

interface AuthResult {
  user: User;
  token: string;
}

// Hooks

/**
 * Handles user login.
 * On success: stores credentials in Redux, redirects based on role.
 */
export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation<AuthResult, Error, LoginPayload>({
    mutationFn: async (credentials) => {
      const res = await api.post<{ data: AuthResult }>(
        EndPoints.Login,
        credentials,
      );
      return res.data.data;
    },
    onSuccess: ({ user, token }) => {
      dispatch(setCredentials({ token, user }));

      if (user.role === 'ADMIN') {
        toast.success('Welcome, Admin!');
        navigate('/admin/dashboard');
      } else {
        toast.success('Welcome back!');
        navigate(ROUTES.Home);
      }
    },
    onError: () => {
      toast.error('Login failed! Wrong email or password.');
    },
  });
};

/**
 * Handles user registration.
 * Caller handles success/error (toast, redirect, etc).
 */
export const useRegister = () => {
  return useMutation<
    AuthResult,
    AxiosError<{ message?: string }>,
    RegisterPayload
  >({
    mutationFn: async (payload) => {
      const res = await api.post<{ data: AuthResult }>(
        EndPoints.Register,
        payload,
      );
      return res.data.data;
    },
  });
};

/**
 * Returns a logout handler that clears Redux state and redirects to login.
 *
 * const logout = useLogout()
 * logout()
 */
export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return () => {
    dispatch(logout());
    navigate(ROUTES.Login);
  };
};
