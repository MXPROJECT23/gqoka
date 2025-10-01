export default function RGPD() {
  return (
    <main className="container py-20 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Règlement Général sur la Protection des Données (RGPD)</h1>
      
      <p className="mb-6 text-gray-700">
        Chez <strong>GQOKA</strong>, la confidentialité de vos données est une priorité.  
        Cette page décrit la manière dont nous collectons, utilisons et protégeons vos informations personnelles conformément au Règlement (UE) 2016/679.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. Données collectées</h2>
        <p className="text-gray-700">
          Nous collectons uniquement les données nécessaires à l’utilisation du service, notamment :
        </p>
        <ul className="list-disc pl-6 text-gray-700 mt-2">
          <li>Adresse e-mail lors de la création de compte.</li>
          <li>Photos et informations liées à vos vêtements ajoutés.</li>
          <li>Données techniques (IP, logs de connexion) pour la sécurité.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. Utilisation des données</h2>
        <ul className="list-disc pl-6 text-gray-700 mt-2">
          <li>Accès à votre garde-robe personnelle.</li>
          <li>Propositions de style personnalisées par Anna.</li>
          <li>Certification et valorisation de vos articles pour la revente.</li>
          <li>Amélioration continue du service et expérience utilisateur.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. Partage des données</h2>
        <p className="text-gray-700">
          Vos données ne sont <strong>jamais revendues</strong>.  
          Elles peuvent être partagées uniquement avec des prestataires techniques (hébergement, bases de données, analyse).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">4. Durée de conservation</h2>
        <p className="text-gray-700">
          Vos données sont conservées tant que vous utilisez nos services.  
          Vous pouvez demander leur suppression définitive à tout moment.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">5. Vos droits</h2>
        <ul className="list-disc pl-6 text-gray-700 mt-2">
          <li>Droit d’accès et de rectification de vos données.</li>
          <li>Droit à la portabilité.</li>
          <li>Droit à l’effacement (“droit à l’oubli”).</li>
          <li>Droit de limiter ou refuser certains traitements.</li>
        </ul>
        <p className="text-gray-700 mt-2">
          Pour exercer vos droits : contactez-nous à <a href="mailto:contact@gqoka.com" className="text-blue-600 underline">contact@gqoka.com</a>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">6. Sécurité</h2>
        <p className="text-gray-700">
          Nous utilisons des technologies modernes (chiffrement, authentification sécurisée) pour protéger vos données contre tout accès non autorisé.
        </p>
      </section>
    </main>
  );
}


