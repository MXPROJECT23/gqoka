import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import BrandAutocomplete from "../components/BrandAutocomplete";
import ColorAutocomplete from "../components/ColorAutocomplete";
import SizeAutocomplete from "../components/SizeAutocomplete";
import TypeAutocomplete from "../components/TypeAutocomplete";

type Item = {
  title: string; brand: string; color: string; size: string; type: string;
  photos: string[];
};

export default function AddItem() {
  const [item, setItem] = useState<Item>({
    title: "", brand: "", color: "", size: "", type: "", photos: []
  });

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
      photos: item.photos
    });
    if (error) return alert(error.message);
    window.location.href = "/wardrobe";
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Ajouter un vêtement</h1>

      <input
        className="input"
        placeholder="Titre"
        value={item.title}
        onChange={e => setItem({ ...item, title: e.target.value })}
      />

      <BrandAutocomplete
        value={item.brand}
        onChange={(v) => setItem({ ...item, brand: v })}
      />

      <ColorAutocomplete
        value={item.color}
        onChange={(v) => setItem({ ...item, color: v })}
      />

      <SizeAutocomplete
        value={item.size}
        onChange={(v) => setItem({ ...item, size: v })}
      />

      <TypeAutocomplete
        value={item.type}
        onChange={(v) => setItem({ ...item, type: v })}
      />

      <button className="btn btn-primary" onClick={save}>Enregistrer</button>
    </div>
  );
}
