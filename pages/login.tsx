import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    setLoading(false);
    if (error) setMsg(`Erreur: ${error.message}`);
    else router.push("/wardrobe");
  };

  return (
    <>
      <Header />
      <main className="container py-16 max-w-md">
        <h1 className="text-3xl font-bold mb-6">Connexion</h1>
        <form onSubmit={onSubmit} className="card space-y-4">
          <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <div className="relative">
            <input
              className="input pr-12"
              placeholder="Mot de passe"
              value={pass}
              onChange={e=>setPass(e.target.value)}
              type={show ? "text" : "password"}
              required
            />
            <button type="button" onClick={()=>setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sm opacity-70">
              {show ? "🙈" : "👁️"}
            </button>
          </div>
          <button className="btn w-full" disabled={loading}>{loading ? "…" : "Se connecter"}</button>
          <div className="text-right"><a href="/reset-password" className="text-sm underline">Mot de passe oublié ?</a></div>
          {msg && <p className="text-sm text-red-600">{msg}</p>}
        </form>
      </main>
      <Footer />
    </>
  );
}

