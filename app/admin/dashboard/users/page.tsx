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

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "email" | "date">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");

  // Filter and sort users
  const filteredUsers = Array.isArray(users) ? (users as Array<Record<string, string | boolean>>).filter((user) => {
    const matchesSearch = searchQuery === "" ||
      String(user.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(user.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(user.id || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" ||
      (roleFilter === "admin" && user.isAdmin) ||
      (roleFilter === "user" && !user.isAdmin);

    return matchesSearch && matchesRole;
  }).sort((a, b) => {
    let comparison = 0;

    if (sortBy === "name") {
      comparison = String(a.name || "").localeCompare(String(b.name || ""));
    } else if (sortBy === "email") {
      comparison = String(a.email || "").localeCompare(String(b.email || ""));
    } else if (sortBy === "date") {
      comparison = new Date(String(a.createdAt || 0)).getTime() - new Date(String(b.createdAt || 0)).getTime();
    }

    return sortOrder === "asc" ? comparison : -comparison;
  }) : [];

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
        // Pour l'update, ne pas envoyer le password s'il est vide
        const cleanData: { name: string; email: string; password?: string } = {
          name: formData.name,
          email: formData.email,
        };
        // Seulement ajouter le password s'il n'est pas vide
        if (formData.password && formData.password.trim()) {
          cleanData.password = formData.password;
        }
        await api.updateUser(editingUser.id, cleanData);
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

        {/* Filters */}
        <div className="bg-[#2C2F38] rounded-xl p-4 border border-white/10 mb-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Recherche</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nom, email ou ID..."
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Rôle</label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as "all" | "admin" | "user")}
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              >
                <option value="all">Tous</option>
                <option value="admin">Admins</option>
                <option value="user">Utilisateurs</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#F4F4F4] mb-2">Trier par</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "email" | "date")}
                className="w-full px-3 py-2 bg-[#1B1F3B] border border-white/10 rounded-lg text-[#F4F4F4] focus:border-[#00BFFF] focus:outline-none"
              >
                <option value="date">Date de création</option>
                <option value="name">Nom</option>
                <option value="email">Email</option>
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
              {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''} trouvé{filteredUsers.length > 1 ? 's' : ''}
            </p>
            {(searchQuery || roleFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setRoleFilter("all");
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
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr key={String(user.id)} className="hover:bg-[#1B1F3B]/50 transition-colors">
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
                            onClick={() => handleEdit(user as Record<string, string>)}
                            className="text-[#8E2DE2] hover:text-[#8E2DE2]/80 mr-3"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(String(user.id))}
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
