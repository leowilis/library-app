import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL as string | undefined;
const sanitizedBaseURL = baseURL ? baseURL.replace(/\/+$/, "") : "";

export const API_BASE_URL = sanitizedBaseURL;

export const api = axios.create({
  baseURL: sanitizedBaseURL,
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
