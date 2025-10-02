import { useEffect } from "react";

export default function AnnaBubble() {
  useEffect(() => {
    // Dialogflow Messenger
    const s = document.createElement("script");
    s.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    s.async = true;
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, []);

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="Anna"
      agent-id="d58b1b5a-3c5f-4fe5-921a-8bc8f39e2c90"
      language-code="fr"
      chat-icon="https://cdn-icons-png.flaticon.com/512/3597/3597088.png"
      style={{
        position: "fixed",
        right: "16px",
        bottom: "16px",
        zIndex: 50
      } as React.CSSProperties}
    />
  );
}
