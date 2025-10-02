export default function Confidentialite() {
  return (
    <main className="container mx-auto px-6 py-16 max-w-3xl leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité</h1>
      <p className="text-sm text-gray-500 mb-10">Dernière mise à jour : Février 2025</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">1. Collecte des données</h2>
        <p>
          Lors de l’utilisation de <strong>GQOKA</strong>, nous collectons des données nécessaires
          à la création de votre compte, à la gestion de votre garde-robe et à la personnalisation
          des recommandations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">2. Utilisation des données</h2>
        <p>
          Les données collectées sont utilisées pour :  
          – Créer et gérer votre compte utilisateur  
          – Améliorer l’expérience de stylisme avec Anna  
          – Proposer des recommandations personnalisées  
          – Permettre la certification et la seconde vie des articles
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">3. Partage des données</h2>
        <p>
          Vos données ne sont jamais revendues. Elles peuvent être partagées uniquement avec des
          partenaires techniques indispensables au fonctionnement du service (hébergement, email,
          authentification).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">4. Droits des utilisateurs</h2>
        <p>
          Vous disposez d’un droit d’accès, de modification et de suppression de vos données.
          Vous pouvez exercer vos droits en nous contactant à{" "}
          <a href="mailto:support@gqoka.com" className="text-blue-600 underline">
            support@gqoka.com
          </a>.
        </p>
      </section>
    </main>
  );
}
