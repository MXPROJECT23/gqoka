import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-[#0B0D12]">
        GQOKA
      </Link>
      <nav className="space-x-4">
        <Link href="/wardrobe" className="text-gray-700 hover:text-black">
          Garde-robe
        </Link>
        <Link href="/chat" className="text-gray-700 hover:text-black">
          Parler à Anna
        </Link>
        <Link href="/login" className="text-gray-700 hover:text-black">
          Connexion
        </Link>
        <Link href="/signup" className="text-gray-700 hover:text-black">
          Inscription
        </Link>
      </nav>
    </header>
  );
}

}
