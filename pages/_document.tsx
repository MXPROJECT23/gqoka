import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <meta name="theme-color" content="#0f0f0f" />
        <meta name="description" content="GQOKA — Votre styliste et votre garde-robe digitale." />
        <meta property="og:title" content="GQOKA" />
        <meta property="og:description" content="Anna, styliste IA. Garde-robe capsule. Certification et revente." />
        <meta property="og:type" content="website" />
      </Head>
      <body className="min-h-screen flex flex-col">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}


