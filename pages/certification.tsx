import Header from "../components/Header";

export default function Certification() {
  return (
    <>
      <Header />
      <main className="container py-16">
        <h1 className="text-3xl font-bold mb-6">Certification GQOKA</h1>

        <p className="mb-6 text-gray-700">
          Donnez une nouvelle vie à vos vêtements grâce à la certification digitale GQOKA.
          Chaque pièce reçoit un <strong>badge de confiance</strong> unique, garantissant son authenticité
          et augmentant sa valeur lors de la revente.
        </p>

        <div className="card space-y-4 p-6">
          <p className="text-gray-600">
            📸 Importez les photos de votre article pour obtenir une certification instantanée.
          </p>
          <input type="file" accept="image/*" className="w-full border rounded p-2" />
          <button className="btn w-full">Certifier mon vêtement</button>
        </div>

        <div className="mt-10 p-6 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">🎯 Avantage</h2>
          <p>
            Votre vêtement certifié devient un <em>actif numérique</em> : 
            traçable, authentifié, et prêt à être revendu avec confiance.
          </p>
        </div>
      </main>
    </>
  );
}
