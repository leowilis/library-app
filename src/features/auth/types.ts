// Request Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}

// Response Types
export interface AuthResponse {
  token: string;
  user: User;
}

// Context Types
export interface AuthContextType {
  user: AuthResponse["user"] | null;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
