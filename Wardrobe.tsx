import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ItemCard from '../components/ItemCard'
import { Link } from 'react-router-dom'

export default function Wardrobe() {
  const [items, setItems] = useState<any[]>([])

  useEffect(()=>{ load() },[])

  async function load(){
    const { data: { user } } = await supabase.auth.getUser()
    if(!user) return
    const { data, error } = await supabase.from('items').select('*').eq('user_id', user.id).order('created_at', { ascending:false })
    if(!error) setItems(data || [])
  }

  async function toggleFav(id: string){
    const item = items.find(i=>i.id===id)
    const { error } = await supabase.from('items').update({ is_favorite: !item.is_favorite }).eq('id', id)
    if(!error) setItems(prev => prev.map(i=> i.id===id ? { ...i, is_favorite: !i.is_favorite } : i))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Votre garde-robe</h2>
        <Link to="/add" className="btn btn-primary">Ajouter</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map(it => <ItemCard key={it.id} item={it} onToggleFav={toggleFav} />)}
      </div>
    </div>
  )
}
