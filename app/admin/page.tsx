"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Créer un contrôleur d'abort pour gérer le timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 secondes

      const response = await fetch("https://pumppro-backend.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur de connexion");
      }

      const data = await response.json();

      // Stocker le token et les infos utilisateur
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Rediriger vers le dashboard
      router.push("/admin/dashboard");
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError("Le serveur met trop de temps à répondre. Il est probablement en veille (Render gratuit). Veuillez réessayer dans quelques secondes.");
      } else {
        setError(err instanceof Error ? err.message : "Erreur de connexion");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B1F3B] via-[#2C2F38] to-[#1B1F3B] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#B0B3B8] hover:text-[#00BFFF] transition-colors mb-8"
        >
          <span>←</span> Retour à l&apos;accueil
        </Link>

        {/* Login Card */}
        <div className="bg-[#2C2F38] rounded-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold text-[#F4F4F4] mb-2">
              Admin PompeurPro
            </h1>
            <p className="text-[#B0B3B8]">
              Connectez-vous pour gérer l&apos;application
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/50 rounded-lg text-blue-400 text-sm">
            ℹ️ Le serveur backend (Render gratuit) peut mettre jusqu'à 60 secondes à se réveiller lors de la première connexion.
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-[#F4F4F4] font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#3A3D46] border border-white/10 rounded-lg text-[#F4F4F4] placeholder-[#B0B3B8] focus:border-[#00BFFF] focus:outline-none transition-colors"
                placeholder="admin@pompeurpro.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-[#F4F4F4] font-semibold mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#3A3D46] border border-white/10 rounded-lg text-[#F4F4F4] placeholder-[#B0B3B8] focus:border-[#00BFFF] focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion en cours... (peut prendre jusqu'à 60s)" : "Se connecter"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="#"
              className="text-sm text-[#00BFFF] hover:text-[#8E2DE2] transition-colors"
            >
              Mot de passe oublié ?
            </a>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 text-center text-sm text-[#B0B3B8]">
          <p>Accès réservé aux administrateurs</p>
        </div>
      </div>
    </div>
  );
}
