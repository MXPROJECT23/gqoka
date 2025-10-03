import Autocomplete from "./Autocomplete";

export default function ColorAutocomplete({
  value, onChange, placeholder = "Couleur",
}: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <Autocomplete value={value} onChange={onChange} options={COLORS} placeholder={placeholder} />;
}

const COLORS = [
  "Noir","Blanc","Gris","Bleu","Marine","Ciel","Vert","Kaki","Rouge","Bordeaux",
  "Rose","Beige","Crème","Marron","Camel","Jaune","Orange","Violet","Doré","Argenté"
];
