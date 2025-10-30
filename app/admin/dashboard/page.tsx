"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { api } from "@/lib/api";
import type { AdminDashboardStats, AdminActivity, TopContent } from "@/types/models";

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [activity, setActivity] = useState<AdminActivity[]>([]);
  const [topContent, setTopContent] = useState<TopContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, activityData, topContentData] = await Promise.all([
          api.getAdminDashboard(),
          api.getAdminActivity({ limit: 10 }),
          api.getAdminTopContent(),
        ]);
        setStats(statsData);
        setActivity(activityData);
        setTopContent(topContentData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-[#B0B3B8]">Chargement du dashboard...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        {/* Welcome */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#F4F4F4] mb-1">Dashboard Admin</h2>
          <p className="text-[#B0B3B8] text-sm">Vue d&apos;ensemble complète de l&apos;application</p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">👥</span>
              <div className="text-xs text-green-400">+{stats?.newUsersToday || 0}</div>
            </div>
            <p className="text-[#B0B3B8] text-xs mb-1">Total Utilisateurs</p>
            <p className="text-2xl font-bold text-[#F4F4F4]">{stats?.totalUsers || 0}</p>
            <p className="text-[#B0B3B8] text-xs mt-1">{stats?.activeUsers || 0} actifs (24h)</p>
          </div>

          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">🏆</span>
              <div className="text-xs text-blue-400">{stats?.activeChallenges || 0} actifs</div>
            </div>
            <p className="text-[#B0B3B8] text-xs mb-1">Total Challenges</p>
            <p className="text-2xl font-bold text-[#F4F4F4]">{stats?.totalChallenges || 0}</p>
          </div>

          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">📋</span>
            </div>
            <p className="text-[#B0B3B8] text-xs mb-1">Total Programmes</p>
            <p className="text-2xl font-bold text-[#F4F4F4]">{stats?.totalPrograms || 0}</p>
          </div>

          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">💪</span>
              <div className="text-xs text-purple-400">+{stats?.workoutsToday || 0}</div>
            </div>
            <p className="text-[#B0B3B8] text-xs mb-1">Total Workouts</p>
            <p className="text-2xl font-bold text-[#F4F4F4]">{stats?.totalWorkouts || 0}</p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <span className="text-2xl mb-2 block">🔥</span>
            <p className="text-[#B0B3B8] text-xs mb-1">Total Pompes</p>
            <p className="text-xl font-bold text-[#F4F4F4]">{stats?.totalPushups.toLocaleString() || 0}</p>
          </div>

          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <span className="text-2xl mb-2 block">📸</span>
            <p className="text-[#B0B3B8] text-xs mb-1">Total Photos</p>
            <p className="text-xl font-bold text-[#F4F4F4]">{stats?.totalPhotos || 0}</p>
          </div>

          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <span className="text-2xl mb-2 block">🐛</span>
            <p className="text-[#B0B3B8] text-xs mb-1">Bug Reports</p>
            <p className="text-xl font-bold text-[#F4F4F4]">{stats?.totalBugReports || 0}</p>
            <p className="text-[#B0B3B8] text-xs mt-1">{stats?.pendingBugReports || 0} en attente</p>
          </div>

          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <span className="text-2xl mb-2 block">💾</span>
            <p className="text-[#B0B3B8] text-xs mb-1">Stockage</p>
            <p className="text-xl font-bold text-[#F4F4F4]">{stats?.storageUsed || "0 MB"}</p>
          </div>
        </div>

        {/* Growth Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <h3 className="text-sm font-bold text-[#F4F4F4] mb-3">Nouveaux Utilisateurs</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#B0B3B8] text-xs">Aujourd&apos;hui</span>
                <span className="text-[#F4F4F4] font-semibold">{stats?.newUsersToday || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#B0B3B8] text-xs">Cette semaine</span>
                <span className="text-[#F4F4F4] font-semibold">{stats?.newUsersThisWeek || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#B0B3B8] text-xs">Ce mois</span>
                <span className="text-[#F4F4F4] font-semibold">{stats?.newUsersThisMonth || 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <h3 className="text-sm font-bold text-[#F4F4F4] mb-3">Workouts Récents</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#B0B3B8] text-xs">Aujourd&apos;hui</span>
                <span className="text-[#F4F4F4] font-semibold">{stats?.workoutsToday || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#B0B3B8] text-xs">Cette semaine</span>
                <span className="text-[#F4F4F4] font-semibold">{stats?.workoutsThisWeek || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#B0B3B8] text-xs">Ce mois</span>
                <span className="text-[#F4F4F4] font-semibold">{stats?.workoutsThisMonth || 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
            <h3 className="text-sm font-bold text-[#F4F4F4] mb-3">Moyennes</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#B0B3B8] text-xs">Pompes / Utilisateur</span>
                <span className="text-[#F4F4F4] font-semibold">{stats?.avgPushupsPerUser.toFixed(0) || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#B0B3B8] text-xs">Workouts / Utilisateur</span>
                <span className="text-[#F4F4F4] font-semibold">{stats?.avgWorkoutsPerUser.toFixed(1) || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-[#F4F4F4] mb-3">Actions rapides</h3>
          <div className="grid md:grid-cols-4 gap-3">
            <Link href="/admin/dashboard/users" className="bg-[#2C2F38] rounded-xl p-4 border border-white/10 hover:border-[#00BFFF]/50 transition-all">
              <span className="text-2xl mb-2 block">👥</span>
              <h4 className="text-[#F4F4F4] font-semibold text-sm mb-1">Utilisateurs</h4>
              <p className="text-[#B0B3B8] text-xs">Gérer les utilisateurs</p>
            </Link>

            <Link href="/admin/dashboard/challenges" className="bg-[#2C2F38] rounded-xl p-4 border border-white/10 hover:border-[#8E2DE2]/50 transition-all">
              <span className="text-2xl mb-2 block">🏆</span>
              <h4 className="text-[#F4F4F4] font-semibold text-sm mb-1">Challenges</h4>
              <p className="text-[#B0B3B8] text-xs">Gérer les challenges</p>
            </Link>

            <Link href="/admin/dashboard/programs" className="bg-[#2C2F38] rounded-xl p-4 border border-white/10 hover:border-[#00BFFF]/50 transition-all">
              <span className="text-2xl mb-2 block">📋</span>
              <h4 className="text-[#F4F4F4] font-semibold text-sm mb-1">Programmes</h4>
              <p className="text-[#B0B3B8] text-xs">Gérer les programmes</p>
            </Link>

            <Link href="/admin/dashboard/photos" className="bg-[#2C2F38] rounded-xl p-4 border border-white/10 hover:border-[#8E2DE2]/50 transition-all">
              <span className="text-2xl mb-2 block">📸</span>
              <h4 className="text-[#F4F4F4] font-semibold text-sm mb-1">Photos</h4>
              <p className="text-[#B0B3B8] text-xs">Voir toutes les photos</p>
            </Link>
          </div>
        </div>

        {/* Activity & Top Content */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Recent Activity */}
          <div className="bg-[#2C2F38] rounded-xl border border-white/10 p-4">
            <h3 className="text-sm font-bold text-[#F4F4F4] mb-3">Activité Récente</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {activity.length > 0 ? (
                activity.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-2 bg-[#1B1F3B]/50 rounded-lg">
                    {item.userAvatar ? (
                      <Image src={item.userAvatar} alt={item.userName} width={32} height={32} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                        {item.userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F4F4F4] text-xs font-medium">
                        <span className="font-semibold">{item.userName}</span> {item.details}
                      </p>
                      <p className="text-[#B0B3B8] text-xs">{new Date(item.timestamp).toLocaleString('fr-FR')}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[#B0B3B8] text-xs">Aucune activité récente</p>
              )}
            </div>
          </div>

          {/* Top Challenges */}
          <div className="bg-[#2C2F38] rounded-xl border border-white/10 p-4">
            <h3 className="text-sm font-bold text-[#F4F4F4] mb-3">Top Challenges</h3>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {topContent?.topChallenges && topContent.topChallenges.length > 0 ? (
                topContent.topChallenges.slice(0, 5).map((challenge, index) => (
                  <div key={challenge.id} className="p-2 bg-[#1B1F3B]/50 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-[#F4F4F4] text-xs font-medium flex-1">{challenge.title}</p>
                      <span className="text-[#B0B3B8] text-xs ml-2">#{index + 1}</span>
                    </div>
                    <div className="flex gap-3 text-xs text-[#B0B3B8]">
                      <span>❤️ {challenge.likes}</span>
                      <span>👥 {challenge.participants}</span>
                      <span>✓ {challenge.completions}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[#B0B3B8] text-xs">Aucun challenge</p>
              )}
            </div>
          </div>
        </div>

        {/* Top Programs & Top Users */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Top Programs */}
          <div className="bg-[#2C2F38] rounded-xl border border-white/10 p-4">
            <h3 className="text-sm font-bold text-[#F4F4F4] mb-3">Top Programmes</h3>
            <div className="space-y-2">
              {topContent?.topPrograms && topContent.topPrograms.length > 0 ? (
                topContent.topPrograms.slice(0, 5).map((program, index) => (
                  <div key={program.id} className="p-2 bg-[#1B1F3B]/50 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-[#F4F4F4] text-xs font-medium flex-1">{program.name}</p>
                      <span className="text-[#B0B3B8] text-xs ml-2">#{index + 1}</span>
                    </div>
                    <div className="flex gap-3 text-xs text-[#B0B3B8]">
                      <span>🔄 {program.usageCount}</span>
                      <span>❤️ {program.likes}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[#B0B3B8] text-xs">Aucun programme</p>
              )}
            </div>
          </div>

          {/* Top Users */}
          <div className="bg-[#2C2F38] rounded-xl border border-white/10 p-4">
            <h3 className="text-sm font-bold text-[#F4F4F4] mb-3">Top Utilisateurs</h3>
            <div className="space-y-2">
              {topContent?.topUsers && topContent.topUsers.length > 0 ? (
                topContent.topUsers.slice(0, 5).map((user, index) => (
                  <Link
                    key={user.id}
                    href={`/admin/dashboard/users/${user.id}`}
                    className="flex items-center gap-3 p-2 bg-[#1B1F3B]/50 rounded-lg hover:bg-[#1B1F3B] transition-colors cursor-pointer"
                  >
                    <span className="text-[#B0B3B8] text-xs w-6">#{index + 1}</span>
                    {user.avatar ? (
                      <Image src={user.avatar} alt={user.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover border border-white/10" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] flex items-center justify-center text-white text-xs font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F4F4F4] text-xs font-medium truncate">{user.name}</p>
                      <div className="flex gap-2 text-xs text-[#B0B3B8]">
                        <span>💪 {user.totalWorkouts}</span>
                        <span>🔥 {user.totalPushups}</span>
                        <span>⭐ {user.score}</span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-[#B0B3B8] text-xs">Aucun utilisateur</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
