"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { api } from "@/lib/api";

export default function PhotosPage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const data = await api.getPhotos();
        setPhotos(Array.isArray(data) ? data : (data as any)?.data || []);
      } catch (error) {
        console.error("Erreur:", error);
        setPhotos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <DashboardLayout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#F4F4F4]">Photos</h2>
            <p className="text-[#B0B3B8] text-sm">Toutes les photos de profil des utilisateurs</p>
          </div>
          <div className="px-4 py-2 bg-[#2C2F38] border border-white/10 rounded-lg">
            <p className="text-[#F4F4F4] font-semibold">
              {photos.length} photo{photos.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-[#B0B3B8] text-center py-12">Chargement...</div>
        ) : photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photos.map((photo, index) => {
              const userId = photo.userId || photo.user?.id;
              const photoUrl = photo.url || photo.photoUrl || photo.profilePicture || photo.profilePictureUrl;
              const userName = photo.user?.name || photo.userName || photo.name;
              const userEmail = photo.user?.email || photo.userEmail || photo.email;

              return (
                <Link
                  key={index}
                  href={userId ? `/admin/dashboard/users/${userId}` : '#'}
                  className="bg-[#2C2F38] rounded-xl p-4 border border-white/10 hover:border-[#00BFFF]/50 transition-all block"
                >
                  <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-[#1B1F3B]">
                    {photoUrl ? (
                      <Image
                        src={String(photoUrl)}
                        alt={String(userName || userEmail || 'Photo')}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#B0B3B8]">
                        📸
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-[#F4F4F4] font-semibold text-sm truncate">
                      {userName || userEmail || 'Utilisateur'}
                    </p>
                    {userEmail && (
                      <p className="text-[#B0B3B8] text-xs truncate">{userEmail}</p>
                    )}
                    {userId && (
                      <p className="text-[#B0B3B8] text-xs mt-1 truncate">
                        ID: {String(userId).slice(0, 8)}...
                      </p>
                    )}
                    {photo.createdAt && (
                      <p className="text-[#B0B3B8] text-xs mt-1">
                        {new Date(photo.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#2C2F38] rounded-xl border border-white/10 p-12 text-center">
            <span className="text-6xl mb-4 block">📸</span>
            <p className="text-[#F4F4F4] font-semibold mb-2">Aucune photo</p>
            <p className="text-[#B0B3B8] text-sm">
              Aucun utilisateur n&apos;a encore ajouté de photo de profil
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
