import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// OK de committer l'anon key (RLS protège les données)
const SUPABASE_URL = 'https://obrfeydglsdspqjhcsvx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...027c';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Supabase URL/KEY manquants');
}

let _client: SupabaseClient | null = null;
export function supabase(): SupabaseClient {
  if (_client) return _client;
  _client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _client;
}
