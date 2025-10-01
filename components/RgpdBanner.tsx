import { useEffect, useState } from "react";

export default function RgpdBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("rgpd_ok")) setShow(true);
  }, []);
  if (!show) return null;

  return (
    <div className="fixed bottom-4 inset-x-0 px-4 z-50">
      <div className="container bg-black text-white rounded-2xl p-4 flex items-center justify-between gap-4">
        <p className="text-sm">
          Cookies pour améliorer l’expérience. <a href="/rgpd" className="underline">Détails</a>
        </p>
        <button
          className="btn"
          onClick={() => { localStorage.setItem("rgpd_ok", "1"); setShow(false); }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
