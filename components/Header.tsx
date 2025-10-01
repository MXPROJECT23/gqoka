import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
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
    setMenuOpen(false);
  };

  return (
    <header className="w-full border-b bg-white fixed top-0 left-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl tracking-wide">
          GQOKA
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/wardrobe">Garde-robe</Link>
          <Link href="/chat">Chat</Link>
          <Link href="/profil">Profil</Link>

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

        {/* Mobile burger button */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </button>
      </div>

      {/* Mobile Menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={() => setMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-6 text-lg">
          <Link href="/wardrobe" onClick={() => setMenuOpen(false)}>
            Garde-robe
          </Link>
          <Link href="/chat" onClick={() => setMenuOpen(false)}>
            Chat
          </Link>
          <Link href="/profil" onClick={() => setMenuOpen(false)}>
            Profil
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              🚪 Déconnexion
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-black text-white rounded-lg text-center hover:bg-gray-800 transition"
              onClick={() => setMenuOpen(false)}
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}


