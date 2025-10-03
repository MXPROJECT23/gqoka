import { useEffect, useState } from "react";

type WX = { temp: number; summary: string; icon: string };

export default function WeatherCard() {
  const [wx, setWx] = useState<WX | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,weather_code`;
        const r = await fetch(url);
        const j = await r.json();
        const t = j?.current?.temperature_2m ?? null;
        const code = j?.current?.weather_code ?? 0;
        setWx({ temp: t, summary: codeMap(code), icon: icon(code) });
      },
      async () => {
        // fallback Paris
        const r = await fetch("https://api.open-meteo.com/v1/forecast?latitude=48.85&longitude=2.35&current=temperature_2m,weather_code");
        const j = await r.json();
        const t = j?.current?.temperature_2m ?? null;
        const code = j?.current?.weather_code ?? 0;
        setWx({ temp: t, summary: codeMap(code), icon: icon(code) });
      },
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

function codeMap(c:number){
  if([0].includes(c)) return "Grand ciel bleu";
  if([1,2].includes(c)) return "Partiellement couvert";
  if([3].includes(c)) return "Couvert";
  if([45,48].includes(c)) return "Brouillard";
  if([51,53,55].includes(c)) return "Bruine";
  if([61,63,65].includes(c)) return "Pluie";
  if([71,73,75].includes(c)) return "Neige";
  if([95,96,99].includes(c)) return "Orage";
  return "Conditions variables";
}
function icon(c:number){
  if([0].includes(c)) return "☀️";
  if([1,2].includes(c)) return "🌤️";
  if([3].includes(c)) return "☁️";
  if([61,63,65].includes(c)) return "🌧️";
  if([71,73,75].includes(c)) return "❄️";
  if([95,96,99].includes(c)) return "⛈️";
  return "⛅";
}
