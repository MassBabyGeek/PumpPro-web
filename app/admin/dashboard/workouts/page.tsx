"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { useWorkouts } from "@/hooks/useAPI";
import { api } from "@/lib/api";
import { UserCreator, WorkoutSession } from "@/types/models";

export default function WorkoutsPage() {
  const { workouts, loading, refetch } = useWorkouts();

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "reps" | "duration">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [completedFilter, setCompletedFilter] = useState<"all" | "true" | "false">("all");

  // Filter and sort workouts
  const filteredWorkouts = Array.isArray(workouts) ? (workouts as Array<WorkoutSession>).filter((workout) => {
    const user = workout.user as unknown as UserCreator;
    const matchesSearch = searchQuery === "" ||
      user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workout.sessionId?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCompleted = completedFilter === "all" ||
      (completedFilter === "true" && workout.completed) ||
      (completedFilter === "false" && !workout.completed);

    return matchesSearch && matchesCompleted;
  }).sort((a, b) => {
    let comparison = 0;

    if (sortBy === "reps") {
      comparison = (a.totalReps || 0) - (b.totalReps || 0);
    } else if (sortBy === "duration") {
      comparison = (a.totalDuration || 0) - (b.totalDuration || 0);
    } else if (sortBy === "date") {
      comparison = new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
    }

    return sortOrder === "asc" ? comparison : -comparison;
  }) : [];

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce workout ?")) return;
    try {
      await api.deleteWorkout(id);
      refetch();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur");
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#F4F4F4]">Workouts</h2>
          <p className="text-[#B0B3B8] text-sm">Toutes les sessions d entraînement</p>
        </div>

        {/* Filters */}
        <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Recherche</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nom utilisateur ou ID..."
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Complété</label>
              <select
                value={completedFilter}
                onChange={(e) => setCompletedFilter(e.target.value as "all" | "true" | "false")}
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              >
                <option value="all">Tous</option>
                <option value="true">Oui</option>
                <option value="false">Non</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Trier par</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "reps" | "duration")}
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              >
                <option value="date">Date</option>
                <option value="reps">Répétitions</option>
                <option value="duration">Durée</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Ordre</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              >
                <option value="desc">Décroissant</option>
                <option value="asc">Croissant</option>
              </select>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <p className="text-[#B0B3B8]">
              {filteredWorkouts.length} workout{filteredWorkouts.length > 1 ? 's' : ''} trouvé{filteredWorkouts.length > 1 ? 's' : ''}
            </p>
            {(searchQuery || completedFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCompletedFilter("all");
                }}
                className="text-[#00BFFF] hover:text-[#00BFFF]/80"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-[#B0B3B8] text-center py-12">Chargement...</div>
        ) : (
          <div className="bg-[#2C2F38] rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1B1F3B]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#B0B3B8] uppercase">Utilisateur</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#B0B3B8] uppercase">Complété</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#B0B3B8] uppercase">Repetitions</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#B0B3B8] uppercase">Duree</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#B0B3B8] uppercase">Date</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-[#B0B3B8] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredWorkouts.length > 0 ? (
                    filteredWorkouts.map((workoutSession) => {
                      const workoutId = workoutSession.sessionId
                      const user = workoutSession.user as unknown as UserCreator;
                      const userId = user?.id;
                      return (
                        <tr key={workoutId} className="hover:bg-[#1B1F3B]/50">
                          <td className="px-4 py-3">
                            {userId ? (
                              <Link href={`/admin/dashboard/users/${userId}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                {user?.avatar ? (
                                  <Image
                                    src={String(user.avatar)}
                                    alt={String(user.name ||  "User")}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 rounded-full object-cover border border-white/10"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] flex items-center justify-center text-white text-xs font-semibold">
                                    {user?.name ? String(user.name).charAt(0).toUpperCase() : "?"}
                                  </div>
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="text-[#F4F4F4] text-sm font-medium truncate">
                                    {user?.name || "Utilisateur inconnu"}
                                  </p>
                                </div>
                              </Link>
                            ) : (
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] flex items-center justify-center text-white text-xs font-semibold">
                                  ?
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[#F4F4F4] text-sm font-medium truncate">
                                    Utilisateur inconnu
                                  </p>
                                </div>
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-[#F4F4F4]">{workoutSession.completed ? "Terminé" : "Abandonné"}</td>
                          <td className="px-4 py-3 text-sm text-[#00BFFF] font-semibold">
                            {workoutSession.totalReps ||  "0"}
                          </td>
                          <td className="px-4 py-3 text-sm text-[#B0B3B8]">
                            {workoutSession.totalDuration ? `${Math.floor(workoutSession.totalDuration / 60)}min ${workoutSession.totalDuration % 60}s` : "N/A"}
                          </td>
                          <td className="px-4 py-3 text-sm text-[#B0B3B8]">
                            {workoutSession.createdAt ? new Date(workoutSession.createdAt).toLocaleDateString() : "N/A"}
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            <button
                              onClick={() => handleDelete(workoutId)}
                              className="text-red-400 hover:text-red-400/80"
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-[#B0B3B8]">
                        Aucun workout
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
