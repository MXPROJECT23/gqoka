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
  category?: string;
  size?: string;
  color?: string;
  brand?: string;
  condition?: string;
};

const COLORS = [
  "Noir", "Blanc", "Gris", "Rouge", "Bleu", "Vert", 
  "Jaune", "Orange", "Rose", "Violet", "Marron", "Beige"
];

export default function Wardrobe() {
  const [wardrobe, setWardrobe] = useState<Clothing[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [adText, setAdText] = useState<string | null>(null);

  // Champs
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState<number | undefined>();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserId(data.user.id);
        loadWardrobe(data.user.id);
      }
    });
  }, []);

  const loadWardrobe = async (uid: string) => {
    const { data } = await supabase.from("wardrobe").select("*").eq("user_id", uid).order("inserted_at",{ascending:false});
    if (data) setWardrobe(data as Clothing[]);
  };

  // Gestion photo multi-angles
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected].slice(0, 3)); // max 3 angles
  };

  const buildPitch = (item: Omit<Clothing,"id"|"photos">) => {
    return `
🧥 ${item.name || "Vêtement"}
- Catégorie : ${item.category || "-"}
- Taille : ${item.size || "-"}
- Couleur : ${item.color || "-"}
- Marque : ${item.brand || "-"}
- État : ${item.condition || "-"}

💶 Prix conseillé : ${item.price ?? "à définir"} €
Prêt pour une seconde vie ✨
    `;
  };

  const add = async () => {
    if (!userId) { alert("Connecte-toi d’abord."); return; }
    if (wardrobe.length >= 10) { alert("Limite 10 pièces atteinte."); return; }
    if (files.length === 0) { alert("Ajoute au moins une photo."); return; }

    setLoading(true);

    // Upload photos
    const photoUrls: string[] = [];
    for (const f of files) {
      const path = `${userId}/${Date.now()}_${f.name}`;
      const { error } = await supabase.storage.from("wardrobe").upload(path, f, { upsert: true });
      if (!error) {
        const { data } = supabase.storage.from("wardrobe").getPublicUrl(path);
        photoUrls.push(data.publicUrl);
      }
    }

    const baseName = name || `${category || "Pièce"} ${wardrobe.length+1}`;
    const newCore = {
      user_id: userId,
      name: baseName,
      photos: photoUrls,
      price,
      pitch: buildPitch({ name: baseName, brand, size, color, condition, category, certified:false }),
      certified: false,
      category, size, color, brand, condition
    };

    const { data, error } = await supabase.from("wardrobe").insert([newCore]).select();
    setLoading(false);
    if (error) { alert("Erreur: " + error.message); return; }

    if (data) {
      setWardrobe((prev)=>[data[0] as Clothing, ...prev]);
      setFiles([]); setPrice(undefined);
      setName(""); setCategory(""); setSize(""); setColor(""); setBrand(""); setCondition("");
    }
  };

  const copy = (t:string) => { navigator.clipboard.writeText(t); alert("Copié ✅"); };

  const prepareAd = (item: Clothing) => setAdText(item.pitch || "");

  return (
    <>
      <Header />
      <main className="container py-14">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Ma garde-robe</h1>
          <Weather />
        </div>

        {/* Formulaire enrichi */}
        <div className="card space-y-4 mb-10">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Boutons photo */}
            <div className="flex gap-3">
              <label className="btn cursor-pointer">
                📷
                <input type="file" accept="image/*" capture="environment" hidden multiple onChange={handleFileChange} />
              </label>
              <label className="btn cursor-pointer">
                📂
                <input type="file" accept="image/*" hidden multiple onChange={handleFileChange} />
              </label>
            </div>

            <input className="input" placeholder="Nom de la pièce (ex: Manteau camel)" value={name} onChange={e=>setName(e.target.value)} />

            <input className="input" placeholder="Catégorie (ex: Accessoire)" value={category} onChange={e=>setCategory(e.target.value)} />

            <select className="input" value={size} onChange={e=>setSize(e.target.value)}>
              <option value="">Taille</option>
              <option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
            </select>

            <select className="input" value={color} onChange={e=>setColor(e.target.value)}>
              <option value="">Couleur</option>
              {COLORS.map(c => <option key={c}>{c}</option>)}
            </select>

            <input className="input" placeholder="Marque" value={brand} onChange={e=>setBrand(e.target.value)} />

            <select className="input" value={condition} onChange={e=>setCondition(e.target.value)}>
              <option value="">État</option>
              <option>Neuf avec étiquette</option>
              <option>Très bon état</option>
              <option>Bon état</option>
              <option>Vintage / usé chic</option>
            </select>

            <input type="number" placeholder="Prix indicatif (€)" value={price||""} onChange={e=>setPrice(parseInt(e.target.value))} className="input" />
          </div>

          {/* preview multi-angles */}
          {files.length>0 && (
            <div className="grid grid-cols-3 gap-2">
              {files.map((f,i)=>(
                <img key={i} src={URL.createObjectURL(f)} className="rounded-lg object-contain w-full aspect-square" style={{imageOrientation:"from-image"}} alt="aperçu" />
              ))}
            </div>
          )}

          <button className="btn w-full" onClick={add} disabled={loading}>
            {loading ? "Ajout en cours…" : "Ajouter à ma garde-robe"}
          </button>
        </div>

        {/* Liste des vêtements */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wardrobe.map((it) => (
            <div key={it.id} className="card space-y-3">
              <div className="font-semibold">{it.name}</div>

              <div className="grid grid-cols-3 gap-2">
                {it.photos.map((p,i)=>(
                  <img key={i} src={p} className="rounded-lg object-contain w-full aspect-square" style={{imageOrientation:"from-image"}} alt="vêtement" />
                ))}
              </div>

              <div className="bg-[#f7f7f2] border rounded-xl p-3 text-sm">
                <div className="font-semibold mb-1">Annonce prête :</div>
                <pre className="text-xs whitespace-pre-wrap">{it.pitch}</pre>
                <button onClick={()=>copy(it.pitch!)} className="text-xs text-blue-600 underline mt-1">📋 Copier</button>
              </div>

              {typeof it.price === "number" && <p className="text-sm font-medium">💶 {it.price} €</p>}

              <button className="btn w-full bg-gray-100 text-gray-700 border" onClick={()=>prepareAd(it)}>
                Voir l’annonce
              </button>
            </div>
          ))}
        </div>

        {adText && (
          <div className="fixed bottom-4 right-4 bg-white border rounded-xl shadow-lg p-4 w-80 space-y-3">
            <h3 className="font-semibold">Annonce générée</h3>
            <pre className="text-sm whitespace-pre-wrap">{adText}</pre>
            <button className="btn w-full" onClick={()=>copy(adText)}>📋 Copier</button>
            <button className="btn w-full bg-gray-200 text-gray-700" onClick={()=>setAdText(null)}>Fermer</button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
