// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [dest, setDest] = useState("/login");

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setDest(user ? "/dashboard" : "/login");
    })();
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">GQOKA</h1>
        <p className="text-neutral-600">
          Garde-robe intelligente. Conseils d’Anna. Prête pour la revente.
        </p>

        {/* CTA unique */}
        <div className="mt-6">
          <Link to={dest} className="btn btn-primary px-6">
            Commencer
          </Link>
        </div>
      </header>

      {/* Section d’information (optionnelle) */}
      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="card">
          <h3 className="font-semibold">Connexion sécurisée</h3>
          <p className="text-sm text-neutral-600">Supabase Auth email.</p>
        </div>

        <div className="card">
          <h3 className="font-semibold">Garde-robe</h3>
          <p className="text-sm text-neutral-600">
            Ajouter / modifier / supprimer vos vêtements.
          </p>
        </div>

        <div className="card">
          <h3 className="font-semibold">Anna + météo</h3>
          <p className="text-sm text-neutral-600">
            Suggestions de tenues contextuelles.
          </p>
        </div>
      </section>
    </main>
  );
}

