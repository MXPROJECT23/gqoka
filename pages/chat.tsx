import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Msg = { role: "user" | "assistant"; text: string };

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Bonjour, je suis Anna 👗. Décris-moi une pièce ou une occasion, je t’accompagne avec un look sur mesure." }
  ]);
  const [input, setInput] = useState("");
  const [meteo, setMeteo] = useState<{ city: string; temp: number; cond: string } | null>(null);

  // Récupérer météo
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(async pos => {
      try {
        const k = process.env.NEXT_PUBLIC_WEATHER_KEY;
        const u = `https://api.weatherapi.com/v1/current.json?key=${k}&q=${pos.coords.latitude},${pos.coords.longitude}&lang=fr`;
        const r = await fetch(u);
        const j = await r.json();
        setMeteo({ city: j.location.name, temp: j.current.temp_c, cond: j.current.condition.text });
      } catch {}
    });
  }, []);

  const send = () => {
    if (!input.trim()) return;
    const next: Msg[] = [...messages, { role: "user", text: input }];
    // Réponse styliste premium
    const context = meteo ? `À ${meteo.city}, il fait ${Math.round(meteo.temp)}°C (${meteo.cond}). ` : "";
    const reply: Msg = {
      role: "assistant",
      text: `${context}✨ Je te recommande un look chic et intemporel : un blazer structuré, un pantalon fluide et des sneakers minimalistes. Accessoirise avec une ceinture fine pour sublimer la silhouette.`
    };
    setMessages([...next, reply]);
    setInput("");
  };

  return (
    <>
      <Header />
      <main className="container py-14">
        <h1 className="text-3xl font-bold mb-6">Chat avec Anna</h1>

        <div className="card space-y-4">
          {/* Zone messages */}
          <div className="h-96 overflow-y-auto space-y-4 p-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-black text-white rounded-br-none"
                      : "bg-[#f5f5f0] text-gray-900 rounded-bl-none border border-gray-200"
                  }`}
                >
                  {m.role === "assistant" && <div className="font-semibold mb-1">Anna</div>}
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              className="flex-1 border rounded-full px-4 py-3"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Décris ta pièce ou ton occasion…"
            />
            <button className="btn" onClick={send}>Envoyer</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

