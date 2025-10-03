import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const navigate = useNavigate();

  async function onSignOut() {
    await supabase.auth.signOut();
    navigate("/"); // retour page d’accueil
  }

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo / titre */}
        <Link to="/" className="font-semibold tracking-wide">
          GQOKA
        </Link>

        {/* Liens + bouton power */}
        <div className="flex items-center">
          <Link
            to="/dashboard"
            className="text-sm text-neutral-700 hover:text-black"
          >
            Dashboard
          </Link>

          <Link
            to="/profile"
            className="ml-5 text-sm text-neutral-700 hover:text-black"
          >
            Profil
          </Link>

          {/* Bouton Déconnexion (icône power) */}
          <button
            onClick={onSignOut}
            aria-label="Se déconnecter"
            title="Se déconnecter"
            className="ml-3 inline-flex items-center justify-center h-9 w-9 rounded-full
                       border border-neutral-300 hover:bg-neutral-100 transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3v8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M6.2 6.2a8 8 0 1 0 11.6 0"
                stroke="currentColor"
                strokeWidth="1.8"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
