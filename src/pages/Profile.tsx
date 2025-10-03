import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import AvatarUploader from '../components/AvatarUploader'

export default function Profile() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string>('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setEmail(user.email || '')
      const { data } = await supabase.from('profiles').select('username, avatar_url').eq('id', user.id).single()
      if (data) {
        setUsername(data.username || '')
        setAvatarUrl(data.avatar_url || '')
      }
    })()
  }, [])

  async function save() {
    setSaving(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setSaving(false); return }
    const { error } = await supabase.from('profiles')
      .upsert({ id: user.id, username, avatar_url: avatarUrl })
    setSaving(false)
    if (error) alert(error.message); else alert('Profil mis à jour')
  }

  return (
    <div className="max-w-xl mx-auto card space-y-4">
      <h2 className="text-2xl font-semibold">Profil</h2>

      {/* label masqué pour éviter le texte visible sous le cercle */}
      <span id="avatar-label" className="sr-only">Avatar</span>
      <div aria-labelledby="avatar-label">
        <AvatarUploader value={avatarUrl} onChange={setAvatarUrl} />
      </div>

      <div>
        <span className="label">Email</span>
        <div className="mt-1">{email}</div>
      </div>

      <div>
        <label className="label">Pseudo</label>
        <input className="input" value={username} onChange={e=>setUsername(e.target.value)} placeholder="Votre pseudo" />
      </div>

      <div className="flex gap-2">
        <button className="btn btn-primary" onClick={save} disabled={saving}>Enregistrer</button>
        <button className="btn border" onClick={async()=>{ await supabase.auth.signOut(); window.location.href='/' }}>Se déconnecter</button>
      </div>
    </div>
  )
}


