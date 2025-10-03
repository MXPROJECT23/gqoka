import { useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import BrandAutocomplete from "../components/BrandAutocomplete";
import ColorAutocomplete from "../components/ColorAutocomplete";
import SizeAutocomplete from "../components/SizeAutocomplete";
import TypeAutocomplete from "../components/TypeAutocomplete";

type Item = {
  title: string;
  brand: string;
  color: string;
  size: string;
  type: string;
  photos: string[];
};

export default function AddItem() {
  const [item, setItem] = useState<Item>({
    title: "",
    brand: "",
    color: "",
    size: "",
    type: "",
    photos: [],
  });

  const inputCamera = useRef<HTMLInputElement>(null);
  const inputGallery = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || !files.length) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Connecte-toi");

    const urls: string[] = [];
    for (const f of Array.from(files)) {
      const path = `${user.id}/${Date.now()}-${f.name}`;
      const up = await supabase.storage.from("wardrobe").upload(path, f, { upsert: false });
      if (up.error) { alert(up.error.message); continue; }
      const pub = supabase.storage.from("wardrobe").getPublicUrl(path);
      if (pub.data?.publicUrl) urls.push(pub.data.publicUrl);
    }
    setItem((it) => ({ ...it, photos: [...it.photos, ...urls] }));
  }

  async function save() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return alert("Connecte-toi");
    const { error } = await supabase.from("items").insert({
      user_id: user.id,
      title: item.title,
      brand: item.brand,
      color: item.color,
      size: item.size,
      type: item.type,
      photos: item.photos,
    });
    if (error) return alert(error.message);
    window.location.href = "/wardrobe";
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold">Ajouter un vêtement</h1>

      {/* GRID 2 COLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Titre plein largeur */}
        <div className="md:col-span-2">
          <input
            className="input w-full"
            placeholder="Titre"
            value={item.title}
            onChange={(e) => setItem({ ...item, title: e.target.value })}
          />
        </div>

        {/* Ligne 1 : Marque / Couleur */}
        <BrandAutocomplete
          value={item.brand}
          onChange={(v) => setItem({ ...item, brand: v })}
          placeholder="Marque"
        />
        <ColorAutocomplete
          value={item.color}
          onChange={(v) => setItem({ ...item, color: v })}
          placeholder="Couleur"
        />

        {/* Ligne 2 : Taille / Type */}
        <SizeAutocomplete
          value={item.size}
          onChange={(v) => setItem({ ...item, size: v })}
          placeholder="Taille"
        />
        <TypeAutocomplete
          value={item.type}
          onChange={(v) => setItem({ ...item, type: v })}
          placeholder="Type (t-shirt, robe…)"
        />

        {/* Ligne 3 : Caméra + Galerie / Enregistrer */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn rounded-full h-14 w-14 flex items-center justify-center"
            aria-label="Prendre une photo"
            onClick={() => inputCamera.current?.click()}
            title="Prendre une photo"
          >
            {/* camera icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 7h3l2-2h6l2 2h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
          <input
            ref={inputCamera}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <button
            type="button"
            className="btn rounded-full h-14 w-14 flex items-center justify-center"
            aria-label="Choisir depuis la galerie"
            onClick={() => inputGallery.current?.click()}
            title="Choisir depuis la galerie"
          >
            {/* gallery icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 15l3-3 3 3 3-4 4 5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="9" cy="9" r="1.25" fill="currentColor"/>
            </svg>
          </button>
          <input
            ref={inputGallery}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        <div className="flex md:justify-end">
          <button className="btn btn-primary px-6" onClick={save}>Enregistrer</button>
        </div>

        {/* Prévisualisation – pleine largeur */}
        <div className="md:col-span-2 grid grid-cols-3 sm:grid-cols-6 gap-3">
          {item.photos.map((url, i) => (
            <div key={i} className="aspect-square rounded-lg overflow-hidden border bg-neutral-50">
              <img src={url} alt={`photo ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

