import { useEffect, useState } from "react";

type WX = { temp: number; summary: string; icon: string };

export default function WeatherCard() {
  const [wx, setWx] = useState<WX | null>(null);

  useEffect(() => {
    const run = async (lat: number, lon: number) => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`;
      const r = await fetch(url);
      const j = await r.json();
      const t = j?.current?.temperature_2m ?? null;
      const code = j?.current?.weather_code ?? 0;
      setWx({ temp: t, summary: codeMap(code), icon: icon(code) });
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => run(pos.coords.latitude, pos.coords.longitude),
      () => run(48.8566, 2.3522), // Paris fallback
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, []);

  if (!wx) return null;

  return (
    <div className="card flex items-center gap-3">
      <span className="text-2xl">{wx.icon}</span>
      <div>
        <div className="font-semibold">Météo & conseils</div>
        <div className="text-sm text-neutral-600">
          Temp: <b>{wx.temp}°C</b> • {wx.summary}
        </div>
      </div>
    </div>
  );
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
