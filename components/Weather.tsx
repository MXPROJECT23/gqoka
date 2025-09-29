import { useEffect, useState } from "react";

type WeatherData = {
  temp: number;
  condition: string;
  icon: string;
  city: string;
};

export default function Weather() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather(lat: number, lon: number) {
      try {
        const key = process.env.NEXT_PUBLIC_WEATHER_KEY;
        const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${lon}&lang=fr`;
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
        setError("Impossible de charger la météo.");
      }
    }

    // Demander la localisation au navigateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetchWeather(latitude, longitude);
        },
        () => {
          setError("Localisation refusée. Impossible d'afficher la météo.");
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée.");
    }
  }, []);

  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (!data) return <p className="text-sm text-gray-500">Chargement météo...</p>;

  return (
    <div className="card flex items-center gap-3 text-sm w-fit">
      <img src={data.icon} alt={data.condition} className="w-6 h-6" />
      <span>{data.city} • {data.temp}°C</span>
      <span className="capitalize text-gray-600">{data.condition}</span>
    </div>
  );
}


