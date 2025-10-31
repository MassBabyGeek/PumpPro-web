"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/DashboardLayout";
import { api } from "@/lib/api";
import { Photo } from "@/types/models";

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<"all" | "avatar" | "challenge" | "bug_report">("all");
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    fetchPhotos();
  }, [typeFilter]);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminPhotos({ type: typeFilter, limit: 100 });
      setPhotos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erreur:", error);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort photos
  const filteredPhotos = photos.filter((photo) => {
    return searchQuery === "" ||
      photo.entityName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.entityId?.toLowerCase().includes(searchQuery.toLowerCase());
  }).sort((a, b) => {
    let comparison = 0;

    if (sortBy === "name") {
      comparison = (a.entityName || "").localeCompare(b.entityName || "");
    } else if (sortBy === "date") {
      comparison = new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleDeletePhoto = async (entityId: string, type: "avatar" | "challenge" | "bug_report", entityName: string) => {
    if (!confirm(`Supprimer la photo de "${entityName}"?`)) return;

    setDeletingUrl(entityId);
    try {
      await api.deleteAdminPhoto(entityId, type);
      await fetchPhotos(); // Refresh the list
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur lors de la suppression");
    } finally {
      setDeletingUrl(null);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "avatar":
        return "👤";
      case "challenge":
        return "🏆";
      case "bug_report":
        return "🐛";
      default:
        return "📸";
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "avatar":
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/20 text-blue-400">Avatar</span>;
      case "challenge":
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-500/20 text-purple-400">Challenge</span>;
      case "bug_report":
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-red-500/20 text-red-400">Bug Report</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-gray-500/20 text-gray-400">Autre</span>;
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#F4F4F4]">Photos</h2>
            <p className="text-[#B0B3B8] text-sm">Toutes les photos de l&apos;application</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10 mb-6">
          <div className="grid md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Recherche</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nom ou ID..."
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as "all" | "avatar" | "challenge" | "bug_report")}
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              >
                <option value="all">Toutes</option>
                <option value="avatar">👤 Avatars</option>
                <option value="challenge">🏆 Challenges</option>
                <option value="bug_report">🐛 Bug Reports</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Trier par</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "date" | "name")}
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              >
                <option value="date">Date</option>
                <option value="name">Nom</option>
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
              {filteredPhotos.length} photo{filteredPhotos.length > 1 ? 's' : ''} trouvée{filteredPhotos.length > 1 ? 's' : ''}
            </p>
            {(searchQuery || typeFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setTypeFilter("all");
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
        ) : filteredPhotos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredPhotos.map((photo, index) => (
              <div
                key={index}
                className="bg-[#2C2F38] rounded-xl p-4 border border-white/10 hover:border-[#00BFFF]/50 transition-all"
              >
                <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-[#1B1F3B] relative">
                  {photo.url ? (
                    <Image
                      src={photo.url}
                      alt={photo.entityName || 'Photo'}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#B0B3B8] text-4xl">
                      {getTypeIcon(photo.type)}
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    {getTypeBadge(photo.type)}
                  </div>
                </div>
                <div>
                  <p className="text-[#F4F4F4] font-semibold text-sm truncate mb-1">
                    {photo.entityName || 'Sans nom'}
                  </p>
                  <p className="text-[#B0B3B8] text-xs truncate mb-1">
                    ID: {photo.entityId.slice(0, 8)}...
                  </p>
                  {photo.createdAt && (
                    <p className="text-[#B0B3B8] text-xs mb-2">
                      {new Date(photo.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePhoto(photo.entityId, photo.type as "avatar" | "challenge" | "bug_report", photo.entityName);
                    }}
                    disabled={deletingUrl === photo.entityId}
                    className="w-full mt-2 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingUrl === photo.entityId ? "Suppression..." : "🗑️ Supprimer"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#2C2F38] rounded-xl border border-white/10 p-12 text-center">
            <span className="text-6xl mb-4 block">📸</span>
            <p className="text-[#F4F4F4] font-semibold mb-2">Aucune photo</p>
            <p className="text-[#B0B3B8] text-sm">
              Aucune photo trouvée pour ce filtre
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
