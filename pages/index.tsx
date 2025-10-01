import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="container py-16 text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">GQOKA</h1>
        <p className="text-gray-600 mt-3">Shell prêt. Étape suivante: pages finales et fonctionnalités.</p>
      </main>
      <Footer />
    </>
  );
}


