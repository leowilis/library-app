import { useMutation } from "@tanstack/react-query";
import type { LoginPayload, LoginResponse } from "./types";
import type { AxiosError } from "axios";
import { loginUser } from "./api";
import { toast } from "react-hot-toast";

interface ApiError {
  message?: string;
}

export function useLogin() {
  return useMutation<LoginResponse, AxiosError<ApiError>, LoginPayload>({
    mutationFn: (payload) => loginUser(payload),

    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem("token", data.data.token);
      toast.success("Login successful!");
    },

    onError: (error) => {
      const message =
        error.response?.data?.message ??
        error.message ??
        "Failed to login. Please try again.";

      toast.error(message);
    },
  });
}
