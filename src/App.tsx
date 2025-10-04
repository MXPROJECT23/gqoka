import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Profile from './pages/Profile';
import Wardrobe from './pages/Wardrobe';
import Resale from './pages/Resale';
import CookiesPage from './pages/Cookies';

export default function App() {
  const loc = useLocation();
  const hideHeader = false;

  return (
    <div>
      {!hideHeader && (
        <div className="border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="font-serif text-xl">GQOKA</Link>
            <nav className="flex gap-4 text-sm">
              <Link to="/wardrobe">Garde‑robe</Link>
              <Link to="/profile">Profil</Link>
              <Link to="/login">Connexion</Link>
            </nav>
          </div>
        </div>
      )}

      <Routes location={loc}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wardrobe" element={<Wardrobe />} />
        <Route path="/resale/:id" element={<Resale />} />
        <Route path="/rpd-cookies" element={<CookiesPage />} />
      </Routes>
    </div>
  );
}
