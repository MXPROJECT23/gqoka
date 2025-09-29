import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container py-16">
        {/* Hero centré façon marque: logo fort, promesse claire, CTA unique */}
        <section className="text-center space-y-8">
          <div className="mx-auto w-24 h-24 rounded-full bg-black"></div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Ta garde-robe, simplifiée</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ajoute tes pièces, obtiens des idées de looks, reste aligné avec la météo. Gratuit pour l’utilisateur.
          </p>
          <a href="/signup" className="btn mx-auto">Créer un compte</a>
        </section>

        {/* 3 piliers visuels: simple, utile, rapide */}
        <section className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="card">
            <h3 className="font-semibold mb-2">Ajoute tes pièces</h3>
            <p className="text-sm text-gray-600">Photos, type, couleur. Tout est rangé.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Idées de looks</h3>
            <p className="text-sm text-gray-600">Propositions instantanées avec Anna.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Météo intégrée</h3>
            <p className="text-sm text-gray-600">Looks adaptés au temps du jour.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}


