"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ProgramForm from "@/components/ProgramForm";
import { usePrograms } from "@/hooks/useAPI";
import { api } from "@/lib/api";

export default function ProgramsPage() {
  const { programs, loading, refetch } = usePrograms();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [sortBy, setSortBy] = useState<"likes" | "date" | "usage">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter and sort programs
  const filteredPrograms = Array.isArray(programs) ? programs.filter((item: any) => {
    const matchesSearch = searchQuery === "" ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === "" || item.type === typeFilter;
    const matchesDifficulty = difficultyFilter === "" || item.difficulty === difficultyFilter;

    return matchesSearch && matchesType && matchesDifficulty;
  }).sort((a: any, b: any) => {
    let comparison = 0;

    if (sortBy === "likes") {
      comparison = (a.likes || 0) - (b.likes || 0);
    } else if (sortBy === "usage") {
      comparison = (a.usageCount || 0) - (b.usageCount || 0);
    } else if (sortBy === "date") {
      comparison = new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
    }

    return sortOrder === "asc" ? comparison : -comparison;
  }) : [];

  const handleSubmit = async (formData: any) => {
    try {
      // Clean up data for backend - omit empty fields instead of sending null
      const cleanData: any = {
        name: formData.name,
        type: formData.type,
        variant: formData.variant,
        difficulty: formData.difficulty,
        isCustom: formData.isCustom || false,
        isFeatured: formData.isFeatured || false,
      };

      // Only add optional fields if they have values
      if (formData.description) cleanData.description = formData.description;
      if (formData.restBetweenSets) cleanData.restBetweenSets = Number(formData.restBetweenSets);
      if (formData.targetReps) cleanData.targetReps = Number(formData.targetReps);
      if (formData.timeLimit) cleanData.timeLimit = Number(formData.timeLimit);
      if (formData.duration) cleanData.duration = Number(formData.duration);
      if (formData.allowRest !== undefined) cleanData.allowRest = formData.allowRest;
      if (formData.sets) cleanData.sets = Number(formData.sets);
      if (formData.repsPerSet) cleanData.repsPerSet = Number(formData.repsPerSet);
      if (formData.repsSequence && Array.isArray(formData.repsSequence)) {
        cleanData.repsSequence = formData.repsSequence.map((r: any) => Number(r));
      }
      if (formData.repsPerMinute) cleanData.repsPerMinute = Number(formData.repsPerMinute);
      if (formData.totalMinutes) cleanData.totalMinutes = Number(formData.totalMinutes);

      if (editing) {
        await api.updateProgram(editing.id, cleanData);
      } else {
        await api.createProgram(cleanData);
      }
      setShowModal(false);
      setEditing(null);
      refetch();
    } catch (error) {
      console.error("Program submit error:", error);
      alert(error instanceof Error ? error.message : "Erreur lors de la soumission");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce programme ?")) return;
    try {
      await api.deleteProgram(id);
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
            <h2 className="text-2xl font-bold text-[#F4F4F4]">Programmes</h2>
            <p className="text-[#B0B3B8] text-sm">Gerer tous les programmes</p>
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
                placeholder="Nom ou description..."
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              >
                <option value="">Tous</option>
                <option value="standard">Standard</option>
                <option value="100reps">100 Reps</option>
                <option value="emom">EMOM</option>
                <option value="pyramid">Pyramid</option>
                <option value="timed">Timed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Difficulté</label>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              >
                <option value="">Toutes</option>
                <option value="beginner">Débutant</option>
                <option value="intermediate">Intermédiaire</option>
                <option value="advanced">Avancé</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Trier par</label>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "likes" | "date" | "usage")}
                  className="flex-1 px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
                >
                  <option value="date">Date</option>
                  <option value="likes">Likes</option>
                  <option value="usage">Utilisations</option>
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
              {filteredPrograms.length} programme{filteredPrograms.length > 1 ? 's' : ''} trouvé{filteredPrograms.length > 1 ? 's' : ''}
            </p>
            {(searchQuery || typeFilter || difficultyFilter) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setTypeFilter("");
                  setDifficultyFilter("");
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
          <div className="grid md:grid-cols-3 gap-4">
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((item: any) => (
                <div key={item.id} className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
                  {/* Header with badges */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-bold text-[#F4F4F4] flex-1">{item.name || item.title}</h3>
                    <div className="flex flex-col gap-1 ml-2">
                      {item.isFeatured && (
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-yellow-500/20 text-yellow-400">
                          ⭐ Featured
                        </span>
                      )}
                      {item.isCustom ? (
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-500/20 text-blue-400">
                          👤 Custom
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-500/20 text-purple-400">
                          ⭐ Officiel
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="text-[#B0B3B8] text-sm mb-3 line-clamp-2">{item.description}</p>
                  )}

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div className="flex items-center gap-1 text-[#B0B3B8]">
                      <span>❤️</span>
                      <span>{item.likes || 0} likes</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#B0B3B8]">
                      <span>🔄</span>
                      <span>{item.usageCount || 0} utilisations</span>
                    </div>
                  </div>

                  {/* Creator & Date */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/5">
                    <div className="text-xs text-[#B0B3B8]">
                      {item.creator?.name ? (
                        <span>Par <span className="text-[#00BFFF]">{item.creator.name}</span></span>
                      ) : (
                        <span>Créateur inconnu</span>
                      )}
                    </div>
                    <div className="text-xs text-[#B0B3B8]">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString('fr-FR') : 'N/A'}
                    </div>
                  </div>

                  {/* Type, Variant & Difficulty */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.type && (
                      <span className="px-2 py-1 rounded text-xs bg-[#1B1F3B] text-[#B0B3B8]">
                        {item.type}
                      </span>
                    )}
                    {item.variant && (
                      <span className="px-2 py-1 rounded text-xs bg-[#1B1F3B] text-[#B0B3B8]">
                        {item.variant}
                      </span>
                    )}
                    {item.difficulty && (
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.difficulty === 'ADVANCED' ? 'bg-red-500/20 text-red-400' :
                        item.difficulty === 'INTERMEDIATE' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {item.difficulty}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button onClick={() => { setEditing(item); setShowModal(true); }} className="flex-1 px-3 py-2 bg-[#1B1F3B] text-[#00BFFF] rounded text-sm">Modifier</button>
                    <button onClick={() => handleDelete(item.id)} className="flex-1 px-3 py-2 bg-red-500/10 text-red-400 rounded text-sm">Supprimer</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-[#B0B3B8]">Aucun programme</div>
            )}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 overflow-y-auto">
            <div className="bg-[#2C2F38] rounded-xl border border-white/10 w-full max-w-3xl p-6 my-8 mx-4">
              <h3 className="text-2xl font-bold text-[#F4F4F4] mb-6">{editing ? "Modifier" : "Creer"} un programme</h3>
              <ProgramForm
                program={editing}
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
