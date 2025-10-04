import { useEffect } from 'react';

export default function DialogflowWidget() {
  const agentId = import.meta.env.VITE_DIALOGFLOW_AGENT_ID as string | undefined;
  useEffect(() => {
    if (!agentId) return;
    const s = document.createElement('script');
    s.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    s.async = true;
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, [agentId]);

  if (!agentId) return null;

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="Anna"
      agent-id={agentId}
      language-code="fr">
    </df-messenger>
  );
}
