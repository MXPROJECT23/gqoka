import { useEffect, useState } from 'react';

type Weather = { temp:number; rain:number; code:number };

export default function WeatherChip() {
  const [w, setW] = useState<Weather | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setErr('Géolocalisation indisponible');
      return;
    }
    navigator.geolocation.getCurrentPosition(async pos => {
      try {
        const { latitude, longitude } = pos.coords;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation&current_weather=true`;
        const r = await fetch(url);
        const j = await r.json();
        const temp = j?.current_weather?.temperature ?? null;
        const rain = j?.hourly?.precipitation?.[0] ?? 0;
        const code = j?.current_weather?.weathercode ?? 0;
        setW({ temp, rain, code });
      } catch (e:any) {
        setErr('Erreur météo');
      }
    }, () => setErr('Permission localisation refusée'));
  }, []);

  if (err) return <span className="text-xs text-neutral-500">{err}</span>;
  if (!w) return <span className="text-xs text-neutral-500">Météo…</span>;

  const advice = (() => {
    if (w.rain > 0.2) return "Anna: prends une veste imperméable.";
    if (w.temp <= 10) return "Anna: privilégie un manteau chaud.";
    if (w.temp >= 26) return "Anna: tissus légers recommandés.";
    return "Anna: tenue de mi‑saison.";
  })();

  return (
    <div className="text-xs px-2 py-1 rounded bg-neutral-100">
      {w.temp}°C · {advice}
    </div>
  );
}
