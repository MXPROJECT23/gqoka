"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { supabase } from "@/lib/supabaseClient";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const bucket = "avatars";

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error) console.error(error);
      else setUser(data.user);
    });
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!user) return;
      const file = e.target.files?.[0];
      if (!file) return;

      const filePath = `${user.id}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from(bucket).upload(filePath, file, { upsert: true });
      if (error) throw error;

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      setAvatarUrl(data.publicUrl);

      // On stocke l'avatar dans le profil user_metadata
      await supabase.auth.updateUser({
        data: { avatar_url: data.publicUrl },
      });

      setMessage("Avatar mis à jour avec succès.");
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Mon profil — GQOKA</title>
      </Head>
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow space-y-6">
          <h1 className="text-2xl font-bold text-center">Mon Profil</h1>

          {user ? (
            <>
              {/* Avatar */}
              <div className="text-center">
                <img
                  src={avatarUrl || user.user_metadata?.avatar_url || "/default-avatar.png"}
                  alt="avatar"
                  className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                />
                <input type="file" accept="image/*" onChange={handleAvatarUpload} />
              </div>

              {/* Infos utilisateur */}
              <div className="space-y-2">
                <p><span className="font-medium">Identifiant :</span> {user.id}</p>
                <p><span className="font-medium">Email :</span> {user.email}</p>
                <p>
                  <span className="font-medium">Inscrit le :</span>{" "}
                  {new Date(user.created_at).toLocaleDateString("fr-FR")}
                </p>
              </div>

              {/* Bouton mot de passe */}
              <div className="pt-4">
                <a
                  href="/reset-password"
                  className="w-full block text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800"
                >
                  Modifier mon mot de passe
                </a>
              </div>
            </>
          ) : (
            <p className="text-gray-600">Connecte-toi pour voir ton profil.</p>
          )}

          {message && (
            <p className="mt-4 text-center text-sm text-green-600">{message}</p>
          )}
        </div>
      </main>
    </>
  );
}



