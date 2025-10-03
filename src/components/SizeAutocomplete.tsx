import Autocomplete from "./Autocomplete";

export default function SizeAutocomplete({
  value, onChange, placeholder = "Taille",
}: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return <Autocomplete value={value} onChange={onChange} options={SIZES} placeholder={placeholder} />;
}

const SIZES = [
  // alpha
  "XXS","XS","S","M","L","XL","XXL","3XL",
  // num (EU)
  "32","34","36","38","40","42","44","46","48","50",
  // chaussures EU
  "35","36","37","38","39","40","41","42","43","44","45","46"
];

