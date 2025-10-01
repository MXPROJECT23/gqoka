import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Rgpd() {
  return (
    <>
      <Header />
      <main className="container py-14 max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold">Confidentialité & RGPD</h1>
        <p className="text-gray-600">
          GQOKA respecte vos données personnelles. Nous ne collectons que ce qui est nécessaire à l’usage
          du service (email, garde-robe et préférences).
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          <li>Vos données ne sont pas revendues.</li>
          <li>Vous pouvez supprimer votre compte à tout moment.</li>
          <li>Les cookies sont uniquement utilisés pour améliorer l’expérience.</li>
        </ul>
        <p className="text-gray-600">
          Pour toute question, contactez-nous à <a href="mailto:support@gqoka.com" className="underline">support@gqoka.com</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}

