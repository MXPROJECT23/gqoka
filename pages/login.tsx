"use client";
import { useState } from "react";
import Head from "next/head";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [message, setMessage] = useState("");

  // Connexion classique
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setMessage(error.message);
    else router.push("/wardrobe");
  };

  // Connexion par lien sécurisé
  const handleMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: "https://gqoka.com/wardrobe" },
    });
    if (error) setMessage(error.message);
    else setMessage("Un lien sécurisé vient d’être envoyé à ton email.");
  };

  return (
    <>
      <Head>
        <title>Connexion — GQOKA</title>
      </Head>
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
          <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="exemple@email.com"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium mb-1">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 pr-10"
                  placeholder="Votre mot de passe"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  onClick={() => setShowPw(!showPw)}
                >
                  {showPw ? "👁️" : "🙈"}
                </button>
              </div>
              <div className="text-right mt-1">
                <a href="/reset-password" className="text-sm text-blue-600 hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            {/* Connexion bouton */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">— ou —</div>

          {/* Lien sécurisé */}
          <div className="mt-4">
            <button
              onClick={handleMagicLink}
              className="w-full border py-2 rounded-lg hover:bg-gray-50"
            >
              Recevoir un lien sécurisé
            </button>
          </div>

          {message && (
            <p className="mt-4 text-center text-sm text-red-500">{message}</p>
          )}
        </div>
      </main>
    </>
  );
}

