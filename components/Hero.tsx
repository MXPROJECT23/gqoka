import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Votre style. <span className="text-gray-400">Assisté par Anna.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-gray-600">
          Photographiez vos vêtements. Laissez Anna classer, certifier et suggérer des tenues.
          Simple. Rapide. Premium.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/wardrobe" className="btn">Commencer maintenant</Link>
          <Link href="#features" className="px-4 py-2 rounded-lg border">Découvrir</Link>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_60%)]" />
    </section>
  );
}
