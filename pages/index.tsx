import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Head>
        <title>GQOKA — Votre styliste personnelle </title>
        <meta
          name="description"
          content="Anna, la styliste  de GQOKA, organise votre garde-robe, recommande vos looks et prépare vos annonces de revente."
        />
      </Head>
      <main className="relative">
        {/* Hero section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 text-center px-6">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Bienvenue dans <span className="text-black">GQOKA</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Anna, votre styliste personnelle, gère votre garde-robe, vous conseille selon la météo
            et prépare vos ventes sur les marketplaces.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/wardrobe" className="btn px-6 py-3 text-lg">
              Commencer avec Anna
            </Link>
            <Link href="/looks" className="px-6 py-3 border rounded-lg text-lg hover:bg-gray-50">
              Découvrir les looks
            </Link>
          </motion.div>

          {/* Background effect */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.05),transparent_70%)]"></div>
        </section>

        {/* Features section */}
        <section id="features" className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Pourquoi choisir <span className="text-black">Anna</span> ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <h3 className="text-xl font-semibold">👗 Scan intelligent</h3>
              <p className="mt-2 text-gray-600">
                Photographiez vos vêtements, Anna les classe automatiquement par catégorie et couleur.
              </p>
            </div>
            <div className="card text-center">
              <h3 className="text-xl font-semibold">☀️ Conseils météo</h3>
              <p className="mt-2 text-gray-600">
                Anna vous propose la tenue du jour adaptée à votre météo locale.
              </p>
            </div>
            <div className="card text-center">
              <h3 className="text-xl font-semibold">💎 Revente premium</h3>
              <p className="mt-2 text-gray-600">
                Anna génère des annonces prêtes à publier sur Vinted, Leboncoin ou Vestiaire Collective.
              </p>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-black text-white text-center py-20">
          <h2 className="text-3xl md:text-4xl font-bold">Prêt à donner vie à votre style ?</h2>
          <p className="mt-4 text-gray-300">Anna vous attend pour gérer vos looks et votre dressing.</p>
          <Link href="/wardrobe" className="btn mt-8 px-8 py-3 text-lg bg-white text-black hover:bg-gray-200">
            Lancer ma garde-robe
          </Link>
        </section>
      </main>
    </>
  );
}

