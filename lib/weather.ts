export async function getWeather(city: string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&lang=fr`
    );
    if (!res.ok) throw new Error("Erreur API météo");
    return await res.json();
  } catch (error) {
    console.error("Erreur météo:", error);
    return null;
  }
}
