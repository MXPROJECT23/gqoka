import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push("/auth"); // 🔑 Redirection si pas connecté
      } else {
        setUser(data.user);
      }
    };
    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth");
  };

  if (!user) return <p className="p-6">Chargement...</p>;

  return (
    <main className="container mx-auto px-6 py-16 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Mon Profil</h1>
      <p><strong>Email :</strong> {user.email}</p>
      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
      >
        Se déconnecter
      </button>
    </main>
  );
}
