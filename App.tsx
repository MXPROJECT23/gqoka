import { Route, Routes, Link, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import AddItem from './pages/AddItem'
import EditItem from './pages/EditItem'
import Wardrobe from './pages/Wardrobe'
import { supabase } from './lib/supabaseClient'
import { useEffect, useState } from 'react'

function Protected({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setAuthed(!!session);
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);
  if (loading) return <div className="container py-10">Chargement…</div>;
  if (!authed) return <Navigate to="/login" state={{ from: loc }} replace />;
  return children;
}

export default function App() {
  return (
    <div>
      <nav className="top">
        <div className="container py-3 flex justify-between items-center">
          <Link to="/" className="font-semibold text-xl">GQOKA</Link>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profil</Link>
          </div>
        </div>
      </nav>
      <main className="container py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
          <Route path="/profile" element={<Protected><Profile /></Protected>} />
          <Route path="/wardrobe" element={<Protected><Wardrobe /></Protected>} />
          <Route path="/add" element={<Protected><AddItem /></Protected>} />
          <Route path="/edit/:id" element={<Protected><EditItem /></Protected>} />
        </Routes>
      </main>
    </div>
  )
}
