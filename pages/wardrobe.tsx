import { useState } from "react";
import Header from "../components/Header";

type Clothing = {
  id: number;
  name: string;
  photos: string[];
};

export default function Wardrobe() {
  const [wardrobe, setWardrobe] = useState<Clothing[]>([]);
  const [selectedPhotos, setSelectedPhotos] = useState<FileList | null>(null);

  const addClothing = () => {
    if (wardrobe.length >= 10) {
      alert("Limite de 10 vêtements atteinte pour la version MVP.");
      return;
    }

    if (!selectedPhotos) return;

    const photosArray = Array.from(selectedPhotos).map(file => URL.createObjectURL(file));

    const newItem: Clothing = {
      id: Date.now(),
      name: `Pièce ${wardrobe.length + 1}`,
      photos: photosArray,
    };

    setWardrobe([...wardrobe, newItem]);
    setSelectedPhotos(null);

    // Interaction avec Anna
    alert(`✨ Anna : Belle pièce ajoutée ! Je vais pouvoir l'associer avec ta garde-robe existante.`);
  };

  return (
    <>
      <Header />
      <main className="container py-16">
        <h1 className="text-3xl font-bold mb-6">Ma garde-robe</h1>

        {/* Upload */}
        <div className="card p-6 space-y-4">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setSelectedPhotos(e.target.files)}
            className="w-full border rounded p-2"
          />
          <button className="btn w-full" onClick={addClothing}>
            Ajouter un vêtement
          </button>
        </div>

        {/* Liste des vêtements */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {wardrobe.map(item => (
            <div key={item.id} className="card p-4 space-y-2">
              <h2 className="font-semibold">{item.name}</h2>
              <div className="grid grid-cols-3 gap-2">
                {item.photos.map((photo, i) => (
                  <img key={i} src={photo} alt="vêtement" className="rounded-lg object-cover w-full h-24" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
