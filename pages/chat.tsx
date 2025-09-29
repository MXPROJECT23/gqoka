import { useState } from "react";
import Header from "../components/Header";

type Msg = { role: "user" | "assistant"; text: string };

export default function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", text: "Salut, je suis Anna 👗. Décris ton occasion et je propose un look." }
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;

    // Ajouter le message utilisateur
    const next: Msg[] = [...messages, { role: "user", text: input } as const];

    // Réponse "fake" pour MVP → sera remplacée par l'IA
    const reply: Msg = { 
      role: "assistant", 
      text: "✨ Look idée : chemise blanche oversize, jean brut, sneakers blanches minimalistes."
    };

    setMessages([...next, reply]);
    setInput("");
  };

  return (
    <>
      <Header />
      <main className="container py-16">
        <h1 className="text-3xl font-bold mb-6">Chat avec Anna</h1>

        <div className="card space-y-4">
          <div className="h-96 overflow-y-auto space-y-4 p-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed
                  ${m.role === "user" 
                    ? "bg-black text-white rounded-br-none" 
                    : "bg-[#f5f5f0] text-gray-900 rounded-bl-none border border-gray-200"}`}>
                  {m.role === "assistant" && <div className="font-semibold mb-1">Anna 💎</div>}
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input 
              className="flex-1 border rounded-full px-4 py-3" 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              placeholder="Décris ton occasion (ex: dîner chic, sortie week-end…)" 
            />
            <button className="btn" onClick={send}>Envoyer</button>
          </div>
        </div>
      </main>
    </>
  );
}


