// pages/profile.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

type SupaUser = {
  id: string;
  email?: string | null;
  user_metadata?: { username?: string; avatar_url?: string };
};

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<SupaUser | null>(null);
  const [email, setEmail] = useState<string>(""); // safe type
  const [username, setUsername] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Erreur récupération user:", error.message);
        setUser(null);
        return;
      }
      if (data?.user) {
        setUser(data.user as SupaUser);
        // defensive assignments (avoid undefined)
        setEmail((data.user.email as string) || "");
        setUsername((data.user.user_metadata?.username as string) || "");
        setAvatarUrl((data.user.user_metadata?.avatar_url as string) || "");
      } else {
        setUser(null);
      }
    }
    getUser();

    // subscribe to auth changes to keep UI in sync
    const { data: sub } = supabase.auth.onAuthStateChange((_event, _session) => {
      getUser();
    });
    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  const handleUpdateProfile = async () => {
    if (!user) return;
    const updates = {
      data: { username, avatar_url: avatarUrl },
    };
    const { error } = await supabase.auth.updateUser(updates);
    if (error) {
      alert("Erreur mise à jour profil : " + error.message);
    } else {
      alert("Profil mis à jour ✅");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  if (!user) {
    return (
      <main className="container mx-auto px-6 py-16 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Mon profil</h1>
        <p>Veuillez vous connecter pour voir votre profil.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-6 py-16 max-w-md">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold mb-4">Mon profil</h1>
        <button onClick={handleSignOut} className="bg-gray-100 px-3 py-1 rounded">
          Déconnexion
        </button>
      </div>

      <div className="space-y-4">
        {/* Email read-only */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="text" value={email} disabled className="w-full border rounded px-3 py-2 bg-gray-100" />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium">Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Avatar URL */}
        <div>
          <label className="block text-sm font-medium">Photo de profil (URL)</label>
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="https://..."
          />
        </div>

        <button onClick={handleUpdateProfile} className="w-full bg-black text-white py-2 rounded">
          Mettre à jour
        </button>
      </div>
    </main>
  );
}
