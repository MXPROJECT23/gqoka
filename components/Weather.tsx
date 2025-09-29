import { useEffect, useState } from "react";

type WeatherData = {
  temp: number;
  condition: string;
  icon: string;
  city: string;
};

export default function Weather() {
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const key = process.env.NEXT_PUBLIC_WEATHER_KEY;
        // Pour le MVP : fixe sur Paris, FR
        const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=Paris&lang=fr`;
        const res = await fetch(url);
        const json = await res.json();

        const weather = {
          temp: json.current.temp_c,
          condition: json.current.condition.text,
          icon: json.current.condition.icon,
          city: json.location.name,
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
      <img src={data.icon} alt={data.condition} className="w-6 h-6" />
      <span>{data.city} • {data.temp}°C</span>
      <span className="capitalize text-gray-600">{data.condition}</span>
    </div>
  );
}

