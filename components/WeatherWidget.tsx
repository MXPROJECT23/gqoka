import { useEffect, useState } from "react";
import { getWeather } from "../lib/weather";

interface WeatherData {
  current: {
    temp_c: number;
    condition: { text: string; icon: string };
  };
  location: { name: string; country: string };
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Étape 1 : obtenir la position de l’utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log("📍 Localisation détectée :", latitude, longitude);

          // Étape 2 : récupérer la météo via WeatherAPI
          const data = await getWeather(`${latitude},${longitude}`);
          if (!data) {
            setError("Impossible de récupérer la météo.");
          } else {
            setWeather(data);
          }
          setLoading(false);
        },
        (err) => {
          console.error("Erreur géolocalisation:", err);
          setError("Localisation refusée. Essayez Paris par défaut.");
          setLoading(false);
        }
      );
    } else {
      setError("La géolocalisation n'est pas supportée par ce navigateur.");
      setLoading(false);
    }
  }, []);

  if (loading) return <p>⏳ Chargement de la météo...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!weather) return null;

  return (
    <div className="flex items-center space-x-3 bg-white shadow rounded-lg px-4 py-2">
      <img src={weather.current.condition.icon} alt="icon" className="w-8 h-8" />
      <div>
        <p className="font-medium">
          {weather.location.name}, {weather.location.country}
        </p>
        <p className="text-sm text-gray-600">
          {weather.current.temp_c}°C – {weather.current.condition.text}
        </p>
      </div>
    </div>
  );
}


