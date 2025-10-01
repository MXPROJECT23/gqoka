export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-8 text-sm text-gray-500 flex flex-col md:flex-row gap-3 md:gap-0 md:justify-between">
        <span>© {new Date().getFullYear()} GQOKA</span>
        <a href="/rgpd" className="hover:opacity-80">RGPD & Confidentialité</a>
      </div>
    </footer>
  );
}
