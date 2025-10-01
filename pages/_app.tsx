import "../styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

const RgpdBanner = dynamic(() => import("../components/RgpdBanner"), { ssr: false });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <RgpdBanner />
    </>
  );
}
