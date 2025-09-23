import { useEffect, useState } from "react";
import { getWeather } from "../lib/weather";

interface WeatherData {
  current: {
    temp_c: number;
    condition: { text: string; icon: string };
  };
  location: { name: string; country: string };
}

export default function WeatherWidget({ city = "Paris" }: { city?: string }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getWeather(city);
      setWeather(data);
    }
    fetchData();
  }, [city]);

  if (!weather) return <p>Chargement météo...</p>;

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

