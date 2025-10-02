// pages/auth.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function Auth() {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLoading(true);
    setMessage(null);
    try {
      // choisir signin par mot de passe (adaptable en magic link si tu veux)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Connecté — redirection...");
        router.push("/profile");
      }
    } catch (err: any) {
      setMessage(err?.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) setMessage(error.message);
      else setMessage("Inscription : vérifie ton email (si confirmé par mail)");
    } catch (err: any) {
      setMessage(err?.message || "Erreur inscription");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (!email) return setMessage("Indique l'email pour réinitialiser");
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`, // ajuste si besoin
      });
      if (error) setMessage(error.message);
      else setMessage("Mail de réinitialisation envoyé si l'email existe.");
    } catch (err: any) {
      setMessage(err?.message || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-6 py-16 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Connexion / Inscription</h1>

      <div className="mb-4 flex gap-2">
        <button
          className={`px-4 py-2 rounded ${mode === "signin" ? "bg-black text-white" : "bg-gray-100"}`}
          onClick={() => setMode("signin")}
        >
          Se connecter
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === "signup" ? "bg-black text-white" : "bg-gray-100"}`}
          onClick={() => setMode("signup")}
        >
          S'inscrire
        </button>
      </div>

      <label className="block mb-2">Email</label>
      <input
        className="w-full border rounded px-3 py-2 mb-3"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="moi@exemple.com"
      />

      <label className="block mb-2">Mot de passe</label>
      <input
        className="w-full border rounded px-3 py-2 mb-3"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />

      <div className="flex gap-3 items-center">
        {mode === "signin" ? (
          <button onClick={handleSignIn} className="bg-black text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        ) : (
          <button onClick={handleSignUp} className="bg-black text-white px-4 py-2 rounded" disabled={loading}>
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        )}

        <button onClick={handleForgot} className="text-sm text-gray-600 underline">
          Mot de passe oublié ?
        </button>
      </div>

      {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

      <hr className="my-6" />
      <p className="text-sm text-gray-600">
        Ou utilise la <strong>connexion par lien magique</strong> (optionnel). Si tu veux je l'active.
      </p>
    </main>
  );
}

