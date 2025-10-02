import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: "https://gqoka.com" },
    });

    if (error) {
      setMessage("Erreur lors de l’envoi du lien sécurisé.");
    } else {
      setMessage("Un lien sécurisé vient d’être envoyé à ton email.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nom@exemple.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? "Envoi en cours..." : "Recevoir mon lien sécurisé"}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
        )}

        <div className="mt-6 text-center">
          <a href="/reset-password" className="text-sm text-blue-600 hover:underline">
            Mot de passe oublié ?
          </a>
        </div>
      </div>
    </div>
  );
}
