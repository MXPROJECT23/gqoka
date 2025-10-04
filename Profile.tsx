import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const id = data.user?.id;
      if (!id) return;
      const { data: pr } = await supabase.from('profiles').select('*').eq('id', id).single();
      if (pr) { setUsername(pr.username ?? ''); setAvatarUrl(pr.avatar_url ?? null); }
    });
  }, []);

  const onSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return setMsg('Non connecté');
    const { error } = await supabase.from('profiles').upsert({ id: user.id, username, avatar_url: avatarUrl ?? null });
    setMsg(error ? error.message : 'Profil enregistré');
  };

  const onAvatar = async (file: File) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const path = `${user.id}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('avatars').upload(path, file);
    if (error) return setMsg(error.message);
    const { data } = supabase.storage.from('avatars').getPublicUrl(path);
    setAvatarUrl(data.publicUrl);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-serif mb-6">Profil</h1>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <img src={avatarUrl ?? 'https://placehold.co/80x80?text=Avatar'} className="w-16 h-16 rounded-full object-cover border" />
          <label className="border px-3 py-2 rounded cursor-pointer">
            Changer l’avatar
            <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files && onAvatar(e.target.files[0])} />
          </label>
        </div>
        <input className="border px-3 py-2 rounded" placeholder="Identifiant" value={username} onChange={e=>setUsername(e.target.value)} />
        <button onClick={onSave} className="bg-black text-white px-4 py-2 rounded">Enregistrer</button>
        {msg && <p className="text-sm">{msg}</p>}
      </div>
    </div>
  );
}
