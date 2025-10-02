import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, category, color } = JSON.parse(req.body);

  const texte = `À vendre : ${name} (${category}, ${color}). 
État excellent, porté très peu. 
Idéal pour vos tenues ${category}. 
Disponible immédiatement.`;

  const hashtags = `#${category} #mode #secondeMain #GQOKA #Anna`;

  return res.status(200).json({ texte, hashtags });
}
