import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import CameraPicker from '../components/CameraPicker';
import AutoCompleteInput from '../components/AutoCompleteInput';
import { BRANDS, SIZES, CATEGORIES, COLORS } from '../lib/lists';
import { Link } from 'react-router-dom';

type Garment = {
  id: string;
  title: string | null;
  brand: string | null;
  color: string | null;
  size: string | null;
  category: string | null;
};

export default function Wardrobe() {
  const [items, setItems] = useState<Garment[]>([]);
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from('garments').select('*').order('created_at', { ascending: false });
    setItems(data ?? []);
  };

  useEffect(() => { load(); }, []);

  const onFiles = async (files: File[]) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return setMsg('Connecte-toi.');

    // create garment
    const { data: gi, error: ge } = await supabase.from('garments').insert({
      user_id: user.id, title, brand, size, category, color
    }).select().single();
    if (ge) return setMsg(ge.message);

    for (const f of files) {
      const path = `${user.id}/${gi.id}/${Date.now()}-${f.name}`;
      const up = await supabase.storage.from('garments').upload(path, f);
      if (up.error) { setMsg(up.error.message); continue; }
      const { data } = supabase.storage.from('garments').getPublicUrl(path);
      await supabase.from('photos').insert({ garment_id: gi.id, url: data.publicUrl });
    }
    setMsg('Ajouté');
    setTitle(''); setBrand(''); setSize(''); setCategory(''); setColor('');
    load();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-serif mb-6">Garde‑robe</h1>

      <div className="grid gap-3 md:grid-cols-5">
        <input className="border px-3 py-2 rounded" placeholder="Titre" value={title} onChange={e=>setTitle(e.target.value)} />
        <AutoCompleteInput options={BRANDS} placeholder="Marque" value={brand} onChange={e=>setBrand((e.target as HTMLInputElement).value)} />
        <AutoCompleteInput options={SIZES} placeholder="Taille" value={size} onChange={e=>setSize((e.target as HTMLInputElement).value)} />
        <AutoCompleteInput options={CATEGORIES} placeholder="Catégorie" value={category} onChange={e=>setCategory((e.target as HTMLInputElement).value)} />
        <AutoCompleteInput options={COLORS} placeholder="Couleur" value={color} onChange={e=>setColor((e.target as HTMLInputElement).value)} />
      </div>

      <div className="mt-4">
        <CameraPicker onFiles={onFiles} />
      </div>

      {msg && <p className="mt-3 text-sm">{msg}</p>}

      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(it => (
          <Link key={it.id} to={`/resale/${it.id}`} className="block border rounded-lg overflow-hidden group">
            <div className="aspect-square bg-neutral-100 grid place-items-center text-neutral-500">Photo</div>
            <div className="p-3">
              <div className="font-medium">{it.title ?? '(sans titre)'}</div>
              <div className="text-sm text-neutral-600">{[it.brand, it.size, it.color].filter(Boolean).join(' · ')}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
