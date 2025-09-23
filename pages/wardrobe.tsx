import WeatherWidget from "../components/WeatherWidget";

export default function Wardrobe() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Ma Garde-Robe</h1>
      <div className="mb-6">
        <WeatherWidget />
      </div>
      {/* Ici tu ajouteras plus tard la liste des vêtements */}
      <p className="text-gray-600">Aucun article ajouté pour le moment.</p>
    </div>
  );
}
