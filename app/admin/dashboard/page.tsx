"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  score: number;
  joinDate: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData || userData === "undefined") {
      router.push("/admin");
      return;
    }

    setTimeout(() => {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du parsing du user:", err);
        router.push("/admin");
      }
    }, 0);
  }, [router]);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await fetch("https://pumppro-backend.onrender.com/auth/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] via-[#2C2F38] to-[#1B1F3B] flex items-center justify-center">
        <div className="text-[#F4F4F4] text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] via-[#2C2F38] to-[#1B1F3B]">
      {/* Header */}
      <header className="bg-[#1B1F3B]/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">💪</div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] bg-clip-text text-transparent">
              PompeurPro Admin
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] flex items-center justify-center text-white font-semibold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-[#F4F4F4] font-semibold text-sm">{user?.name}</p>
                <p className="text-[#B0B3B8] text-xs">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#F4F4F4] mb-2">
            Salut Champion! 👋
          </h2>
          <p className="text-[#B0B3B8]">
            Bienvenue sur le tableau de bord administrateur de PompeurPro
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#2C2F38] rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">👥</div>
              <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold">
                +12%
              </div>
            </div>
            <p className="text-[#B0B3B8] text-sm mb-1">Utilisateurs</p>
            <p className="text-3xl font-bold text-[#F4F4F4]">2,547</p>
          </div>

          <div className="bg-[#2C2F38] rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">💪</div>
              <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold">
                +8%
              </div>
            </div>
            <p className="text-[#B0B3B8] text-sm mb-1">Pompes totales</p>
            <p className="text-3xl font-bold text-[#F4F4F4]">1.2M</p>
          </div>

          <div className="bg-[#2C2F38] rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">🏆</div>
              <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold">
                +15%
              </div>
            </div>
            <p className="text-[#B0B3B8] text-sm mb-1">Défis actifs</p>
            <p className="text-3xl font-bold text-[#F4F4F4]">42</p>
          </div>

          <div className="bg-[#2C2F38] rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl">🔥</div>
              <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold">
                +22%
              </div>
            </div>
            <p className="text-[#B0B3B8] text-sm mb-1">Utilisateurs actifs</p>
            <p className="text-3xl font-bold text-[#F4F4F4]">1,834</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-[#F4F4F4] mb-4">Actions rapides</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <button className="bg-[#2C2F38] rounded-xl p-6 border border-white/10 hover:border-[#00BFFF]/50 transition-all text-left">
              <div className="text-3xl mb-3">👥</div>
              <h4 className="text-[#F4F4F4] font-semibold mb-1">Gérer les utilisateurs</h4>
              <p className="text-[#B0B3B8] text-sm">Voir et gérer tous les utilisateurs</p>
            </button>

            <button className="bg-[#2C2F38] rounded-xl p-6 border border-white/10 hover:border-[#8E2DE2]/50 transition-all text-left">
              <div className="text-3xl mb-3">🏆</div>
              <h4 className="text-[#F4F4F4] font-semibold mb-1">Créer un défi</h4>
              <p className="text-[#B0B3B8] text-sm">Ajouter un nouveau défi</p>
            </button>

            <button className="bg-[#2C2F38] rounded-xl p-6 border border-white/10 hover:border-[#00BFFF]/50 transition-all text-left">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="text-[#F4F4F4] font-semibold mb-1">Statistiques</h4>
              <p className="text-[#B0B3B8] text-sm">Voir les stats détaillées</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-xl font-bold text-[#F4F4F4] mb-4">Activité récente</h3>
          <div className="bg-[#2C2F38] rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                {[
                  { icon: "👤", text: "Nouvel utilisateur inscrit: John Doe", time: "Il y a 2 min" },
                  { icon: "💪", text: "Record battu: 150 pompes en une session", time: "Il y a 15 min" },
                  { icon: "🏆", text: "Défi complété par 10 utilisateurs", time: "Il y a 1h" },
                  { icon: "🔥", text: "Streak de 30 jours atteint par Marie", time: "Il y a 2h" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-[#1B1F3B]/50 rounded-lg">
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="text-[#F4F4F4]">{activity.text}</p>
                      <p className="text-[#B0B3B8] text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
