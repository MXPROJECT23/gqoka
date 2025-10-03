import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  async function onSignOut() {
    await supabase.auth.signOut();
    navigate("/"); // retour accueil
  }

  return (
    <button
      onClick={onSignOut}
      aria-label="Se déconnecter"
      className="ml-3 inline-flex items-center justify-center h-9 w-9 rounded-full
                 border border-neutral-300 hover:bg-neutral-100 transition"
      title="Se déconnecter"
    >
      {/* Icône "power" épurée */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 3v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M6.2 6.2a8 8 0 1 0 11.6 0" stroke="currentColor" strokeWidth="1.8" fill="none"/>
      </svg>
    </button>
  );
}
