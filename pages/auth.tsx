import { useState } from "react";
import Head from "next/head";
import { supabase } from "@/lib/supabaseClient";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const sendLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: typeof window !== "undefined" ? window.location.origin : undefined }
    });
    if (error) alert(error.message);
    else setSent(true);
  };

  return (
    <>
      <Head><title>Connexion — GQOKA</title></Head>
      <main className="mx-auto max-w-md px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">Connexion</h1>
        {sent ? (
          <p className="text-gray-600">Lien envoyé. Vérifie ta boîte mail.</p>
        ) : (
          <div className="card">
            <label className="flex flex-col gap-2">
              <span className="text-sm text-gray-600">Email</span>
              <input
                type="email"
                className="border rounded-lg px-3 py-2"
                placeholder="nom@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button className="btn mt-4 w-full" onClick={sendLink} aria-label="Envoyer le lien">
              Recevoir un lien magique
            </button>
          </div>
        )}
      </main>
    </>
  );
}
