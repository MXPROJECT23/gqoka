import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur bg-white/75 border-b ${scrolled ? "shadow-sm" : ""}`}
      role="navigation"
      aria-label="navigation principale"
    >
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="GQOKA Accueil">
          <Image src="/favicon.svg" alt="GQOKA" width={20} height={20} />
          <span className="font-semibold tracking-wide">GQOKA</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/" className="hover:opacity-80">Accueil</Link>
          <Link href="/wardrobe" className="hover:opacity-80">Garde-robe</Link>
          <Link href="/profile" className="hover:opacity-80">Profil</Link>
        </nav>
        <Link href="/wardrobe" className="btn text-sm md:hidden" aria-label="Ouvrir ma garde-robe">
          Ouvrir
        </Link>
      </div>
    </header>
  );
}


