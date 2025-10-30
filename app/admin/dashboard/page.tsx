"use client";

import Image from "next/image";
import DashboardLayout from "@/components/DashboardLayout";
import { useUsers, useChallenges, usePrograms, useWorkouts } from "@/hooks/useAPI";
import Link from "next/link";

export default function AdminDashboard() {
  const { users, loading: usersLoading } = useUsers();
  const { challenges, loading: challengesLoading } = useChallenges();
  const { programs, loading: programsLoading } = usePrograms();
  const { workouts, loading: workoutsLoading } = useWorkouts();

  const usersCount = Array.isArray(users) ? users.length : 0;
  const challengesCount = Array.isArray(challenges) ? challenges.length : 0;
  const programsCount = Array.isArray(programs) ? programs.length : 0;
  const workoutsCount = Array.isArray(workouts) ? workouts.length : 0;

  return (
    <DashboardLayout>
      <div>
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#F4F4F4] mb-1">Overview</h2>
          <p className="text-[#B0B3B8] text-sm">Vue d&apos;ensemble de l&apos;application</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">👥</span>
              {usersLoading && <div className="text-xs text-[#B0B3B8]">...</div>}
            </div>
            <p className="text-[#B0B3B8] text-xs mb-1">Utilisateurs</p>
            <p className="text-2xl font-bold text-[#F4F4F4]">{usersCount}</p>
          </div>

          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">🏆</span>
              {challengesLoading && <div className="text-xs text-[#B0B3B8]">...</div>}
            </div>
            <p className="text-[#B0B3B8] text-xs mb-1">Challenges</p>
            <p className="text-2xl font-bold text-[#F4F4F4]">{challengesCount}</p>
          </div>

          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">📋</span>
              {programsLoading && <div className="text-xs text-[#B0B3B8]">...</div>}
            </div>
            <p className="text-[#B0B3B8] text-xs mb-1">Programmes</p>
            <p className="text-2xl font-bold text-[#F4F4F4]">{programsCount}</p>
          </div>

          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">💪</span>
              {workoutsLoading && <div className="text-xs text-[#B0B3B8]">...</div>}
            </div>
            <p className="text-[#B0B3B8] text-xs mb-1">Workouts</p>
            <p className="text-2xl font-bold text-[#F4F4F4]">{workoutsCount}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-[#F4F4F4] mb-3">Actions rapides</h3>
          <div className="grid md:grid-cols-3 gap-3">
            <Link href="/admin/dashboard/users" className="bg-[#2C2F38] rounded-xl p-4 border border-white/10 hover:border-[#00BFFF]/50 transition-all">
              <span className="text-2xl mb-2 block">👥</span>
              <h4 className="text-[#F4F4F4] font-semibold text-sm mb-1">Gérer les utilisateurs</h4>
              <p className="text-[#B0B3B8] text-xs">CRUD utilisateurs</p>
            </Link>

            <Link href="/admin/dashboard/challenges" className="bg-[#2C2F38] rounded-xl p-4 border border-white/10 hover:border-[#8E2DE2]/50 transition-all">
              <span className="text-2xl mb-2 block">🏆</span>
              <h4 className="text-[#F4F4F4] font-semibold text-sm mb-1">Gérer les challenges</h4>
              <p className="text-[#B0B3B8] text-xs">CRUD challenges</p>
            </Link>

            <Link href="/admin/dashboard/programs" className="bg-[#2C2F38] rounded-xl p-4 border border-white/10 hover:border-[#00BFFF]/50 transition-all">
              <span className="text-2xl mb-2 block">📋</span>
              <h4 className="text-[#F4F4F4] font-semibold text-sm mb-1">Gérer les programmes</h4>
              <p className="text-[#B0B3B8] text-xs">CRUD programmes</p>
            </Link>
          </div>
        </div>

        {/* Recent Data */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Recent Users */}
          <div className="bg-[#2C2F38] rounded-xl border border-white/10 p-4">
            <h3 className="text-sm font-bold text-[#F4F4F4] mb-3">Utilisateurs récents</h3>
            <div className="space-y-2">
              {usersLoading ? (
                <p className="text-[#B0B3B8] text-xs">Chargement...</p>
              ) : Array.isArray(users) && users.length > 0 ? (
                (users as Array<Record<string, string>>).slice(0, 5).map((user, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-[#1B1F3B]/50 rounded-lg">
                    {user.profilePicture || user.profilePictureUrl ? (
                      <Image src={String(user.profilePicture || user.profilePictureUrl)} alt={String(user.name || user.email)} width={32} height={32} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] flex items-center justify-center text-white text-xs font-semibold">
                        {String(user.name || "?").charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F4F4F4] text-xs font-medium truncate">{String(user.name || user.email)}</p>
                      <p className="text-[#B0B3B8] text-xs truncate">{String(user.email)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[#B0B3B8] text-xs">Aucun utilisateur</p>
              )}
            </div>
          </div>

          {/* Recent Challenges */}
          <div className="bg-[#2C2F38] rounded-xl border border-white/10 p-4">
            <h3 className="text-sm font-bold text-[#F4F4F4] mb-3">Challenges récents</h3>
            <div className="space-y-2">
              {challengesLoading ? (
                <p className="text-[#B0B3B8] text-xs">Chargement...</p>
              ) : Array.isArray(challenges) && challenges.length > 0 ? (
                (challenges as Array<Record<string, string>>).slice(0, 5).map((challenge, index: number) => (
                  <div key={index} className="p-2 bg-[#1B1F3B]/50 rounded-lg">
                    <p className="text-[#F4F4F4] text-xs font-medium">{String(challenge.title || challenge.name)}</p>
                    <p className="text-[#B0B3B8] text-xs">{String(challenge.description || "").slice(0, 50)}...</p>
                  </div>
                ))
              ) : (
                <p className="text-[#B0B3B8] text-xs">Aucun challenge</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
