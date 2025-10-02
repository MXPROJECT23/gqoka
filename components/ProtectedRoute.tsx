import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login"); // redirection auto si pas connecté
    }
  }, [session, router]);

  if (!session) {
    return <p className="text-center mt-20">Redirection vers la connexion...</p>;
  }

  return children;
}
