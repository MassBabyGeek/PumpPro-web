"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData || userData === "undefined") {
      router.push("/admin");
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    } catch (err) {
      console.error("Erreur:", err);
      router.push("/admin");
    }
  }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    router.push("/admin");
  };

  const navigation = [
    { name: "Overview", path: "/admin/dashboard", icon: "📊" },
    { name: "Utilisateurs", path: "/admin/dashboard/users", icon: "👥" },
    { name: "Challenges", path: "/admin/dashboard/challenges", icon: "🏆" },
    { name: "Programmes", path: "/admin/dashboard/programs", icon: "📋" },
    { name: "Workouts", path: "/admin/dashboard/workouts", icon: "💪" },
    { name: "Classement", path: "/admin/dashboard/leaderboard", icon: "🥇" },
    { name: "Photos", path: "/admin/dashboard/photos", icon: "📸" },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] via-[#2C2F38] to-[#1B1F3B] flex items-center justify-center">
        <div className="text-[#F4F4F4]">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] via-[#2C2F38] to-[#1B1F3B]">
      {/* Header */}
      <header className="sticky top-0 bg-[#1B1F3B]/90 backdrop-blur-md border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <span className="text-2xl">💪</span>
              <h1 className="text-lg font-bold bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] bg-clip-text text-transparent">
                PompeurPro Admin
              </h1>
            </Link>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#2C2F38] rounded-lg border border-white/10">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] flex items-center justify-center text-white text-sm font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-[#F4F4F4] text-xs font-medium">{user.name}</p>
                  <p className="text-[#B0B3B8] text-xs">{user.email}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
              >
                Quitter
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Navigation Tabs */}
        <nav className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {navigation.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all
                  ${
                    isActive
                      ? "bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] text-white font-semibold shadow-lg"
                      : "bg-[#2C2F38] text-[#B0B3B8] hover:text-[#F4F4F4] border border-white/10"
                  }
                `}
              >
                <span>{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
