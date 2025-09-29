import { useState } from "react";
import Header from "../components/Header";

type Item = { name: string; type: string; color: string };

export default function Wardrobe() {
  const [list, setList] = useState<Item[]>([]);
  const [name, setName] = useState(""); const [type, setType] = useState(""); const [color, setColor] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !type) return;
    setList(prev => [...prev, { name, type, color }]);
    setName(""); setType(""); setColor("");
  };

  return (
    <>
      <Header />
      <main className="container py-16">
        <h1 className="text-3xl font-bold mb-6">Ma garde-robe</h1>

        <form onSubmit={add} className="card mb-6 grid md:grid-cols-4 gap-3">
          <input className="border rounded-lg px-4 py-3" placeholder="Nom (ex: Chemise blanche)"
                 value={name} onChange={e=>setName(e.target.value)} />
          <input className="border rounded-lg px-4 py-3" placeholder="Type (chemise, jean...)"
                 value={type} onChange={e=>setType(e.target.value)} />
          <input className="border rounded-lg px-4 py-3" placeholder="Couleur"
                 value={color} onChange={e=>setColor(e.target.value)} />
          <button className="btn">Ajouter</button>
        </form>

        <div className="grid md:grid-cols-3 gap-4">
          {list.map((it, i) => (
            <div key={i} className="card">
              <div className="font-semibold">{it.name}</div>
              <div className="text-sm text-gray-600">{it.type} • {it.color || "—"}</div>
            </div>
          ))}
          {list.length === 0 && <p className="text-gray-600">Ajoute tes premières pièces.</p>}
        </div>
      </main>
    </>
  );
}
