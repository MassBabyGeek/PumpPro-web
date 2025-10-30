"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import ChallengeForm from "@/components/ChallengeForm";
import { useChallenges, useAuth } from "@/hooks/useAPI";
import { api } from "@/lib/api";

export default function ChallengesPage() {
  const { challenges, loading, refetch } = useChallenges();
  const { token } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);

  const handleSubmit = async (formData: any) => {
    if (!token) return;
    try {
      if (editing) {
        await api.updateChallenge(editing.id, formData, token);
      } else {
        await api.createChallenge(formData, token);
      }
      setShowModal(false);
      setEditing(null);
      refetch();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur");
    }
  };

  const handleDelete = async (id: string) => {
    if (!token || !confirm("Supprimer ce challenge ?")) return;
    try {
      await api.deleteChallenge(id, token);
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

        {loading ? (
          <div className="text-[#B0B3B8] text-center py-12">Chargement...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {Array.isArray(challenges) && challenges.length > 0 ? (
              (challenges as Array<Record<string, string>>).map((item) => (
                <div key={item.id} className="bg-[#2C2F38] rounded-xl p-4 border border-white/10">
                  <h3 className="text-lg font-bold text-[#F4F4F4] mb-2">{item.title || item.name}</h3>
                  <p className="text-[#B0B3B8] text-sm mb-3">{item.description}</p>
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
