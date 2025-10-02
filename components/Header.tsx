import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setEmail(s?.user?.email ?? null));
    return () => sub.subscription.unsubscribe();
  }, []);

  return (
    <header className={`sticky top-0 z-40 backdrop-blur bg-white/75 border-b ${scrolled ? "shadow-sm" : ""}`}>
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="GQOKA Accueil">
          <Image src="/favicon.svg" alt="GQOKA" width={20} height={20} />
          <span className="font-semibold tracking-wide">GQOKA</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link href="/">Accueil</Link>
          <Link href="/wardrobe">Garde-robe</Link>
          <Link href="/profile">Profil</Link>
        </nav>
        {email ? (
          <button
            className="px-3 py-1 border rounded-lg text-sm"
            onClick={() => supabase.auth.signOut()}
            aria-label="Se déconnecter"
          >
            Quitter
          </button>
        ) : (
          <Link href="/auth" className="btn text-sm" aria-label="Se connecter">
            Connexion
          </Link>
        )}
      </div>
    </header>
  );
}

