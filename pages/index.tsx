import Header from "../components/Header";
import Hero from "../components/Hero";
import AnnaFloatingButton from "../components/AnnaFloatingButton";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <Hero />
      </main>
      <AnnaFloatingButton />
    </div>
  );
}

        © {new Date().getFullYear()} GQOKA – Tous droits réservés.
      </footer>
    </div>
  );
}
