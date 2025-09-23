import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-b from-blue-100 to-white">
      {/* Halo animé */}
      <motion.div
        className="absolute w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-30"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* Texte principal */}
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Votre styliste IA ✨
      </motion.h1>

      <motion.p
        className="text-lg md:text-2xl text-gray-600 mb-8 max-w-2xl relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Anna analyse votre garde-robe et la météo pour vous proposer des looks
        uniques, personnalisés et toujours tendance.
      </motion.p>

      {/* CTA */}
      <motion.a
        href="/signup"
        className="px-8 py-4 bg-blue-600 text-white text-lg rounded-full shadow-lg hover:bg-blue-700 transition relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Essayer gratuitement
      </motion.a>
    </section>
  );
}

