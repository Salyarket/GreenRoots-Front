// cette page sera automatiquement rendu au client si il demande une URL qui ne match aucune route

"use client"; // nécessaire pour les composants react (hooks)
import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    
    <main className="flex flex-col items-center justify-center text-center p-6 min-h-[60vh]">
      <Image
        src="/404.svg"
        alt="page non trouvée"
        width={700}
        height={700}
        priority
      />

       <Link
        href="/"
        className="mt-6 px-6 py-3 rounded-2xl bg-green-600 text-white hover:bg-green-700 transition"
      >
        Retour à l’accueil
      </Link>
      
    </main>
  );
}
