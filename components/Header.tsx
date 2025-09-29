import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">GQOKA</Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/wardrobe">Garde-robe</Link>
          <Link href="/chat">Chat</Link>
          <Link href="/rgpd">RGPD</Link>
          <Link href="/login" className="btn">Connexion</Link>
        </nav>
      </div>
    </header>
  );
}

