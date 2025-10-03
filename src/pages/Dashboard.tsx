import { useEffect, useState } from 'react'

type Current = { temperature?: number; windspeed?: number; weathercode?: number }
type Weather = { current_weather?: Current; hourly?: { precipitation?: number[] } }

const Icon = ({ name }: { name: 'sun'|'cloud'|'rain'|'snow'|'storm' }) => {
  if (name === 'sun') return (<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>)
  if (name === 'cloud') return (<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M7 19h9a4 4 0 0 0 0-8 6 6 0 0 0-11.7 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>)
  if (name === 'rain') return (<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M7 17h9a4 4 0 0 0 0-8 6 6 0 0 0-11.7 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M8 19l-1 3M12 19l-1 3M16 19l-1 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>)
  if (name === 'snow') return (<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M7 17h9a4 4 0 0 0 0-8 6 6 0 0 0-11.7 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M8 20h0M12 20h0M16 20h0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>)
  return (<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M7 17h9a4 4 0 0 0 0-8 6 6 0 0 0-11.7 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M12 19l-2 4M16 19l-2 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>)
}

function iconFromWMO(code?: number): 'sun'|'cloud'|'rain'|'snow'|'storm' {
  if (code == null) return 'cloud'
  if (code === 0) return 'sun'
  if ([1,2,3,45,48].includes(code)) return 'cloud'
  if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(code)) return 'rain'
  if ([71,73,75,77,85,86].includes(code)) return 'snow'
  if ([95,96,99].includes(code)) return 'storm'
  return 'cloud'
}

export default function Dashboard(){
  const [w,setW]=useState<Weather|null>(null)
  const [msg,setMsg]=useState('Chargement…')
  const [err,setErr]=useState('')

  useEffect(()=>{ (async()=>{
    try{
      const r=await fetch('/.netlify/functions/weather?lat=48.8566&lon=2.3522')
      if(!r.ok) throw 0
      const j:Weather=await r.json()
      setW(j)
      const t=j?.current_weather?.temperature
      const p=j?.hourly?.precipitation?.[0] ?? 0
      if(t==null) setMsg('Active la localisation.')
      else if(t<10) setMsg('Froid: manteau, pull, bottes.')
      else if(t<18) setMsg('Mi-saison: veste légère, chemise.')
      else if(t>=18 && p>1) setMsg('Pluie: coupe-vent, baskets.')
      else setMsg('Chaud: t-shirt, pantalon léger.')
    }catch{ setErr('API météo indisponible'); setMsg('—') }
  })() },[])

  const code = w?.current_weather?.weathercode
  const temp = w?.current_weather?.temperature
  const ic = iconFromWMO(code)

  return (
    <div className="card flex items-center gap-3">
      <div className="shrink-0"><Icon name={ic} /></div>
      <div className="flex-1">
        <div className="font-semibold">Météo & conseils</div>
        {err ? <div className="text-red-600 text-sm">{err}</div> :
          <div className="text-sm text-neutral-700">
            {temp!=null ? <>Temp: <b>{temp}°C</b> • </> : null}{msg}
          </div>
        }
      </div>
    </div>
  )
}

