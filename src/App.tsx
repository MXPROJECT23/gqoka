import { supabase } from './lib/supabase';
export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1>GQOKA</h1>
      <p>Build OK. Supabase URL: {import.meta.env.VITE_SUPABASE_URL ? '✓' : '✗'}</p>
    </div>
  );
}

