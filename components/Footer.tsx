export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-8 text-sm text-gray-500 flex justify-between">
        <span>© {new Date().getFullYear()} GQOKA</span>
        <a href="/rgpd">RGPD & Confidentialité</a>
      </div>
    </footer>
  );
}
