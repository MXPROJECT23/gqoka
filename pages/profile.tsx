import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  // Récupération du user
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Erreur récupération user:", error.message);
        return;
      }

      if (data?.user) {
        setUser(data.user);
        setEmail(data.user.email || ""); // fallback si undefined
        setUsername(data.user.user_metadata?.username || "");
        setAvatarUrl(data.user.user_metadata?.avatar_url || "");
      } else {
        setUser(null);
      }
    };

    getUser();
  }, []);

  // Mise à jour du profil
  const handleUpdateProfile = async () => {
    if (!user) return;

    const { error } = await supabase.auth.updateUser({
      data: { username, avatar_url: avatarUrl },
    });

    if (error) {
      alert("Erreur mise à jour profil : " + error.message);
    } else {
      alert("✅ Profil mis à jour avec succès !");
    }
  };

  // Déconnexion
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("Erreur déconnexion : " + error.message);
    } else {
      router.push("/"); // redirection vers la page d’accueil
    }
  };

  return (
    <main className="container mx-auto px-6 py-16 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>

      {user ? (
        <div className="space-y-6">
          {/* Email (lecture seule) */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              value={email}
              disabled
              className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-600"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-1">Nom d’utilisateur</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Avatar */}
          <div>
            <label className="block text-sm font-medium mb-1">Photo de profil (URL)</label>
            <input
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Bouton sauvegarde */}
          <button
            onClick={handleUpdateProfile}
            className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800"
          >
            Mettre à jour
          </button>

          {/* Bouton déconnexion */}
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700"
          >
            Se déconnecter
          </button>
        </div>
      ) : (
        <p>Veuillez vous connecter pour voir votre profil.</p>
      )}
    </main>
  );
}


