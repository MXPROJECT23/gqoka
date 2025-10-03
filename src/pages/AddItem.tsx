import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ImageUploader from '../components/ImageUploader'
import BrandAutocomplete from '../components/BrandAutocomplete'
import SizeAutocomplete from '../components/SizeAutocomplete'
import TypeAutocomplete from '../components/TypeAutocomplete'
import ColorAutocomplete from '../components/ColorAutocomplete'

export default function AddItem(){
  const [title,setTitle]=useState('')
  const [brand,setBrand]=useState('')
  const [color,setColor]=useState('')
  const [size,setSize]=useState('')
  const [type,setType]=useState('')
  const [photos,setPhotos]=useState<string[]>([])
  const [saving,setSaving]=useState(false)

  async function save(){
    setSaving(true)
    const { data:{ user } } = await supabase.auth.getUser()
    if(!user){ alert('Connecte-toi'); setSaving(false); return }
    const { error } = await supabase.from('items').insert({ user_id:user.id, title, brand, color, size, type, photos })
    setSaving(false)
    if(error) alert(error.message)
    else window.location.href='/wardrobe'
  }

  return (
    <div className="max-w-xl mx-auto space-y-3">
      <h1 className="text-2xl font-semibold">Ajouter un vêtement</h1>

      <input className="input" placeholder="Titre" value={title} onChange={e=>setTitle(e.target.value)} />

      <BrandAutocomplete value={brand} onChange={setBrand} />
      <ColorAutocomplete value={color} onChange={setColor} />
      <SizeAutocomplete value={size} onChange={setSize} />
      <TypeAutocomplete value={type} onChange={setType} />

      <ImageUploader onDone={(urls)=>setPhotos(prev=>[...prev, ...urls])} />

      <button className="btn btn-primary w-full" disabled={saving} onClick={save}>Enregistrer</button>
    </div>
  )
}

