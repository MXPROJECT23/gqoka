import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import ImageUploader from '../components/ImageUploader'
import BrandAutocomplete from '../components/BrandAutocomplete'
import SizeAutocomplete from '../components/SizeAutocomplete'

export default function EditItem(){
  const { id } = useParams()
  const [item,setItem]=useState<any>(null)

  useEffect(()=>{ load() },[id])
  async function load(){
    const { data, error } = await supabase.from('items').select('*').eq('id', id).single()
    if(!error) setItem(data)
  }

  async function save(){
    const { id: itemId, ...rest } = item
    const { error } = await supabase.from('items').update(rest).eq('id', itemId)
    if(error) alert(error.message); else alert('Enregistré')
  }

  async function remove(){
    if(!confirm('Supprimer cet article ?')) return
    const { error } = await supabase.from('items').delete().eq('id', id)
    if(error) alert(error.message); else window.location.href='/wardrobe'
  }

  if(!item) return <div>Chargement…</div>

  return (
    <div className="max-w-xl mx-auto space-y-3">
      <h1 className="text-2xl font-semibold">Modifier</h1>
      <input className="input" value={item.title} onChange={e=>setItem({...item, title:e.target.value})} />
      <BrandAutocomplete value={item.brand||''} onChange={(v)=>setItem({...item, brand:v})} />
      <input className="input" value={item.color||''} onChange={e=>setItem({...item, color:e.target.value})} />
      <SizeAutocomplete value={item.size||''} onChange={(v)=>setItem({...item, size:v})} />
      <input className="input" value={item.type||''} onChange={e=>setItem({...item, type:e.target.value})} />
      <ImageUploader onDone={(urls)=>setItem((prev:any)=>({...prev, photos:[...(prev.photos||[]), ...urls]}))} />
      <div className="flex gap-2">
        <button className="btn btn-primary flex-1" onClick={save}>Enregistrer</button>
        <button className="btn border flex-1" onClick={remove}>Supprimer</button>
      </div>
    </div>
  )
}
