import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import WeatherCard from "../components/WeatherCard";

type Item = {
  id: string;
  user_id: string;
  title: string | null;
  brand: string | null;
  color: string | null;
  size: string | null;
  type: string | null;
  photos: string[] | null;
  certified?: boolean | null;
  cert_score?: number | null;
};

export default function Dashboard() {
  const [items, setItems] = useState<Item[]>([]);
  const [sel, setSel] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from("items")
        .select("id,user_id,title,brand,color,size,type,photos,certified,cert_score,created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(12);
      if (!error && data) {
        setItems(data as Item[]);
        if (data.length) setSel(data[0].id);
      }
    })();
  }, []);

  const selected = useMemo(
    () => items.find(i => i.id === sel) || null,
    [items, sel]
  );

  // ——— Génération description locale (Anna côté client) ———
  function generateLocal(i: Item) {
    const titre = titleLine(i);
    const bullets = [
      i.size ? `Taille: ${i.size}` : "",
      i.color ? `Couleur: ${i.color}` : "",
      i.brand ? `Marque reconnue` : "",
      (i.photos?.length || 0) >= 3 ? `> 3 photos HD` : "",
    ].filter(Boolean).join(" • ");

    const stateHint = "Très bon état, soigneusement entretenu. Pas de défaut visible.";
    const priceHint = "Prix raisonnable, négociable dans le respect de l’article.";

    return (
`📦 ${titre}
${bullets}

${stateHint}
Idéal pour la mi-saison et la vie quotidienne.

✅ Envoi rapide et soigné, acheteur protégé.
💬 Questions bienvenues.
💶 ${priceHint}`
    );
  }

  function titleLine(i: Item) {
    return [i.brand, i.type, i.title].filter(Boolean).join(" ").trim() || "Article";
  }

  // ——— Certification simple locale ———
  async function certify(i: Item) {
    const s1 = i.photos?.length ? (i.photos.length >= 3 ? 40 : i.photos.length === 2 ? 30 : 15) : 0;
    const s2 = i.brand ? 20 : 0;
    const s3 = i.size ? 20 : 0;
    const s4 = i.type ? 20 : 0;
    const score = Math.min(100, s1 + s2 + s3 + s4);
    const ok = score >= 75;

    const { error } = await supabase.from("items")
      .update({ certified: ok, cert_score: score })
      .eq("id", i.id);
    if (!error) {
      setItems(prev => prev.map(x => x.id === i.id ? { ...x, certified: ok, cert_score: score } : x));
    }
  }

  // ——— Copier / Partager sur l’étiquette ———
  function buildDesc(i: Item) {
    return generateLocal(i);
  }

  async function copyDesc(i: Item) {
    const text = buildDesc(i) + "\n" + (window.location?.origin || "");
    await navigator.clipboard.writeText(text);
    alert("Description copiée.");
  }

  async function shareDesc(i: Item) {
    const text = buildDesc(i);
    const data: ShareData = {
      title: titleLine(i),
      text,
      url: window.location?.origin || ""
    };
    if (navigator.share) {
      try { await navigator.share(data); } catch { /* annulé */ }
    } else {
      await navigator.clipboard.writeText(text + "\n" + data.url);
      alert("Partage non supporté. Description copiée.");
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">

      {/* Météo */}
      <WeatherCard />

      {/* Derniers ajouts (sans lien “Ajouter”) */}
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
              <div key={it.id} className="group relative">
                <div className="aspect-square rounded-lg overflow-hidden border bg-neutral-50 relative">
                  {it.certified && (
                    <span className="absolute top-1 left-1 z-10 text-[10px] px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                      Certifié
                    </span>
                  )}

                  <img
                    src={it.photos?.[0] || "/placeholder.png"}
                    alt={it.title || ""}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />

                  {/* Étiquette en bas avec actions */}
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-[11px] text-white/90 truncate">
                        {titleLine(it)}
                      </div>
                      <div className="flex items-center gap-1">
                        {/* Copier */}
                        <button
                          className="h-6 w-6 grid place-items-center rounded bg-white/90 hover:bg-white"
                          title="Copier la description"
                          onClick={() => copyDesc(it)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <rect x="9" y="9" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                            <rect x="5" y="5" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" opacity=".7"/>
                          </svg>
                        </button>

                        {/* Partager */}
                        <button
                          className="h-6 w-6 grid place-items-center rounded bg-white/90 hover:bg-white"
                          title="Partager"
                          onClick={() => shareDesc(it)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M16 8a3 3 0 1 0-2.83-4H13a3 3 0 0 0 3 4Z" stroke="currentColor" strokeWidth="1.6"/>
                            <path d="M7 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" stroke="currentColor" strokeWidth="1.6"/>
                            <path d="M17 13a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" stroke="currentColor" strokeWidth="1.6"/>
                            <path d="M9.5 15.5l5-3" stroke="currentColor" strokeWidth="1.6"/>
                            <path d="M9.5 18.5l5 3" stroke="currentColor" strokeWidth="1.6"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ligne sous la vignette: cert & score */}
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

      {/* Annonce de revente générée par Anna (locale) */}
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
                    {titleLine(i)}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-primary"
                onClick={() => { if (selected) setDesc(generateLocal(selected)); }}
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
