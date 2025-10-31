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

        {loading ? (
          <div className="text-[#B0B3B8] text-center py-12">Chargement...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {Array.isArray(programs) && programs.length > 0 ? (
              (programs as Array<Record<string, string>>).map((item) => (
                <div key={item.id} className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
                  <h3 className="text-lg font-bold text-[#F4F4F4] mb-2">{item.name || item.title}</h3>
                  <p className="text-[#B0B3B8] text-sm mb-3">{item.description}</p>
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
