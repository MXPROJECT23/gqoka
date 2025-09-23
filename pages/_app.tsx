import AnnaFloatingButton from "../components/AnnaFloatingButton";
// ...dans le JSX :
<AnnaFloatingButton />
import type { AppProps } from 'next/app'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
