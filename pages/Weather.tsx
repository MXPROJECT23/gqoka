import { useEffect, useState } from "react";

type WeatherData = {
  temp: number;
  description: string;
  icon: string;
};

export default function Weather() {
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Exemple avec Open-Meteo (gratuit, pas besoin de clé)
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current_weather=true");
        const json = await res.json();
        const weather = {
          temp: json.current_weather.temperature,
          description: "Temps actuel",
          icon: "🌤️"
        };
        setData(weather);
      } catch (e) {
        console.error("Erreur météo", e);
      }
    }
    fetchWeather();
  }, []);

  if (!data) return <p className="text-sm text-gray-500">Chargement météo...</p>;

  return (
    <div className="card flex items-center gap-3 text-sm w-fit">
      <span>{data.icon}</span>
      <span>{data.temp}°C</span>
      <span className="text-gray-600">{data.description}</span>
    </div>
  );
}
