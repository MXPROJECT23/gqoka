# GQOKA — MVP Vite + Supabase

## Variables d'environnement (Vercel et local `.env`)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- Option serveur: `SUPABASE_SERVICE_ROLE_KEY` (pour fonctions/cron, non exposée au client)
- Option Dialogflow: `VITE_DIALOGFLOW_AGENT_ID` (facultatif)

## SQL Supabase (à coller dans **SQL Editor**)
Voir `supabase_schema.sql` fourni à la racine.

## Pages
- `/` Landing magazine avec Anna + bannière cookies.
- `/login`, `/forgot-password`
- `/profile` avatar + identifiant
- `/wardrobe` ajout vêtements par **caméra** ou **galerie** + autocomplétions.
- `/resale/:id` fiche de revente auto-générée par Anna.
- Widget météo + conseils d'Anna (Open‑Meteo, sans clé).
- Widget Dialogflow si `VITE_DIALOGFLOW_AGENT_ID` est défini.

## Build
```sh
npm i
npm run dev
npm run build
```
