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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          try {
         const data = await getWeather(latitude, longitude);
            if (!data) {
              setError("Impossible de récupérer la météo.");
            } else {
              setWeather(data);
            }
          } catch (e) {
            setError("Erreur API météo.");
          }
          setLoading(false);
        },
        () => {
          setError("Localisation refusée. Météo par défaut : Paris.");
          setLoading(false);
          // Fallback sur Paris si l'utilisateur refuse la localisation
          getWeather("Paris").then((data) => {
            if (data) setWeather(data);
          });
        }
      );
    } else {
      setError("Géolocalisation non supportée.");
      setLoading(false);
    }
  }, []);

  if (loading) return <p>⏳ Chargement de la météo...</p>;
  if (error && !weather) return <p className="text-red-500">{error}</p>;
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



