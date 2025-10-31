"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { useUsers } from "@/hooks/useAPI";
import { api } from "@/lib/api";

export default function UsersPage() {
  const { users, loading, refetch } = useUsers();
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<Record<string, string> | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleCreate = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "", password: "" });
    setShowModal(true);
  };

  const handleEdit = (user: Record<string, string>) => {
    setEditingUser(user);
    setFormData({ name: user.name || "", email: user.email || "", password: "" });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    try {
      if (editingUser) {
        await api.updateUser(editingUser.id, formData);
      } else {
        await api.createUser(formData);
      }
      setShowModal(false);
      refetch();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;

    try {
      await api.deleteUser(id);
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
            <h2 className="text-2xl font-bold text-[#F4F4F4]">Utilisateurs</h2>
            <p className="text-[#B0B3B8] text-sm">Gerer tous les utilisateurs</p>
          </div>
          <button
            onClick={handleCreate}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] text-white font-semibold hover:opacity-90 transition-opacity text-sm"
          >
            + Creer
          </button>
        </div>

        {loading ? (
          <div className="text-[#B0B3B8] text-center py-12">Chargement...</div>
        ) : (
          <div className="bg-[#2C2F38] rounded-xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1B1F3B]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#B0B3B8] uppercase">Photo</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#B0B3B8] uppercase">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#B0B3B8] uppercase">Nom</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-[#B0B3B8] uppercase">Email</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-[#B0B3B8] uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {Array.isArray(users) && users.length > 0 ? (
                    (users as Array<Record<string, string>>).map((user) => (
                      <tr key={user.id} className="hover:bg-[#1B1F3B]/50 transition-colors">
                        <td className="px-4 py-3">
                          <Link href={`/admin/dashboard/users/${user.id}`} className="block">
                            {(() => {
                              const imageUrl = String(user.profilePicture || user.profilePictureUrl || user.avatar || "");
                              const isValidUrl = imageUrl && !imageUrl.startsWith("file://") && (imageUrl.startsWith("http://") || imageUrl.startsWith("https://"));

                              return isValidUrl ? (
                                <Image src={imageUrl} alt={String(user.name || user.email)} width={40} height={40} className="w-10 h-10 rounded-full object-cover border border-white/10 hover:border-[#00BFFF] transition-colors" />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] flex items-center justify-center text-white text-sm font-semibold hover:opacity-80 transition-opacity">
                                  {String(user.name || "?").charAt(0).toUpperCase()}
                                </div>
                              );
                            })()}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-sm text-[#B0B3B8]">{String(user.id).slice(0, 8)}...</td>
                        <td className="px-4 py-3 text-sm text-[#F4F4F4] font-medium">
                          <Link href={`/admin/dashboard/users/${user.id}`} className="hover:text-[#00BFFF] transition-colors">
                            {user.name}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-sm text-[#B0B3B8]">{user.email}</td>
                        <td className="px-4 py-3 text-sm text-right">
                          <Link
                            href={`/admin/dashboard/users/${user.id}`}
                            className="text-[#00BFFF] hover:text-[#00BFFF]/80 mr-3"
                          >
                            Voir
                          </Link>
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-[#8E2DE2] hover:text-[#8E2DE2]/80 mr-3"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-400 hover:text-red-400/80"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-[#B0B3B8]">
                        Aucun utilisateur
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2C2F38] rounded-xl border border-white/10 w-full max-w-md p-6">
              <h3 className="text-xl font-bold text-[#F4F4F4] mb-4">
                {editingUser ? "Modifier" : "Creer"} un utilisateur
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Nom</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
                    required
                  />
                </div>
                {!editingUser && (
                  <div>
                    <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Mot de passe</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
                      required
                    />
                  </div>
                )}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2 rounded-lg bg-[#1B1F3B] text-[#B0B3B8] hover:bg-[#1B1F3B]/80 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00BFFF] to-[#8E2DE2] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {submitting ? "..." : editingUser ? "Modifier" : "Creer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
