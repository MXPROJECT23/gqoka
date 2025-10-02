export async function getWeather(lat: number, lon: number) {
  const url = `${process.env.NEXT_PUBLIC_WEATHER_API}?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Météo non disponible");
  const data = await res.json();
  return data.current_weather; // { temperature, weathercode, windspeed }
}

export function weatherAdvice(weather: any) {
  if (!weather) return "Impossible de récupérer la météo.";
  const t = weather.temperature;
  const code = weather.weathercode;
  if (code === 61 || code === 63) return "Prends un imperméable, il pleut.";
  if (t < 5) return "Couvre-toi, il fait froid.";
  if (t > 25) return "Opte pour une tenue légère, il fait chaud.";
  return "Temps neutre, choisis ton style préféré.";
}


