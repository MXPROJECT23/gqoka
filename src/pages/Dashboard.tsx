import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import WeatherCard from "../components/WeatherCard";

type Item = {
  id: string; title: string; brand: string; color: string; size: string; type: string;
  photos: string[]; certified?: boolean; cert_score?: number;
};

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [sel, setSel] = useState<string>("");      // id sélectionné
  const [desc, setDesc] = useState<string>("");    // description générée

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from("items")
        .select("id,title,brand,color,size,type,photos,certified,cert_score")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(12);
      if (!error) {
        setItems(data || []);
        if ((data || []).length) setSel(data![0].id);
      }
    })();
  }, []);

  const selected = useMemo(() => items.find(i => i.id === sel) || null, [items, sel]);

  function generateLocal(i: Item) {
    // Génération simple côté client (pas de clé externe). Dialogflow possible côté Netlify Function si besoin.
    const titre = [i.brand, i.type, i.title].filter(Boolean).join(" ").trim();
    const bullets = [
      i.size && `Taille: ${i.size}`,
      i.color && `Couleur: ${i.color}`,
      i.brand && `Marque reconnue`,
      (i.photos?.length || 0) >= 3 && `Plus de 3 photos HD`,
    ].filter(Boolean).join(" • ");

    const stateHint = "Très bon état, soigneusement entretenu. Pas de défaut visible.";
    const priceHint = "Prix raisonnable, négociable dans la limite du respect de l’article.";

    return (
`📦 ${titre || "Super article"}
${bullets}

${stateHint}
Idéal pour la mi-saison et la vie quotidienne.

✅ Envoi rapide et soigné, acheteur protégé.
💬 Questions bienvenues.
💶 ${priceHint}`
    );
  }

  async function certify(i: Item) {
    const s1 = i.photos?.length >= 3 ? 40 : i.photos?.length === 2 ? 30 : i.photos?.length === 1 ? 15 : 0;
    const s2 = i.brand ? 20 : 0;
    const s3 = i.size ? 20 : 0;
    const s4 = i.type ? 20 : 0;
    const score = Math.min(100, s1 + s2 + s3 + s4);
    const ok = score >= 75;
    const { error } = await supabase.from("items").update({
      certified: ok, cert_score: score
    }).eq("id", i.id);
    if (!error) {
      setItems(prev => prev.map(x => x.id === i.id ? { ...x, certified: ok, cert_score: score } : x));
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">

      {/* Météo */}
      <WeatherCard />

      {/* Derniers ajouts */}
      <section className="card">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Derniers ajouts</h2>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-neutral-600 mt-2">
            Aucun vêtement pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-3">
            {items.map(it => (
              <div key={it.id} className="group">
                <div className="aspect-square rounded-lg overflow-hidden border bg-neutral-50 relative">
                  {it.certified && (
                    <span className="absolute top-1 left-1 z-10 text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                      Certifié
                    </span>
                  )}
                  <img
                    src={it.photos?.[0] || "/placeholder.png"}
                    alt={it.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>
                <div className="mt-1 text-xs truncate">{[it.brand, it.type || it.title].filter(Boolean).join(" • ")}</div>
                <div className="mt-1 flex items-center gap-2">
                  <button
                    className="text-[11px] px-2 py-0.5 rounded border"
                    onClick={() => certify(it)}
                    title="Analyser et certifier"
                  >
                    Certifier
                  </button>
                  {typeof it.cert_score === "number" && (
                    <span className="text-[11px] text-neutral-500">score {it.cert_score}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Annonce de revente générée par Anna (local) */}
      <section className="card space-y-3">
        <h2 className="text-xl font-semibold">Annonce de revente (Anna)</h2>

        {items.length === 0 ? (
          <p className="text-sm text-neutral-600">Ajoute d’abord un vêtement pour générer une annonce.</p>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <label className="text-sm">Vêtement :</label>
              <select
                className="input w-full sm:w-80"
                value={sel}
                onChange={(e) => setSel(e.target.value)}
              >
                {items.map(i => (
                  <option key={i.id} value={i.id}>
                    {[i.brand, i.type, i.title].filter(Boolean).join(" ")}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (!selected) return;
                  setDesc(generateLocal(selected));
                }}
              >
                Générer
              </button>
            </div>

            {desc && (
              <div className="rounded-lg border p-3 bg-neutral-50 whitespace-pre-wrap text-sm">
                {desc}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
