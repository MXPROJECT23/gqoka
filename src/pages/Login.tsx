import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMsg(error.message);
    else navigate('/wardrobe');
  };

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    setMsg(error ? error.message : 'Vérifie ta boîte mail pour confirmer.');
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-serif mb-6">Connexion</h1>
      <form className="space-y-4" onSubmit={onLogin}>
        <input className="border w-full px-3 py-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <div className="relative">
          <input className="border w-full px-3 py-2 rounded pr-10" placeholder="Mot de passe" type={show?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} />
          <button type="button" onClick={()=>setShow(s=>!s)} className="absolute right-2 top-2 text-sm">{show?'🙈':'👁️'}</button>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded w-full">Se connecter</button>
        <button onClick={onSignup} className="border px-4 py-2 rounded w-full" type="button">Créer un compte</button>
      </form>
      <div className="mt-3">
        <Link to="/forgot-password" className="text-sm underline">Mot de passe oublié</Link>
      </div>
      {msg && <p className="mt-4 text-sm text-neutral-600">{msg}</p>}
    </div>
  );
}
