import type { LoginRequest, LoginResponse } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://pumppro-backend.onrender.com";

class ApiService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${API_URL}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Erreur réseau" }));
      throw new Error(error.error || `Erreur ${response.status}`);
    }

    return response.json();
  }

  // Authentication
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async logout(token: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>("/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    return this.request<LoginResponse>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  }

  // Users (protected endpoints)
  async getUsers(token: string) {
    return this.request("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getUser(userId: string, token: string) {
    return this.request(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const api = new ApiService();
