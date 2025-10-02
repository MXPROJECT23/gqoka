export default function MentionsLegales() {
  return (
    <main className="container mx-auto px-6 py-16 max-w-3xl leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">Mentions Légales</h1>
      <p className="text-sm text-gray-500 mb-10">Conformément à la loi française</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Éditeur du site</h2>
        <p>
          <strong>GQOKA</strong> – Société SASU immatriculée en France.  
          Email : <a href="mailto:contact@gqoka.com" className="text-blue-600 underline">contact@gqoka.com</a>
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Hébergement</h2>
        <p>
          Site hébergé par <strong>Netlify</strong>.  
          Adresse : 2325 3rd Street, Suite 215, San Francisco, CA 94107.
        </p>
      </section>
    </main>
  );
}
