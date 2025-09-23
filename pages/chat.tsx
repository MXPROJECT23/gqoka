import { useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Salut, je suis Anna. Quel look cherches-tu aujourd’hui ?" },
  ]);
  const [input, setInput] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const next = [...messages, { role: "user", text: input }];
    // Stub: réponse instantanée (remplacée plus tard par IA)
    setMessages([...next, { role: "assistant", text: "Bien noté. Je te propose un look casual chic avec ta chemise blanche et ton jean brut." }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Anna, votre styliste</h1>
        <div className="bg-white rounded-xl shadow p-4 h-[60vh] overflow-y-auto space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
              <div className={`inline-block px-3 py-2 rounded-2xl ${
                m.role === "user" ? "bg-[#0B0D12] text-white" : "bg-gray-100"
              }`}>{m.text}</div>
            </div>
          ))}
        </div>
        <form onSubmit={send} className="mt-4 flex gap-2">
          <input
            className="flex-1 rounded-xl border px-3 py-2"
            placeholder="Ex: look pour rendez-vous, 18°C, sneakers ?"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
          />
          <button className="rounded-xl bg-[#5B8CFF] text-white px-4">Envoyer</button>
        </form>
      </div>
    </div>
  );
}
