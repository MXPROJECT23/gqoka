import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// petit hook météo (Open-Meteo, sans clé)
function useWeatherSummary() {
  const [temp, setTemp] = useState<number | null>(null);
  const [label, setLabel] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("⛅");

  useEffect(() => {
    const run = async (lat: number, lon: number) => {
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
        const r = await fetch(url);
        const j = await r.json();
        const t = j?.current?.temperature_2m ?? null;
        const code = j?.current?.weather_code ?? 0;
        setTemp(t);
        setLabel(codeMap(code));
        setEmoji(icon(code));
      } catch {
        setTemp(null);
        setLabel("Indispo");
        setEmoji("⛅");
      }
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => run(pos.coords.latitude, pos.coords.longitude),
      () => run(48.8566, 2.3522), // Paris fallback
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, []);

  return { temp, label, emoji };
}

function codeMap(c: number) {
  if (c === 0) return "Grand ciel bleu";
  if ([1, 2].includes(c)) return "Partiellement couvert";
  if (c === 3) return "Couvert";
  if ([45, 48].includes(c)) return "Brouillard";
  if ([51, 53, 55].includes(c)) return "Bruine";
  if ([61, 63, 65].includes(c)) return "Pluie";
  if ([71, 73, 75].includes(c)) return "Neige";
  if ([95, 96, 99].includes(c)) return "Orage";
  return "Conditions variables";
}
function icon(c: number) {
  if (c === 0) return "☀️";
  if ([1, 2].includes(c)) return "🌤️";
  if (c === 3) return "☁️";
  if ([61, 63, 65].includes(c)) return "🌧️";
  if ([71, 73, 75].includes(c)) return "❄️";
  if ([95, 96, 99].includes(c)) return "⛈️";
  return "⛅";
}

export default function Home() {
  const nav = useNavigate();
  const wx = useWeatherSummary();

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <header className="text-center space-y-4 mb-10">
        <h1 className="text-5xl font-extrabold tracking-tight">GQOKA</h1>
        <p className="text-lg text-neutral-600">
          Garde-robe intelligente. Conseils d’Anna. Prête pour la revente.
        </p>

        {/* bouton principal */}
        <button
          className="btn btn-primary px-6 py-3 text-base"
          onClick={() => nav("/dashboard")}
        >
          Commencer
        </button>
      </header>

      {/* 2 cartes uniquement */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Garde-robe */}
        <button
          onClick={() => nav("/wardrobe")}
          className="card text-left hover:ring-2 hover:ring-black/10 transition"
        >
          <div className="text-2xl font-semibold mb-1">Garde-robe</div>
          <p className="text-neutral-600">
            Ajouter / modifier / supprimer vos vêtements.
          </p>
        </button>

        {/* Anna + météo */}
        <button
          onClick={() => nav("/dashboard")}
          className="card text-left hover:ring-2 hover:ring-black/10 transition"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-2xl font-semibold mb-1">Anna + météo</div>
              <p className="text-neutral-600">
                Suggestions de tenues contextuelles.
              </p>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-3xl leading-none">{wx.emoji}</div>
              <div className="text-sm text-neutral-700">
                {wx.temp !== null ? `${wx.temp}°C` : "—"}
              </div>
            </div>
          </div>
          {wx.label && (
            <div className="text-xs text-neutral-500 mt-2">{wx.label}</div>
          )}
        </button>
      </section>
    </main>
  );
}


