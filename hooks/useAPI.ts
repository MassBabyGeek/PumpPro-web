"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<unknown | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    }
  };

  return { token, user, logout };
}

export function useUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await api.getUsers(token) as { success?: boolean; data?: unknown[] };
      // Handle backend response format
      if (response && typeof response === 'object' && 'data' in response) {
        setUsers(Array.isArray(response.data) ? response.data : []);
      } else if (Array.isArray(response)) {
        setUsers(response);
      } else {
        setUsers([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  return { users, loading, error, refetch: fetchUsers };
}

export function useChallenges() {
  const { token } = useAuth();
  const [challenges, setChallenges] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChallenges = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await api.getChallenges(token) as { success?: boolean; data?: unknown[] };
      if (response && typeof response === 'object' && 'data' in response) {
        setChallenges(Array.isArray(response.data) ? response.data : []);
      } else if (Array.isArray(response)) {
        setChallenges(response);
      } else {
        setChallenges([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
      setChallenges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, [token]);

  return { challenges, loading, error, refetch: fetchChallenges };
}

export function usePrograms() {
  const { token } = useAuth();
  const [programs, setPrograms] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await api.getPrograms(token) as { success?: boolean; data?: unknown[] };
      if (response && typeof response === 'object' && 'data' in response) {
        setPrograms(Array.isArray(response.data) ? response.data : []);
      } else if (Array.isArray(response)) {
        setPrograms(response);
      } else {
        setPrograms([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
      setPrograms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, [token]);

  return { programs, loading, error, refetch: fetchPrograms };
}

export function useWorkouts() {
  const { token } = useAuth();
  const [workouts, setWorkouts] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkouts = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await api.getWorkouts(token) as { success?: boolean; data?: unknown[] };
      if (response && typeof response === 'object' && 'data' in response) {
        setWorkouts(Array.isArray(response.data) ? response.data : []);
      } else if (Array.isArray(response)) {
        setWorkouts(response);
      } else {
        setWorkouts([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
      setWorkouts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [token]);

  return { workouts, loading, error, refetch: fetchWorkouts };
}

export function useLeaderboard(period = "weekly") {
  const { token } = useAuth();
  const [leaderboard, setLeaderboard] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const response = await api.getLeaderboard(period, 10, token || undefined) as { success?: boolean; data?: unknown[] };
      if (response && typeof response === 'object' && 'data' in response) {
        setLeaderboard(Array.isArray(response.data) ? response.data : []);
      } else if (Array.isArray(response)) {
        setLeaderboard(response);
      } else {
        setLeaderboard([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [period, token]);

  return { leaderboard, loading, error, refetch: fetchLeaderboard };
}
