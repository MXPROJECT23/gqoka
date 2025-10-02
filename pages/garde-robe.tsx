import ProtectedRoute from "../components/ProtectedRoute";

function GardeRobe() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Ma garde-robe</h1>
      <p>Ici s’affichera ta collection, gérée par Anna.</p>
    </div>
  );
}

export default function Page() {
  return (
    <ProtectedRoute>
      <GardeRobe />
    </ProtectedRoute>
  );
}
