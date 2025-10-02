import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import AnnaBubble from "@/components/AnnaBubble";
import CookieBanner from "@/components/CookieBanner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <AnnaBubble />
      <CookieBanner />
    </>
  );
}


