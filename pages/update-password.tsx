"use client";
import { useState } from "react";
import Head from "next/head";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";

export default function UpdatePassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage("Erreur : " + error.message);
    } else {
      setMessage("Mot de passe mis à jour avec succès !");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <>
      <Head>
        <title>Nouveau mot de passe — GQOKA</title>
      </Head>
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow">
          <h1 className="text-2xl font-bold text-center mb-6">
            Définir un nouveau mot de passe
          </h1>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            >
              Mettre à jour
            </button>
          </form>

          {message && (
            <p className="mt-4 text-center text-sm text-green-600">{message}</p>
          )}
        </div>
      </main>
    </>
  );
}
