import { useEffect, useState } from "react";

type Wx = { city: string; temp: number; cond: string; icon: string };

export default function Weather() {
  const [data, setData] = useState<Wx | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) { setErr("Géolocalisation non supportée."); return; }
    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        const key = process.env.NEXT_PUBLIC_WEATHER_KEY;
        const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${pos.coords.latitude},${pos.coords.longitude}&lang=fr`;
        const r = await fetch(url);
        const j = await r.json();
        setData({
          city: j.location.name,
          temp: Math.round(j.current.temp_c),
          cond: j.current.condition.text,
          icon: j.current.condition.icon
        });
      } catch {
        setErr("Météo indisponible.");
      }
    }, () => setErr("Localisation refusée."));
  }, []);

  if (err) return <div className="text-xs text-red-600">{err}</div>;
  if (!data) return <div className="text-xs text-gray-500">Chargement météo…</div>;

  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm bg-white">
      <img src={data.icon} alt={data.cond} className="w-5 h-5" />
      <span className="font-medium">{data.city}</span>
      <span>• {data.temp}°C</span>
      <span className="capitalize text-gray-600">— {data.cond}</span>
    </div>
  );
}

