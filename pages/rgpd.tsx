import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RGPD() {
  return (
    <>
      <Header />
      <main className="container py-16 prose max-w-3xl">
        <h1>RGPD & Confidentialité</h1>
        <p>Nous collectons uniquement les données nécessaires au fonctionnement de GQOKA (compte, éléments de garde-robe). Aucune revente.</p>
        <h2>Vos droits</h2>
        <ul>
          <li>Accès, rectification, suppression.</li>
          <li>Portabilité et limitation.</li>
        </ul>
        <h2>Contact</h2>
        <p>Pour toute demande: support@gqoka.com</p>
      </main>
      <Footer />
    </>
  );
}
