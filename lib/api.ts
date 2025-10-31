import type { LoginRequest, LoginResponse } from "@/types/api";
import type {
  UserProfile,
  Challenge,
  WorkoutProgram,
  WorkoutSession,
  LeaderboardEntry,
  Stats,
  Photo,
  AuthResponse,
  AdminDashboardStats,
  AdminActivity,
  SystemHealth,
  TopContent,
  AnalyticsData,
  PaginationParams,
  PaginatedResponse,
  AdminUserListItem,
  BugReport,
  BugReportStats,
} from "@/types/models";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://pumppro-backend.onrender.com";

// Backend response wrapper
interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

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
      console.log(`[API] ${options?.method || 'GET'} ${url}`);

      const response = await fetch(url, {
        ...options,
        headers,
        mode: "cors",
        credentials: "omit",
      });

      console.log(`[API] Response ${response.status}:`, response.statusText);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: "Erreur réseau" })) as APIResponse;
        console.error(`[API] Error ${response.status}:`, error);
        throw new Error(error.error || `Erreur ${response.status}`);
      }

      const result = await response.json() as APIResponse<T>;
      console.log(`[API] Success:`, result);

      // Le backend envoie { success: true, data: {...} }
      // On retourne data directement
      if (result.success && result.data !== undefined) {
        return result.data;
      }

      // Si pas de wrapper, retourner tel quel
      return result as unknown as T;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        console.error('[API] CORS ou connexion réseau échouée:', {
          url,
          method: options?.method || 'GET',
          error: error.message
        });
        throw new Error('Impossible de se connecter au serveur. Vérifiez votre connexion ou les paramètres CORS.');
      }
      console.error("API Error:", error);
      throw error;
    }
  }

  // Authentication
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async logout(): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>("/auth/logout", {
      method: "POST",
    });
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });
  }

  // Users
  async getUsers(): Promise<UserProfile[]> {
    return this.request<UserProfile[]>("/users");
  }

  async getUser(userId: string): Promise<UserProfile> {
    return this.request<UserProfile>(`/users/${userId}`);
  }

  async createUser(data: Partial<UserProfile>): Promise<UserProfile> {
    return this.request<UserProfile>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateUser(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
    return this.request<UserProfile>(`/admin/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteUser(userId: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/admin/users/${userId}`, {
      method: "DELETE",
    });
  }

  async getUserStats(userId: string, period: string): Promise<Stats> {
    return this.request<Stats>(`/users/${userId}/stats/${period}`);
  }

  async getUserCharts(userId: string, period: string): Promise<any> {
    return this.request(`/users/${userId}/charts/${period}`);
  }

  async getUserWorkouts(userId: string): Promise<WorkoutSession[]> {
    return this.request<WorkoutSession[]>(`/users/${userId}/workouts`);
  }

  async getUserChallenges(userId: string): Promise<Challenge[]> {
    return this.request<Challenge[]>(`/users/${userId}/challenges`);
  }

  // Challenges
  async getChallenges(): Promise<Challenge[]> {
    return this.request<Challenge[]>("/challenges");
  }

  async getChallenge(id: string): Promise<Challenge> {
    return this.request<Challenge>(`/challenges/${id}`);
  }

  async createChallenge(data: Partial<Challenge>): Promise<Challenge> {
    return this.request<Challenge>("/challenges", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateChallenge(id: string, data: Partial<Challenge>): Promise<Challenge> {
    return this.request<Challenge>(`/challenges/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteChallenge(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/challenges/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ deletedBy: "admin" }),
    });
  }

  async getChallengeLeaderboard(challengeId: string): Promise<LeaderboardEntry[]> {
    return this.request<LeaderboardEntry[]>(`/challenges/${challengeId}/leaderboard`);
  }

  // Programs
  async getPrograms(): Promise<WorkoutProgram[]> {
    return this.request<WorkoutProgram[]>("/programs");
  }

  async getProgram(id: string): Promise<WorkoutProgram> {
    return this.request<WorkoutProgram>(`/programs/${id}`);
  }

  async createProgram(data: Partial<WorkoutProgram>): Promise<WorkoutProgram> {
    return this.request<WorkoutProgram>("/programs", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateProgram(id: string, data: Partial<WorkoutProgram>): Promise<WorkoutProgram> {
    return this.request<WorkoutProgram>(`/programs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteProgram(id: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/programs/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ deletedBy: "admin" }),
    });
  }

  async getFeaturedPrograms(): Promise<WorkoutProgram[]> {
    return this.request<WorkoutProgram[]>("/programs/featured");
  }

  async getPopularPrograms(): Promise<WorkoutProgram[]> {
    return this.request<WorkoutProgram[]>("/programs/popular");
  }

  // Workouts
  async getWorkouts(): Promise<WorkoutSession[]> {
    return this.request<WorkoutSession[]>("/workouts");
  }

  async getWorkout(id: string): Promise<WorkoutSession> {
    return this.request<WorkoutSession>(`/workouts/${id}`);
  }

  async createWorkout(data: Partial<WorkoutSession>): Promise<WorkoutSession> {
    return this.request<WorkoutSession>("/workouts", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateWorkout(id: string, data: Partial<WorkoutSession>): Promise<WorkoutSession> {
    return this.request<WorkoutSession>(`/workouts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  async deleteWorkout(id: string): Promise<{ success: boolean }> {
    return this.request<{ success: boolean }>(`/workouts/${id}`, {
      method: "DELETE",
    });
  }

  // Leaderboard
  async getLeaderboard(period?: string, limit?: number): Promise<LeaderboardEntry[]> {
    const params = new URLSearchParams();
    if (period) params.append("period", period);
    if (limit) params.append("limit", limit.toString());
    const query = params.toString();
    return this.request<LeaderboardEntry[]>(`/leaderboard${query ? `?${query}` : ""}`);
  }

  async getLeaderboardTop(period?: string): Promise<LeaderboardEntry[]> {
    const params = new URLSearchParams();
    if (period) params.append("period", period);
    const query = params.toString();
    return this.request<LeaderboardEntry[]>(`/leaderboard/top${query ? `?${query}` : ""}`);
  }

  // Admin - Dashboard
  async getAdminDashboard(): Promise<AdminDashboardStats> {
    return this.request<AdminDashboardStats>("/admin/dashboard");
  }

  // Admin - Activity
  async getAdminActivity(params?: { limit?: number }): Promise<AdminActivity[]> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    const query = queryParams.toString();
    return this.request<AdminActivity[]>(`/admin/activity${query ? `?${query}` : ""}`);
  }

  // Admin - System Health
  async getAdminHealth(): Promise<SystemHealth> {
    return this.request<SystemHealth>("/admin/health");
  }

  // Admin - Top Content
  async getAdminTopContent(): Promise<TopContent> {
    return this.request<TopContent>("/admin/top-content");
  }

  // Admin - Analytics
  async getAdminAnalytics(params?: { period?: "7d" | "30d" | "90d" | "1y" }): Promise<AnalyticsData> {
    const queryParams = new URLSearchParams();
    if (params?.period) queryParams.append("period", params.period);
    const query = queryParams.toString();
    return this.request<AnalyticsData>(`/admin/analytics${query ? `?${query}` : ""}`);
  }

  // Admin - Users Management
  async getAdminUsers(params?: PaginationParams): Promise<PaginatedResponse<AdminUserListItem>> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.offset) queryParams.append("offset", params.offset.toString());
    if (params?.search) queryParams.append("search", params.search);
    if (params?.sort) queryParams.append("sort", params.sort);
    const query = queryParams.toString();
    return this.request<PaginatedResponse<AdminUserListItem>>(`/admin/users${query ? `?${query}` : ""}`);
  }

  // Admin - User Actions
  async promoteUserToAdmin(userId: string): Promise<{ success: boolean; user: UserProfile }> {
    return this.request<{ success: boolean; user: UserProfile }>(`/admin/users/${userId}/promote`, {
      method: "POST",
    });
  }

  async demoteUserFromAdmin(userId: string): Promise<{ success: boolean; user: UserProfile }> {
    return this.request<{ success: boolean; user: UserProfile }>(`/admin/users/${userId}/demote`, {
      method: "POST",
    });
  }

  async deleteAdminUser(userId: string): Promise<{ success: boolean; message: string }> {
    return this.request<{ success: boolean; message: string }>(`/admin/users/${userId}`, {
      method: "DELETE",
    });
  }

  // Bug Reports (Admin routes)
  async getAdminBugReports(params?: {
    status?: string;
    category?: string;
    severity?: string;
    search?: string;
    sort?: string;
    order?: string;
    limit?: number;
    offset?: number;
  }): Promise<BugReport[]> {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append("status", params.status);
    if (params?.category) queryParams.append("category", params.category);
    if (params?.severity) queryParams.append("severity", params.severity);
    if (params?.search) queryParams.append("search", params.search);
    if (params?.sort) queryParams.append("sort", params.sort);
    if (params?.order) queryParams.append("order", params.order);
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.offset) queryParams.append("offset", params.offset.toString());
    const query = queryParams.toString();
    const response = await this.request<{ reports: BugReport[]; pagination: any; filters: any }>(`/admin/bug-reports${query ? `?${query}` : ""}`);
    // Extract reports array from nested response structure
    return response.reports || [];
  }

  async resolveBugReport(reportId: string, adminNotes?: string): Promise<BugReport> {
    return this.request<BugReport>(`/admin/bug-reports/${reportId}/resolve`, {
      method: "POST",
      body: JSON.stringify({ adminNotes: adminNotes || "" }),
    });
  }

  async assignBugReport(reportId: string, adminId: string, notes?: string): Promise<BugReport> {
    return this.request<BugReport>(`/admin/bug-reports/${reportId}/assign`, {
      method: "POST",
      body: JSON.stringify({ adminId, notes: notes || "" }),
    });
  }

  // Admin - Photos Management
  async getAdminPhotos(params?: {
    type?: "all" | "avatar" | "challenge" | "bug_report";
    limit?: number;
    offset?: number;
  }): Promise<Photo[]> {
    const queryParams = new URLSearchParams();
    if (params?.type) queryParams.append("type", params.type);
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.offset) queryParams.append("offset", params.offset.toString());
    const query = queryParams.toString();
    const response = await this.request<{ photos: Photo[]; pagination: any }>(`/admin/photos${query ? `?${query}` : ""}`);
    // Extract photos array from nested response structure
    return response.photos || [];
  }

  async deleteAdminPhoto(entityId: string, type: "avatar" | "challenge" | "bug_report"): Promise<void> {
    return this.request<void>(`/admin/photos/${entityId}?type=${type}`, {
      method: "DELETE",
    });
  }

  // Legacy Photos endpoint (for backward compatibility)
  async getPhotos(): Promise<Photo[]> {
    return this.getAdminPhotos();
  }

  // Health
  async healthCheck(): Promise<{ status: string }> {
    return this.request<{ status: string }>("/health");
  }
}

export const api = new ApiService();
