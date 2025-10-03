import { Link } from 'react-router-dom'

export default function ItemCard({ item, onToggleFav }:{ item:any; onToggleFav?:(id:string)=>void }){
  const photo = (item.photos?.[0]) || 'https://via.placeholder.com/600x600?text=Item'
  return (
    <div className="card">
      <img src={photo} alt={item.title} className="w-full h-48 object-cover rounded-xl" />
      <div className="mt-3 flex justify-between items-center">
        <div>
          <div className="font-semibold">{item.title}</div>
          <div className="text-sm text-neutral-600">{item.brand} • {item.color}</div>
        </div>
        <button className="btn border" onClick={()=>onToggleFav && onToggleFav(item.id)}>{item.is_favorite? '★' : '☆'}</button>
      </div>
      <div className="mt-2 flex gap-2">
        <Link className="btn btn-primary flex-1" to={`/edit/${item.id}`}>Éditer</Link>
        {item.is_public && <Link className="btn border flex-1" to={`/p/${item.id}`}>Lien public</Link>}
      </div>
    </div>
  )
}
