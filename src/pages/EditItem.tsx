import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

import ImageUploader from '../components/ImageUploader'
import BrandAutocomplete from '../components/BrandAutocomplete'
import SizeAutocomplete from '../components/SizeAutocomplete'
import TypeAutocomplete from '../components/TypeAutocomplete'
import ColorAutocomplete from '../components/ColorAutocomplete'

export default function EditItem() {
  const { id } = useParams()
  const [item, setItem] = useState<any>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => { load() }, [id])

  async function load() {
    if (!id) return
    const { data, error } = await supabase.from('items').select('*').eq('id', id).single()
    if (!error) setItem(data)
  }

  async function save() {
    if (!item?.id) return
    setSaving(true)
    const { id: itemId, ...rest } = item
    const { error } = await supabase.from('items').update(rest).eq('id', itemId)
    setSaving(false)
    if (error) alert(error.message); else alert('Enregistré')
  }

  async function remove() {
    if (!item?.id) return
    if (!confirm('Supprimer cet article ?')) return
    const { error } = await supabase.from('items').delete().eq('id', item.id)
    if (error) alert(error.message); else window.location.href = '/wardrobe'
  }

  if (!item) return <div className="container py-8">Chargement…</div>

  return (
    <div className="max-w-xl mx-auto space-y-3">
      <h1 className="text-2xl font-semibold">Modifier un vêtement</h1>

      <input
        className="input"
        placeholder="Titre"
        value={item.title || ''}
        onChange={e => setItem({ ...item, title: e.target.value })}
      />

      <BrandAutocomplete value={item.brand || ''} onChange={(v) => setItem({ ...item, brand: v })} />
      <ColorAutocomplete value={item.color || ''} onChange={(v) => setItem({ ...item, color: v })} />
      <SizeAutocomplete value={item.size || ''} onChange={(v) => setItem({ ...item, size: v })} />
      <TypeAutocomplete value={item.type || ''} onChange={(v) => setItem({ ...item, type: v })} />

      <ImageUploader onDone={(urls) => setItem((prev: any) => ({ ...prev, photos: [...(prev.photos || []), ...urls] }))} />

      <div className="flex gap-2">
        <button className="btn btn-primary flex-1" onClick={save} disabled={saving}>Enregistrer</button>
        <button className="btn border flex-1" onClick={remove}>Supprimer</button>
      </div>
    </div>
  )
}
