# GQOKA — MVP Netlify + Supabase (Secure env)

## Variables d'environnement
Crée ces variables dans Netlify > Site settings > Environment variables:
- `VITE_SUPABASE_URL` = https://obrfeydglsdspqjhcsvx.supabase.co (ou ton URL)
- `VITE_SUPABASE_ANON_KEY` = ta clé anonyme Supabase

Ne commit PAS ton fichier `.env`. Utilise `.env.example` comme modèle local.

## Supabase
- Activer Auth (Email + mot de passe).
- SQL: exécute `supabase.sql` dans SQL Editor.
- Storage: créer le bucket public `wardrobe`.

## Dialogflow
- Intégré via `<df-messenger>` avec agent-id `84d65a64-9de2-4ddc-97af-ac846bf9b4d9`.
- Modifie `index.html` si tu changes d'agent.

## Déploiement Netlify
- Build: `npm run build`
- Publish: `dist`
- Functions: `netlify/functions`

## Routes
- /login, /dashboard, /wardrobe, /add, /edit/:id, /profile
