import { useEffect, useMemo, useState } from 'react'

export default function SizeAutocomplete({ value, onChange }:{ value:string; onChange:(v:string)=>void }){
  const [q, setQ] = useState(value || '')
  const [opts, setOpts] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const debounced = useMemo(()=>{
    let t:any; return (v:string)=>{ clearTimeout(t); t=setTimeout(()=>fetchOpts(v),120) }
  },[])

  async function fetchOpts(v:string){
    if(!v){ setOpts([]); return }
    const all = ["XS","S","M","L","XL","XXL","36","38","40","42","44","46"]
    setOpts(all.filter(s => s.toLowerCase().includes(v.toLowerCase())))
    setOpen(true)
  }

  useEffect(()=>{ debounced(q) },[q])

  return (
    <div className="relative">
      <input className="input" value={q} placeholder="Taille" onChange={e=>{ setQ(e.target.value); onChange(e.target.value) }} />
      {open && opts.length>0 && (
        <ul className="absolute z-10 bg-white border rounded-xl mt-1 w-full max-h-56 overflow-auto shadow">
          {opts.map(o => (
            <li key={o} className="px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>{ onChange(o); setQ(o); setOpen(false) }}>{o}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
