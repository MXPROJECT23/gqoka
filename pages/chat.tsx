import { useState, useEffect } from "react";
import Header from "../components/Header";

type Msg = { role: "user" | "assistant"; text: string };
type WeatherData = { temp: number; condition: string; city: string };

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Salut, je suis Anna 👗. Décris ton occasion et je te propose un look." }
  ]);
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // Récupérer la météo via WeatherAPI + géoloc
  useEffect(() => {
    async function fetchWeather(lat: number, lon: number) {
      try {
        const key = process.env.NEXT_PUBLIC_WEATHER_KEY;
        const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${lon}&lang=fr`;
        const res = await fetch(url);
        const json = await res.json();
        setWeather({
          temp: json.current.temp_c,
          condition: json.current.condition.text,
          city: json.location.name
        });
      } catch (err) {
        console.error("Erreur météo", err);
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => console.warn("Localisation refusée")
      );
    }
  }, []);

  // Envoi message + réponse Anna
  const send = () => {
    if (!input.trim()) return;

    const next: Msg[] = [...messages, { role: "user", text: input } as const];

    let replyText = "Je note ton style ✨.";
    if (weather) {
      if (weather.temp > 25) {
        replyText = `À ${weather.city}, il fait ${weather.temp}°C (${weather.condition}). Je recommande une tenue légère : chemise fluide, short clair, sneakers blanches.`;
      } else if (weather.temp > 15) {
        replyText = `À ${weather.city}, il fait ${weather.temp}°C (${weather.condition}). Opte pour un jean brut, une chemise et une veste légère.`;
      } else {
        replyText = `À ${weather.city}, il fait ${weather.temp}°C (${weather.condition}). Je suggère un manteau chic, pull chaud et bottines élégantes.`;
      }
    }

    const reply: Msg = { role: "assistant", text: replyText };

    setMessages([...next, reply]);
    setInput("");
  };

  return (
    <>
      <Header />
      <main className="container py-16">
        <h1 className="text-3xl font-bold mb-6">Chat avec Anna</h1>

        {/* Bloc météo au-dessus du chat */}
        {weather && (
          <div className="mb-4 text-sm text-gray-600">
            🌦️ {weather.city} • {weather.temp}°C — {weather.condition}
          </div>
        )}

        <div className="card space-y-4">
          <div className="h-96 overflow-y-auto space-y-4 p-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed
                  ${m.role === "user"
                    ? "bg-black text-white rounded-br-none"
                    : "bg-[#f5f5f0] text-gray-900 rounded-bl-none border border-gray-200"}`}>
                  {m.role === "assistant" && <div className="font-semibold mb-1">Anna 💎</div>}
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              className="flex-1 border rounded-full px-4 py-3"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Décris ton occasion (ex: dîner chic, sortie week-end…)"
            />
            <button className="btn" onClick={send}>Envoyer</button>
          </div>
        </div>
      </main>
    </>
  );
}

