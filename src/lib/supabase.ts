// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// OK côté front (RLS protège). Remplace par tes valeurs si besoin.
const SUPABASE_URL = 'https://obrfeydglsdspqjhcsvx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9icmZleWRnbHNkc3Bxamhjc3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NjA2NDcsImV4cCI6MjA3MzAzNjY0N30.p6jbyZ4AFu75xCCG-YQgc6k25cuKwwq_mkaGnIv027c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
export default supabase;
