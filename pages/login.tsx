import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Connexion avec :", email, password);
    // Ici on connectera Supabase pour gérer la connexion
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Connexion
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Adresse email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="exemple@mail.com"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-900 transition"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600 text-sm">
          Pas encore inscrit ?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
}
