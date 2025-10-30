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

  async createUser(data: unknown, token: string) {
    return this.request("/users", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  }

  async updateUser(userId: string, data: unknown, token: string) {
    return this.request(`/users/${userId}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  }

  async deleteUser(userId: string, token: string) {
    return this.request(`/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getUserStats(userId: string, period: string, token: string) {
    return this.request(`/users/${userId}/stats/${period}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getUserCharts(userId: string, period: string, token: string) {
    return this.request(`/users/${userId}/charts/${period}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Challenges
  async getChallenges(token: string) {
    return this.request("/challenges", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getChallenge(id: string, token: string) {
    return this.request(`/challenges/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async createChallenge(data: unknown, token: string) {
    return this.request("/challenges", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  }

  async updateChallenge(id: string, data: unknown, token: string) {
    return this.request(`/challenges/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  }

  async deleteChallenge(id: string, token: string) {
    return this.request(`/challenges/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getChallengeLeaderboard(challengeId: string, token: string) {
    return this.request(`/challenges/${challengeId}/leaderboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Programs
  async getPrograms(token: string) {
    return this.request("/programs", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getProgram(id: string, token: string) {
    return this.request(`/programs/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async createProgram(data: unknown, token: string) {
    return this.request("/programs", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  }

  async updateProgram(id: string, data: unknown, token: string) {
    return this.request(`/programs/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  }

  async deleteProgram(id: string, token: string) {
    return this.request(`/programs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getFeaturedPrograms(token: string) {
    return this.request("/programs/featured", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getPopularPrograms(token: string) {
    return this.request("/programs/popular", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Workouts
  async getWorkouts(token: string) {
    return this.request("/workouts", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async getWorkout(id: string, token: string) {
    return this.request(`/workouts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async createWorkout(data: unknown, token: string) {
    return this.request("/workouts", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  }

  async updateWorkout(id: string, data: unknown, token: string) {
    return this.request(`/workouts/${id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  }

  async deleteWorkout(id: string, token: string) {
    return this.request(`/workouts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Leaderboard
  async getLeaderboard(period?: string, limit?: number, token?: string) {
    const params = new URLSearchParams();
    if (period) params.append("period", period);
    if (limit) params.append("limit", limit.toString());
    return this.request(`/leaderboard?${params}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  async getLeaderboardTop(period?: string, token?: string) {
    const params = new URLSearchParams();
    if (period) params.append("period", period);
    return this.request(`/leaderboard/top?${params}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }

  // Health
  async healthCheck() {
    return this.request("/health");
  }
}

export const api = new ApiService();
