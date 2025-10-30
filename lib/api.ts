import type { LoginRequest, LoginResponse } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://pumppro-backend.onrender.com";

class ApiService {
  private getStoredToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${API_URL}${endpoint}`;

    // Récupérer le token stocké
    const storedToken = this.getStoredToken();

    // Construire les headers en incluant toujours le token si disponible
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options?.headers,
    };

    // Ajouter le token automatiquement si disponible et pas déjà présent
    const headersObj = headers as Record<string, string>;
    if (storedToken && !headersObj.Authorization) {
      headersObj.Authorization = `${storedToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers: headersObj,
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
        Authorization: `${token}`,
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
        Authorization: `${token}`,
      },
    });
  }

  async getUser(userId: string, token: string) {
    return this.request(`/users/${userId}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }

  async createUser(data: unknown, token: string) {
    return this.request("/users", {
      method: "POST",
      headers: { Authorization: `${token}` },
      body: JSON.stringify(data),
    });
  }

  async updateUser(userId: string, data: unknown, token: string) {
    return this.request(`/users/${userId}`, {
      method: "PUT",
      headers: { Authorization: `${token}` },
      body: JSON.stringify(data),
    });
  }

  async deleteUser(userId: string, token: string) {
    return this.request(`/users/${userId}`, {
      method: "DELETE",
      headers: { Authorization: `${token}` },
    });
  }

  async getUserStats(userId: string, period: string, token: string) {
    return this.request(`/users/${userId}/stats/${period}`, {
      headers: { Authorization: `${token}` },
    });
  }

  async getUserCharts(userId: string, period: string, token: string) {
    return this.request(`/users/${userId}/charts/${period}`, {
      headers: { Authorization: `${token}` },
    });
  }

  async getUserWorkouts(userId: string, token: string) {
    return this.request(`/users/${userId}/workouts`, {
      headers: { Authorization: `${token}` },
    });
  }

  async getUserChallenges(userId: string, token: string) {
    return this.request(`/users/${userId}/challenges`, {
      headers: { Authorization: `${token}` },
    });
  }

  // Challenges
  async getChallenges(token: string) {
    return this.request("/challenges", {
      headers: { Authorization: `${token}` },
    });
  }

  async getChallenge(id: string, token: string) {
    return this.request(`/challenges/${id}`, {
      headers: { Authorization: `${token}` },
    });
  }

  async createChallenge(data: unknown, token: string) {
    return this.request("/challenges", {
      method: "POST",
      headers: { Authorization: `${token}` },
      body: JSON.stringify(data),
    });
  }

  async updateChallenge(id: string, data: unknown, token: string) {
    return this.request(`/challenges/${id}`, {
      method: "PUT",
      headers: { Authorization: `${token}` },
      body: JSON.stringify(data),
    });
  }

  async deleteChallenge(id: string, token: string) {
    return this.request(`/challenges/${id}`, {
      method: "DELETE",
      headers: { Authorization: `${token}` },
    });
  }

  async getChallengeLeaderboard(challengeId: string, token: string) {
    return this.request(`/challenges/${challengeId}/leaderboard`, {
      headers: { Authorization: `${token}` },
    });
  }

  // Programs
  async getPrograms(token: string) {
    return this.request("/programs", {
      headers: { Authorization: `${token}` },
    });
  }

  async getProgram(id: string, token: string) {
    return this.request(`/programs/${id}`, {
      headers: { Authorization: `${token}` },
    });
  }

  async createProgram(data: unknown, token: string) {
    return this.request("/programs", {
      method: "POST",
      headers: { Authorization: `${token}` },
      body: JSON.stringify(data),
    });
  }

  async updateProgram(id: string, data: unknown, token: string) {
    return this.request(`/programs/${id}`, {
      method: "PUT",
      headers: { Authorization: `${token}` },
      body: JSON.stringify(data),
    });
  }

  async deleteProgram(id: string, token: string) {
    return this.request(`/programs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `${token}` },
    });
  }

  async getFeaturedPrograms(token: string) {
    return this.request("/programs/featured", {
      headers: { Authorization: `${token}` },
    });
  }

  async getPopularPrograms(token: string) {
    return this.request("/programs/popular", {
      headers: { Authorization: `${token}` },
    });
  }

  // Workouts
  async getWorkouts(token: string) {
    return this.request("/workouts", {
      headers: { Authorization: `${token}` },
    });
  }

  async getWorkout(id: string, token: string) {
    return this.request(`/workouts/${id}`, {
      headers: { Authorization: `${token}` },
    });
  }

  async createWorkout(data: unknown, token: string) {
    return this.request("/workouts", {
      method: "POST",
      headers: { Authorization: `${token}` },
      body: JSON.stringify(data),
    });
  }

  async updateWorkout(id: string, data: unknown, token: string) {
    return this.request(`/workouts/${id}`, {
      method: "PATCH",
      headers: { Authorization: `${token}` },
      body: JSON.stringify(data),
    });
  }

  async deleteWorkout(id: string, token: string) {
    return this.request(`/workouts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `${token}` },
    });
  }

  // Leaderboard
  async getLeaderboard(period?: string, limit?: number, token?: string) {
    const params = new URLSearchParams();
    if (period) params.append("period", period);
    if (limit) params.append("limit", limit.toString());
    return this.request(`/leaderboard?${params}`, {
      headers: token ? { Authorization: `${token}` } : {},
    });
  }

  async getLeaderboardTop(period?: string, token?: string) {
    const params = new URLSearchParams();
    if (period) params.append("period", period);
    return this.request(`/leaderboard/top?${params}`, {
      headers: token ? { Authorization: `${token}` } : {},
    });
  }

  // Photos
  async getPhotos(token?: string) {
    return this.request("/admin/photos", {
      headers: token ? { Authorization: `${token}` } : {},
    });
  }

  // Health
  async healthCheck() {
    return this.request("/health");
  }
}

export const api = new ApiService();
