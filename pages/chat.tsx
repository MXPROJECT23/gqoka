import { useState } from "react";
import Header from "../components/Header";

type Msg = { role: "user" | "assistant"; text: string };

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Salut, je suis Anna. Décris ton occasion, je propose un look." }
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const next: Msg[] = [...messages, { role: "user", text: input } as const];
    const reply: Msg = { role: "assistant", text: "Look idée: chemise blanche, jean brut, sneakers blanches." };
    setMessages([...next, reply]);
    setInput("");
  };

  return (
    <>
      <Header />
      <main className="container py-16">
        <h1 className="text-3xl font-bold mb-6">Chat</h1>
        <div className="card space-y-3">
          <div className="h-64 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`px-3 py-2 rounded-xl inline-block ${m.role==="user"?"bg-black text-white":"bg-gray-100"}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input className="flex-1 border rounded-lg px-4 py-3" value={input}
                   onChange={e=>setInput(e.target.value)} placeholder="Décris l’occasion..." />
            <button className="btn" onClick={send}>Envoyer</button>
          </div>
        </div>
      </main>
    </>
  );
}


