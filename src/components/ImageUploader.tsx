return (
  <div
    className="dropzone space-y-3"
    onDragOver={(e)=>e.preventDefault()}
    onDrop={(e)=>{ e.preventDefault(); upload(Array.from(e.dataTransfer.files)) }}
    onPaste={(e)=> {
      const files = Array.from(e.clipboardData?.files || []);
      if(files.length) upload(files);
    }}
  >
    {!cam && (
      <div className="flex items-center gap-3">
        <button type="button" aria-label="Prendre une photo" className="icon-btn" onClick={startCam}><CameraIcon/></button>
        <button type="button" aria-label="Ouvrir la galerie" className="icon-btn" onClick={()=>galleryRef.current?.click()}><GalleryIcon/></button>
      </div>
    )}

    {cam && (
      <div className="space-y-2">
        <video ref={videoRef} className="w-full rounded-xl border" playsInline muted/>
        <div className="flex gap-2">
          <button type="button" className="btn btn-primary flex-1" onClick={capture} disabled={busy}>Capturer & envoyer</button>
          <button type="button" className="btn border flex-1" onClick={stopCam}>Fermer caméra</button>
        </div>
      </div>
    )}

    <input ref={galleryRef} type="file" accept="image/*" multiple className="hidden" onChange={(e)=>{ upload(Array.from(e.target.files||[])); e.currentTarget.value='' }}/>
    <input ref={captureRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e)=>upload(Array.from(e.target.files||[]))}/>
    {busy && <div>Upload…</div>}
    {!cam && <p className="hint">Astuce: glisse-dépose une image ici ou colle (Ctrl+V).</p>}
  </div>
)

