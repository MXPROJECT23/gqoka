import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold">GQOKA</h2>
          <p className="text-sm text-gray-400 mt-2">
            Votre styliste intelligent pour une mode responsable et inspirante.  
            Découvrez, organisez et redonnez vie à vos vêtements.
          </p>
        </div>

        {/* Liens rapides */}
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Navigation</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/wardrobe">Ma garde-robe</Link></li>
            <li><Link href="/chat">Chat avec Anna</Link></li>
            <li><Link href="/profil">Mon profil</Link></li>
          </ul>
        </div>

        {/* Légal */}
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">Légal</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/rgpd">RGPD</Link></li>
            <li><Link href="/cgu">Conditions générales</Link></li>
            <li><Link href="/confidentialite">Politique de confidentialité</Link></li>
          </ul>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-t border-gray-700 text-gray-400 text-xs py-4 text-center">
        © {new Date().getFullYear()} GQOKA. Tous droits réservés.
      </div>
    </footer>
  );
}
