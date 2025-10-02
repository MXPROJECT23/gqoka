"use client";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };
  const reject = () => {
    localStorage.setItem("cookie_consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-sm">
          Nous utilisons des cookies pour améliorer votre expérience.{" "}
          <a href="/cookies" className="underline">En savoir plus</a>.
        </p>
        <div className="flex gap-3">
          <button onClick={accept} className="px-4 py-2 bg-white text-black rounded-lg text-sm">
            Accepter
          </button>
          <button onClick={reject} className="px-4 py-2 border border-white rounded-lg text-sm">
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
}

