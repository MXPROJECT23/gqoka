console.log("DEBUG Supabase URL:", import.meta.env.VITE_SUPABASE_URL)
console.log("DEBUG Supabase Key:", import.meta.env.VITE_SUPABASE_ANON_KEY ? "LOADED" : "MISSING")
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseKey)
