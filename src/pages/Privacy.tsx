import { useEffect, useState } from "react";
import { readConsent, saveConsent, clearConsent, applyConsent } from "@/lib/consent";

export default function Privacy() {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [ts, setTs] = useState<string | null>(null);
  const [ver, setVer] = useState<string | null>(null);

  useEffect(() => {
    const c = readConsent();
    if (c) {
      setAnalytics(Boolean(c.analytics));
      setMarketing(Boolean(c.marketing));
      setTs(c.timestamp);
      setVer(c.version);
    }
  }, []);

  function save() {
    saveConsent({ analytics, marketing });
    alert("Préférences enregistrées.");
  }

  function reset() {
    clearConsent();
    applyConsent(null);
    alert("Consentement réinitialisé. Le bandeau réapparaîtra.");
    window.location.reload();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold">Politique de confidentialité & Cookies</h1>

      <section className="space-y-3 text-neutral-800">
        <p>
          Nous utilisons des cookies <b>strictement nécessaires</b> au fonctionnement
          du site <i>(ex. sécurité, session)</i>. Avec votre accord, nous utilisons
          aussi des cookies d’<b>analyse</b> (mesure d’audience anonymisée) et de
          <b> marketing</b> (pixels publicitaires). Vous pouvez changer d’avis
          à tout moment.
        </p>
        <p>
          Les données sont hébergées par nos sous-traitants (ex. Supabase, hébergeurs).
          Nous appliquons l’anonymisation IP pour la mesure d’audience lorsque cela est possible.
        </p>
        <p>
          Pour toute question RGPD (accès, rectification, suppression), contactez&nbsp;
          <a className="underline" href="mailto:privacy@gqoka.app">privacy@gqoka.app</a>.
        </p>
        <p className="text-sm text-neutral-600">
          Version politique: {ver ?? "N/A"} — Dernier consentement: {ts ?? "N/A"}
        </p>
      </section>

      <section className="card space-y-4">
        <h2 className="text-xl font-semibold">Préférences cookies</h2>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked disabled />
          <span>Essentiels (toujours actifs)</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="p-analytics"
            type="checkbox"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
          />
          <label htmlFor="p-analytics">Analytics (mesure d’audience anonymisée)</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="p-marketing"
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
          />
          <label htmlFor="p-marketing">Marketing (pixels publicitaires)</label>
        </div>

        <div className="flex gap-2">
          <button className="btn border px-4 py-2" onClick={save}>
            Enregistrer
          </button>
          <button className="btn border px-4 py-2" onClick={reset}>
            Réinitialiser mon consentement
          </button>
        </div>
      </section>

      <section className="space-y-3 text-neutral-800">
        <h3 className="text-lg font-semibold">Détails</h3>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Base légale: consentement (art. 6(1)(a) RGPD).</li>
          <li>Durée de conservation du consentement: 12 mois.</li>
          <li>Vous pouvez retirer votre consentement à tout moment sur cette page.</li>
          <li>Les cookies essentiels ne peuvent pas être désactivés.</li>
        </ul>
      </section>
    </main>
  );
}
