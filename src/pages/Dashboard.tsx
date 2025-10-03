// src/pages/Dashboard.tsx (extrait)
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Item = { id: string; title: string; photos: string[] };

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("items")
        .select("id,title,photos")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(6);
      setItems(data || []);
    })();
  }, []);

  return (
    <div className="space-y-6">
      {/* bloc météo existant */}

      {/* nouveaux: derniers ajouts */}
      <div className="card">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Derniers ajouts</h3>
          <a href="/wardrobe" className="text-sm underline">Voir tout</a>
        </div>
        {items.length === 0 ? (
          <p className="text-sm text-neutral-500 mt-2">
            Aucun vêtement pour le moment. <a href="/wardrobe/new" className="underline">Ajouter</a>
          </p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-3">
            {items.map(it => (
              <a key={it.id} href={`/wardrobe/${it.id}`} className="block group">
                <div className="aspect-square rounded-lg overflow-hidden border bg-neutral-50">
                  <img
                    src={it.photos?.[0] || "/placeholder.png"}
                    alt={it.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>
                <div className="mt-1 text-xs truncate">{it.title}</div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


