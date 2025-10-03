import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function ImageUploader({ onDone }:{ onDone:(urls:string[])=>void }){
  const [busy, setBusy] = useState(false)

  async function handle(files: FileList | null){
    if(!files || !files.length) return
    setBusy(true)
    const urls:string[] = []
    for(const file of Array.from(files)){
      const name = `${crypto.randomUUID()}-${file.name}`.replace(/\s+/g,'-')
      const { error } = await supabase.storage.from('wardrobe').upload(name, file, { upsert: false })
      if(error){ alert(error.message); setBusy(false); return }
      const { data:pub } = supabase.storage.from('wardrobe').getPublicUrl(name)
      urls.push(pub.publicUrl)
    }
    setBusy(false)
    onDone(urls)
  }

  return (
    <label className="block border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer">
      <input type="file" accept="image/*" multiple className="hidden" onChange={e=>handle(e.target.files)} />
      {busy? 'Upload…' : 'Ajouter des photos'}
    </label>
  )
}
