import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Wardrobe() {
  const [files, setFiles] = useState<File[]>([]);
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploads = await Promise.all(
        files.map(async (file) => {
          const { data, error } = await supabase.storage
            .from("wardrobe")
            .upload(`clothes/${Date.now()}-${file.name}`, file);

          if (error) throw error;
          return data?.path;
        })
      );

      const { error: insertError } = await supabase
        .from("wardrobe")
        .insert([
          {
            type,
            size,
            color,
            brand,
            photos: uploads,
          },
        ]);

      if (insertError) throw insertError;

      alert("✅ Vêtement ajouté avec succès !");
      setFiles([]);
      setType("");
      setSize("");
      setColor("");
      setBrand("");
    } catch (err: any) {
      alert("Erreur : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-6 py-12 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Ajouter un vêtement</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload photo */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Photos (plusieurs angles possibles)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            capture="environment"
            onChange={handleFileChange}
            className="w-full border rounded px-3 py-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            Vous pouvez sélectionner plusieurs photos ou en prendre avec la caméra.
          </p>
        </div>

        {/* Type de vêtement */}
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Sélectionnez un type</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Pull">Pull</option>
            <option value="Chemise">Chemise</option>
            <option value="Pantalon">Pantalon</option>
            <option value="Jupe">Jupe</option>
            <option value="Robe">Robe</option>
            <option value="Chaussures">Chaussures</option>
            <option value="Manteau">Manteau</option>
            <option value="Accessoire">Accessoire</option>
          </select>
        </div>

        {/* Taille */}
        <div>
          <label className="block text-sm font-medium mb-1">Taille</label>
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Ex : S, M, L, 40, 42..."
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Couleur */}
        <div>
          <label className="block text-sm font-medium mb-1">Couleur</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Choisissez une couleur</option>
            <option value="Noir">Noir</option>
            <option value="Blanc">Blanc</option>
            <option value="Bleu">Bleu</option>
            <option value="Rouge">Rouge</option>
            <option value="Vert">Vert</option>
            <option value="Jaune">Jaune</option>
            <option value="Gris">Gris</option>
            <option value="Marron">Marron</option>
            <option value="Rose">Rose</option>
            <option value="Violet">Violet</option>
          </select>
        </div>

        {/* Marque avec autocomplétion */}
        <div>
          <label className="block text-sm font-medium mb-1">Marque</label>
          <input
            list="brands"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Choisissez une marque"
            className="w-full border rounded px-3 py-2"
            required
          />
          <datalist id="brands">
            <option value="Nike" />
            <option value="Adidas" />
            <option value="Zara" />
            <option value="H&M" />
            <option value="Louis Vuitton" />
            <option value="Balenciaga" />
            <option value="Gucci" />
            <option value="Chanel" />
            <option value="Uniqlo" />
            <option value="Autre" />
          </datalist>
        </div>

        {/* Bouton ajout */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800"
        >
          {loading ? "Ajout en cours..." : "Ajouter à ma garde-robe"}
        </button>
      </form>
    </main>
  );
}
