// src/pages/AddItems.tsx
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// ⚠️ Mets tes vraies clés ici ou utilise .env.local
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default function AddItems() {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    titre: "",
    marque: "",
    couleur: "",
    taille: "",
    type: "",
  });

  // Gestion image preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  // Gestion champs texte
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Soumission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Choisis une image");
      return;
    }

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("vetements")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("vetements")
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData.publicUrl;

      // Ici tu peux insérer aussi dans ta table Supabase
      const { error: insertError } = await supabase.from("vetements").insert([
        {
          titre: formData.titre,
          marque: formData.marque,
          couleur: formData.couleur,
          taille: formData.taille,
          type: formData.type,
          image_url: imageUrl,
        },
      ]);

      if (insertError) throw insertError;

      alert("Vêtement enregistré avec succès !");
    } catch (err: any) {
      console.error(err);
      alert("Erreur : " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ajouter un vêtement</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titre"
          placeholder="Titre"
          value={formData.titre}
          onChange={handleChange}
        />
        <input
          type="text"
          name="marque"
          placeholder="Marque"
          value={formData.marque}
          onChange={handleChange}
        />
        <input
          type="text"
          name="couleur"
          placeholder="Couleur"
          value={formData.couleur}
          onChange={handleChange}
        />
        <input
          type="text"
          name="taille"
          placeholder="Taille"
          value={formData.taille}
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Type (t-shirt, robe...)"
          value={formData.type}
          onChange={handleChange}
        />

        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <img
            src={preview}
            alt="Aperçu"
            style={{ maxWidth: "120px", marginTop: "10px", borderRadius: "8px" }}
          />
        )}

        <button type="submit" style={{ marginTop: "10px" }}>
          Enregistrer
        </button>
      </form>
    </div>
  );
}
