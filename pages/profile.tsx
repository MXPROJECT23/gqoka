import Head from "next/head";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Profile() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
  }, []);

  return (
    <>
      <Head><title>Profil — GQOKA</title></Head>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">Mon profil</h1>
        <div className="card mt-6">
          {email ? <p className="text-gray-700">Connecté en tant que <b>{email}</b></p> : <p>Non connecté.</p>}
        </div>
        <p className="text-xs text-gray-500 mt-4">Données traitées selon RGPD.</p>
      </main>
    </>
  );
}


