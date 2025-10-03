import { useEffect, useMemo, useState } from 'react'

export default function BrandAutocomplete({ value, onChange }:{ value:string; onChange:(v:string)=>void }){
  const [q, setQ] = useState(value || '')
  const [opts, setOpts] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const debounced = useMemo(()=>{
    let t:any; return (v:string)=>{ clearTimeout(t); t=setTimeout(()=>fetchOpts(v),120) }
  },[])

  async function fetchOpts(v:string){
    if(!v){ setOpts([]); return }
    const res = await fetch(`/api/brands?q=${encodeURIComponent(v)}`)
    const data = await res.json()
    setOpts(data.map((d:any)=>d.name ?? d))
    setOpen(true)
  }

  useEffect(()=>{ debounced(q) },[q])

  return (
    <div className="relative">
      <input className="input" value={q} placeholder="Marque" onChange={e=>{ setQ(e.target.value); onChange(e.target.value) }} />
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
