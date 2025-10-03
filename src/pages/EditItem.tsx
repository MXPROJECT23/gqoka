// …imports…
import BrandAutocomplete from '../components/BrandAutocomplete'
import SizeAutocomplete from '../components/SizeAutocomplete'
import TypeAutocomplete from '../components/TypeAutocomplete'
import ColorAutocomplete from '../components/ColorAutocomplete'

// …dans le JSX…
<BrandAutocomplete value={item.brand||''} onChange={(v)=>setItem({...item, brand:v})} />
<ColorAutocomplete value={item.color||''} onChange={(v)=>setItem({...item, color:v})} />
<SizeAutocomplete value={item.size||''} onChange={(v)=>setItem({...item, size:v})} />
<TypeAutocomplete value={item.type||''} onChange={(v)=>setItem({...item, type:v})} />
