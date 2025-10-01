import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://gqoka.com/login",
    });
    setMsg(error ? `Erreur: ${error.message}` : "Email envoyé si le compte existe ✅");
  };

  return (
    <>
      <Header />
      <main className="container py-16 max-w-md">
        <h1 className="text-3xl font-bold mb-6">Réinitialiser le mot de passe</h1>
        <form onSubmit={submit} className="card space-y-4">
          <input className="input" type="email" placeholder="Votre email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <button className="btn w-full">Envoyer le lien</button>
          {msg && <p className="text-sm">{msg}</p>}
        </form>
      </main>
      <Footer />
    </>
  );
}
