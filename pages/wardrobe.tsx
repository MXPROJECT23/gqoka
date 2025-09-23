import WeatherWidget from "../components/WeatherWidget";

export default function Wardrobe() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Ma Garde-Robe</h1>
      <WeatherWidget city="Paris" />
      {/* ...reste de la page */}
    </div>
  );
}
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import WeatherWidget from "../components/WeatherWidget";

type WardrobeItem = {
  id: number;
  name: string;
  category: string;
  is_certified: boolean;
  images?: string[];
};

export default function Wardrobe() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [newItem, setNewItem] = useState({ name: "", category: "" });

  // Charger vêtements + images
  useEffect(() => {
    const loadWardrobe = async () => {
      let { data: wardrobe, error } = await supabase
        .from("wardrobe")
        .select("id, name, category, is_certified");

      if (error) {
        console.error(error);
        return;
      }

      if (wardrobe) {
        // Charger aussi les images associées
        const { data: images } = await supabase
          .from("wardrobe_images")
          .select("wardrobe_id, image_url");

        const itemsWithImages = wardrobe.map((w) => ({
          ...w,
          images: images
            ?.filter((img) => img.wardrobe_id === w.id)
            .map((img) => img.image_url) || [],
        }));

        setItems(itemsWithImages);
      }
    };
    loadWardrobe();
  }, []);

  // Ajouter un vêtement
  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.category) return;

    const { data, error } = await supabase
      .from("wardrobe")
      .insert([{ name: newItem.name, category: newItem.category }])
      .select();

    if (!error && data) {
      setItems([...items, { ...data[0], images: [] }]);
      setNewItem({ name: "", category: "" });
    }
  };

  // Supprimer
  const deleteItem = async (id: number) => {
    await supabase.from("wardrobe").delete().eq("id", id);
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">👗 Ma Garde-robe</h1>

        {/* Météo */}
        <WeatherWidget />

        {/* Formulaire ajout vêtement */}
        <form onSubmit={addItem} className="bg-white shadow rounded-xl p-4 mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Nom du vêtement"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            placeholder="Catégorie (ex: Haut, Pantalon)"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
            className="flex-1 border rounded-lg px-3 py-2"
          />
          <button className="bg-[#5B8CFF] text-white px-4 rounded-lg">Ajouter</button>
        </form>

        {/* Liste des vêtements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-4">
              {/* Carrousel images */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {item.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${item.name} vue ${idx + 1}`}
                    className="w-28 h-28 object-cover rounded-lg"
                  />
                ))}
              </div>

              {/* Infos */}
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-500">{item.category}</p>

              {/* Certification */}
              {item.is_certified ? (
                <span className="text-green-600 text-sm">✅ Certifié</span>
              ) : (
                <button className="text-blue-600 text-sm hover:underline">
                  Demander certification
                </button>
              )}

              {/* Boutons actions */}
              <div className="flex gap-3 mt-3 text-xl">
                <button>🤍</button> {/* Favori */}
                <button
                  onClick={() =>
                    navigator.share
                      ? navigator.share({
                          title: "Mon vêtement GQOKA",
                          text: `Découvrez ${item.name}`,
                          url: window.location.href,
                        })
                      : alert("Partage non supporté")
                  }
                >
                  🔄
                </button>
                <button onClick={() => deleteItem(item.id)} className="text-red-500">
                  🗑️
                </button>
              </div>

              {/* Nouvelle vie */}
              <button className="mt-3 w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Donner une nouvelle vie ✨
              </button>
            </div>
          ))}
        </div>

        {/* Bouton looks */}
        <div className="mt-8 text-center">
          <a
            href="/chat?prompt=Propose-moi 3 looks avec ma garde-robe"
            className="inline-block px-6 py-3 bg-black text-white rounded-xl hover:opacity-90"
          >
            ✨ Générer 3 looks
          </a>
        </div>
      </div>
    </div>
  );
}

    </div>
  );
}


