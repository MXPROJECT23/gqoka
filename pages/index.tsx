import Head from "next/head";
import Hero from "@/components/Hero";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head><title>GQOKA — Anna, votre styliste</title></Head>
      <main>
        <Hero />
        <section id="features" className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "Scan intelligent", d: "Ajoutez un vêtement en 2 clics. Anna détecte type et couleur." },
              { t: "Certification revente", d: "Badge IA pour rassurer vos acheteurs." },
              { t: "Tenues suggérées", d: "Recommandations selon météo et occasion." }
            ].map((f) => (
              <div key={f.t} className="card">
                <h3 className="font-semibold">{f.t}</h3>
                <p className="text-sm text-gray-600 mt-2">{f.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link href="/wardrobe" className="btn">Ouvrir ma garde-robe</Link>
            <Link href="/profile" className="px-4 py-2 rounded-lg border">Mon profil</Link>
          </div>
        </section>
      </main>
    </>
  );
}


