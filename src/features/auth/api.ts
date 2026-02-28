import { api } from "@/lib/api";
import type { LoginPayload, LoginResponse } from "./types";

export async function loginUser(payload: LoginPayload) {
  const res = await api.post<LoginResponse>("/api/auth/login", payload);
  return res.data;
}
