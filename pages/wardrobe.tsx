import { useState } from "react";
import Head from "next/head";
import PhotoUploader from "@/components/PhotoUploader";

type Item = { id: string; name: string; category: string; color?: string };

export default function Wardrobe() {
  const [items, setItems] = useState<Item[]>([]);

  const addItem = async (file: File) => {
    // TODO: remplacer par appel Supabase Storage + fonction d'inférence d'Anna
    const tmp: Item = {
      id: crypto.randomUUID(),
      name: "Vêtement ajouté",
      category: "à classer",
      color: "à détecter"
    };
    setItems((prev) => [tmp, ...prev]);
  };

  return (
    <>
      <Head><title>Garde-robe — GQOKA</title></Head>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Ma garde-robe</h1>

        <PhotoUploader onSelected={addItem} />

        <div className="mt-8">
          <h2 className="font-semibold mb-3">Mes articles</h2>
          {items.length === 0 ? (
            <p className="text-gray-500">Ajoutez votre premier article.</p>
          ) : (
            <ul className="grid-auto">
              {items.map((it) => (
                <li key={it.id} className="card">
                  <div className="flex justify-between">
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


