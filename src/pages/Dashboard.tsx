import { useEffect, useState } from 'react'

export default function Dashboard(){
  const [weather, setWeather] = useState<any>(null)
  const [suggestion, setSuggestion] = useState<string>('')

  useEffect(()=>{ load() },[])

  async function load(){
    const r = await fetch('/api/weather?lat=48.8566&lon=2.3522') // Paris
    const w = await r.json()
    setWeather(w)
    setSuggestion(makeSuggestion(w))
  }

  function makeSuggestion(w:any){
    try{
      const t = w?.current_weather?.temperature
      const p = (w?.hourly?.precipitation?.[0] ?? 0)
      if(t==null) return 'Connecte ta localisation pour des conseils précis.'
      if(t < 10) return "Froid: manteau, pull, jean, bottes."
      if(t < 18) return "Mi-saison: veste légère, chemise, jean."
      if(t >= 18 && p > 1) return "Pluie: coupe-vent, baskets, éviter le daim."
      return "Chaud: t-shirt, pantalon léger, sneakers."
    }catch{ return 'Conseils indisponibles.' }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="card">
        <h3 className="font-semibold mb-2">Météo & suggestion d'Anna</h3>
        <div>{suggestion}</div>
      </div>
      <div className="card">
        <h3 className="font-semibold mb-2">Actions rapides</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>Ajouter un vêtement</li>
          <li>Voir la garde-robe</li>
          <li>Éditer le profil</li>
        </ul>
      </div>
    </div>
  )
}
