import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Génère un texte de revente premium pour marketplaces.
 * MVP = logique simple, enrichie d'accroches marketing.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, category, color } = JSON.parse(req.body);

  const texte = `
✨ ${name} disponible ✨
Catégorie : ${category} — Couleur : ${color}

💎 Pièce sélectionnée par Anna, styliste de GQOKA.
✅ Authentifié et certifié par IA.
🌱 Mode circulaire : donne une nouvelle vie à ton dressing.

👉 Taille standard, état excellent.
Prêt à porter, idéal pour vos looks ${category}.
  
⚡ Prix attractif — fais vite avant qu’il ne parte !
`;

  const hashtags = `#${category} #mode #secondeMain #AnnaStyle #GQOKA #marketplace #ecoResponsable`;

  return res.status(200).json({ texte: texte.trim(), hashtags });
}
