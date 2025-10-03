import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Profile() {
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user
      if (u) {
        setEmail(u.email ?? '')
      }
    })
  }, [])

  async function save() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from('profiles').upsert({ id: user.id, username })
    setSaving(false)
    alert('Profil mis à jour')
  }

  return (
    <div className="max-w-md mx-auto card space-y-3">
      <h2 className="text-2xl font-semibold">Profil</h2>
      <div><span className="label">Email</span><div className="mt-1">{email}</div></div>
      <div>
        <label className="label">Pseudo</label>
        <input className="input" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Votre pseudo" />
      </div>
      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={save} disabled={saving}>Enregistrer</button>
        <button className="btn border" onClick={async ()=>{ await supabase.auth.signOut(); window.location.href='/'}}>Se déconnecter</button>
      </div>
    </div>
  )
}
