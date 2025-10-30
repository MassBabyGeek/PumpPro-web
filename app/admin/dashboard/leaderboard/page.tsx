"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { useLeaderboard } from "@/hooks/useAPI";

export default function LeaderboardPage() {
  const [period, setPeriod] = useState("weekly");
  const { leaderboard, loading } = useLeaderboard(period);

  return (
    <DashboardLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div><h2 className="text-2xl font-bold text-[#F4F4F4]">Classement</h2><p className="text-[#B0B3B8] text-sm">Top des utilisateurs</p></div>
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-4 py-2 bg-[#2C2F38] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none">
            <option value="daily">Aujourd hui</option>
            <option value="weekly">Cette semaine</option>
            <option value="monthly">Ce mois</option>
            <option value="yearly">Cette annee</option>
            <option value="all-time">Depuis toujours</option>
          </select>
        </div>

        {loading ? (
          <div className="text-[#B0B3B8] text-center py-12">Chargement...</div>
        ) : (
          <div className="space-y-3">
            {Array.isArray(leaderboard) && leaderboard.length > 0 ? (
              (leaderboard as Array<Record<string, string | number>>).map((item, index) => {
                const userId = String(item.userId || item.id);
                return (
                  <Link
                    key={index}
                    href={`/admin/dashboard/users/${userId}`}
                    className="block bg-[#2C2F38] rounded-xl p-4 border border-white/10 hover:border-[#00BFFF]/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 text-center font-bold text-[#F4F4F4]">#{index + 1}</div>
                      {item.profilePicture || item.profilePictureUrl ? (
                        <Image src={String(item.profilePicture || item.profilePictureUrl)} alt={String(item.name || item.username)} width={48} height={48} className="w-12 h-12 rounded-full object-cover border-2 border-white/10" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] flex items-center justify-center text-white font-bold">{String(item.name || "?").charAt(0).toUpperCase()}</div>
                      )}
                      <div className="flex-1"><p className="text-[#F4F4F4] font-semibold">{String(item.name || item.username)}</p><p className="text-[#B0B3B8] text-sm">{String(item.email || "")}</p></div>
                      <div className="text-right"><p className="text-2xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] bg-clip-text text-transparent">{String(item.score || item.totalPushups || 0)}</p><p className="text-[#B0B3B8] text-xs">pompes</p></div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="text-center py-12 text-[#B0B3B8]">Aucune donnee</div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
