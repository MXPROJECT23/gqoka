import Head from "next/head";

export default function CookiesPage() {
  return (
    <>
      <Head><title>Cookies — GQOKA</title></Head>
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-2xl font-bold mb-4">Gestion des cookies</h1>
        <p className="mb-4">
          GQOKA utilise des cookies pour améliorer votre expérience et analyser l’usage du site. 
          Vous pouvez accepter ou refuser ces cookies.
        </p>
        <h2 className="text-xl font-semibold mt-6 mb-2">Types de cookies utilisés</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Cookies essentiels : nécessaires au fonctionnement du site.</li>
          <li>Cookies de performance : pour mesurer l’audience et optimiser.</li>
          <li>Cookies marketing : pour personnaliser votre expérience.</li>
        </ul>
        <p className="mt-6 text-sm text-gray-500">
          Vous pouvez changer vos préférences à tout moment en effaçant le stockage local de votre navigateur.
        </p>
      </main>
    </>
  );
}
