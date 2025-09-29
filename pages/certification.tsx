import Header from "../components/Header";

export default function Certification() {
  return (
    <>
      <Header />
      <main className="container py-16">
        <h1 className="text-3xl font-bold mb-6">Certification GQOKA</h1>

        <p className="mb-6 text-gray-700">
          La certification <strong>GQOKA</strong> donne à vos pièces une nouvelle valeur.
          Chaque vêtement reçoit un <em>badge digital de confiance</em> garantissant son authenticité
          et augmentant sa désirabilité sur le marché de la mode circulaire.
        </p>

        <div className="card space-y-4 p-6">
          <p className="text-gray-600">
            📸 Importez les photos de votre pièce pour obtenir une pré-certification instantanée.
          </p>
          <input type="file" accept="image/*" multiple className="w-full border rounded p-2" />
          <button className="btn w-full">Certifier mon vêtement</button>
        </div>

        <div className="mt-10 p-6 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">🎯 Pourquoi certifier ?</h2>
          <ul className="list-disc ml-5 space-y-2 text-gray-700">
            <li>Gagner la confiance des acheteurs.</li>
            <li>Augmenter la valeur perçue de vos pièces.</li>
            <li>Assurer traçabilité et authenticité.</li>
            <li>Préparer la revente avec badge digital et QR code.</li>
          </ul>
        </div>
      </main>
    </>
  );
}

