import axios from 'axios';

/**
 * Axios instance configured with the API base URL from environment variables
 * Automatically attaches a Bearer token to every request
 * if one exists in localStorage
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor — injects Authorization header if token exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
