import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMsg(null);
    const { error } = await supabase.auth.signUp({ email, password: pass });
    setLoading(false);
    if (error) setMsg(`Erreur: ${error.message}`);
    else setMsg("Compte créé. Vérifie ton email si la confirmation est activée.");
  };

  return (
    <>
      <Header />
      <main className="container py-16">
        <h1 className="text-3xl font-bold mb-6">Créer un compte</h1>
        <form onSubmit={onSubmit} className="card max-w-md space-y-4">
          <input className="w-full border rounded-lg px-4 py-3" placeholder="Email"
                 value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
          <input className="w-full border rounded-lg px-4 py-3" placeholder="Mot de passe"
                 value={pass} onChange={e=>setPass(e.target.value)} type="password" required />
          <button className="btn w-full" disabled={loading}>{loading ? "..." : "S’inscrire"}</button>
          {msg && <p className="text-sm text-red-600">{msg}</p>}
        </form>
      </main>
    </>
  );
}


