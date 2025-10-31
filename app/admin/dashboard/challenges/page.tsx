"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ChallengeForm from "@/components/ChallengeForm";
import { useChallenges } from "@/hooks/useAPI";
import { api } from "@/lib/api";

export default function ChallengesPage() {
  const { challenges, loading, refetch } = useChallenges();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState<"likes" | "date" | "participants">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter and sort challenges
  const filteredChallenges = Array.isArray(challenges) ? challenges.filter((item: any) => {
    const matchesSearch = searchQuery === "" ||
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === "" || item.category === categoryFilter;
    const matchesStatus = statusFilter === "" || item.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a: any, b: any) => {
    let comparison = 0;

    if (sortBy === "likes") {
      comparison = (a.likes || 0) - (b.likes || 0);
    } else if (sortBy === "participants") {
      comparison = (a.participants || 0) - (b.participants || 0);
    } else if (sortBy === "date") {
      comparison = new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
    }

    return sortOrder === "asc" ? comparison : -comparison;
  }) : [];

  const handleSubmit = async (formData: any) => {
    try {
      // Helper function to clean strings from null bytes
      const cleanString = (str: any): string | undefined => {
        if (!str || typeof str !== 'string') return undefined;
        const cleaned = str.replace(/\0/g, '').trim();
        return cleaned || undefined;
      };

      // Clean up data for backend - omit empty fields instead of sending null
      const cleanData: any = {
        title: cleanString(formData.title) || formData.title,
        description: cleanString(formData.description) || formData.description,
        category: formData.category,
        type: formData.type,
        variant: formData.variant,
        difficulty: formData.difficulty,
        iconName: cleanString(formData.iconName) || formData.iconName,
        iconColor: cleanString(formData.iconColor) || formData.iconColor,
        points: Number(formData.points),
        status: formData.status,
        isOfficial: Boolean(formData.isOfficial),
        tags: Array.isArray(formData.tags) ? formData.tags.filter((t: any) => t).map((t: any) => cleanString(t) || t) : [],
      };

      // Only add optional fields if they have values
      if (formData.targetReps) cleanData.targetReps = Number(formData.targetReps);
      if (formData.duration) cleanData.duration = Number(formData.duration);
      if (formData.sets) cleanData.sets = Number(formData.sets);
      if (formData.repsPerSet) cleanData.repsPerSet = Number(formData.repsPerSet);
      const cleanImageUrl = cleanString(formData.imageUrl);
      if (cleanImageUrl) cleanData.imageUrl = cleanImageUrl;
      const cleanBadge = cleanString(formData.badge);
      if (cleanBadge) cleanData.badge = cleanBadge;
      if (formData.startDate) cleanData.startDate = new Date(formData.startDate).toISOString();
      if (formData.endDate) cleanData.endDate = new Date(formData.endDate).toISOString();

      // Clean challengeTasks - only include non-empty fields
      // Don't include challengeTasks at all if empty to avoid issues
      if (formData.challengeTasks && formData.challengeTasks.length > 0) {
        cleanData.challengeTasks = formData.challengeTasks
          .filter((task: any) => task && task.title) // Filter out empty tasks
          .map((task: any) => {
            const cleanTask: any = {
              day: Number(task.day),
              title: cleanString(task.title) || task.title,
              isLocked: Boolean(task.isLocked),
            };
            if (task.id) cleanTask.id = task.id;
            if (task.challengeId) cleanTask.challengeId = task.challengeId;
            const cleanDesc = cleanString(task.description);
            if (cleanDesc) cleanTask.description = cleanDesc;
            const cleanType = cleanString(task.type);
            if (cleanType) cleanTask.type = cleanType;
            const cleanVariant = cleanString(task.variant);
            if (cleanVariant) cleanTask.variant = cleanVariant;
            if (task.targetReps) cleanTask.targetReps = Number(task.targetReps);
            if (task.duration) cleanTask.duration = Number(task.duration);
            if (task.sets) cleanTask.sets = Number(task.sets);
            if (task.repsPerSet) cleanTask.repsPerSet = Number(task.repsPerSet);
            if (task.scheduledDate) cleanTask.scheduledDate = new Date(task.scheduledDate).toISOString();
            if (task.score) cleanTask.score = Number(task.score);
            return cleanTask;
          });

        // If after filtering we have no tasks, don't include the field at all
        if (cleanData.challengeTasks.length === 0) {
          delete cleanData.challengeTasks;
        }
      }

      console.log("Sending challenge data:", JSON.stringify(cleanData, null, 2));

      if (editing) {
        await api.updateChallenge(editing.id, cleanData);
      } else {
        await api.createChallenge(cleanData);
      }
      setShowModal(false);
      setEditing(null);
      refetch();
    } catch (error) {
      console.error("Challenge submit error:", error);
      alert(error instanceof Error ? error.message : "Erreur lors de la soumission");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce challenge ?")) return;
    try {
      await api.deleteChallenge(id);
      refetch();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur");
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#F4F4F4]">Challenges</h2>
            <p className="text-[#B0B3B8] text-sm">Gerer tous les challenges</p>
          </div>
          <button onClick={() => { setEditing(null); setShowModal(true); }} className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] text-white font-semibold text-sm">+ Creer</button>
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
                placeholder="Titre ou description..."
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Catégorie</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              >
                <option value="">Toutes</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="special">Special</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Statut</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              >
                <option value="">Tous</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Trier par</label>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "likes" | "date" | "participants")}
                  className="flex-1 px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
                >
                  <option value="date">Date</option>
                  <option value="likes">Likes</option>
                  <option value="participants">Participants</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] hover:bg-[#1B1F3B]/80"
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <p className="text-[#B0B3B8]">
              {filteredChallenges.length} challenge{filteredChallenges.length > 1 ? 's' : ''} trouvé{filteredChallenges.length > 1 ? 's' : ''}
            </p>
            {(searchQuery || categoryFilter || statusFilter) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("");
                  setStatusFilter("");
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
          <div className="grid md:grid-cols-2 gap-4">
            {filteredChallenges.length > 0 ? (
              filteredChallenges.map((item: any) => (
                <div key={item.id} className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
                  {/* Header with badges */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-[#F4F4F4] flex-1">{item.title || item.name}</h3>
                    <div className="flex flex-col gap-1 ml-2">
                      {item.isOfficial && (
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-500/20 text-purple-400">
                          ⭐ Officiel
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        item.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {item.status || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[#B0B3B8] text-sm mb-3 line-clamp-2">{item.description}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div className="flex items-center gap-1 text-[#B0B3B8]">
                      <span>❤️</span>
                      <span>{item.likes || 0} likes</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#B0B3B8]">
                      <span>👥</span>
                      <span>{item.participants || 0} participants</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#B0B3B8]">
                      <span>✅</span>
                      <span>{item.completions || 0} complétés</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#B0B3B8]">
                      <span>🏆</span>
                      <span>{item.points || 0} points</span>
                    </div>
                  </div>

                  {/* Creator & Date */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/5">
                    <div className="text-xs text-[#B0B3B8]">
                      {item.creator?.name ? (
                        <span>Créé par <span className="text-[#00BFFF]">{item.creator.name}</span></span>
                      ) : (
                        <span>Créateur inconnu</span>
                      )}
                    </div>
                    <div className="text-xs text-[#B0B3B8]">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                    </div>
                  </div>

                  {/* Category & Difficulty */}
                  <div className="flex gap-2 mb-3">
                    <span className="px-2 py-1 rounded text-xs bg-[#1B1F3B] text-[#B0B3B8]">
                      {item.category || 'N/A'}
                    </span>
                    <span className="px-2 py-1 rounded text-xs bg-[#1B1F3B] text-[#B0B3B8]">
                      {item.difficulty || 'N/A'}
                    </span>
                    {item.type && (
                      <span className="px-2 py-1 rounded text-xs bg-[#1B1F3B] text-[#B0B3B8]">
                        {item.type}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button onClick={() => { setEditing(item); setShowModal(true); }} className="flex-1 px-3 py-2 bg-[#1B1F3B] text-[#00BFFF] rounded-lg text-sm">Modifier</button>
                    <button onClick={() => handleDelete(item.id)} className="flex-1 px-3 py-2 bg-red-500/10 text-red-400 rounded-lg text-sm">Supprimer</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-[#B0B3B8]">Aucun challenge</div>
            )}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 overflow-y-auto">
            <div className="bg-[#2C2F38] rounded-xl border border-white/10 w-full max-w-4xl p-6 my-8 mx-4">
              <h3 className="text-2xl font-bold text-[#F4F4F4] mb-6">{editing ? "Modifier" : "Creer"} un challenge</h3>
              <ChallengeForm
                challenge={editing}
                onSubmit={handleSubmit}
                onCancel={() => { setShowModal(false); setEditing(null); }}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
