import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function Wardrobe() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");

  // Vérification connexion
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/auth");
      } else {
        setUser(data.user);
      }
    };
    checkUser();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.from("wardrobe").insert([
      { type, size, color, brand, user_id: user.id }
    ]);

    if (error) {
      alert("❌ Erreur : " + error.message);
    } else {
      alert("✅ Vêtement ajouté !");
      setType(""); setSize(""); setColor(""); setBrand("");
    }
  };

  if (!user) return <p className="p-6">Vérification de la session...</p>;

  return (
    <main className="container mx-auto px-6 py-12 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Ajouter un vêtement</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} className="w-full border rounded px-3 py-2"/>
        <input type="text" placeholder="Taille" value={size} onChange={(e) => setSize(e.target.value)} className="w-full border rounded px-3 py-2"/>
        <input type="text" placeholder="Couleur" value={color} onChange={(e) => setColor(e.target.value)} className="w-full border rounded px-3 py-2"/>
        <input type="text" placeholder="Marque" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full border rounded px-3 py-2"/>
        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">Ajouter</button>
      </form>
    </main>
  );
}

