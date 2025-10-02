import { useEffect, useState } from "react";
import Head from "next/head";
import PhotoUploader from "@/components/PhotoUploader";
import { supabase } from "@/lib/supabaseClient";
import { getWeather, weatherAdvice } from "@/lib/weather";

type Item = { id: string; name: string; category: string; color?: string; image_url?: string };

export default function Wardrobe() {
  const [items, setItems] = useState<Item[]>([]);
  const [email, setEmail] = useState<string | null>(null);
  const [weatherText, setWeatherText] = useState<string>("");

  const bucket = "wardrobe";

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    // météo Paris par défaut
    getWeather(48.8566, 2.3522).then((w) => setWeatherText(weatherAdvice(w)));
  }, []);

  const addItem = async (file: File) => {
    if (!email) { alert("Connecte-toi d'abord."); return; }
    const filePath = `${email}/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from(bucket).upload(filePath, file);
    if (error) { alert(error.message); return; }
    const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(filePath);

    const res = await fetch("/api/anna-classify", { method: "POST", body: await file.arrayBuffer() });
    const meta = await res.json();

    const newItem: Item = {
      id: crypto.randomUUID(),
      name: meta.name ?? "Vêtement",
      category: meta.category ?? "à classer",
      color: meta.color ?? "à détecter",
      image_url: publicUrl.publicUrl
    };
    setItems((prev) => [newItem, ...prev]);
  };

  const revendre = async (item: Item) => {
    const res = await fetch("/api/revente", {
      method: "POST",
      body: JSON.stringify(item)
    });
    const { texte, hashtags } = await res.json();
    alert(`Texte prêt : \n\n${texte}\n\n${hashtags}`);
  };

  return (
    <>
      <Head><title>Garde-robe — GQOKA</title></Head>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Ma garde-robe avec Anna</h1>
        <p className="text-gray-600 mb-6">Anna dit : {weatherText}</p>

        {!email ? (
          <p className="text-gray-600">Connecte-toi pour ajouter des articles.</p>
        ) : (
          <PhotoUploader onSelected={addItem} />
        )}

        <div className="mt-8">
          <h2 className="font-semibold mb-3">Mes articles</h2>
          {items.length === 0 ? (
            <p className="text-gray-500">Ajoute ton premier article.</p>
          ) : (
            <ul className="grid-auto">
              {items.map((it) => (
                <li key={it.id} className="card">
                  {it.image_url && <img src={it.image_url} alt={it.name} className="w-full rounded-xl" />}
                  <div className="mt-3 flex justify-between">
                    <div>
                      <div className="font-medium">{it.name}</div>
                      <div className="text-sm text-gray-500">{it.category}</div>
                    </div>
                    <div className="text-xs text-gray-500">{it.color}</div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-1 border rounded-lg text-sm">Éditer</button>
                    <button className="px-3 py-1 border rounded-lg text-sm">Favori</button>
                    <button className="px-3 py-1 border rounded-lg text-sm">Partager</button>
                    <button className="px-3 py-1 border rounded-lg text-sm bg-gray-100" onClick={() => revendre(it)}>
                      Revendre
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
