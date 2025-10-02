import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Connexion
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("❌ Erreur de connexion : " + error.message);
    } else {
      router.push("/profile"); // Redirection après login
    }
    setLoading(false);
  };

  // Inscription
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert("❌ Erreur inscription : " + error.message);
    } else {
      alert("✅ Vérifiez vos emails pour confirmer l'inscription.");
    }
    setLoading(false);
  };

  return (
    <main className="container mx-auto px-6 py-16 max-w-sm">
      <h1 className="text-2xl font-bold mb-6">Connexion / Inscription</h1>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-gray-200 py-2 rounded hover:bg-gray-300"
        >
          {loading ? "Inscription..." : "Créer un compte"}
        </button>
      </form>
    </main>
  );
}
