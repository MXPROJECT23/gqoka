import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const { error } = await supabase.auth.signUp({ email, password: pass });
    setLoading(false);
    setMsg(error ? `Erreur: ${error.message}` : "Compte créé ✅ Vérifie ton email.");
  };

  return (
    <>
      <Header />
      <main className="container py-16 max-w-md">
        <h1 className="text-3xl font-bold mb-6">Créer un compte</h1>
        <form onSubmit={onSubmit} className="card space-y-4">
          <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Mot de passe" value={pass} onChange={e=>setPass(e.target.value)} required />
          <button className="btn w-full" disabled={loading}>{loading ? "…" : "S’inscrire"}</button>
          {msg && <p className="text-sm">{msg}</p>}
        </form>
      </main>
      <Footer />
    </>
  );
}


