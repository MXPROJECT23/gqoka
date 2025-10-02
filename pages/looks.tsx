import { useEffect, useState } from "react";
import Head from "next/head";
import { getWeather, weatherAdvice } from "@/lib/weather";
import AnnaBadge from "@/components/AnnaBadge";

type Item = { id: string; name: string; category: string; color?: string };

export default function LooksDuJour() {
  const [look, setLook] = useState<Item[]>([]);
  const [weatherText, setWeatherText] = useState("");

  useEffect(() => {
    const mock: Item[] = [
      { id: "1", name: "T-shirt blanc", category: "haut", color: "blanc" },
      { id: "2", name: "Jean slim", category: "bas", color: "bleu" },
      { id: "3", name: "Veste trench", category: "manteau", color: "beige" },
      { id: "4", name: "Sneakers Onela", category: "chaussures", color: "noir" }
    ];

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const w = await getWeather(pos.coords.latitude, pos.coords.longitude);
        setWeatherText(weatherAdvice(w));

        if (w.temperature < 10) setLook([mock[2], mock[1], mock[3]]);
        else if (w.temperature > 20) setLook([mock[0], mock[1], mock[3]]);
        else setLook([mock[0], mock[1], mock[2]]);
      });
    }
  }, []);

  return (
    <>
      <Head><title>Looks du jour — GQOKA</title></Head>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-4 opacity-0 animate-fade-in">Looks du jour avec Anna</h1>
        <p className="text-gray-600 mb-6 opacity-0 animate-fade-in-delay">Anna dit : {weatherText}</p>

        {look.length === 0 ? (
          <p className="text-gray-500">Anna prépare ton look…</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {look.map((it, i) => (
              <div
                key={it.id}
                className="card opacity-0 animate-fade-in"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-gray-500">{it.category}</div>
                    <AnnaBadge />
                  </div>
                  <div className="text-xs text-gray-500">{it.color}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
