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
  const [adText, setAdText] = useState<string | null>(null);

  // Charger user et garde-robe
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
    if (!userId) { alert("Connecte-toi d'abord."); return; }
    if (wardrobe.length >= 10) { alert("Limite de 10 pièces atteinte."); return; }
    if (files.length === 0) { alert("Ajoute au moins une photo."); return; }

    setLoading(true);

    // Upload photos → Supabase Storage
    const photoUrls: string[] = [];
    for (const f of files) {
      const path = `${userId}/${Date.now()}_${f.name}`;
      const { error } = await supabase.storage.from("wardrobe").upload(path, f, { upsert: true });
      if (!error) {
        const { data } = supabase.storage.from("wardrobe").getPublicUrl(path);
        photoUrls.push(data.publicUrl);
      }
    }

    // Sauvegarde en base
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

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Texte copié ✅");
  };

  // Certification
  const certify = async (id: string) => {
    const { data, error } = await supabase.from("wardrobe").update({ certified: true }).eq("id", id).select();
    if (!error && data) {
      setWardrobe((prev) => prev.map(it => it.id === id ? { ...it, certified: true } : it));
      alert("Vêtement certifié ✅");
    }
  };

  // Préparer annonce de revente
  const prepareAd = (item: Clothing) => {
    const ad = `🛍️ ${item.name}\n\n${item.pitch}\n\n💶 Prix conseillé : ${item.price || "à définir"} €\n📦 Expédition rapide\n#GQOKA #SecondeVie #Style`;
    setAdText(ad);
  };

  return (
    <>
      <Header />
      <main className="container py-14">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Ma garde-robe</h1>
          <Weather />
        </div>

        {/* Formulaire ajout vêtement */}
        <div className="card space-y-4 mb-10">
          <input type="file" accept="image/*" capture="environment" multiple onChange={handleFileChange} className="input" />

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

        {/* Liste des vêtements */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wardrobe.map((it) => (
            <div key={it.id} className="card space-y-3">
              <div className="flex justify-between items-center">
                <div className="font-semibold">{it.name}</div>
                {it.certified && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Certifié</span>
                )}
              </div>

              {/* Photos */}
              <div className="grid grid-cols-3 gap-2">
                {it.photos.map((p, i) => (
                  <img key={i} src={p} className="rounded-lg object-cover w-full h-24" alt="vêtement" />
                ))}
              </div>

              {/* Pitch + bouton copier */}
              {it.pitch && (
                <div className="text-sm text-gray-600">
                  <p>{it.pitch}</p>
                  <button onClick={() => copyText(it.pitch!)} className="text-xs text-blue-600 underline mt-1">
                    📋 Copier le pitch
                  </button>
                </div>
              )}

              {/* Prix */}
              {it.price && <p className="text-sm font-medium">💶 Prix conseillé : {it.price} €</p>}

              {/* Boutons actions */}
              <div className="space-y-2">
                {!it.certified && (
                  <button className="btn w-full bg-green-600 text-white" onClick={() => certify(it.id)}>
                    Demander la certification
                  </button>
                )}
                <button className="btn w-full bg-gray-100 text-gray-700 border" onClick={() => prepareAd(it)}>
                  Préparer à la revente
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Popup annonce */}
        {adText && (
          <div className="fixed bottom-4 right-4 bg-white border rounded-xl shadow-lg p-4 w-80 space-y-3">
            <h3 className="font-semibold">Annonce générée</h3>
            <pre className="text-sm whitespace-pre-wrap">{adText}</pre>
            <button className="btn w-full" onClick={() => copyText(adText)}>
              📋 Copier l’annonce
            </button>
            <button className="btn w-full bg-gray-200 text-gray-700" onClick={() => setAdText(null)}>
              Fermer
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}



