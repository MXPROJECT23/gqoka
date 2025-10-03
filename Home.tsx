import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="text-center py-16">
      <h1 className="text-4xl font-bold">GQOKA</h1>
      <p className="mt-3 text-neutral-600">Garde-robe intelligente. Conseils d'Anna. Prête pour la revente.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/login" className="btn btn-primary">Commencer</Link>
        <a href="#features" className="btn border">Fonctionnalités</a>
      </div>
      <div id="features" className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card"><h3 className="font-semibold">Connexion sécurisée</h3><p>Supabase Auth email.</p></div>
        <div className="card"><h3 className="font-semibold">Garde-robe</h3><p>Ajoute, modifie, supprime, partage.</p></div>
        <div className="card"><h3 className="font-semibold">Anna + météo</h3><p>Suggestions de tenues.</p></div>
      </div>
    </section>
  )
}
