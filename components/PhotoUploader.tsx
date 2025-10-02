"use client";
import { useRef, useState } from "react";

type Props = { onSelected: (file: File) => void };

export default function PhotoUploader({ onSelected }: Props) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="card">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold">Ajouter un vêtement</h3>
          <p className="text-sm text-gray-500">Photo nette. Fond simple si possible.</p>
        </div>
        <button className="btn" onClick={() => ref.current?.click()} aria-label="Prendre une photo">
          Prendre une photo
        </button>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            setPreview(URL.createObjectURL(f));
            onSelected(f);
          }}
        />
      </div>

      {preview && (
        <div className="mt-4">
          <img src={preview} alt="aperçu vêtement" className="w-full rounded-xl" />
        </div>
      )}
    </div>
  );
}
