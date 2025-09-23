import { useState } from "react";

type Msg = {
  role: "user" | "assistant";
  text: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    // Ajoute le message utilisateur
    const next: Msg[] = [...messages, { role: "user" as const, text: input }];

    // Ajoute la réponse d’Anna (placeholder)
    setMessages([
      ...next,
      {
        role: "assistant" as const,
        text: "Bien noté. Je te propose un look casual chic avec ta chemise blanche et ton jean brut."
      }
    ]);

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg ${
              m.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex space-x-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écris à Anna..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}

