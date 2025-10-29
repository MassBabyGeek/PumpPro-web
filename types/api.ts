export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  age?: number;
  weight?: number;
  height?: number;
  goal?: string;
  score: number;
  provider?: "email" | "google" | "apple";
  joinDate: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ApiError {
  error: string;
  message?: string;
}
