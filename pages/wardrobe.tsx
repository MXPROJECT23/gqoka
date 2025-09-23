import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

interface Item {
  id: number;
  name: string;
  category: string;
  image: string;
}

export default function Wardrobe() {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  // Charger les vêtements depuis Supabase
  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase.from("wardrobe").select("*");
      if (error) console.error("Erreur Supabase :", error);
      else setItems(data || []);
    };
    fetchItems();
  }, []);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !image) return;

    const { data, error } = await supabase
      .from("wardrobe")
      .insert([{ name, category, image }])
      .select();

    if (error) {
      console.error("Erreur insertion :", error);
    } else if (data) {
      setItems([...items, data[0]]);
      setName("");
      setCategory("");
      setImage("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Ma Garde-Robe</h1>

      {/* Formulaire ajout vêtement */}
      <form
        onSubmit={handleAddItem}
        className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom du vêtement
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Chemise blanche"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Catégorie
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Haut, Pantalon, Chaussures..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL de l’image
          </label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
            placeholder="Collez l’URL de l’image"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition"
        >
          Ajouter à la garde-robe
        </button>
      </form>

      {/* Liste des vêtements */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col items-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-32 h-32 object-cover rounded-lg mb-4"
            />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-500">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

