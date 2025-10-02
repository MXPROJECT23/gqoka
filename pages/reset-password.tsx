"use client";
import { useState } from "react";
import Head from "next/head";
import { supabase } from "@/lib/supabaseClient";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://gqoka.com/update-password", // page où l'utilisateur va définir un nouveau mot de passe
    });

    if (error) setMessage(error.message);
    else setMessage("Un email de réinitialisation a été envoyé.");
  };

  return (
    <>
      <Head>
        <title>Réinitialiser le mot de passe — GQOKA</title>
      </Head>
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
          <h1 className="text-2xl font-bold text-center mb-6">
            Réinitialiser le mot de passe
          </h1>

          <form onSubmit={handleReset} className="space-y-4">
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

            {/* Bouton */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            >
              Envoyer un lien de réinitialisation
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-red-500">{message}</p>
          )}
        </div>
      </main>
    </>
  );
}
