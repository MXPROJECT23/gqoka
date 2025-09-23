// components/Hero.tsx
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B0D12] text-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight"
        >
          Votre **styliste IA**,
          <span className="block text-[#5B8CFF]">dans votre poche.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-6 max-w-2xl text-lg text-[#E6E8EB]/80"
        >
          GQOKA analyse votre garde-robe et propose des looks réellement portables.
          Zéro scroll infini. 100% vous.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/signup"
            className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition"
          >
            Essayer gratuitement
          </Link>
          <Link
            href="/wardrobe"
            className="px-6 py-3 rounded-xl border border-white/20 font-medium hover:bg-white/10 transition"
          >
            Voir une démo
          </Link>
        </motion.div>
      </div>

      {/* Halo d’arrière-plan */}
      <div className="pointer-events-none absolute -top-24 right-[-10%] h-96 w-96 rounded-full blur-3xl"
           style={{ background: "radial-gradient(600px circle at 50% 50%, #5B8CFF33, transparent 60%)" }} />
    </section>
  );
}
