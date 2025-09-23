import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-blue-600">
          GQOKA
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link href="/">Accueil</Link>
          <Link href="/wardrobe">Ma garde-robe</Link>
          <Link href="/chat">Chat avec Anna</Link>
          <Link href="/login">Connexion</Link>
        </nav>

        {/* Bouton CTA visible */}
        <div className="hidden md:block">
          <Link
            href="/signup"
            className="px-5 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
          >
            S’inscrire
          </Link>
        </div>

        {/* Menu mobile */}
        <div className="md:hidden">
          <button
            onClick={() => alert('Menu mobile à coder plus tard 🚀')}
            className="text-gray-700 text-2xl"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}

