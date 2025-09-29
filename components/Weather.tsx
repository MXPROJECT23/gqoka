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
        const apiKey = process.env.NEXT_PUBLIC_WEATHER_KEY;
        const city = "Paris"; // TODO: remplacer par localisation dynamique ou saisie utilisateur

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`
        );
        const json = await res.json();

        const weather = {
          temp: json.main.temp,
          description: json.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${json.weather[0].icon}.png`,
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
      <img src={data.icon} alt="icon" className="w-6 h-6" />
      <span>{Math.round(data.temp)}°C</span>
      <span className="capitalize">{data.description}</span>
    </div>
  );
}
