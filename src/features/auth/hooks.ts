import type { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import type { LoginRequest, RegisterRequest } from "./types";
import { loginApi, registerApi } from "./api";
import { logout, setCredentials } from "./authSlice";

// Base hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);

// Auth hooks
export const useAuth = () => {
  return useAppSelector((state) => state.auth);
};

export const useLogin = () => {
  const dispatch = useAppDispatch();

  return async (data: LoginRequest, rememberMe: boolean = false) => {
    const response = await loginApi(data);

    // Save token in localStorage or sessionStorage based on rememberMe
    if (rememberMe) {
      localStorage.setItem("auth_token", response.token);
    } else {
      sessionStorage.setItem("auth_token", response.token);
    }

    dispatch(setCredentials({ user: response.user, token: response.token }));
    return response;
  };
};

export const useRegister = () => {
  const dispatch = useAppDispatch();

  return async (data: RegisterRequest) => {
    const response = await registerApi(data);

    // Save token in sessionStorage by default
    sessionStorage.setItem("auth_token", response.token);
    dispatch(setCredentials({ user: response.user, token: response.token }));
    return response;
  };
};

export const useLogout = () => {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(logout());
  };
};
