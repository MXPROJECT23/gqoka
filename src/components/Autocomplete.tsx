// src/components/Autocomplete.tsx
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
};

export default function Autocomplete({ value, onChange, options, placeholder }: Props) {
  const [q, setQ] = useState(value || "");
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => setQ(value || ""), [value]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const filtered = useMemo(() => {
    const s = (q || "").trim().toLowerCase();
    if (!s) return options.slice(0, 50);
    return options.filter(o => o.toLowerCase().includes(s)).slice(0, 50);
  }, [q, options]);

  const choose = (v: string) => {
    onChange(v);
    setQ(v);
    setOpen(false);
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (e.key === "ArrowDown" || e.key === "Enter")) setOpen(true);
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHi(h => Math.min(h + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setHi(h => Math.max(h - 1, 0)); }
    if (e.key === "Enter")     { e.preventDefault(); if (filtered[hi]) choose(filtered[hi]); }
    if (e.key === "Escape")    { setOpen(false); }
  };

  return (
    <div ref={wrapRef} className="relative">
      <input
        className="input w-full"
        placeholder={placeholder}
        value={q}
        onChange={e => { setQ(e.target.value); setOpen(true); setHi(0); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKey}
      />
      {open && filtered.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border bg-white shadow-md max-h-56 overflow-auto">
          {filtered.map((opt, i) => (
            <button
              type="button"
              key={opt + i}
              onMouseDown={e => e.preventDefault()}
              onClick={() => choose(opt)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 ${i === hi ? "bg-neutral-100" : ""}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
