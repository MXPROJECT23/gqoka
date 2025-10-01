import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  // Charger infos utilisateur
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      setUser(u);
      setName(u?.user_metadata?.name || "");
      setAvatarUrl(u?.user_metadata?.avatar_url || null);
    });
  }, []);

  // Upload avatar vers Supabase Storage
  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    const path = `${user.id}/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (error) { setMsg(error.message); return; }
    const pub = supabase.storage.from("avatars").getPublicUrl(path);
    setAvatarUrl(pub.data.publicUrl);
  };

  // Sauvegarder infos
  const save = async () => {
    if (!user) return;
    const { error } = await supabase.auth.updateUser({ data: { name, avatar_url: avatarUrl || "" } });
    setMsg(error ? error.message : "Profil mis à jour ✅");
  };

  return (
    <>
      <Header />
      <main className="container py-16 max-w-lg space-y-6">
        <h1 className="text-3xl font-bold">Mon profil</h1>
        <div className="card space-y-4">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <img src={avatarUrl || "/avatar.svg"} className="w-20 h-20 rounded-full object-cover border" alt="avatar" />
            <input type="file" accept="image/*" onChange={upload} />
          </div>
          {/* Nom */}
          <input
            className="input"
            placeholder="Nom"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button className="btn w-full" onClick={save}>Enregistrer</button>
          {msg && <p className="text-sm">{msg}</p>}
        </div>
      </main>
      <Footer />
    </>
  );
}
