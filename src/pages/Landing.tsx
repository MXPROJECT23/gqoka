import WeatherChip from '../components/WeatherChip';
import CookieBanner from '../components/CookieBanner';
import DialogflowWidget from '../components/DialogflowWidget';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div>
      <header className="max-w-6xl mx-auto flex items-center justify-between py-6 px-4">
        <div className="font-serif text-2xl tracking-wide">GQOKA</div>
        <nav className="flex gap-6 text-sm">
          <Link to="/wardrobe">Garde‑robe</Link>
          <Link to="/resale/new">Seconde Vie</Link>
          <Link to="/profile">Profil</Link>
          <Link to="/login">Connexion</Link>
        </nav>
      </header>

      <section className="max-w-6xl mx-auto px-4 pt-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight">
            Anna, votre styliste augmentée.
          </h1>
          <p className="mt-4 text-neutral-600">
            Photographiez vos vêtements, organisez votre dressing, et générez des fiches de revente premium. 
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/wardrobe" className="bg-black text-white px-4 py-2 rounded">Commencer</Link>
            <WeatherChip />
          </div>
          <p className="mt-6 text-sm text-neutral-500">
            Conseils d’Anna adaptés à la météo. Respect RGPD. Tout est à vous.
          </p>
        </div>
        <div className="aspect-[4/3] bg-neutral-100 rounded-2xl grid place-items-center text-neutral-500">
          Visuel magazine
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
        <div><h3 className="font-medium">Capture</h3><p className="text-sm text-neutral-600">Caméra ou galerie, enregistrez vos pièces en un geste.</p></div>
        <div><h3 className="font-medium">Classe</h3><p className="text-sm text-neutral-600">Taille, marque, catégorie et couleur avec autocomplétion.</p></div>
        <div><h3 className="font-medium">Revends</h3><p className="text-sm text-neutral-600">Fiche de revente générée automatiquement par Anna.</p></div>
      </section>

      <CookieBanner />
      <DialogflowWidget />
    </div>
  );
}
