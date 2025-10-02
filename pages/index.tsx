import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white text-black">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-6">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1521335629791-ce4aec67dd47?auto=format&fit=crop&w=1400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Votre garde-robe <br /> <span className="text-[#FFD700]">réinventée</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10">
            Découvrez <strong>Anna</strong>, votre styliste intelligent.  
            Organisez vos vêtements, créez vos looks, et redonnez une seconde vie à vos articles.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href="/wardrobe"
              className="px-6 py-3 bg-[#FFD700] text-black rounded-full font-semibold shadow-md hover:bg-yellow-400 transition"
            >
              ✨ Commencer
            </Link>
            <Link
              href="/a-propos"
              className="px-6 py-3 border border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* Section valeur ajoutée */}
      <section className="py-20 px-6 text-center max-w-5xl mx-auto space-y-12">
        <h2 className="text-3xl font-bold">Pourquoi choisir GQOKA ?</h2>

        <div className="grid md:grid-cols-3 gap-10 mt-10">
          <div className="space-y-3">
            <div className="text-5xl">👗</div>
            <h3 className="text-xl font-semibold">Votre styliste perso</h3>
            <p className="text-gray-600">
              Anna analyse vos vêtements et vous propose des looks adaptés à votre style.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-5xl">♻️</div>
            <h3 className="text-xl font-semibold">Seconde vie</h3>
            <p className="text-gray-600">
              Donnez une nouvelle chance à vos vêtements avec un pitch prêt à copier-coller.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-5xl">🌍</div>
            <h3 className="text-xl font-semibold">Mode responsable</h3>
            <p className="text-gray-600">
              Moins de gaspillage, plus de style. Une consommation plus consciente et inspirante.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

