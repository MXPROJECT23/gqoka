import { createClient } from '@supabase/supabase-js'

// Charger les variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug : afficher dans la console
console.log("DEBUG Supabase URL:", supabaseUrl)
console.log("DEBUG Supabase Key:", supabaseKey ? "LOADED" : "MISSING")

// Vérification stricte
if (!supabaseUrl || !supabaseKey) {
  throw new Error("❌ Supabase URL ou Key manquants. Vérifie tes variables d'environnement.")
}

// Créer le client Supabase
export const supabase = createClient(supabaseUrl, supabaseKey)
