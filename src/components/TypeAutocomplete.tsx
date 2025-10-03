import Autocomplete from "./Autocomplete";

export default function TypeAutocomplete({
  value, onChange, placeholder = "Type (t-shirt, robe…)",
}: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <Autocomplete value={value} onChange={onChange} options={TYPES} placeholder={placeholder} />;
}

const TYPES = [
  "T-shirt","Chemise","Polo","Sweat","Pull","Veste","Manteau","Blouson",
  "Robe","Jupe","Pantalon","Jean","Short","Combinaison","Cardigan",
  "Costume","Tailleur","Gilet","Hoodie","Débardeur",
  "Baskets","Chaussures","Bottes","Sandales","Talons",
  "Sac","Ceinture","Écharpe","Bonnet","Casquette","Gants"
];
