import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"

export default function Home() {
  const nav = useNavigate()
  const [startTo, setStartTo] = useState<string>("/login")

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setStartTo(data.session ? "/dashboard" : "/login")
    })
  }, [])

  const Card = ({ to, title, desc }: { to: string; title: string; desc: string }) => (
    <Link
      to={to}
      className="card block hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-black"
      aria-label={title}
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-neutral-600">{desc}</p>
    </Link>
  )

  return (
    <section className="text-center py-16">
      <h1 className="text-4xl font-bold">GQOKA</h1>
      <p className="mt-3 text-neutral-600">
        Garde-robe intelligente. Conseils d'Anna. Prête pour la revente.
      </p>

      <div className="mt-6 flex justify-center gap-3">
        <button onClick={() => nav(startTo)} className="btn btn-primary">Commencer</button>
        <a href="#features" className="btn border">Fonctionnalités</a>
      </div>

      <div id="features" className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card to="/login" title="Connexion sécurisée" desc="Supabase Auth email." />
        <Card to="/wardrobe" title="Garde-robe" desc="Ajouter / modifier / supprimer." />
        <Card to="/dashboard" title="Anna + météo" desc="Suggestions de tenues." />
      </div>
    </section>
  )
}

