import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ok = localStorage.getItem('gqoka_cookie_ok');
    if (!ok) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-black text-white p-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-3">
        <p className="text-sm flex-1">
          Nous utilisons des cookies essentiels et de mesure d’audience. En continuant, vous acceptez notre politique.
        </p>
        <div className="flex gap-2">
          <a href="/rpd-cookies" className="underline text-sm">RPD Cookies</a>
          <button
            onClick={() => { localStorage.setItem('gqoka_cookie_ok','1'); setVisible(false); }}
            className="bg-white text-black px-3 py-2 rounded"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
