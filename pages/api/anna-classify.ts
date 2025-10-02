import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Stub de classification Anna.
 * Remplacer le bloc "heuristics" par un appel réel (Vertex AI, Roboflow, etc.).
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // Heuristique minimale pour MVP
  const name = "Article";
  const category = "haut";
  const color = "noir";

  return res.status(200).json({ name, category, color });
}
