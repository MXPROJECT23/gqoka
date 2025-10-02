export default function Confidentialite() {
  return (
    <main className="container mx-auto px-6 py-16 max-w-3xl leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité</h1>
      <p className="text-sm text-gray-500 mb-10">Dernière mise à jour : Février 2025</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Responsable du traitement</h2>
        <p>
          Le responsable du traitement est <strong>GQOKA</strong>, représenté par l’équipe fondatrice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Finalités</h2>
        <p>
          Vos données sont utilisées pour gérer votre compte, améliorer votre expérience, et
          personnaliser les recommandations de votre styliste Anna.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Vos droits</h2>
        <p>
          Vous disposez d’un droit d’accès, de rectification et de suppression de vos données.
          Contactez-nous :{" "}
          <a href="mailto:support@gqoka.com" className="text-blue-600 underline">
            support@gqoka.com
          </a>.
        </p>
      </section>
    </main>
  );
}

