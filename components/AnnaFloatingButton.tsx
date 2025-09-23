import { useState } from "react";

export default function AnnaFloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6 py-3 shadow-lg"
      >
        💬 Parler à Anna
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-lg rounded-xl border flex flex-col">
          <div className="p-4 border-b font-semibold">Anna 👗</div>
          <div className="flex-1 p-4 text-sm overflow-y-auto">
            Salut, je suis Anna. Quel look cherches-tu aujourd’hui ?
          </div>
          <input
            type="text"
            placeholder="Écrivez à Anna..."
            className="border-t p-2 text-sm outline-none"
          />
        </div>
      )}
    </>
  );
}
