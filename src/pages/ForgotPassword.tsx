import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const onReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/login' });
    setMsg(error ? error.message : 'Email envoyé si le compte existe.');
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-serif mb-6">Mot de passe oublié</h1>
      <form className="space-y-4" onSubmit={onReset}>
        <input className="border w-full px-3 py-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="bg-black text-white px-4 py-2 rounded w-full">Envoyer le lien</button>
      </form>
      {msg && <p className="mt-4 text-sm">{msg}</p>}
    </div>
  );
}
