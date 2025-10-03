import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation() as any
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname || '/dashboard'

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    else navigate(from, { replace: true })
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) setError(error.message)
    else alert('Compte créé. Vérifie ton email.')
  }

  return (
    <div className="max-w-sm mx-auto card">
      <h2 className="text-2xl font-semibold mb-4">Connexion</h2>
      <form className="space-y-3">
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="vous@exemple.com" />
        </div>
        <div>
          <label className="label">Mot de passe</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="********" />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex gap-2">
          <button onClick={handleLogin} className="btn btn-primary w-full" disabled={loading}>Se connecter</button>
          <button onClick={handleSignup} className="btn border w-full" disabled={loading}>Créer un compte</button>
        </div>
      </form>
    </div>
  )
}
