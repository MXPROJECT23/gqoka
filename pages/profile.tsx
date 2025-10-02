import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Profil() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        setEmail(data.user.email);
        setUsername(data.user.user_metadata?.username || "");
        setAvatarUrl(data.user.user_metadata?.avatar_url || "");
      } else {
        router.push("/login"); // Redirige si pas connecté
      }
      setLoading(false);
    }
    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleSave = async () => {
    if (!user) return;
    const updates = {
      username,
      avatar_url: avatarUrl,
    };
    const { error } = await supabase.auth.updateUser({ data: updates });
    if (error) alert("Erreur lors de la mise à jour : " + error.message);
    else alert("Profil mis à jour ✅");
  };

  if (loading) return <p className="text-center mt-20">Chargement...</p>;

  return (
    <main className="container mx-auto px-6 py-20 max-w-xl">
      <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>

      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={avatarUrl || "https://via.placeholder.com/100"}
          alt="Avatar"
          className="w-24 h-24 rounded-full border mb-4 object-cover"
        />
        <input
          type="url"
          placeholder="URL de l'avatar"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>

      {/* Infos utilisateur */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            disabled
            className="border rounded px-3 py-2 w-full bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded px-3 py-2 w-full"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Sauvegarder
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
        >
          Déconnexion
        </button>
      </div>
    </main>
  );
}

