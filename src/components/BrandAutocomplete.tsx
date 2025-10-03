import { useEffect, useState } from "react";
import Autocomplete from "./Autocomplete";
import { supabase } from "../lib/supabaseClient";

export default function BrandAutocomplete({
  value, onChange, placeholder = "Marque",
}: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("brands").select("name").order("name").limit(500);
      if (error) { setOptions(DEFAULT_BRANDS); return; }
      const names = Array.from(new Set((data || []).map(b => b.name).filter(Boolean)));
      setOptions(names.length ? names : DEFAULT_BRANDS);
    })();
  }, []);

  return <Autocomplete value={value} onChange={onChange} options={options} placeholder={placeholder} />;
}

const DEFAULT_BRANDS = [
  "Zara","H&M","Uniqlo","Nike","Adidas","Levi's","Mango","Pull&Bear","COS",
  "Armani","Boss","Lacoste","The Kooples","Sandro","A.P.C.","Balenciaga"
];
