import AnnaFloatingButton from "../components/AnnaFloatingButton";
// ...dans le JSX :
<AnnaFloatingButton />
import Header from "../components/Header";
import Hero from "../components/Hero";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Section Hero */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold tracking-tight"
        >
          Bienvenue chez <span className="text-blue-600">GQOKA</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl"
        >
          Votre garde-robe intelligente et styliste personnelle ✨  
          Découvrez comment Anna sublime vos tenues.
        </motion.p>
        <motion.a
          href="/signup"
          whileHover={{ scale: 1.05 }}
          className="mt-10 inline-block bg-black text-white px-8 py-4 rounded-full shadow-lg text-lg font-medium hover:bg-gray-900 transition"
        >
          Commencer maintenant
        </motion.a>
      </section>

      {/* Section Concept */}
      <section className="py-16 px-6 text-center border-t">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Le concept
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          GQOKA révolutionne la mode en vous offrant un <b>assistant styliste</b> 
          toujours disponible. Photographiez vos vêtements, laissez Anna analyser 
          votre garde-robe et profitez de suggestions personnalisées adaptées à 
          votre style, la météo et vos envies.
        </p>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 border-t">
        © {new Date().getFullYear()} GQOKA – Tous droits réservés.
      </footer>
    </div>
  );
}
