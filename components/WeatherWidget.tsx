"use client";
import { useEffect, useState } from "react";
import { getWeather, weatherAdvice } from "@/lib/weather";

export default function WeatherWidget() {
  const [message, setMessage] = useState("Anna prépare la météo…");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude, longitude } = pos.coords;
            const data = await getWeather(latitude, longitude); // ✅ deux arguments
            if (!data) {
              setError("Impossible de récupérer la météo.");
            } else {
              setMessage(weatherAdvice(data));
            }
          } catch {
            setError("Erreur lors de la récupération de la météo.");
          } finally {
            setLoading(false);
          }
        },
        () => {
          // ✅ fallback sur Paris avec lat/lon
          getWeather(48.8566, 2.3522).then((data) => {
            if (data) setMessage(weatherAdvice(data));
          });
          setLoading(false);
        }
      );
    } else {
      setError("Géolocalisation non supportée.");
      setLoading(false);
    }
  }, []);

  if (loading) return <p className="text-gray-500">Chargement météo…</p>;

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-2">Conseil météo par Anna</h3>
      {error ? <p className="text-red-500">{error}</p> : <p>{message}</p>}
    </div>
  );
}


