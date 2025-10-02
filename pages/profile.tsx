import { useUser } from "@supabase/auth-helpers-react";
import ProtectedRoute from "../components/ProtectedRoute";

function Profil() {
  const user = useUser();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Mon Profil</h1>
      {user ? (
        <div className="space-y-4">
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Identifiant :</strong> {user.id}</p>
          <img
            src="/default-avatar.png"
            alt="Avatar"
            className="w-24 h-24 rounded-full border"
          />
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <Profil />
    </ProtectedRoute>
  );
}



