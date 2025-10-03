import { useEffect, useMemo, useState } from 'react'

export default function BrandAutocomplete({
  value, onChange,
}: { value: string; onChange: (v: string) => void }) {
  const [q, setQ] = useState(value ?? '')
  const [opts, setOpts] = useState<string[]>([])
  const [open, setOpen] = useState(false)

  const debounced = useMemo(() => {
    let t: any
    return (v: string) => { clearTimeout(t); t = setTimeout(() => fetchOpts(v), 120) }
  }, [])

  async function fetchOpts(v: string) {
    if (!v) { setOpts([]); return }
    try {
      const r = await fetch(`/.netlify/functions/brands?q=${encodeURIComponent(v)}`)
      const data = await r.json()
      setOpts((data || []).map((d: any) => d.name ?? d))
      setOpen(true)
    } catch { setOpts([]) }
  }

  useEffect(() => { debounced(q) }, [q])

  return (
    <div className="relative">
      <input
        className="input"
        placeholder="Marque"
        value={q}
        onChange={e => { setQ(e.target.value); onChange(e.target.value) }}
        onFocus={() => q && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && opts.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded-xl mt-1 w-full max-h-56 overflow-auto shadow">
          {opts.map(o => (
            <li key={o}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => { onChange(o); setQ(o); setOpen(false) }}>
              {o}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
