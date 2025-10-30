"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/hooks/useAPI";
import { api } from "@/lib/api";

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { token } = useAuth();
  const userId = params.id as string;

  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("weekly");

  useEffect(() => {
    if (!token || !userId) return;

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const [userData, statsData, workoutsData, challengesData] = await Promise.all([
          api.getUser(userId, token),
          api.getUserStats(userId, period, token),
          api.getUserWorkouts(userId, token),
          api.getUserChallenges(userId, token),
        ]);

        console.log("userData:", userData);
        console.log("statsData:", statsData);
        console.log("workoutsData:", workoutsData);
        console.log("challengesData:", challengesData);

        setUser((userData as any)?.data);
        setStats((statsData as any)?.data);
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : (workoutsData as any)?.data || []);
        setChallenges(Array.isArray(challengesData) ? challengesData : (challengesData as any)?.data || []);
      } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur lors du chargement du profil");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, token, period]);

  const handleDelete = async () => {
    if (!token || !confirm("Supprimer définitivement cet utilisateur ?")) return;

    try {
      await api.deleteUser(userId, token);
      alert("Utilisateur supprimé");
      router.push("/admin/dashboard/users");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12 text-[#B0B3B8]">Chargement...</div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="text-center py-12 text-[#B0B3B8]">Utilisateur introuvable</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        {/* Header with back button */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-[#00BFFF] hover:text-[#00BFFF]/80 mb-4 flex items-center gap-2"
          >
            ← Retour
          </button>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {user.profilePicture || user.profilePictureUrl ? (
                <Image
                  src={String(user.profilePicture || user.profilePictureUrl)}
                  alt={user.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover border-2 border-white/10"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] flex items-center justify-center text-white text-2xl font-bold">
                  {user.name?.charAt(0).toUpperCase() || "?"}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-[#F4F4F4]">{user.name}</h2>
                <p className="text-[#B0B3B8]">{user.email}</p>
                <p className="text-[#B0B3B8] text-sm">ID: {user.id}</p>
              </div>
            </div>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20"
            >
              Supprimer
            </button>
          </div>
        </div>

        {/* Stats Period Selector */}
        <div className="mb-6">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 bg-[#2C2F38] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
          >
            <option value="daily">Aujourd hui</option>
            <option value="weekly">Cette semaine</option>
            <option value="monthly">Ce mois</option>
            <option value="yearly">Cette annee</option>
            <option value="all-time">Depuis toujours</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <p className="text-[#B0B3B8] text-xs mb-1">Total Workouts</p>
            <p className="text-2xl font-bold text-[#F4F4F4]">{stats?.totalWorkouts || 0}</p>
          </div>
          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <p className="text-[#B0B3B8] text-xs mb-1">Total Pompes</p>
            <p className="text-2xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] bg-clip-text text-transparent">
              {stats?.totalPushUps || 0}
            </p>
          </div>
          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <p className="text-[#B0B3B8] text-xs mb-1">Meilleure Session</p>
            <p className="text-2xl font-bold text-[#F4F4F4]">{stats?.bestSession || 0}</p>
          </div>
          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <p className="text-[#B0B3B8] text-xs mb-1">Moyenne</p>
            <p className="text-2xl font-bold text-[#F4F4F4]">
              {stats?.averagePushUps ? Math.round(stats.averagePushUps) : 0}
            </p>
          </div>
        </div>

        {/* Workouts & Challenges */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Recent Workouts */}
          <div className="bg-[#2C2F38] rounded-xl border border-white/10 p-4">
            <h3 className="text-lg font-bold text-[#F4F4F4] mb-4">
              Workouts Recents ({workouts.length})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {workouts.length > 0 ? (
                workouts.slice(0, 10).map((workout, index) => (
                  <div key={workout.sessionId || workout.id || index} className="p-3 bg-[#1B1F3B]/50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[#F4F4F4] font-medium">
                          {workout.totalReps || workout.reps || 0} pompes
                        </p>
                        <p className="text-[#B0B3B8] text-xs">
                          {workout.type || "Standard"}
                        </p>
                      </div>
                      <p className="text-[#B0B3B8] text-xs">
                        {workout.createdAt
                          ? new Date(workout.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                    {workout.totalDuration && (
                      <p className="text-[#00BFFF] text-xs mt-1">
                        Duree: {Math.floor(workout.totalDuration / 60)}min{" "}
                        {workout.totalDuration % 60}s
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-[#B0B3B8] text-sm text-center py-4">
                  Aucun workout
                </p>
              )}
            </div>
          </div>

          {/* Challenges */}
          <div className="bg-[#2C2F38] rounded-xl border border-white/10 p-4">
            <h3 className="text-lg font-bold text-[#F4F4F4] mb-4">
              Challenges ({challenges.length})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {challenges.length > 0 ? (
                challenges.slice(0, 10).map((challenge, index) => (
                  <div key={index} className="p-3 bg-[#1B1F3B]/50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[#F4F4F4] font-medium">
                          {challenge.title || challenge.name}
                        </p>
                        <p className="text-[#B0B3B8] text-xs">
                          {challenge.description?.slice(0, 50)}...
                        </p>
                      </div>
                      {challenge.userCompleted && (
                        <span className="text-green-400 text-xs">✓ Complete</span>
                      )}
                    </div>
                    {challenge.progress !== undefined && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#B0B3B8]">Progres</span>
                          <span className="text-[#00BFFF]">{challenge.progress}%</span>
                        </div>
                        <div className="w-full bg-[#1B1F3B] rounded-full h-1.5">
                          <div
                            className="bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] h-1.5 rounded-full"
                            style={{ width: `${challenge.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-[#B0B3B8] text-sm text-center py-4">
                  Aucun challenge
                </p>
              )}
            </div>
          </div>
        </div>

        {/* User Info Details */}
        <div className="bg-[#2C2F38] rounded-xl border border-white/10 p-6">
          <h3 className="text-lg font-bold text-[#F4F4F4] mb-4">
            Informations Detaillees
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-[#B0B3B8] text-sm mb-1">Nom complet</p>
              <p className="text-[#F4F4F4]">{user.name}</p>
            </div>
            <div>
              <p className="text-[#B0B3B8] text-sm mb-1">Email</p>
              <p className="text-[#F4F4F4]">{user.email}</p>
            </div>
            <div>
              <p className="text-[#B0B3B8] text-sm mb-1">ID Utilisateur</p>
              <p className="text-[#F4F4F4] font-mono text-sm">{user.id}</p>
            </div>
            <div>
              <p className="text-[#B0B3B8] text-sm mb-1">Date d inscription</p>
              <p className="text-[#F4F4F4]">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            {user.role && (
              <div>
                <p className="text-[#B0B3B8] text-sm mb-1">Role</p>
                <p className="text-[#F4F4F4]">{user.role}</p>
              </div>
            )}
            {user.deviceToken && (
              <div className="col-span-2">
                <p className="text-[#B0B3B8] text-sm mb-1">Device Token</p>
                <p className="text-[#F4F4F4] font-mono text-xs break-all">
                  {user.deviceToken}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
