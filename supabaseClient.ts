// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// URL & ANON KEY PUBLIQUES (OK à commit tant que RLS est activé)
const SUPABASE_URL = 'https://obrfeydglsdspqjhcsvx.supabase.co';   // <- ta vraie URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9icmZleWRnbHNkc3Bxamhjc3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc0NjA2NDcsImV4cCI6MjA3MzAzNjY0N30.p6jbyZ4AFu75xCCG-YQgc6k25cuKwwq_mkaGnIv027c';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
