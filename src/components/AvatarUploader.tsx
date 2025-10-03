import { useEffect, useRef, useState } from "react"
import { supabase } from "../lib/supabaseClient"

const CameraIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M4 7h3l1.4-2.1A2 2 0 0 1 10.1 4h3.8a2 2 0 0 1 1.7.9L17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6"/>
    <circle cx="12" cy="13.5" r="4" stroke="currentColor" strokeWidth="1.6"/>
  </svg>
)
const GalleryIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M6 15l3.5-3.5a1 1 0 0 1 1.4 0L14 15l2-2a1 1 0 0 1 1.4 0L19 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="9" cy="9" r="1.25" fill="currentColor"/>
  </svg>
)

export default function AvatarUploader({
  value, onChange, size = 160,
}: { value?: string; onChange: (url: string) => void; size?: number }) {
  const [busy, setBusy] = useState(false)
  const [cam, setCam] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)
  const captureRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => () => stopCam(), [])

  async function startCam() {
    try {
      if (!navigator.mediaDevices?.getUserMedia) { captureRef.current?.click(); return }
      streamRef.current = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
      if (videoRef.current && streamRef.current) {
        videoRef.current.srcObject = streamRef.current
        await videoRef.current.play()
        setCam(true)
      }
    } catch {
      captureRef.current?.click()
    }
  }
  function stopCam() {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
    setCam(false)
  }

  async function capture() {
    if (!videoRef.current) return
    const v = videoRef.current
    const c = document.createElement("canvas")
    const S = Math.min(v.videoWidth, v.videoHeight) || 512
    c.width = S; c.height = S
    const ctx = c.getContext("2d")!
    // crop carré centré
    const sx = (v.videoWidth - S) / 2, sy = (v.videoHeight - S) / 2
    ctx.drawImage(v, sx, sy, S, S, 0, 0, S, S)
    const blob: Blob = await new Promise(r => c.toBlob(b => r(b!), "image/jpeg", 0.9)!)
    await upload([new File([blob], `avatar-${crypto.randomUUID()}.jpg`, { type: "image/jpeg" })])
  }

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : []
    if (files.length) await upload(files)
    e.currentTarget.value = ""
  }

  async function upload(files: File[]) {
    if (!files.length) return
    setBusy(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setBusy(false); alert("Connecte-toi"); return }

    // un seul avatar => on prend le premier fichier
    const f = files[0]
    const key = `users/${user.id}/${crypto.randomUUID()}-${f.name}`.replace(/\s+/g, "-")
    const { error } = await supabase.storage.from("avatars").upload(key, f, { upsert: false })
    if (error) { setBusy(false); alert(error.message); return }
    const { data } = supabase.storage.from("avatars").getPublicUrl(key)
    setBusy(false); stopCam(); onChange(data.publicUrl)
  }

  return (
    <div className="flex items-center gap-4">
      <div
        className="relative rounded-full overflow-hidden border"
        style={{ width: size, height: size }}
      >
        {cam ? (
          <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
        ) : (
          <img
            src={value || "https://via.placeholder.com/300?text=Avatar"}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        )}

        {/* boutons flottants */}
        <div className="absolute bottom-2 right-2 flex gap-2">
          {!cam && (
            <>
              <button className="icon-btn !w-10 !h-10" aria-label="Caméra" onClick={startCam}><CameraIcon /></button>
              <button className="icon-btn !w-10 !h-10" aria-label="Galerie" onClick={() => fileRef.current?.click()}><GalleryIcon /></button>
            </>
          )}
          {cam && (
            <div className="flex gap-2">
              <button className="icon-btn !w-10 !h-10" aria-label="Capturer" onClick={capture}><CameraIcon /></button>
              <button className="icon-btn !w-10 !h-10" aria-label="Fermer" onClick={stopCam}>✕</button>
            </div>
          )}
        </div>
      </div>

      {/* inputs cachés */}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
      <input ref={captureRef} type="file" accept="image/*" capture="user" className="hidden" onChange={onPick} />

      {busy && <span>Upload…</span>}
    </div>
  )
}
