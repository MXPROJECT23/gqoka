import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Certification() {
  return (
    <>
      <Header />
      <main className="container py-14 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Certification GQOKA</h1>
        <p className="text-gray-600 mb-6">
          Chaque pièce de votre garde-robe peut recevoir un <strong>badge de certification digitale</strong>.
          Ce badge atteste de son authenticité, de sa qualité et de son potentiel pour une seconde vie.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card space-y-3">
            <h3 className="font-semibold">🔒 Authenticité</h3>
            <p className="text-sm text-gray-600">Notre IA vérifie la cohérence des photos et des informations.</p>
          </div>
          <div className="card space-y-3">
            <h3 className="font-semibold">🌍 Seconde vie</h3>
            <p className="text-sm text-gray-600">Un vêtement certifié inspire confiance et facilite la revente.</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button className="btn">Demander la certification</button>
        </div>
      </main>
      <Footer />
    </>
  );
}

