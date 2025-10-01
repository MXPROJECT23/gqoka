import Header from "../components/Header";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";

const Weather = dynamic(() => import("../components/Weather"), { ssr: false });

export default function Home() {
  return (
    <>
      <Header />
      <main className="container py-14 md:py-20">
        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <Weather />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Votre styliste. <br className="hidden md:block" />
              Votre garde-robe digitale.
            </h1>
            <p className="text-gray-600 text-lg md:text-xl">
              Ajoutez vos pièces, recevez des looks instantanés d’Anna, valorisez vos vêtements avec la certification.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-start justify-center">
              <a href="/signup" className="btn w-full sm:w-auto">Créer un compte</a>
              <a href="/wardrobe" className="btn-outline w-full sm:w-auto">Voir ma garde-robe</a>
            </div>
            <p className="text-xs text-gray-500">Gratuit pour l’utilisateur.</p>
          </div>

          {/* Visuel hero */}
          <div className="order-first md:order-last">
            <div className="aspect-[4/5] rounded-2xl border shadow-sm bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl">👗</div>
                <p className="mt-2 text-sm text-gray-600">Capsule 10 pièces • Looks par Anna</p>
              </div>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="card">
            <h3 className="font-semibold mb-2">Ajout ultra simple</h3>
            <p className="text-sm text-gray-600">Caméra mobile intégrée. 3 photos par pièce. Capsule ≤ 10.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Anna, styliste premium</h3>
            <p className="text-sm text-gray-600">Looks adaptés à vous et à la météo, ton mode élégant.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">Certification & revente</h3>
            <p className="text-sm text-gray-600">Badge digital de confiance. Pitch copiable. Prix indicatif.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

