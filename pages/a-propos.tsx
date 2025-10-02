export default function APropos() {
  return (
    <main className="container py-20 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">À propos de GQOKA</h1>

      <section className="mb-10">
        <p className="text-gray-700 text-lg leading-relaxed">
          <strong>GQOKA</strong> est né d’une idée simple : 
          et si la technologie pouvait transformer notre garde-robe en un espace intelligent, inspirant et responsable ?
        </p>
        <p className="text-gray-700 mt-4">
          Dans un monde où la mode est trop souvent synonyme de surconsommation, 
          nous avons voulu proposer une alternative : une expérience qui valorise vos vêtements, 
          leur donne une seconde vie et vous aide à consommer plus consciemment.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Notre mission</h2>
        <p className="text-gray-700">
          Offrir à chacun un <strong>styliste personnel</strong> grâce à l’intelligence artificielle.  
          Avec <em>Anna</em>, votre conseillère virtuelle, vous pouvez organiser votre garde-robe, 
          créer des looks uniques et donner une nouvelle vie à vos vêtements.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">Notre vision</h2>
        <p className="text-gray-700">
          La mode ne doit pas être une contrainte ni un gaspillage.  
          Nous imaginons un futur où chaque vêtement est <strong>valorisé</strong>, 
          où la créativité rencontre la durabilité.  
          GQOKA veut être à la mode ce que Spotify est à la musique : 
          une plateforme simple, intuitive et révolutionnaire.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Pourquoi nous choisir ?</h2>
        <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-2">
          <li>Un <strong>assistant styliste</strong> qui parle votre langage mode.</li>
          <li>Une <strong>garde-robe digitale</strong> élégante et facile à gérer.</li>
          <li>Un <strong>pitch de revente</strong> automatique pour vos vêtements.</li>
          <li>Une démarche responsable : consommer moins mais mieux.</li>
        </ul>
      </section>

      <div className="mt-12 p-6 bg-gray-100 rounded-xl text-center">
        <p className="text-lg font-semibold">
          Ensemble, réinventons notre manière d’aimer la mode.  
        </p>
        <p className="text-sm text-gray-600 mt-2">
          GQOKA – Votre styliste intelligent ✨
        </p>
      </div>
    </main>
  );
}
