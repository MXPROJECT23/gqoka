import { useEffect } from "react";

/**
 * Affiche le widget Dialogflow Messenger avec une fenêtre compacte.
 * - Agent ID lu depuis VITE_DIALOGFLOW_AGENT_ID
 * - Langue fr, titre "Anna"
 */
export default function Chatbot() {
  useEffect(() => {
    // Charger le script une seule fois
    if (!document.querySelector('script[data-df-messenger]')) {
      const s = document.createElement("script");
      s.src =
        "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      s.async = true;
      s.setAttribute("data-df-messenger", "");
      document.head.appendChild(s);
    }

    // Créer/obtenir l’élément df-messenger
    let el = document.querySelector("df-messenger") as HTMLElement | null;
    if (!el) {
      el = document.createElement("df-messenger");
      document.body.appendChild(el);
    }

    // Attributs requis
    el.setAttribute("agent-id", import.meta.env.VITE_DIALOGFLOW_AGENT_ID);
    el.setAttribute("chat-title", "Anna");
    el.setAttribute("language-code", "fr");
    // el.setAttribute("intent", "WELCOME"); // optionnel

    // Variables CSS pour réduire la taille et garder le haut visible
    el.style.setProperty("--df-messenger-chat-window-width", "360px");
    el.style.setProperty("--df-messenger-chat-window-height", "58vh");
    el.style.setProperty("--df-messenger-font-size", "14px");
    // couleurs sobres
    el.style.setProperty("--df-messenger-button-titlebar-color", "#111111");
    el.style.setProperty("--df-messenger-chat-bubble-color", "#111111");
    el.style.setProperty(
      "--df-messenger-user-chat-bubble-color",
      "#2563eb"
    );

    // rien à démonter: on garde le widget global
  }, []);

  return null; // le composant n'affiche rien, il injecte le widget global
}
