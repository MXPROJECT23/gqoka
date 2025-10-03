import { useRef, useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const CameraIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path d="M4 7h3l1.4-2.1A2 2 0 0 1 10.1 4h3.8a2 2 0 0 1 1.7.9L17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="12" cy="13.5" r="4" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="18.5" cy="9.5" r="1" fill="currentColor"/>
  </svg>
)

const GalleryIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M6 15l3.5-3.5a1 1 0 0 1 1.4 0L14 15l2-2a1 1 0 0 1 1.4 0L19 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="9" cy="9" r="1.25" fill="currentColor"/>
  </svg>
)

export default function ImageUploader({ onDone }:{ onDone:(urls:string[])=>void }){
  const [busy, setBusy] = useState(false)
  const [cam, setCam] = useState(false)
  const videoRef = useRef<HTMLVideoElement|null>(null)
  const streamRef = useRef<MediaStream|null>(null)
  const galleryRef = useRef<HTMLInputElement|null>(null)
  const captureRef = useRef<HTMLInputElement|null>(null) // fallback mobile

  useEffect(()=>()=>stopCam(),[])

  async function startCam(){
    try{
      if (!navigator.mediaDevices?.getUserMedia) { captureRef.current?.click(); return }
      streamRef.current = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      if(videoRef.current && streamRef.current){
        videoRef.current.srcObject = streamRef.current
        await videoRef.current.play()
        setCam(true)
      }
    }catch{
      // permissions refusées → fallback capture mobile
      captureRef.current?.click()
    }
  }

  function stopCam(){
    streamRef.current?.getTracks().forEach(t=>t.stop())
    streamRef.current = null
    setCam(false)
  }

  async function capture(){
    if(!videoRef.current) return
    const v = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = v.videoWidth; canvas.height = v.videoHeight
    canvas.getContext('2d')!.drawImage(v,0,0,canvas.width,canvas.height)
    const blob: Blob = await new Promise(res => canvas.toBlob(b=>res(b!), 'image/jpeg', 0.9)!)
    const file = new File([blob], `capture-${crypto.randomUUID()}.jpg`, { type: 'image/jpeg' })
    await upload([file])
  }

  async function onPick(e: React.ChangeEvent<HTMLInputElement>){
    const files = e.target.files ? Array.from(e.target.files) : []
    if(files.length) await upload(files)
    e.currentTarget.value = ''
  }

  async function upload(files: File[]){
    if(!files.length) return
    setBusy(true)
    const urls: string[] = []
    for(const f of files){
      const name = `${crypto.randomUUID()}-${f.name}`.replace(/\s+/g,'-')
      const { error } = await supabase.storage.from('wardrobe').upload(name, f)
      if(error){ alert(error.message); setBusy(false); return }
      const { data } = supabase.storage.from('wardrobe').getPublicUrl(name)
      urls.push(data.publicUrl)
    }
    setBusy(false); stopCam(); onDone(urls)
  }

  return (
    <div className="space-y-3">
      {/* ICONES CTA */}
      {!cam && (
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Prendre une photo" className="icon-btn" onClick={startCam}>
            <CameraIcon />
          </button>
          <button type="button" aria-label="Ouvrir la galerie" className="icon-btn" onClick={()=>galleryRef.current?.click()}>
            <GalleryIcon />
          </button>
        </div>
      )}

      {/* CAMERA LIVE */}
      {cam && (
        <div className="space-y-2">
          <video ref={videoRef} className="w-full rounded-xl border" playsInline muted />
          <div className="flex gap-2">
            <button type="button" className="btn btn-primary flex-1" onClick={capture} disabled={busy}>Capturer & envoyer</button>
            <button type="button" className="btn border flex-1" onClick={stopCam}>Fermer caméra</button>
          </div>
        </div>
      )}

      {/* INPUTS CACHÉS */}
      <input ref={galleryRef} type="file" accept="image/*" multiple className="hidden" onChange={onPick}/>
      <input ref={captureRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onPick}/>

      {busy && <div>Upload…</div>}
    </div>
  )
}

