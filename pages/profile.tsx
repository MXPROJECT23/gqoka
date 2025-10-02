import Head from "next/head";

export default function Profile() {
  return (
    <>
      <Head><title>Profil — GQOKA</title></Head>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">Mon profil</h1>
        <div className="card mt-6">
          <form className="grid sm:grid-cols-2 gap-4" onSubmit={(e)=>e.preventDefault()}>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Prénom</span>
              <input className="border rounded-lg px-3 py-2" placeholder="—" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm text-gray-600">Nom</span>
              <input className="border rounded-lg px-3 py-2" placeholder="—" />
            </label>
            <label className="flex flex-col gap-1 sm:col-span-2">
              <span className="text-sm text-gray-600">Email</span>
              <input type="email" className="border rounded-lg px-3 py-2" placeholder="—" />
            </label>
            <button className="btn sm:col-span-2 mt-2" aria-label="Enregistrer">
              Enregistrer
            </button>
          </form>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Données traitées selon RGPD. Paramétrez vos préférences dans “Cookies”.
        </p>
      </main>
    </>
  );
}

