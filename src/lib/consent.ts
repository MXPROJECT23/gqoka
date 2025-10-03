// Gestion simple et conforme du consentement utilisateur (granulaire)
export type Consent = {
  version: string;            // incrémentez si le texte change
  timestamp: string;          // preuve d’horodatage
  essential: true;            // toujours true (nécessaires)
  analytics: boolean;         // ex: Google Analytics
  marketing: boolean;         // ex: pixels pub
};

const KEY = "gqoka_consent_v1";
const VERSION = "1.0.0";

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const c: Consent = JSON.parse(raw);
    if (!c.version || c.version !== VERSION) return null; // re-demander si maj
    return c;
  } catch {
    return null;
  }
}

export function saveConsent(partial: Partial<Consent>) {
  const now = new Date().toISOString();
  const current = readConsent();
  const merged: Consent = {
    version: VERSION,
    timestamp: now,
    essential: true,
    analytics: current?.analytics ?? false,
    marketing: current?.marketing ?? false,
    ...partial,
  };
  localStorage.setItem(KEY, JSON.stringify(merged));
  applyConsent(merged);
}

export function clearConsent() {
  localStorage.removeItem(KEY);
}

export function hasConsent(category: keyof Consent): boolean {
  const c = readConsent();
  if (!c) return false;
  if (category === "essential") return true;
  return Boolean(c[category]);
}

// Bloque/débloque les traceurs en fonction du consentement
export function applyConsent(consent?: Consent | null) {
  const c = consent ?? readConsent();
  const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

  // Gestion Google Analytics (gtag) côté client
  if (GA_ID) {
    // Bloque GA tant que pas consentement analytics
    (window as any)[`ga-disable-${GA_ID}`] = !(c?.analytics === true);

    // Charge GA uniquement si autorisé
    if (c?.analytics === true && !document.getElementById("gtag-lib")) {
      const s = document.createElement("script");
      s.id = "gtag-lib";
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(s);

      const inline = document.createElement("script");
      inline.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { anonymize_ip: true });
      `;
      document.head.appendChild(inline);
    }
  }

  // TODO: ajoutez ici vos autres tags (marketing) en respectant le flag c.marketing
}

// À appeler au bootstrap de l’app (ex: dans App.tsx) pour respecter l’état existant
export function bootstrapConsent() {
  applyConsent();
}
