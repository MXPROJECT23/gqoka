import { useRef } from 'react';

type Props = {
  onFiles: (files: File[]) => void
};

export default function CameraPicker({ onFiles }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-2">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={e => e.target.files && onFiles(Array.from(e.target.files))}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={e => e.target.files && onFiles(Array.from(e.target.files))}
      />
      <button
        onClick={() => fileRef.current?.click()}
        className="px-3 py-2 bg-black text-white rounded">Ouvrir Caméra</button>
      <button
        onClick={() => galleryRef.current?.click()}
        className="px-3 py-2 border rounded">Choisir depuis Galerie</button>
    </div>
  );
}
