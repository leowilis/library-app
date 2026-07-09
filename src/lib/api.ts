import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

import { ROUTES } from '@/constants';
import { store } from '@/store';
import { logout } from '@/store/authSlice';

/**
 * Axios instance configured with the API base URL.
 * Automatically attaches the access token and handles expired sessions globally.
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor — injects Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    const status = error.response?.status;
    const isUnauthorized = status === 401 || status === 403;

    if (isUnauthorized) {
      const { auth } = store.getState();

      if (auth.token) {
        store.dispatch(logout());

        toast.error('Your session has expired. Please login again.');

        window.location.replace(ROUTES.Login);
      }
    }

    return Promise.reject(error);
  },
);
