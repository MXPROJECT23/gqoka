import RgpdModal from "../components/RgpdModal";

export default function Home() {
  return (
    <div>
      <main className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Bienvenue sur GQOKA</h1>
        <p className="mt-4 text-lg">Votre styliste intelligent, Anna, vous attend ✨</p>
      </main>

      {/* ✅ Ici on appelle le RGPD */}
      <RgpdModal />
    </div>
  );
}
