export default function Confidentialite() {
  return (
    <main className="container py-20 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>

      <p className="mb-6 text-gray-700">
        La présente politique explique comment <strong>GQOKA</strong> collecte, utilise et protège vos informations personnelles.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. Données collectées</h2>
        <p className="text-gray-700">
          Nous collectons uniquement les données strictement nécessaires à votre expérience :
        </p>
        <ul className="list-disc pl-6 text-gray-700 mt-2">
          <li>Adresse e-mail et informations de connexion.</li>
          <li>Photos et détails des vêtements ajoutés.</li>
          <li>Préférences d’utilisation pour améliorer le service.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. Utilisation</h2>
        <p className="text-gray-700">
          Vos données servent uniquement à :
        </p>
        <ul className="list-disc pl-6 text-gray-700 mt-2">
          <li>Vous offrir une garde-robe intelligente et personnalisée.</li>
          <li>Générer des recommandations de style pertinentes.</li>
          <li>Préparer vos articles pour une éventuelle revente.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. Partage</h2>
        <p className="text-gray-700">
          Vos données ne sont pas partagées avec des tiers à des fins commerciales.  
          Elles peuvent uniquement être transmises à nos prestataires techniques (hébergement, sécurité).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">4. Conservation</h2>
        <p className="text-gray-700">
          Nous conservons vos données tant que votre compte est actif. Vous pouvez demander leur suppression à tout moment.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">5. Contact</h2>
        <p className="text-gray-700">
          Pour toute question ou exercice de vos droits, contactez-nous :  
          <a href="mailto:contact@gqoka.com" className="text-blue-600 underline">contact@gqoka.com</a>
        </p>
      </section>
    </main>
  );
}
