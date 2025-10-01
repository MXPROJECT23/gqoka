import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser(data.user);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

  return (
    <header className="w-full border-b bg-white fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl">
          GQOKA
        </Link>

        {/* Menu */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/wardrobe">Garde-robe</Link>
          <Link href="/chat">Chat</Link>
          <Link href="/profil">Profil</Link>

          {/* Déconnexion si connecté */}
          {user ? (
            <button
              onClick={handleLogout}
              title="Déconnexion"
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              🚪
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Connexion
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
