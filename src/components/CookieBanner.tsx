import { useEffect, useState } from "react";
import { applyConsent, readConsent, saveConsent } from "@/lib/consent";
import { Link } from "react-router-dom";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const c = readConsent();
    if (!c) setOpen(true);
    else {
      setAnalytics(Boolean(c.analytics));
      setMarketing(Boolean(c.marketing));
      applyConsent(c);
    }
  }, []);

  function acceptAll() {
    saveConsent({ analytics: true, marketing: true });
    setOpen(false);
  }

  function rejectAll() {
    saveConsent({ analytics: false, marketing: false });
    setOpen(false);
  }

  function saveCustom() {
    saveConsent({ analytics, marketing });
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-4 bg-white border rounded-t-lg shadow-lg">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-neutral-800">
            <b>Cookies & confidentialité</b> — Nous utilisons des cookies nécessaires
            au fonctionnement du site et, avec votre accord, des cookies d’audience
            et marketing. Vous pouvez accepter, refuser ou personnaliser.
            <div className="mt-1">
              <Link
                to="/privacy"
                className="underline text-neutral-600 hover:text-black"
              >
                En savoir plus / Politique de confidentialité
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            {/* Personnalisation */}
            <div className="bg-neutral-50 border rounded p-3">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked disabled />
                <span className="text-sm">Essentiels (toujours actifs)</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  id="consent-analytics"
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                />
                <label htmlFor="consent-analytics" className="text-sm">
                  Analytics (mesure d’audience anonymisée)
                </label>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  id="consent-marketing"
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                />
                <label htmlFor="consent-marketing" className="text-sm">
                  Marketing (pixels publicitaires)
                </label>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                className="btn border px-4 py-2 text-sm"
                onClick={rejectAll}
              >
                Refuser
              </button>
              <button
                className="btn border px-4 py-2 text-sm"
                onClick={saveCustom}
              >
                Enregistrer
              </button>
              <button
                className="btn btn-primary px-4 py-2 text-sm"
                onClick={acceptAll}
              >
                Accepter tout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
