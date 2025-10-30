"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { useWorkouts, useAuth } from "@/hooks/useAPI";
import { api } from "@/lib/api";

export default function WorkoutsPage() {
  const { workouts, loading, refetch } = useWorkouts();
  const { token } = useAuth();

  const handleDelete = async (id: string) => {
    if (!token || !confirm("Supprimer ce workout ?")) return;
    try {
      await api.deleteWorkout(id, token);
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

        {loading ? (
          <div className="text-[#B0B3B8] text-center py-12">Chargement...</div>
        ) : (
          <div className="bg-[#2C2F38] rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1B1F3B]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#B0B3B8] uppercase">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#B0B3B8] uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#B0B3B8] uppercase">Repetitions</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#B0B3B8] uppercase">Date</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-[#B0B3B8] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {Array.isArray(workouts) && workouts.length > 0 ? (
                    (workouts as Array<Record<string, string>>).map((item) => (
                      <tr key={item.id} className="hover:bg-[#1B1F3B]/50">
                        <td className="px-4 py-3 text-sm text-[#B0B3B8]">{String(item.id).slice(0, 8)}...</td>
                        <td className="px-4 py-3 text-sm text-[#F4F4F4]">{item.type || "Standard"}</td>
                        <td className="px-4 py-3 text-sm text-[#00BFFF] font-semibold">{item.reps || item.count || "0"}</td>
                        <td className="px-4 py-3 text-sm text-[#B0B3B8]">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-400 hover:text-red-400/80"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-[#B0B3B8]">
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
