import { api } from "@/services/axios";
import type { LoginRequest, RegisterRequest, AuthResponse } from "./types";

export const loginApi = async (data: LoginRequest): Promise<AuthResponse> => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

export const registerApi = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const res = await api.post("/api/auth/register", data);
  return res.data;
};
