import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";

const Weather = dynamic(() => import("../components/Weather"), { ssr: false });

type Clothing = {
  id: number;
  name: string;
  photos: string[];
  price?: number;
  pitch?: string;
  certified?: boolean;
};

export default function Wardrobe() {
  const [wardrobe, setWardrobe] = useState<Clothing[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [price, setPrice] = useState<number | undefined>();

  const generatePitch = (name: string) => {
    return `✨ ${name} – une pièce intemporelle parfaite pour un look premium. Prête à entamer sa seconde vie et séduire un nouveau propriétaire.`;
  };

  const add = () => {
    if (wardrobe.length >= 10) {
      alert("Limite de 10 pièces atteinte.");
      return;
    }
    if (!files) return;
    const photos = Array.from(files)
      .slice(0, 3)
      .map((f) => URL.createObjectURL(f));

    const newItem: Clothing = {
      id: Date.now(),
      name: `Pièce ${wardrobe.length + 1}`,
      photos,
      price,
      pitch: generatePitch(`Pièce ${wardrobe.length + 1}`),
    };

    setWardrobe((prev) => [...prev, newItem]);
    setFiles(null);
    setPrice(undefined);
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

        {/* Formulaire ajout vêtement */}
        <div className="card space-y-4 mb-10">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="input"
          />
          <input
            type="number"
            placeholder="Prix indicatif (€)"
            value={price || ""}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            className="input"
          />
          <button className="btn w-full" onClick={add}>
            Ajouter un vêtement
          </button>
        </div>

        {/* Liste des vêtements */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wardrobe.map((it) => (
            <div key={it.id} className="card space-y-3">
              <div className="flex justify-between items-center">
                <div className="font-semibold">{it.name}</div>
                {it.certified && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Certifié
                  </span>
                )}
              </div>

              {/* Photos */}
              <div className="grid grid-cols-3 gap-2">
                {it.photos.map((p, i) => (
                  <img
                    key={i}
                    src={p}
                    className="rounded-lg object-cover w-full h-24"
                    alt="vêtement"
                  />
                ))}
              </div>

              {/* Pitch + bouton copier */}
              {it.pitch && (
                <div className="text-sm text-gray-600">
                  <p>{it.pitch}</p>
                  <button
                    onClick={() => copyPitch(it.pitch!)}
                    className="text-xs text-blue-600 underline mt-1"
                  >
                    📋 Copier le pitch
                  </button>
                </div>
              )}

              {/* Prix */}
              {it.price && (
                <p className="text-sm font-medium">
                  💶 Prix conseillé : {it.price} €
                </p>
              )}

              <button className="btn w-full bg-gray-100 text-gray-700 border">
                Préparer à la revente
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
