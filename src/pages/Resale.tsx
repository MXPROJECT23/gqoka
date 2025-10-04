import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type Garment = { id:string; title:string|null; brand:string|null; color:string|null; size:string|null; category:string|null; };
type Photo = { id:string; url:string };

export default function Resale() {
  const { id } = useParams();
  const [g, setG] = useState<Garment | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      const { data: gd } = await supabase.from('garments').select('*').eq('id', id).single();
      setG(gd);
      const { data: pd } = await supabase.from('photos').select('*').eq('garment_id', id);
      setPhotos(pd ?? []);
    };
    load();
  }, [id]);

  if (!g) return <div className="max-w-3xl mx-auto p-6">Chargement…</div>;

  const desc = `
${g.title ?? 'Pièce'} ${g.brand ? 'de marque ' + g.brand : ''}${g.category ? ' ('+g.category+')' : ''}.
Taille ${g.size ?? '—'}, couleur ${g.color ?? '—'}.
Qualités: confort, style, polyvalence. Soins apportés. 
Vendu car nouvelle collection. Livraison rapide, article nettoyé.
`;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-serif mb-6">Seconde Vie — {g.title ?? 'Article'}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid gap-3">
          {photos.length ? photos.map(p => (
            <img key={p.id} src={p.url} className="w-full rounded-lg object-cover" />
          )) : <div className="aspect-square bg-neutral-100 grid place-items-center text-neutral-500">Photo</div>}
        </div>
        <div>
          <h2 className="font-medium mb-2">{[g.brand, g.category].filter(Boolean).join(' · ')}</h2>
          <p className="text-sm whitespace-pre-wrap">{desc.trim()}</p>
          <div className="mt-4 text-sm text-neutral-600">Texte généré par Anna selon vos attributs.</div>
        </div>
      </div>
    </div>
  );
}
