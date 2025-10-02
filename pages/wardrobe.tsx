import AnnaBadge from "@/components/AnnaBadge";
// ...
<li key={it.id} className="card">
  {it.image_url && <img src={it.image_url} alt={it.name} className="w-full rounded-xl" />}
  <div className="mt-3 flex justify-between">
    <div>
      <div className="font-medium">{it.name}</div>
      <div className="text-sm text-gray-500">{it.category}</div>
      <AnnaBadge />
    </div>
    <div className="text-xs text-gray-500">{it.color}</div>
  </div>
  <div className="mt-3 flex gap-2">
    <button className="px-3 py-1 border rounded-lg text-sm">Éditer</button>
    <button className="px-3 py-1 border rounded-lg text-sm">Favori</button>
    <button className="px-3 py-1 border rounded-lg text-sm">Partager</button>
    <button
      className="px-3 py-1 border rounded-lg text-sm bg-gray-100"
      onClick={() => revendre(it)}
    >
      Revendre
    </button>
  </div>
</li>
