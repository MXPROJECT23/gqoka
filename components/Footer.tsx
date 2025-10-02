import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold">GQOKA</h2>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            Votre styliste intelligent pour une mode responsable et inspirante.  
            Découvrez, organisez et redonnez vie à vos vêtements.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/wardrobe" className="text-gray-300 hover:text-white transition">
                Ma garde-robe
              </Link>
            </li>
            <li>
              <Link href="/chat" className="text-gray-300 hover:text-white transition">
                Chat avec Anna
              </Link>
            </li>
            <li>
              <Link href="/profil" className="text-gray-300 hover:text-white transition">
                Mon profil
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-3">Légal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/rgpd" className="text-gray-300 hover:text-white transition">
                RGPD
              </Link>
            </li>
            <li>
              <Link href="/cgu" className="text-gray-300 hover:text-white transition">
                Conditions générales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="text-gray-300 hover:text-white transition">
                Politique de confidentialité
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-gray-400 text-xs py-4 text-center">
        © {new Date().getFullYear()} GQOKA. Tous droits réservés.
      </div>
    </footer>
  );
}
