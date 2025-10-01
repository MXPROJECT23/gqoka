import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";
import dynamic from "next/dynamic";

const Weather = dynamic(() => import("../components/Weather"), { ssr: false });

type Clothing = {
  id: string;
  name: string;
  photos: string[];
  price?: number;
  pitch?: string;
  certified?: boolean;
};

export default function Wardrobe() {
  const [wardrobe, setWardrobe] = useState<Clothing[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [price, setPrice] = useState<number | undefined>();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Charger utilisateur et garde-robe
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id);
        loadWardrobe(data.user.id);
      }
    });
  }, []);

  const loadWardrobe = async (uid: string) => {
    const { data, error } = await supabase.from("wardrobe").select("*").eq("user_id", uid);
    if (!error && data) setWardrobe(data);
  };

  const generatePitch = (name: string) => {
    return `✨ ${name} — une pièce intemporelle validée par Anna. Associez-la avec un jean brut et des sneakers minimalistes pour un look moderne.`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected].slice(0, 3)); // max 3 photos
  };

  const add = async () => {
    if (!userId) {
      alert("Connecte-toi d'abord.");
      return;
    }
    if (wardrobe.length >= 10) {
      alert("Limite de 10 pièces atteinte.");
      return;
    }
    if (files.length === 0) {
      alert("Ajoute au moins une photo.");
      return;
    }

    setLoading(true);

    // 1️⃣ Upload photos dans Supabase Storage
    const photoUrls: string[] = [];
    for (const f of files) {
      const path = `${userId}/${Date.now()}_${f.name}`;
      const { error } = await supabase.storage.from("wardrobe").upload(path, f, { upsert: true });
      if (!error) {
        const { data } = supabase.storage.from("wardrobe").getPublicUrl(path);
        photoUrls.push(data.publicUrl);
      }
    }

    // 2️⃣ Création en base
    const newItem = {
      user_id: userId,
      name: `Pièce ${wardrobe.length + 1}`,
      photos: photoUrls,
      price,
      pitch: generatePitch(`Pièce ${wardrobe.length + 1}`),
      certified: false,
    };

    const { data, error } = await supabase.from("wardrobe").insert([newItem]).select();
    setLoading(false);

    if (!error && data) {
      setWardrobe((prev) => [...prev, data[0]]);
      setFiles([]);
      setPrice(undefined);
    } else {
      alert("Erreur lors de l’ajout.");
    }
  };

  const copyPitch = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Pitch copié ✅");
  };

  return (
    <>
      <Header />
      <main className="container py-14">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Ma garde-robe</h1>
          <Weather />
        </div>

        {/* Ajout */}
        <div className="card space-y-4 mb-10">
          <input type="file" accept="image/*" capture="environment" multiple onChange={handleFileChange} className="input" />

          {/* Prévisualisation photos avant upload */}
          {files.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {files.map((f, i) => (
                <img key={i} src={URL.createObjectURL(f)} className="rounded-lg object-cover w-full h-24" alt="aperçu" />
              ))}
            </div>
          )}

          <input
            type="number"
            placeholder="Prix indicatif (€)"
            value={price || ""}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            className="input"
          />

          <button className="btn w-full" onClick={add} disabled={loading}>
            {loading ? "Ajout en cours…" : "Ajouter un vêtement"}
          </button>
        </div>

        {/* Liste */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wardrobe.map((it) => (
            <div key={it.id} className="card space-y-3">
              <div className="flex justify-between items-center">
                <div className="font-semibold">{it.name}</div>
                {it.certified && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Certifié</span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {it.photos.map((p, i) => (
                  <img key={i} src={p} className="rounded-lg object-cover w-full h-24" alt="vêtement" />
                ))}
              </div>
              {it.pitch && (
                <div className="text-sm text-gray-600">
                  <p>{it.pitch}</p>
                  <button onClick={() => copyPitch(it.pitch!)} className="text-xs text-blue-600 underline mt-1">
                    📋 Copier le pitch
                  </button>
                </div>
              )}
              {it.price && <p className="text-sm font-medium">💶 Prix conseillé : {it.price} €</p>}
              <button className="btn w-full bg-gray-100 text-gray-700 border">Préparer à la revente</button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}



