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

    // Construire les headers avec CORS
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };

    // Ajouter le token automatiquement si disponible
    if (storedToken) {
      headers.Authorization = storedToken;
    }

    // Merger avec les headers fournis (si fournis, ils écrasent les auto-générés)
    if (options?.headers) {
      Object.assign(headers, options.headers);
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        mode: "cors", // Explicitement activer CORS
        credentials: "omit", // Ne pas envoyer de credentials par défaut
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Erreur réseau" }));
        throw new Error(error.error || `Erreur ${response.status}`);
      }

      const data = await response.json();

      // Auto-unwrap .data si présent
      return (data?.data !== undefined ? data.data : data) as T;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Authentication
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async logout(): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>("/auth/logout", {
      method: "POST",
    });
  }

  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    return this.request<LoginResponse>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  }

  // Users
  async getUsers() {
    return this.request("/users");
  }

  async getUser(userId: string) {
    return this.request(`/users/${userId}`);
  }

  async createUser(data: unknown) {
    return this.request("/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateUser(userId: string, data: unknown) {
    return this.request(`/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteUser(userId: string) {
    return this.request(`/users/${userId}`, {
      method: "DELETE",
    });
  }

  async getUserStats(userId: string, period: string) {
    return this.request(`/users/${userId}/stats/${period}`);
  }

  async getUserCharts(userId: string, period: string) {
    return this.request(`/users/${userId}/charts/${period}`);
  }

  async getUserWorkouts(userId: string) {
    return this.request(`/users/${userId}/workouts`);
  }

  async getUserChallenges(userId: string) {
    return this.request(`/users/${userId}/challenges`);
  }

  // Challenges
  async getChallenges() {
    return this.request("/challenges");
  }

  async getChallenge(id: string) {
    return this.request(`/challenges/${id}`);
  }

  async createChallenge(data: unknown) {
    return this.request("/challenges", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateChallenge(id: string, data: unknown) {
    return this.request(`/challenges/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteChallenge(id: string) {
    return this.request(`/challenges/${id}`, {
      method: "DELETE",
    });
  }

  async getChallengeLeaderboard(challengeId: string) {
    return this.request(`/challenges/${challengeId}/leaderboard`);
  }

  // Programs
  async getPrograms() {
    return this.request("/programs");
  }

  async getProgram(id: string) {
    return this.request(`/programs/${id}`);
  }

  async createProgram(data: unknown) {
    return this.request("/programs", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateProgram(id: string, data: unknown) {
    return this.request(`/programs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteProgram(id: string) {
    return this.request(`/programs/${id}`, {
      method: "DELETE",
    });
  }

  async getFeaturedPrograms() {
    return this.request("/programs/featured");
  }

  async getPopularPrograms() {
    return this.request("/programs/popular");
  }

  // Workouts
  async getWorkouts() {
    return this.request("/workouts");
  }

  async getWorkout(id: string) {
    return this.request(`/workouts/${id}`);
  }

  async createWorkout(data: unknown) {
    return this.request("/workouts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateWorkout(id: string, data: unknown) {
    return this.request(`/workouts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deleteWorkout(id: string) {
    return this.request(`/workouts/${id}`, {
      method: "DELETE",
    });
  }

  // Leaderboard
  async getLeaderboard(period?: string, limit?: number) {
    const params = new URLSearchParams();
    if (period) params.append("period", period);
    if (limit) params.append("limit", limit.toString());
    const query = params.toString();
    return this.request(`/leaderboard${query ? `?${query}` : ""}`);
  }

  async getLeaderboardTop(period?: string) {
    const params = new URLSearchParams();
    if (period) params.append("period", period);
    const query = params.toString();
    return this.request(`/leaderboard/top${query ? `?${query}` : ""}`);
  }

  // Photos
  async getPhotos() {
    return this.request("/admin/photos");
  }

  // Health
  async healthCheck() {
    return this.request("/health");
  }
}

export const api = new ApiService();
