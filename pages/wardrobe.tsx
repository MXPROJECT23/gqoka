import { useEffect, useMemo, useState } from "react";
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
  color?: string;     // hex or keyword
  brand?: string;
  condition?: string;
};

const BRANDS = ["Nike","Adidas","Zara","Uniqlo","H&M","Louis Vuitton","Gucci","Hermès","Dior","Chanel","Balenciaga","Prada","Celine","Burberry","Valentino"];
const CATEGORIES = ["Manteau","Veste","Pull","Chemise","T-shirt","Pantalon","Jean","Jupe","Robe","Chaussures","Sac","Accessoire"];

export default function Wardrobe() {
  const [wardrobe, setWardrobe] = useState<Clothing[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [adText, setAdText] = useState<string | null>(null);

  // champs détaillés
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("#000000");
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected].slice(0, 3)); // max 3
  };

  // Pitch simple “IA simulée”
  const buildPitch = (item: Omit<Clothing,"id"|"photos">) => {
    const parts:string[] = [];
    if (item.name) parts.push(`✨ ${item.name}`);
    if (item.brand) parts.push(`${item.brand}`);
    if (item.size) parts.push(`taille ${item.size}`);
    if (item.color) parts.push(`couleur ${readableColor(item.color)}`);
    if (item.condition) parts.push(`(${item.condition})`);
    const head = parts.filter(Boolean).join(" • ");

    const assoc = suggestAssociation(item.category||"", item.color||"");
    return `${head}. ${assoc} Prête pour une seconde vie élégante.`;
  };

  // Assoc’ basique par catégorie/couleur
  const suggestAssociation = (cat:string, col:string) => {
    const base = "Je recommande:";
    if (/manteau|veste/i.test(cat)) return `${base} jean brut + boots cuir.`;
    if (/pull|t-shirt|chemise/i.test(cat)) return `${base} pantalon tailleur + sneakers blanches.`;
    if (/robe|jupe/i.test(cat)) return `${base} blazer noir + bottines.`;
    if (/chaussures|sac|accessoire/i.test(cat)) return `${base} look monochrome pour mettre la pièce en valeur.`;
    // contraste simple
    const dark = isDark(col);
    return `${base} bas ${dark?"clair":"foncé"} pour un contraste moderne.`;
  };

  const isDark = (hex:string) => {
    if (!hex.startsWith("#") || (hex.length!==7 && hex.length!==4)) return false;
    const h = hex.length===4
      ? "#"+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3]
      : hex;
    const r = parseInt(h.slice(1,3),16), g=parseInt(h.slice(3,5),16), b=parseInt(h.slice(5,7),16);
    const lum = 0.2126*r+0.7152*g+0.0722*b;
    return lum < 140;
  };

  const readableColor = (hex:string) => {
    if (!hex.startsWith("#")) return hex;
    return " #" + hex.substring(1).toUpperCase();
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
    if (error) { alert("Erreur lors de l’ajout."); return; }

    if (data) {
      setWardrobe((prev)=>[data[0] as Clothing, ...prev]);
      // reset form
      setFiles([]); setPrice(undefined);
      setName(""); setCategory(""); setSize(""); setColor("#000000"); setBrand(""); setCondition("");
    }
  };

  const certify = async (id: string) => {
    const { data, error } = await supabase.from("wardrobe").update({ certified: true }).eq("id", id).select();
    if (!error && data) {
      setWardrobe((prev)=>prev.map(it=>it.id===id?{...it,certified:true}:it));
      alert("Vêtement certifié ✅");
    }
  };

  const copy = (t:string) => { navigator.clipboard.writeText(t); alert("Copié ✅"); };

  const prepareAd = (item: Clothing) => {
    const title = `🛍️ ${item.name}${item.brand?` • ${item.brand}`:""}${item.size?` • ${item.size}`:""}`;
    const bullets = [
      item.category && `Catégorie: ${item.category}`,
      item.condition && `État: ${item.condition}`,
      item.color && `Couleur: ${readableColor(item.color)}`
    ].filter(Boolean).join("\n");
    const ad = `${title}\n${item.pitch || ""}\n\n${bullets}\n\n💶 Prix conseillé: ${item.price ?? "à définir"} €\n📦 Expédition rapide\n#GQOKA #SecondeVie #Style`;
    setAdText(ad);
  };

  const brandDatalist = useMemo(()=>BRANDS.sort((a,b)=>a.localeCompare(b)),[]);
  const categoryDatalist = useMemo(()=>CATEGORIES,[]);

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
            <input type="file" accept="image/*" capture="environment" multiple onChange={handleFileChange} className="input" />
            <input className="input" placeholder="Nom de la pièce (ex: Manteau camel)" value={name} onChange={e=>setName(e.target.value)} />
            <div className="grid grid-cols-2 gap-4">
              <input className="input" list="categories" placeholder="Catégorie" value={category} onChange={e=>setCategory(e.target.value)} />
              <select className="input" value={size} onChange={e=>setSize(e.target.value)}>
                <option value="">Taille</option><option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-24">Couleur</span>
                <input type="color" value={color} onChange={e=>setColor(e.target.value)} className="w-10 h-10 rounded-full border" />
              </div>
              <div>
                <input className="input" list="brands" placeholder="Marque" value={brand} onChange={e=>setBrand(e.target.value)} />
              </div>
            </div>
            <select className="input" value={condition} onChange={e=>setCondition(e.target.value)}>
              <option value="">État</option>
              <option>Neuf avec étiquette</option>
              <option>Très bon état</option>
              <option>Bon état</option>
              <option>Vintage / usé chic</option>
            </select>
            <input type="number" placeholder="Prix indicatif (€)" value={price||""} onChange={e=>setPrice(parseInt(e.target.value))} className="input" />
          </div>

          {/* preview */}
          {files.length>0 && (
            <div className="grid grid-cols-3 gap-2">
              {files.map((f,i)=>(
                <img key={i} src={URL.createObjectURL(f)} className="rounded-lg object-cover w-full h-24" alt="aperçu" />
              ))}
            </div>
          )}

          <button className="btn w-full" onClick={add} disabled={loading}>
            {loading ? "Ajout en cours…" : "Ajouter à ma garde-robe"}
          </button>
        </div>

        <datalist id="brands">{brandDatalist.map(b=><option key={b} value={b} />)}</datalist>
        <datalist id="categories">{categoryDatalist.map(c=><option key={c} value={c} />)}</datalist>

        {/* Liste immersive */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wardrobe.map((it) => (
            <div key={it.id} className="card space-y-3">
              <div className="flex justify-between items-center">
                <div className="font-semibold">{it.name}</div>
                {it.certified && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Certifié</span>}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {it.photos.map((p,i)=>(
                  <img key={i} src={p} className="rounded-lg object-cover w-full h-24" alt="vêtement" />
                ))}
              </div>

              {/* méta */}
              <div className="text-xs text-gray-600 flex flex-wrap gap-2">
                {it.brand && <span className="px-2 py-1 rounded-full border">#{it.brand}</span>}
                {it.category && <span className="px-2 py-1 rounded-full border">#{it.category}</span>}
                {it.size && <span className="px-2 py-1 rounded-full border">T.{it.size}</span>}
                {it.color && <span className="px-2 py-1 rounded-full border">Couleur {readableColor(it.color)}</span>}
                {it.condition && <span className="px-2 py-1 rounded-full border">{it.condition}</span>}
              </div>

              {/* Anna conseil */}
              <div className="bg-[#f7f7f2] border rounded-xl p-3 text-sm">
                <div className="font-semibold mb-1">Anna</div>
                <p>{it.pitch}</p>
                {it.pitch && (
                  <button onClick={()=>copy(it.pitch!)} className="text-xs text-blue-600 underline mt-1">📋 Copier le pitch</button>
                )}
              </div>

              {typeof it.price === "number" && <p className="text-sm font-medium">💶 Prix conseillé : {it.price} €</p>}

              <div className="space-y-2">
                {!it.certified && (
                  <button className="btn w-full bg-green-600 text-white" onClick={()=>certify(it.id)}>
                    Demander la certification
                  </button>
                )}
                <button className="btn w-full bg-gray-100 text-gray-700 border" onClick={()=>prepareAd(it)}>
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
            <button className="btn w-full" onClick={()=>copy(adText)}>📋 Copier l’annonce</button>
            <button className="btn w-full bg-gray-200 text-gray-700" onClick={()=>setAdText(null)}>Fermer</button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

