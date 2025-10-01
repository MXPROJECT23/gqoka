import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="container h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">GQOKA</Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/wardrobe" className="hover:opacity-80">Garde-robe</Link>
          <Link href="/chat" className="hover:opacity-80">Chat</Link>
          <Link href="/profile" className="hover:opacity-80">Profil</Link>
          <Link href="/login" className="btn">Connexion</Link>
        </nav>

        {/* Mobile hamburger */}
        <button aria-label="Menu" onClick={()=>setOpen(v=>!v)} className="md:hidden p-2 rounded-lg border">
          ☰
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container py-3">
            <Link href="/wardrobe" className="nav-link" onClick={()=>setOpen(false)}>Garde-robe</Link>
            <Link href="/chat" className="nav-link" onClick={()=>setOpen(false)}>Chat</Link>
            <Link href="/profile" className="nav-link" onClick={()=>setOpen(false)}>Profil</Link>
            <Link href="/login" className="nav-link" onClick={()=>setOpen(false)}>Connexion</Link>
          </div>
        </div>
      )}
    </header>
  );
}

