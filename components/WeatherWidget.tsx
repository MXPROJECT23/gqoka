import { useState, useEffect } from "react";

export default function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Erreur météo :", err);
      }
    };
    fetchWeather();
  }, []);

  if (!weather) {
    return (
      <div className="bg-gray-100 text-gray-600 rounded-xl p-4 mb-6">
        Chargement météo...
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center gap-4">
      <span className="text-3xl">🌤️</span>
      <div>
        <p className="font-semibold">{weather.name}</p>
        <p>
          {Math.round(weather.main.temp)}°C — {weather.weather[0].description}
        </p>
      </div>
    </div>
  );
}
